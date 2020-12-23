import { CG_GHOST, CM_GHOST, Config, Entity, EntityAny, RL_INVISIBLE, State } from "../entity/Entity";
import { SINull, SIPoint } from "../util/Shape";
import { EntityPool } from "./EntityPool";

abstract class ScheduleEntry {

    public abstract update(time_rate: number): number

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
        const minx = Math.max(config.px0 - target.px, -config.dx1);
        const maxx = Math.min(config.px1 - target.px, config.dx1);
        const miny = Math.max(config.py0 - target.py, -config.dy1);
        const maxy = Math.min(config.py1 - target.py, config.dy1);
        const dx = minx + Math.random() * (maxx - minx);
        const dy = miny + Math.random() * (maxy - miny);
        return new Mover(target, config.duration, dx, dy, config.ease);
    }

    public target: SIPoint<any>;
    public duration: number;
    public dx: number;
    public dy: number;
    public x0: number;
    public y0: number;
    public ease: (a: number) => number;
    public time: number = 0;

    constructor(target: SIPoint<any>, duration: number, dx: number, dy: number, ease: (a: number) => number) {
        super();
        this.target = target;
        this.duration = duration;
        this.dx = dx;
        this.dy = dy;
        this.x0 = target.px;
        this.y0 = target.py;
        this.ease = ease;
    }

    public update(time_rate: number): number {
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

    public todo: () => void;

    constructor(input: () => void) {
        super();
        this.todo = input;
    }

    public update(time_rate: number): number {
        this.todo();
        return time_rate;
    }

}

export abstract class ScheduleSupplier {

    public abstract supply(): Item[];

}

export type Input = number | (() => void) | ScheduleEntry | ScheduleSupplier;

type Item = ScheduleEntry | ScheduleSupplier;

function parse(input: Input[]): Item[] {
    return input.map(e =>
        typeof e == "number" ? new Wait(<number>e) :
            typeof e == "function" ? new Adder(<() => void>e) :
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

export class Scheduler extends SINull implements Entity<Scheduler, null, null, null> {

    public list: Item[];
    config: Config = template_config_scheduler;
    state: State = State.PRE_ENTRY;
    time: number = 0;

    constructor(input: Input[]) {
        super();
        this.list = parse(input);
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
                if (!list || !list.length) {
                    this.list.shift();
                }
                else this.list = [...list, ...this.list];
            }
            else {
                t = sss.update(t);
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