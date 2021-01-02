import { EntityPool } from "../stage/EntityPool";
import { SICurve, SSCurve } from "../util/Curve";
import { RENDER_TYPE } from "../util/SpriteManager";
import { CG_GHOST, CM_GHOST, Config, Entity, EntityAny, RL_BULLET, State } from "./Entity";
import { MovePoint } from "./MovePoint";

export type CurveMaskConfig = Config & {
    kill_on_empty: boolean,
    protect: number,
    life: number,
}

export const template_config_curve_mask: CurveMaskConfig = {
    collide_group: CG_GHOST,
    collide_mask: CM_GHOST,
    render_layer: RL_BULLET,
    damage_info: null,
    kill_on_empty: true,
    protect: 0,
    life: 0
}

export class CurveMask extends SICurve<null, MovePoint<any>> implements Entity<CurveMask, RENDER_TYPE.STRIP, null, SSCurve<null, MovePoint<any>>> {

    public config: CurveMaskConfig;
    public state: State = State.PRE_ENTRY;

    constructor(ss: SSCurve<null, MovePoint<any>>, config: CurveMaskConfig) {
        super(ss);
        this.config = config;
    }

    public add(ent: MovePoint<any>) {
        this.list.push(ent);
        return ent;
    }

    public update(self: Entity<CurveMask, RENDER_TYPE.STRIP, null, any>) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        const stat = this.getStat();
        for (var l of stat.list) {
            for (var i = 0; i < l.len; i++) {
                this.list[i + l.start].magn = this.shaped_sprite.radius(l.start, l.len, i);
            }
        }
    }

    public attack(self: Entity<CurveMask, RENDER_TYPE.STRIP, null, any>, target: EntityAny) {
    }

    public postUpdate(self: Entity<CurveMask, RENDER_TYPE.STRIP, null, any>) {
        while (this.list.length && this.list[0].state == State.DEAD)
            this.list.shift();
        if (this.time > this.config.protect && this.config.kill_on_empty && !this.list.length)
            this.state = State.DEAD;
    }

    public damaged(self: Entity<CurveMask, RENDER_TYPE.STRIP, null, any>, source: EntityAny) {
        return false;
    }

    public distanceTo(x: number, y: number): number {
        return Infinity;
    }
}