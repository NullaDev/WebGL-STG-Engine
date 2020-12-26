import { CG_GHOST, CM_GHOST, Config, Entity, EntityAny, RL_INVISIBLE, State } from "../entity/Entity";
import { SINull, SIPoint } from "../util/Shape";
import { EntityPool } from "./EntityPool";

abstract class ScheduleEntry {

    public abstract update(time_rate: number, parent: Scheduler): number

}

class Wait extends ScheduleEntry {

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

export class Mover extends ScheduleEntry {

    public static random(target: SIPoint<any>, config: MoverConfig) {
        return () => new Mover((self: Mover) => {
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

class Adder extends ScheduleEntry {

    public todo: ItemSup;

    constructor(input: ItemSup) {
        super();
        this.todo = input;
    }

    public update(time_rate: number, scheduler: Scheduler): number {
        var val = this.todo();
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

export abstract class ScheduleSupplier {

    public abstract supply(): Item[];

}

type Item = ScheduleEntry | ScheduleSupplier;
type ItemSup = () => (void | number | Item);
export type Input = ItemSup | number;

function parse(input: Input[]): Item[] {
    return input.map(e =>
        typeof e == "number" ? new Wait(<number>e) :
            typeof e == "function" ? new Adder(<ItemSup>e) :
                e);
}

export type Repeat = ((i?: number) => Input[]) | Input[];

export class RepeatSupplier extends ScheduleSupplier {

    todo: Repeat;
    index: number = 0;
    total: number;

    constructor(input: Repeat, n: number) {
        super();
        this.todo = input;
        this.total = n;
    }

    public supply(): Item[] {
        if (this.index >= this.total)
            return null;
        var ans;
        if (typeof this.todo == "function")
            ans = this.todo(this.index);
        else ans = this.todo;
        this.index++;
        return parse(ans);
    }


}

export const template_config_scheduler: Config = {
    render_layer: RL_INVISIBLE,
    collide_group: CG_GHOST,
    collide_mask: CM_GHOST
}

export type SchedulerParam = Input[] | ((parent: Scheduler) => Input[]);

export class Scheduler extends SINull implements Entity<Scheduler, null, null, null> {

    public list: Item[];
    public custom_fields: any = {};
    config: Config = template_config_scheduler;
    state: State = State.PRE_ENTRY;
    time: number = 0;

    constructor(input: SchedulerParam) {
        super();
        this.list = parse(typeof input == "object" ? input : input(this));
    }

    public init(func: (self: Scheduler) => void) {
        func(this);
        return this;
    }

    public update(_: Scheduler) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        var t = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += t;
        while (this.list.length > 0 && t) {
            var sss: ScheduleEntry | ScheduleSupplier = this.list[0];
            if (sss instanceof ScheduleSupplier) {
                var list = sss.supply();
                if (!list || !list.length)
                    this.list.shift();
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

    public postUpdate(_: Scheduler) {
        if (this.state == State.LEAVING)
            this.state = State.DEAD;
    }

    public attack(_: Scheduler) {

    }

    public damaged(_: Scheduler, s: EntityAny) {
        return false;
    }

}