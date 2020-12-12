import { Shape, ShapedInstance, ShapedSprite} from "../sprite/Shape";
import { RECT, RENDER_TYPE } from "../sprite/SpriteManager";
import { SPRITES } from "../sprite/sprites";
import { EntityPool } from "../stage/EntityPool";
import { Config, Entity, EntityAny, State } from "./Entity";

export class ShapeRay extends Shape<SIRay> {

    public static INS : ShapeRay = new ShapeRay();

    public distanceTo(self: SIRay, x: number, y: number): number {
        const x0 = self.px;
        const y0 = self.py;
        const x1 = self.px + self.len * Math.cos(self.dir);
        const y1 = self.py + self.len * Math.sin(self.dir);
        const rl = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        const dis = Math.abs((x1 - x0) * (y0 - y) - (x0 - x) * (y1 - y0));
        const d0 = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));
        const d1 = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        return Math.min(dis / rl, d0, d1) - self.shaped_sprite.w;
    }

}

export enum RayLaserState {
    WARNING,
    OPENING,
    OPENED,
    CLOSING
}

export type RayLaserConfig = Config & {
    warning_time: number,
    open_time: number,
    alive_time: number,
    close_time: number
}

export class SSRay extends ShapedSprite<SSRay, RENDER_TYPE.RECT, SIRay, ShapeRay> {
    public w: number;
    public l: number;
}

export class SIRay extends ShapedInstance<SIRay, RENDER_TYPE.RECT, ShapeRay, SSRay>
    implements RECT {

    public px: number;
    public py: number;
    public dir: number;
    public len: number;

    constructor(ss: SSRay) {
        super(RENDER_TYPE.RECT, ss);
    }

    rectCount(): number {
        return 1;
    }

    render(xyrwh: Float32Array, i: number): void {
        const w = this.shaped_sprite.w;
        const l = this.shaped_sprite.l;
        xyrwh[i * 5 + 0] = this.px + l / 2 * Math.cos(this.dir);
        xyrwh[i * 5 + 1] = this.py + l / 2 * Math.sin(this.dir);;
        xyrwh[i * 5 + 2] = this.dir;
        xyrwh[i * 5 + 3] = w / 2;
        xyrwh[i * 5 + 4] = l / 2;
        const sprite = SPRITES[this.shaped_sprite.sprite];
        xyrwh[i * 5 + 5] = sprite.tx;
        xyrwh[i * 5 + 6] = sprite.ty;
        xyrwh[i * 5 + 7] = sprite.tw;
        xyrwh[i * 5 + 8] = sprite.th;
    }

}

export class RayLaser extends SIRay
    implements Entity<RayLaser, RENDER_TYPE.RECT, ShapeRay, SSRay> {

    public state: State = State.PRE_ENTRY;
    public rstate: RayLaserState = RayLaserState.WARNING;
    public config: RayLaserConfig;

    public time: number;

    constructor(shaped_shape: SSRay, cf: RayLaserConfig) {
        super(shaped_shape);
        this.config = cf;
    }

    public update(_: RayLaser) {
        if (this.state = State.PRE_ENTRY)
            this.state = State.ALIVE;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        if (this.rstate == RayLaserState.WARNING && this.time > this.config.warning_time) {
            this.rstate = RayLaserState.OPENING;
            this.time -= this.config.warning_time;
        }
        if (this.rstate == RayLaserState.OPENING) {

        }
        // Event: OnUpdate(time_rate);
    }

    public postUpdate(_: RayLaser) {

        // Event: OnPostUpdate
        if (this.state == State.LEAVING) {
            // Event: OnDestroy
            this.state = State.DEAD;
        }
    }

    public attack(_: RayLaser, e: EntityAny) {
        // Event: OnAttack(e)
    }
}