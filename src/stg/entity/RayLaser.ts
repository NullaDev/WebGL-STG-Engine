import { Shape, ShapeCircle, ShapedInstance, ShapedSprite, ShapeDualArc, SSPoint } from "../util/Shape";
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
        return Math.min(this.func(self, x, y),
            self.shaped_sprite.base.shape.rawDistanceTo(self.px, self.py, 1, x, y),
            self.shaped_sprite.end.shape.rawDistanceTo(
                self.px + self.len * Math.cos(self.dir),
                self.py + self.len * Math.sin(self.dir), 1, x, y));
    }

    public static line_circle(self: SIRay, x: number, y: number): number {
        const x0 = self.px + self.shaped_sprite.hitbox_width * Math.cos(self.dir);
        const y0 = self.py + self.shaped_sprite.hitbox_width * Math.sin(self.dir);
        const x1 = self.px + (self.len - self.shaped_sprite.hitbox_width) * Math.cos(self.dir);
        const y1 = self.py + (self.len - self.shaped_sprite.hitbox_width) * Math.sin(self.dir);
        const rl = Math.sqrt((x0 - x1) ** 2 + (y0 - y1) ** 2);
        const dis = Math.abs((x1 - x0) * (y0 - y) - (x0 - x) * (y1 - y0));
        const d0 = Math.sqrt((x0 - x) ** 2 + (y0 - y) ** 2);
        const d1 = Math.sqrt((x1 - x) ** 2 + (y1 - y) ** 2);
        if (Math.max(d0, d1) ** 2 > Math.min(d0, d1) ** 2 + rl ** 2)
            return Math.min(d0, d1) - self.shaped_sprite.hitbox_width * self.w;
        return Math.min(dis / rl, d0, d1) - self.shaped_sprite.hitbox_width * self.w;
    }

    public static double_arc(self: SIRay, px: number, py: number): number {
        const x = px - self.px;
        const y = py - self.py;
        const rx = x * Math.cos(-self.dir) - y * Math.sin(-self.dir);
        const ry = x * Math.sin(-self.dir) + y * Math.cos(-self.dir);
        return ShapeDualArc.orthDis(rx - self.len / 2, ry, self.len / 2, self.w * self.shaped_sprite.hitbox_width);
    }

    public static half_arc(self: SIRay, px: number, py: number): number {
        const x = px - self.px;
        const y = py - self.py;
        const rx = x * Math.cos(-self.dir) - y * Math.sin(-self.dir);
        const ry = x * Math.sin(-self.dir) + y * Math.cos(-self.dir);
        if (rx < 0)
            return Math.sqrt(rx ** 2 + ry ** 2);
        return ShapeDualArc.orthDis(rx, ry, self.len, self.w * self.shaped_sprite.hitbox_width);
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
    public sprite_width: number;
    public hitbox_width: number;
    public l_ratio: number;
    public base: SSPoint<ShapeCircle>;
    public end: SSPoint<ShapeCircle>;
}

export class SIRay extends ShapedInstance<SIRay, RENDER_TYPE.RECT, ShapeRay, SSRay> implements RECT {

    public px: number;
    public py: number;
    public dir: number;
    public len: number;
    public w: number;

    constructor(ss: SSRay) {
        super(RENDER_TYPE.RECT, ss);
        this.w = 0;
    }

    rectCount(): number {
        return 3;
    }

    render(xyrwh: Float32Array, i: number): void {
        const l = this.shaped_sprite.l_ratio * this.len / 2;
        xyrwh[i * 10 + 0] = this.px + l * Math.cos(this.dir);
        xyrwh[i * 10 + 1] = this.py + l * Math.sin(this.dir);
        xyrwh[i * 10 + 2] = this.dir + Math.PI / 2;
        xyrwh[i * 10 + 3] = Math.max(1, this.shaped_sprite.sprite_width * this.w);
        xyrwh[i * 10 + 4] = l;
        var sprite = this.shaped_sprite.sprite;
        xyrwh[i * 10 + 5] = sprite.tx / sprite.sprite.w;
        xyrwh[i * 10 + 6] = sprite.ty / sprite.sprite.h;
        xyrwh[i * 10 + 7] = sprite.tw / sprite.sprite.w;
        xyrwh[i * 10 + 8] = sprite.th / sprite.sprite.h;
        xyrwh[i * 10 + 9] = 1;

        i++;

        var ss = this.shaped_sprite.base;
        xyrwh[i * 10 + 0] = this.px;
        xyrwh[i * 10 + 1] = this.py;
        xyrwh[i * 10 + 2] = this.dir + Math.PI / 2;
        xyrwh[i * 10 + 3] = ss.w / 2;
        xyrwh[i * 10 + 4] = ss.h / 2;
        sprite = ss.sprite;
        xyrwh[i * 10 + 5] = sprite.tx / sprite.sprite.w;
        xyrwh[i * 10 + 6] = sprite.ty / sprite.sprite.h;
        xyrwh[i * 10 + 7] = sprite.tw / sprite.sprite.w;
        xyrwh[i * 10 + 8] = sprite.th / sprite.sprite.h;
        xyrwh[i * 10 + 9] = 1;


        i++;

        ss = this.shaped_sprite.end;
        xyrwh[i * 10 + 0] = this.px + this.len * Math.cos(this.dir);
        xyrwh[i * 10 + 1] = this.py + this.len * Math.sin(this.dir);
        xyrwh[i * 10 + 2] = this.dir + Math.PI / 2;
        xyrwh[i * 10 + 3] = ss.w / 2;
        xyrwh[i * 10 + 4] = ss.h / 2;
        sprite = ss.sprite;
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
    public time: number = 0;

    constructor(shaped_shape: SSRay, cf: RayLaserConfig, m: RayLaserMotion) {
        super(shaped_shape);
        this.config = cf;
        this.motion = m;
    }

    public init(px: number, py: number, dir: number, len: number) {
        this.len = len;
        this.dir = dir;
        this.px = px;
        this.py = py;
        return this;
    }

    public update(_: RayLaser) {
        if (this.state == State.PRE_ENTRY) {
            this.state = State.LEAVING;
            this.config.listener?.onInit?.forEach(e => e(this));
        }
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        const tw = this.config.warning_time;
        const to = this.config.open_time + tw;
        const ta = this.config.alive_time + to;
        const tc = this.config.close_time + ta;
        if (this.rstate == RayLaserState.WARNING && this.time >= tw) {
            this.rstate = RayLaserState.OPENING;
            this.config.listener?.onStateChange?.forEach(e => e(this));
        }
        if (this.rstate == RayLaserState.OPENING) {
            this.w = Math.min(1, (this.time - tw) / (to - tw))
            if (this.time >= to) {
                this.rstate = RayLaserState.OPENED;
                this.state = State.ALIVE;
                this.w = 1;
                this.config.listener?.onStateChange?.forEach(e => e(this));
            }
        }
        if (this.rstate == RayLaserState.OPENED && this.time >= ta) {
            this.rstate = RayLaserState.CLOSING;
            this.state = State.LEAVING;
            this.config.listener?.onStateChange?.forEach(e => e(this));
        }
        if (this.rstate == RayLaserState.CLOSING) {
            this.w = Math.max(0, 1 - (this.time - ta) / (tc - ta))
            if (this.time >= tc) {
                this.state = State.DEAD;
                this.config.listener?.onDestroy?.forEach(e => e(this));
            }
        }
        this.config.listener?.onUpdate?.forEach(e => e(this, rate));
        this.motion(this, rate);
        this.config.listener?.onPostMotion?.forEach(e => e(this, rate));
    }

    public postUpdate(_: RayLaser) {
        this.config.listener?.onPostUpdate?.forEach(e => e(this));
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