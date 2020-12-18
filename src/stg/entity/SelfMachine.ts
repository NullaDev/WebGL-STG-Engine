import { ShapeCircle, SIPoint, SSPoint } from "../sprite/Shape";
import { self_machine } from "../sprite/shaped_sprites";
import { RENDER_TYPE } from "../sprite/SpriteManager";
import { Config, Entity, EntityAny, State, template_config_player } from "./Entity";

enum PlayerState {
    NORMAL,
    MISS_TIME,
    BOMB_TIME
}

export type PlayerAction = {
    pos_x: number,
    pos_y: number,
    key_z: boolean,
    key_x: boolean,
    key_c: boolean
}

export class SelfMachine extends SIPoint<ShapeCircle> implements Entity<SelfMachine, RENDER_TYPE.RECT, ShapeCircle, SSPoint<ShapeCircle>>{

    public static INSTANCE: SelfMachine = null;

    private static action: PlayerAction = null;

    public static updateState(act: PlayerAction) {
        SelfMachine.action = act;
    }

    config: Config = template_config_player;
    state: State = State.ALIVE;
    pstate: PlayerState = PlayerState.NORMAL;

    constructor() {
        super(self_machine);
        SelfMachine.INSTANCE = this;
    }

    update(_: Entity<SelfMachine, RENDER_TYPE.RECT, ShapeCircle, SSPoint<ShapeCircle>>): void {
        if (!SelfMachine.action)
            return;
        this.px = SelfMachine.action.pos_x;
        this.py = SelfMachine.action.pos_y;
    }

    postUpdate(_: Entity<SelfMachine, RENDER_TYPE.RECT, ShapeCircle, SSPoint<ShapeCircle>>): void {

    }

    attack(_: Entity<SelfMachine, RENDER_TYPE.RECT, ShapeCircle, SSPoint<ShapeCircle>>, target: EntityAny): void {

    }



}