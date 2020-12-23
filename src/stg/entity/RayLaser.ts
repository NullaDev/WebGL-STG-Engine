import { Shape, ShapedInstance, ShapedSprite } from "../util/Shape";
import { RECT, RENDER_TYPE } from "../util/SpriteManager";
import { EntityPool } from "../stage/EntityPool";
import { Config, Entity, EntityAny, State } from "./Entity";

export class ShapeRay extends Shape<SIRay> {

    private readonly func: (self: SIRay, x: number, y: number) => number;

    constructor(f: (self: SIRay, x: number, y: number) => number) {
        super();
        this.func = f;
    }

    public distanceTo(self: SIRay, x: number, y: number): number {
        return this.func(self, x, y);
    }

    public static line_circle(self: SIRay, x: number, y: number): number {
        const x0 = self.px;
        const y0 = self.py;
        const x1 = self.px + self.len * Math.cos(self.dir);
        const y1 = self.py + self.len * Math.sin(self.dir);
        const rl = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        const dis = Math.abs((x1 - x0) * (y0 - y) - (x0 - x) * (y1 - y0));
        const d0 = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));
        const d1 = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        return Math.min(dis / rl, d0, d1) - self.shaped_sprite.w_ratio * self.w;
    }

}

export enum RayLaserState {
    WARNING,
    OPENING,
    OPENED,
    CLOSING
}

export interface RayLaserEventListener {
    onInit: ((self: RayLaser) => void)[],
    onStateChange: ((self: RayLaser) => void)[],
    onUpdate: ((self: RayLaser, rate: number) => void)[],
    onPostMotion: ((self: RayLaser, rate: number) => void)[],
    onPostUpdate: ((self: RayLaser) => void)[],
    onDestroy: ((self: RayLaser) => void)[],
    onAttack: ((self: RayLaser, target: EntityAny) => void)[],
    onContact: ((self: RayLaser, other: EntityAny) => void)[],
}

export type RayLaserConfig = Config & {
    warning_time: number,
    open_time: number,
    alive_time: number,
    close_time: number,
    listener: RayLaserEventListener
}

export type RayLaserMotion = (self: RayLaser, time_rate: number) => void;

export class SSRay extends ShapedSprite<SSRay, RENDER_TYPE.RECT, SIRay, ShapeRay> {
    public w_ratio: number;
    public l_ratio: number;
}

export class SIRay extends ShapedInstance<SIRay, RENDER_TYPE.RECT, ShapeRay, SSRay> implements RECT {

    public px: number;
    public py: number;
    public dir: number;
    public len: number;
    public w: number;

    constructor(ss: SSRay) {
        super(RENDER_TYPE.RECT, ss);
        this.w = -Infinity;
    }

    rectCount(): number {
        return 1;
    }

    render(xyrwh: Float32Array, i: number): void {
        xyrwh[i * 10 + 0] = this.px + this.len * Math.cos(this.dir);
        xyrwh[i * 10 + 1] = this.py + this.len * Math.sin(this.dir);
        xyrwh[i * 10 + 2] = this.dir;
        xyrwh[i * 10 + 3] = Math.max(1, this.shaped_sprite.w_ratio * this.w);
        xyrwh[i * 10 + 4] = this.shaped_sprite.l_ratio / 2 * this.len;
        const sprite = this.shaped_sprite.sprite;
        xyrwh[i * 10 + 5] = sprite.tx / sprite.sprite.w;
        xyrwh[i * 10 + 6] = sprite.ty / sprite.sprite.h;
        xyrwh[i * 10 + 7] = sprite.tw / sprite.sprite.w;
        xyrwh[i * 10 + 8] = sprite.th / sprite.sprite.h;
        xyrwh[i * 10 + 9] = 1;
    }

}

export class RayLaser extends SIRay implements Entity<RayLaser, RENDER_TYPE.RECT, ShapeRay, SSRay> {

    public state: State = State.PRE_ENTRY;
    public rstate: RayLaserState = RayLaserState.WARNING;
    public config: RayLaserConfig;
    public motion: RayLaserMotion;
    public time: number;

    constructor(shaped_shape: SSRay, cf: RayLaserConfig, m: RayLaserMotion) {
        super(shaped_shape);
        this.config = cf;
        this.motion = m;
    }

    public update(_: RayLaser) {
        if (this.state = State.PRE_ENTRY) {
            this.state = State.ALIVE;
            this.config.listener?.onInit?.forEach(e => e(this));
        }
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        if (this.rstate == RayLaserState.WARNING && this.time >= this.config.warning_time) {
            this.rstate = RayLaserState.OPENING;
            this.config.listener?.onStateChange?.forEach(e => e(this));
        }
        if (this.rstate == RayLaserState.OPENING && this.time >= this.config.open_time) {
            this.rstate = RayLaserState.OPENED;
            this.w = 1;
            this.config.listener?.onStateChange?.forEach(e => e(this));
        }
        if (this.rstate == RayLaserState.OPENED && this.time >= this.config.alive_time) {
            this.rstate = RayLaserState.CLOSING;
            this.w = -Infinity;
            this.config.listener?.onStateChange?.forEach(e => e(this));
        }
        if (this.rstate == RayLaserState.CLOSING && this.time >= this.config.close_time) {
            this.state = State.LEAVING;
        }
        this.config.listener?.onUpdate?.forEach(e => e(this, rate));
        this.motion(this, rate);
        this.config.listener?.onPostMotion?.forEach(e => e(this, rate));
    }

    public postUpdate(_: RayLaser) {
        this.config.listener?.onPostUpdate?.forEach(e => e(this));
        if (this.state == State.LEAVING) {
            this.config.listener?.onDestroy?.forEach(e => e(this));
            this.state = State.DEAD;
        }
    }

    public attack(_: RayLaser, e: EntityAny) {
        this.config.listener?.onAttack?.forEach(x => x(this, e));
        e.damaged(e, this);
    }

    public damaged(_: RayLaser, source: EntityAny) {
        this.config.listener?.onContact?.forEach(e => e(this, source));
        return false;
    }
}