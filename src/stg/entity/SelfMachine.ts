import { ShapeCircle, SIPoint, SSPoint } from "../util/Shape";
import { RENDER_TYPE } from "../util/SpriteManager";
import * as Screen from "../../platform/Screen";
import { Config, Entity, EntityAny, State, template_config_player, clone } from "./Entity";
import { EntityPool } from "../stage/EntityPool";

export type PlayerAction = {
    pos_x: number,
    pos_y: number,
    key_z: boolean,
    key_x: boolean,
    key_c: boolean
}

export type PlayerAbility = {
    readonly pre_miss: number,
    readonly miss_time: number,
    readonly bomb_time: number
}

export interface PlayerPrototype {
    updateShoot(shoot: boolean): boolean,
    updateBomb(bomb: boolean): boolean,
    updateSpecial(special: boolean): boolean
}

type SME = Entity<SelfMachine, RENDER_TYPE.RECT, ShapeCircle, SSPoint<ShapeCircle>>;

export class SelfMachine extends SIPoint<ShapeCircle> implements SME {

    public static INSTANCE: SelfMachine = null;
    private static action: PlayerAction = null;

    public static updateState(act: PlayerAction) {
        SelfMachine.action = act;
    }

    config: Config = template_config_player;
    state: State = State.ALIVE;
    readonly proto: PlayerPrototype;
    readonly ability: PlayerAbility;
    readonly sprite: SSPoint<ShapeCircle>;

    miss: boolean = false;
    bomb: boolean = false;
    pre_miss: number = 0;
    miss_time: number = 0;
    invince_time: number = 0;

    time:number = 0;

    constructor(ss: SSPoint<ShapeCircle>, proto: PlayerPrototype, abi: PlayerAbility, x: number, y: number) {
        super(clone(ss));
        SelfMachine.INSTANCE = this;
        this.proto = proto;
        this.ability = abi;
        this.sprite = ss;
        this.px = x;
        this.py = y;
        this.dir = 0;
    }

    update(_: SME): void {
        if (!SelfMachine.action)
            return;
        this.px += SelfMachine.action.pos_x;
        this.py += SelfMachine.action.pos_y;
        if (this.px < -Screen.SCR_HALF_WIDTH)
            this.px = -Screen.SCR_HALF_WIDTH;
        if (this.px > Screen.SCR_HALF_WIDTH)
            this.px = Screen.SCR_HALF_WIDTH;
        if (this.py < - Screen.SCR_HALF_HEIGHT)
            this.py = -Screen.SCR_HALF_HEIGHT;
        if (this.py > Screen.SCR_HALF_HEIGHT)
            this.py = Screen.SCR_HALF_HEIGHT;
        this.time += EntityPool.INSTANCE.special_effects.time_rate;
        this.dir = this.time * Math.PI * 2 / 600;
        this.proto.updateShoot(SelfMachine.action.key_z);
        this.bomb = this.proto.updateBomb(SelfMachine.action.key_x);
        this.proto.updateSpecial(SelfMachine.action.key_c);
    }

    postUpdate(_: SME): void {
        if (this.miss_time > 0)
            this.miss_time--;
        if (this.pre_miss > 0) {
            this.pre_miss--;
            if (this.pre_miss == 0) {
                // Miss
                console.log("missed");
                this.miss_time = this.ability.miss_time;
            }
        }
        if (this.miss) {
            this.miss = false;
            this.pre_miss = this.ability.pre_miss;
        }
        if (this.bomb) {
            this.bomb = false;
            this.miss_time = this.ability.bomb_time;
            if (this.pre_miss > 0) {
                // bomb after miss
                console.log("bomb after miss");
                this.pre_miss = 0;
            }
        }
        if (this.miss_time > 0 || this.pre_miss > 0) {
            this.invince_time++;
            if (Math.floor(this.invince_time / 6) % 2 == 0) {
                this.shaped_sprite.sprite = null;
            }
            else {
                this.shaped_sprite.sprite = this.sprite.sprite;
            }
        }
        else {
            this.invince_time = 0;
            this.shaped_sprite.sprite = this.sprite.sprite;
        }
    }

    attack(_: SME, target: EntityAny): void {

    }

    public damaged(_: SME, s: EntityAny) {
        if (this.pre_miss == 0 && this.miss_time == 0)
            this.miss = true;
        return s.damaged(s, this);
    }

}