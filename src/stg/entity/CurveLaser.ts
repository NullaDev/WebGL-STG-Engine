import { EntityPool } from "../stage/EntityPool";
import { PointCurve, ShapeCurve, SICurve, SSCurve } from "../util/Curve";
import { RENDER_TYPE } from "../util/SpriteManager";
import { CG_GHOST, CM_GHOST, Config, Entity, EntityAny, RL_BULLET, State } from "./Entity";
import { MovePoint } from "./MovePoint";

export const template_config_curve_mask: Config = {
    collide_group: CG_GHOST,
    collide_mask: CM_GHOST,
    render_layer: RL_BULLET
}

export class CurveMask extends SICurve<PointCurve, MovePoint<any>> implements Entity<CurveMask, RENDER_TYPE.STRIP, PointCurve, SSCurve<PointCurve, MovePoint<any>>> {

    public config: Config;
    public state: State = State.PRE_ENTRY;
    public time: number = 0;

    constructor(ss: SSCurve<PointCurve, MovePoint<any>>, config: Config) {
        super(ss);
        this.config = config;
    }

    public add(ent: MovePoint<any>) {
        this.list.push(ent);
        return ent;
    }

    public update(self: Entity<CurveMask, RENDER_TYPE.STRIP, PointCurve, any>) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
    }

    public attack(self: Entity<CurveMask, RENDER_TYPE.STRIP, PointCurve, any>, target: EntityAny) {
    }

    public postUpdate(self: Entity<CurveMask, RENDER_TYPE.STRIP, PointCurve, any>) {
        while (this.list.length && this.list[0].state == State.DEAD)
            this.list.shift();
    }

    public damaged(self: Entity<CurveMask, RENDER_TYPE.STRIP, PointCurve, any>, source: EntityAny) {
        return false;
    }

    public distanceTo(x: number, y: number): number {
        return Infinity;
    }
}