import { CG_BOMB, CG_BULLET, CG_PLAYER, CollideGroup, Config, Entity, EntityAny, RL_BULLET, State } from "./Entity";
import { EntityPool } from "../stage/EntityPool";
import { SCR_HALF_HEIGHT, SCR_HALF_WIDTH } from "../../platform/Screen";
import { ShapePoint, SIPoint, SSPoint } from "../util/Shape";
import { RENDER_TYPE } from "../util/SpriteManager";

export interface MovePointEventListener {
    onInit: ((self: MovePoint<any>)=>void)[],
    onUpdate: ((self: MovePoint<any>, rate: number) => void)[],
    onPostMotion: ((self: MovePoint<any>, rate: number) => void)[],
    onPostUpdate: ((self: MovePoint<any>) => void)[],
    onExitScreen: ((self: MovePoint<any>) => void)[],
    onDestroy: ((self: MovePoint<any>) => void)[],
    onKill: ((self: MovePoint<any>, source: EntityAny) => void)[],
    onAttack: ((self: MovePoint<any>, target: EntityAny) => void)[],
}

export type MovePointConfig = Config & {
    kill_on_exit: boolean,
    kill_by: (group: CollideGroup) => boolean,
    auto_direction: boolean,
    life: number,
    listener: MovePointEventListener
}

export const template_config_bullet: MovePointConfig = {
    render_layer: RL_BULLET,
    collide_group: CG_BULLET,
    collide_mask: CG_BULLET,
    kill_on_exit: true,
    kill_by: (group) => group == CG_BOMB || group == CG_PLAYER,
    auto_direction: true,
    life: 0,
    listener: null
}

// return true if velocity is enabled, return false to disable velocity
export type Motion = (self: MovePoint<any>, time_rate: number) => boolean;

export const motion_default = (self: MovePoint<any>, time_rate: number) => true;

export const motion_accelerate: (ax: number, ay: number) => Motion =
    (ax: number, ay: number) => ((self: MovePoint<any>, time_rate: number) => {
        self.vx += ax * time_rate;
        self.vy += ay * time_rate;
        return true;
    });

export const motion_circle: (w: number) => Motion =
    (w: number) => ((self: MovePoint<any>, time_rate: number) => {
        const a0 = Math.atan2(self.vy, self.vx);
        const v = Math.sqrt(self.vx * self.vx + self.vy * self.vy);
        const a1 = a0 + w * time_rate;
        self.vx = v * Math.cos(a1);
        self.vy = v * Math.sin(a1);
        self.dir = a1;
        return true;
    });

export const motion_orbit: (center: SIPoint<any>, a0: number, w: number, r: number, vr: number) => Motion =
    (center: SIPoint<any>, a0: number, w: number, r: number, vr: number) => ((self: MovePoint<any>, time_rate: number) => {
        const sa = w * self.time;
        const sr = vr * self.time;
        self.px = center.px + sr * Math.cos(sa);
        self.py = center.py + sr * Math.sin(sa);
        self.dir = Math.atan2(sr * w, vr) + sa;
        return false;
    });

export class MovePoint<S extends ShapePoint> extends SIPoint<S> implements Entity<MovePoint<S>, RENDER_TYPE.RECT, S, SSPoint<S>> {

    public readonly config: MovePointConfig;

    public state: State = State.PRE_ENTRY;
    public motion: Motion = motion_default;
    public custom_fields: any = {};

    public vx: number;
    public vy: number;
    public time: number;

    constructor(shaped_shape: SSPoint<S>, bc: MovePointConfig) {
        super(shaped_shape);
        this.config = bc;
        this.time = 0;
    }

    public setMotion(m: Motion) {
        this.motion = m;
        return this.simpleInit(0, 0, 0, 0);
    }

    public simpleInit(x0: number, y0: number, v: number, a: number): MovePoint<S> {
        this.px = x0;
        this.py = y0;
        this.vx = v * Math.cos(a);
        this.vy = v * Math.sin(a);
        this.dir = a;
        if (this.motion(this, 0) && this.config.auto_direction)
            this.dir = Math.atan2(this.vy, this.vx);
        return this;
    }

    public update(_: MovePoint<S>) {
        if (this.state == State.PRE_ENTRY){
            this.state = State.ALIVE;
            this.config.listener?.onInit?.forEach(e=>e(this));
        }
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        this.config.listener?.onUpdate?.forEach(e => e(this, rate));
        if (this.motion(this, rate)) {
            this.px += this.vx * rate;
            this.py += this.vy * rate;
            if (this.config.auto_direction)
                this.dir = Math.atan2(this.vy, this.vx);
        }
        this.config.listener?.onPostMotion?.forEach(e => e(this, rate));
    }

    public postUpdate(_: MovePoint<S>) {
        if (this.shaped_sprite?.shape?.exitScreen(this, SCR_HALF_WIDTH, SCR_HALF_HEIGHT)) {
            if (this.config.kill_on_exit)
                this.state = State.LEAVING;
            this.config.listener?.onExitScreen?.forEach(e => e(this));
        }
        if (this.config.life && this.time >= this.config.life)
            this.state = State.LEAVING;
        this.config.listener?.onPostUpdate?.forEach(e => e(this));
        if (this.state == State.LEAVING) {
            this.config.listener?.onDestroy?.forEach(e => e(this));
            this.state = State.DEAD;
        }
    }

    public attack(_: MovePoint<S>, e: EntityAny) {
        this.config.listener?.onAttack?.forEach(x => x(this, e));
        e.damaged(e, this);
    }

    public damaged(_: MovePoint<S>, s: EntityAny) {
        if (this.config.kill_by(s.config.collide_group)) {
            this.state = State.LEAVING;
            this.config.listener?.onKill?.forEach(e => e(this, s));
            return true;
        }
        return false;
    }
}