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

export const template_config_scheduler: Config = {
    render_layer: RL_INVISIBLE,
    collide_group: CG_GHOST,
    collide_mask: CM_GHOST
}

export class Scheduler extends SINull implements Entity<Scheduler, null, null, null> {

    public list: ScheduleEntry[];
    config: Config = template_config_scheduler;
    state: State = State.PRE_ENTRY;

    constructor(input: (number | (() => void))[]) {
        super();
        this.list = input.map(e => isNaN(+e) ? new Adder(<() => void>e) : new Wait(<number>e));
    }

    public update(_: Scheduler) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        var t = EntityPool.INSTANCE.special_effects.time_rate;
        while (this.list.length > 0 && (t = this.list[0].update(t)))
            this.list.shift();
        if (this.list.length == 0)
            this.state = State.LEAVING;
    }

    public postUpdate(_: Scheduler) {
        if (this.state == State.LEAVING)
            this.state = State.DEAD;
    }

    public attack(_: Scheduler) {

    }


}