import { EntityAny } from "../entity/Entity";
import { RECT, RenderType, RENDER_TYPE } from "./SpriteManager";
import { Sprite } from "./sprites";

export abstract class Shape<SI> {

    public abstract distanceTo(self: SI, x: number, y: number): number;

}

export abstract class ShapePoint extends Shape<SIPoint<any>> {

    public abstract exitScreen(sx: number, sy: number, sd: number, rw: number, rh: number): boolean;

}

export class ShapeCircle extends ShapePoint {

    public radius: number;

    constructor(r: number) {
        super();
        this.radius = r;
    }

    public exitScreen(sx: number, sy: number, _: number, rw: number, rh: number): boolean {
        return Math.abs(sx) > rw + this.radius || Math.abs(sy) > rh + this.radius;
    }

    public distanceTo(self: SIPoint<any>, px: number, py: number): number {
        px -= self.px;
        py -= self.py;
        return Math.sqrt(px * px + py * py) - this.radius * self.magn;
    }

}

export class ShapedSprite<T extends ShapedSprite<T, RT, SI, S>, RT extends RENDER_TYPE, SI, S extends Shape<SI>> {
    public sprite: Sprite;
    public shape: S;
    public renderType: RT;
}

export class SSPoint<S extends ShapePoint> extends ShapedSprite<SSPoint<S>, RENDER_TYPE.RECT, SIPoint<S>, S> {
    public w: number;
    public h: number;
}

export abstract class ShapedInstance<SI extends ShapedInstance<SI, RT, S, T> & RenderType<SI, RT>, RT extends RENDER_TYPE, S extends Shape<SI>, T extends ShapedSprite<T, RT, SI, S>> implements RenderType<SI, RT> {

    public renderType: RT;
    public shaped_sprite: T;

    constructor(rt: RT, ss: T) {
        this.renderType = rt;
        this.shaped_sprite = ss;
    }

    public distanceTo(x: number, y: number): number {
        return this.shaped_sprite.shape.distanceTo(<SI><ShapedInstance<SI, RT, S, T>>this, x, y);
    }

}

export class SIPoint<S extends ShapePoint> extends ShapedInstance<SIPoint<S>, RENDER_TYPE.RECT, S, SSPoint<S>> implements RECT {

    public px: number;
    public py: number;
    public dir: number;
    public magn: number = 1;
    public alpha: number = 1;

    constructor(ss: SSPoint<S>) {
        super(RENDER_TYPE.RECT, ss);
    }

    rectCount(): number {
        return 1;
    }

    render(xyrwh: Float32Array, i: number): void {
        xyrwh[i * 10 + 0] = this.px;
        xyrwh[i * 10 + 1] = this.py;
        xyrwh[i * 10 + 2] = this.dir + Math.PI / 2;
        xyrwh[i * 10 + 3] = this.shaped_sprite.w / 2 * this.magn;
        xyrwh[i * 10 + 4] = this.shaped_sprite.h / 2 * this.magn;
        const sprite = this.shaped_sprite.sprite;
        xyrwh[i * 10 + 5] = sprite.tx / sprite.sprite.w;
        xyrwh[i * 10 + 6] = sprite.ty / sprite.sprite.h;
        xyrwh[i * 10 + 7] = sprite.tw / sprite.sprite.w;
        xyrwh[i * 10 + 8] = sprite.th / sprite.sprite.h;
        xyrwh[i * 10 + 9] = this.alpha;
    }

}

export class SINull extends ShapedInstance<SINull, null, null, null> {

    constructor() {
        super(null, null);
    }

}

export function collide(e0: EntityAny, e1: EntityAny): boolean {
    if (e0 instanceof SIPoint && e0.shaped_sprite.shape instanceof ShapeCircle)
        return e1.distanceTo(e0.px, e0.py) < e0.shaped_sprite.shape.radius;
    if (e1 instanceof SIPoint && e1.shaped_sprite.shape instanceof ShapeCircle)
        return collide(e1, e0);
    throw new Error("non-circle non-circle collision not found");
}