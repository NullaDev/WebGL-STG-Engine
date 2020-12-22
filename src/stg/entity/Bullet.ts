import { CG_BOMB, CG_BULLET, CG_PLAYER, Config, Entity, EntityAny, RL_BULLET, State } from "./Entity";
import { EntityPool } from "../stage/EntityPool";
import { SCR_HALF_HEIGHT, SCR_HALF_WIDTH } from "../../platform/Screen";
import { ShapePoint, SIPoint, SSPoint } from "../util/Shape";
import { RENDER_TYPE } from "../util/SpriteManager";

export type BulletConfig = Config & {
    kill_on_exit: boolean,
    kill_by_bomb: boolean,
    auto_direction: boolean
}

export const template_config_bullet: BulletConfig = {
    render_layer: RL_BULLET,
    collide_group: CG_BULLET,
    collide_mask: CG_BULLET,
    kill_on_exit: true,
    kill_by_bomb: true,
    auto_direction: true
}

// return true if velocity is enabled, return false to disable velocity
export type Motion = (self: Bullet<any>, time_rate: number) => boolean;

export const motion_default = (self: Bullet<any>, time_rate: number) => true;

export const motion_accelerate: (ax: number, ay: number) => Motion =
    (ax: number, ay: number) => ((self: Bullet<any>, time_rate: number) => {
        self.vx += ax * time_rate;
        self.vy += ay * time_rate;
        return true;
    });

export const motion_circle: (w: number) => Motion =
    (w: number) => ((self: Bullet<any>, time_rate: number) => {
        const a0 = Math.atan2(self.vy, self.vx);
        const v = Math.sqrt(self.vx * self.vx + self.vy * self.vy);
        const a1 = a0 + w * time_rate;
        self.vx = v * Math.cos(a1);
        self.vy = v * Math.sin(a1);
        self.dir = a1;
        return true;
    });

export const motion_orbit: (center: SIPoint<any>, a0: number, w: number, r: number, vr: number) => Motion =
    (center: SIPoint<any>, a0: number, w: number, r: number, vr: number) => ((self: Bullet<any>, time_rate: number) => {
        if (self.motion_stat == null)
            self.motion_stat = { a: a0, r: r };
        self.motion_stat.a += w * time_rate;
        self.motion_stat.r += vr * time_rate;
        self.px = center.px + self.motion_stat.r * Math.cos(self.motion_stat.a);
        self.py = center.py + self.motion_stat.r * Math.sin(self.motion_stat.a);
        self.dir = Math.atan2(self.motion_stat.r * w, vr) + self.motion_stat.a;
        return false;
    });

export class Bullet<S extends ShapePoint>
    extends SIPoint<S>
    implements Entity<Bullet<S>, RENDER_TYPE.RECT, S, SSPoint<S>> {

    public state: State = State.PRE_ENTRY;
    public config: BulletConfig;

    public vx: number;
    public vy: number;

    public motion: Motion = motion_default;
    public motion_stat: any = null;

    constructor(shaped_shape: SSPoint<S>, bc: BulletConfig) {
        super(shaped_shape);
        this.config = bc;
    }

    public simpleInit(x0: number, y0: number, v: number, a: number): Bullet<S> {
        this.px = x0;
        this.py = y0;
        this.vx = v * Math.cos(a);
        this.vy = v * Math.sin(a);
        this.dir = a;
        return this;
    }

    public update(_: Bullet<S>) {
        if (this.state == State.PRE_ENTRY)
            this.state = State.ALIVE;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        if (this.motion(this, rate)) {
            this.px += this.vx * rate;
            this.py += this.vy * rate;
            if (this.config.auto_direction)
                this.dir = Math.atan2(this.vy, this.vx);
        }
    }

    public postUpdate(_: Bullet<S>) {
        if (this.shaped_sprite.shape.exitScreen(this.px, this.py, this.dir, SCR_HALF_WIDTH, SCR_HALF_HEIGHT)) {
            if (this.config.kill_on_exit)
                this.state = State.LEAVING;
            // Event: OnExitScreen
        }
        // Event: OnPostUpdate
        if (this.state == State.LEAVING) {
            // Event: OnDestroy
            this.state = State.DEAD;
        }
    }

    public attack(_: Bullet<S>, e: EntityAny) {
        // Event: OnAttack(e)
        e.damaged(e, this);
    }

    public damaged(_: Bullet<S>, s: EntityAny) {
        if (this.config.kill_by_bomb && (s.config.collide_group == CG_BOMB || s.config.collide_group == CG_PLAYER)) {
            this.state = State.LEAVING;
            return true;
        }
        return false;
    }
}