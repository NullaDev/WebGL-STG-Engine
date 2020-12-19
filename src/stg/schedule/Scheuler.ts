import { CG_GHOST, CM_GHOST, Config, Entity, EntityAny, RL_INVISIBLE, State } from "../entity/Entity";
import { SINull } from "../sprite/Shape";
import { EntityPool } from "../stage/EntityPool";

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

export type Input = number | (() => void) | ScheduleSupplier;

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

    constructor(input: Input[]) {
        super();
        this.list = parse(input);
    }

    public update(_: Scheduler) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        var t = EntityPool.INSTANCE.special_effects.time_rate;
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

    public damaged(_: Scheduler, s: EntityAny){
        return false;
    }


}