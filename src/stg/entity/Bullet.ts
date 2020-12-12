import { CG_BULLET, Config, Entity, EntityAny, RL_BULLET, State } from "./Entity";
import { EntityPool } from "../stage/EntityPool";
import { SCR_HALF_HEIGHT, SCR_HALF_WIDTH } from "../stage/Screen";
import { ShapePoint, SIPoint, SSPoint } from "../sprite/Shape";
import { RENDER_TYPE } from "../sprite/SpriteManager";

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

export class Bullet<S extends ShapePoint>
    extends SIPoint<S>
    implements Entity<Bullet<S>, RENDER_TYPE.RECT, S, SSPoint<S>> {

    public state: State = State.PRE_ENTRY;
    public config: BulletConfig;

    public vx: number;
    public vy: number;

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
        if (this.state = State.PRE_ENTRY)
            this.state = State.ALIVE;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        // Event: OnUpdate(time_rate);
        this.px += this.vx * rate;
        this.py += this.vy * rate;
        if (this.config.auto_direction)
            this.dir = Math.atan2(this.vy, this.vx);
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
    }
}