import { CG_GHOST, CM_GHOST, Config, Entity, EntityAny, RL_INVISIBLE, State } from "../entity/Entity";
import { SINull, SIPoint } from "../util/Shape";
import { EntityPool } from "./EntityPool";

export type CheckEnabled = false;

abstract class ScheduleEntry<ForceArrow extends Check<ForceArrow>> {

    public type : ForceArrow;

    public abstract update(time_rate: number, parent: Scheduler<ForceArrow>): number

}

class Wait<ForceArrow extends Check<ForceArrow>> extends ScheduleEntry<ForceArrow> {

    public remain: number;

    constructor(input: number) {
        super();
        this.remain = input;
    }

    public update(time_rate: number): number {
        this.remain -= time_rate;
        if (this.remain < 0)
            return -this.remain;
        return 0;
    }

}

export type MoverConfig = {
    duration: number,
    px0: number,
    py0: number,
    px1: number,
    py1: number,
    dx1: number,
    dy1: number,
    ease: (a: number) => number
}

export class Mover extends ScheduleEntry<CheckEnabled extends true ? never : unknown> {

    public static random(target: SIPoint<any>, config: MoverConfig) {
        return new Mover((self: Mover) => {
            const minx = Math.max(config.px0 - target.px, -config.dx1);
            const maxx = Math.min(config.px1 - target.px, config.dx1);
            const miny = Math.max(config.py0 - target.py, -config.dy1);
            const maxy = Math.min(config.py1 - target.py, config.dy1);
            const dx = minx + Math.random() * (maxx - minx);
            const dy = miny + Math.random() * (maxy - miny);
            self.target = target;
            self.duration = config.duration;
            self.dx = dx;
            self.dy = dy;
            self.x0 = target.px;
            self.y0 = target.py;
            self.ease = config.ease;
        });
    }

    public target: SIPoint<any>;
    public duration: number;
    public dx: number;
    public dy: number;
    public x0: number;
    public y0: number;
    public ease: (a: number) => number;
    public time: number = 0;
    public init: (self: Mover) => void;

    constructor(init: (self: Mover) => void) {
        super();
        this.init = init;
    }

    public update(time_rate: number): number {
        if (this.time == 0)
            this.init(this);
        this.time += time_rate;
        const a = Math.min(1, this.time / this.duration);
        const b = this.ease(a);
        this.target.px = this.x0 + this.dx * b;
        this.target.py = this.y0 + this.dy * b;
        if (this.time > this.duration)
            return this.time - this.duration;
        return 0;
    }
}

class Adder<ForceArrow extends Check<ForceArrow>> extends ScheduleEntry<ForceArrow> {

    public todo: ItemSup<ForceArrow>;

    constructor(input: ItemSup<ForceArrow>) {
        super();
        this.todo = input;
    }

    public update(time_rate: number, scheduler: Scheduler<ForceArrow>): number {
        var val = this.todo(scheduler);
        if (typeof val == "undefined")
            return time_rate;
        if (typeof val == "number") {
            scheduler.list[0] = new Wait(val);
            return scheduler.list[0].update(time_rate, scheduler);
        }
        scheduler.list.unshift(scheduler.list[0]);
        scheduler.list[1] = val;
        return time_rate;
    }

}

export abstract class ScheduleSupplier<ForceArrow extends Check<ForceArrow>> {

    public type : ForceArrow;

    public abstract supply(): Item<ForceArrow>[];

}

export type Check<ForceArrow extends Check<ForceArrow>> = CheckEnabled extends true ? (unknown extends ForceArrow ? never : boolean) : unknown;
export type Item<ForceArrow extends Check<ForceArrow>> = ScheduleEntry<ForceArrow> | ScheduleSupplier<ForceArrow>;
export type ItemSup<ForceArrow extends Check<ForceArrow>> = (parent: Scheduler<ForceArrow>) => (void | number | Item<ForceArrow>);
export type Input<ForceArrow extends Check<ForceArrow>> = ForceArrow extends true ? ItemSup<true> : (ItemSup<ForceArrow> | number | Item<ForceArrow>);
export type Repeat<ForceArrow extends Check<ForceArrow>> = ((i?: number) => Input<ForceArrow>[]) | (ForceArrow extends true ? never : Input<ForceArrow>[]);
export type SchedulerParam<ForceArrow extends Check<ForceArrow>> = ((parent: Scheduler<ForceArrow>) => Input<ForceArrow>[]) | (ForceArrow extends true ? never : Input<ForceArrow>[]);

function parse<ForceArrow extends Check<ForceArrow>>(input: Input<ForceArrow>): Item<ForceArrow> {
    if (typeof input == "number")
        return new Wait(<number>input);
    if (typeof input == "function")
        return new Adder(<ItemSup<ForceArrow>>input);
    return <Item<ForceArrow>>input;
}

export class RepeatSupplier<ForceArrow extends Check<ForceArrow>> extends ScheduleSupplier<ForceArrow> {

    todo: Repeat<ForceArrow>;
    index: number = 0;
    total: number;

    constructor(input: Repeat<ForceArrow>, n: number) {
        super();
        this.todo = input;
        this.total = n;
    }

    public supply(): Item<ForceArrow>[] {
        if (this.index >= this.total)
            return null;
        var ans: Input<ForceArrow>[];
        if (typeof this.todo == "function")
            ans = this.todo(this.index);
        else ans = this.todo;
        this.index++;
        return ans.map(parse);
    }


}

export const template_config_scheduler: Config = {
    render_layer: RL_INVISIBLE,
    collide_group: CG_GHOST,
    collide_mask: CM_GHOST
}

export class Scheduler<ForceArrow extends Check<ForceArrow>> extends SINull implements Entity<Scheduler<ForceArrow>, null, null, null> {

    public type : ForceArrow;

    public list: Item<ForceArrow>[];
    public custom_fields: any = {};
    config: Config = template_config_scheduler;
    state: State = State.PRE_ENTRY;
    time: number = 0;

    constructor(input: SchedulerParam<ForceArrow>) {
        super();
        this.list = (typeof input == "object" ? input : input(this)).map(parse);
    }

    public update(_: Scheduler<ForceArrow>) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        var t = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += t;
        while (this.list.length > 0 && t) {
            var sss: ScheduleEntry<ForceArrow> | ScheduleSupplier<ForceArrow> = this.list[0];
            if (sss instanceof ScheduleSupplier) {
                var list = sss.supply();
                if (!list || !list.length) {
                    this.list.shift();
                }
                else this.list = [...list, ...this.list];
            }
            else {
                t = sss.update(t, this);
                if (t > 0)
                    this.list.shift();
            }
        }
        if (this.list.length == 0)
            this.state = State.LEAVING;
    }

    public postUpdate(_: Scheduler<ForceArrow>) {
        if (this.state == State.LEAVING)
            this.state = State.DEAD;
    }

    public attack(_: Scheduler<ForceArrow>) {

    }

    public damaged(_: Scheduler<ForceArrow>, s: EntityAny) {
        return false;
    }

}