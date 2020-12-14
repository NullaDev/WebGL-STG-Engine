import { EntityAny } from "../entity/Entity";
import { RECT, RenderType, RENDER_TYPE } from "./SpriteManager";
import { SPRITES } from "./sprites";

export abstract class Shape<SI> {

    public abstract distanceTo(self: SI, x: number, y: number): number;

}

export abstract class ShapePoint extends Shape<SIPoint<any>> {

    protected abstract _distanceTo(x: number, y: number): number;

    public abstract exitScreen(sx: number, sy: number, sd: number, rw: number, rh: number): boolean;

    public distanceTo(self: SIPoint<any>, px: number, py: number): number {
        px = px - self.px;
        py = py - self.py;
        const sd = self.dir;
        const sx = px * Math.cos(-sd) - py * Math.sin(-sd);
        const sy = py * Math.cos(-sd) + px * Math.sin(-sd);
        return this._distanceTo(sx, sy);
    }

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

    protected _distanceTo(x: number, y: number): number {
        return Math.sqrt(x * x + y * y) - this.radius;
    }

}

export class ShapedSprite<T extends ShapedSprite<T, RT, SI, S>, RT extends RENDER_TYPE, SI, S extends Shape<SI>> {
    public sprite: string;
    public shape: S;
    public renderType: RT;
}

export class SSPoint<S extends ShapePoint> extends ShapedSprite<SSPoint<S>, RENDER_TYPE.RECT, SIPoint<S>, S> {
    public w: number;
    public h: number;
}

export abstract class ShapedInstance<SI extends ShapedInstance<SI, RT, S, T> & RenderType<SI, RT>, RT extends RENDER_TYPE, S extends Shape<SI>, T extends ShapedSprite<T, RT, SI, S>> implements RenderType<SI, RT> {

    renderType: RT;

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

    constructor(ss: SSPoint<S>) {
        super(RENDER_TYPE.RECT, ss);
    }

    rectCount(): number {
        return 1;
    }

    render(xyrwh: Float32Array, i: number): void {
        xyrwh[i * 9 + 0] = this.px;
        xyrwh[i * 9 + 1] = this.py;
        xyrwh[i * 9 + 2] = this.dir;
        xyrwh[i * 9 + 3] = this.shaped_sprite.w;
        xyrwh[i * 9 + 4] = this.shaped_sprite.h;
        const sprite = SPRITES[this.shaped_sprite.sprite];
        xyrwh[i * 9 + 5] = sprite.tx;
        xyrwh[i * 9 + 6] = sprite.ty;
        xyrwh[i * 9 + 7] = sprite.tw;
        xyrwh[i * 9 + 8] = sprite.th;
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