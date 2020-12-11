import { CG_BULLET, Config, Entity, RL_BULLET, State } from "./Entity";
import { EntityPool } from "../stage/EntityPool";
import { SCR_HALF_HEIGHT, SCR_HALF_WIDTH } from "../stage/Screen";
import { ShapedSprite } from "../sprite/sprites";

export type BulletConfig = Config & {
    kill_on_exit: boolean,
    auto_direction: boolean
}

export const template_config_bullet: BulletConfig = {
    render_layer: RL_BULLET,
    collide_group: CG_BULLET,
    collide_mask: CG_BULLET,
    kill_on_exit: true,
    auto_direction: true
}

export abstract class Bullet implements Entity {

    public state: State;
    public sprite: ShapedSprite;
    public config: BulletConfig;
    public px: number;
    public py: number;
    public dir: number;

    public vx: number;
    public vy: number;

    public update(_: Entity) {
        if (this.state = State.PRE_ENTRY)
            this.state = State.ALIVE;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        // Event: OnUpdate(time_rate);
        this.px += this.vx * rate;
        this.py += this.vy * rate;
        if (this.config.auto_direction)
            this.dir = Math.atan2(this.vy, this.vx);
    }

    public postUpdate(_: Entity) {
        if (this.sprite.shape.exitScreen(this.px, this.py, this.dir, SCR_HALF_WIDTH, SCR_HALF_HEIGHT)) {
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

    public attack(_: Entity, e: Entity) {
        // Event: OnAttack(e)
    }
}