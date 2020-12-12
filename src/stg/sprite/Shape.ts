import { Entity, EntityAny, State } from "../entity/Entity";
import { RECT, RenderType, RENDER_TYPE, SpriteManager, STRIP } from "./SpriteManager";
import { SPRITES } from "./sprites";

export abstract class Shape {

}

export abstract class ShapePoint extends Shape {

    protected abstract _distanceTo(x: number, y: number): number;

    public abstract exitScreen(sx: number, sy: number, sd: number, rw: number, rh: number): boolean;

    public distanceTo(sx: number, sy: number, sd: number, px: number, py: number): number {
        px = px - sx;
        py = py - sy;
        sx = px * Math.cos(-sd) - py * Math.sin(-sd);
        sy = py * Math.cos(-sd) + px * Math.sin(-sd);
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

export class SPLine extends ShapePoint {

    public rw: number;
    public rl: number;

    constructor(w: number, l: number) {
        super();
        this.rw = w / 2;
        this.rl = l / 2;
    }

    protected _distanceTo(x: number, y: number): number {
        x = Math.abs(x);
        if (x > this.rl)
            return Math.sqrt(y * y + (x - this.rl) * (x - this.rl)) - this.rw;
        return Math.abs(y) - this.rw;
    }

    public exitScreen(sx: number, sy: number, sd: number, rw: number, rh: number): boolean {
        const x0 = Math.abs(sx) - this.rl * Math.cos(sd) - this.rw;
        const y0 = Math.abs(sy) - this.rl * Math.sin(sd) - this.rw;
        return x0 > rw || y0 > rh;
    }

}

export abstract class ShapeCurve<S extends ShapeCurve<S>> extends Shape {

    public abstract distanceTo(curve: SICurve<S, any>, start: number, len: number, x: number, y: number): number;

}

export class PointCurve extends ShapeCurve<PointCurve> {

    public distanceTo(curve: SICurve<PointCurve, CurveNode>, start: number, len: number, x: number, y: number): number {
        var min = Infinity;
        for (var i = 0; i < len; i++) {
            var node = curve.list[i + start];
            var dis = Math.sqrt((node.px - x) * (node.px - x) + (node.py - y) * (node.py - y));
            min = Math.min(min, dis);
        }
        return min;
    }

}

export class ShapedSprite<RT extends RENDER_TYPE, S extends Shape> {
    public sprite: string;
    public shape: S;
    public renderType: RT;
}

export class SSPoint<S extends ShapePoint> extends ShapedSprite<RENDER_TYPE.RECT, S> {
    public w: number;
    public h: number;
}

export class SSCurve<S extends ShapeCurve<S>> extends ShapedSprite<RENDER_TYPE.STRIP, S>{
    public w: number;
}

export abstract class ShapedInstance<
    SI extends ShapedInstance<SI, RT, S, T> & RenderType<SI, RT>,
    RT extends RENDER_TYPE,
    S extends Shape,
    T extends ShapedSprite<RT, S>> implements RenderType<SI, RT> {

    renderType: RT;

    public shaped_sprite: T;

    constructor(rt: RT, ss: T) {
        this.renderType = rt;
        this.shaped_sprite = ss;
    }

    public abstract distanceTo(x: number, y: number): number;

}

export class SIPoint<S extends ShapePoint>
    extends ShapedInstance<SIPoint<S>, RENDER_TYPE.RECT, S, SSPoint<S>>
    implements RECT {

    public px: number;
    public py: number;
    public dir: number;

    constructor(ss: SSPoint<S>) {
        super(RENDER_TYPE.RECT, ss);
    }

    public distanceTo(x: number, y: number): number {
        return this.shaped_sprite.shape.distanceTo(this.px, this.py, this.dir, x, y);
    }

    rectCount(): number {
        return 1;
    }

    render(xyrwh: Float32Array, i: number): void {
        xyrwh[i * 5 + 0] = this.px;
        xyrwh[i * 5 + 1] = this.py;
        xyrwh[i * 5 + 2] = this.dir;
        xyrwh[i * 5 + 3] = this.shaped_sprite.w;
        xyrwh[i * 5 + 4] = this.shaped_sprite.h;
        const sprite = SPRITES[this.shaped_sprite.sprite];
        xyrwh[i * 5 + 5] = sprite.tx;
        xyrwh[i * 5 + 6] = sprite.ty;
        xyrwh[i * 5 + 7] = sprite.tw;
        xyrwh[i * 5 + 8] = sprite.th;
    }

}

export type CurveNode = {
    px: number,
    py: number,
    state: State
}

export class CurveFilter {
    public exist: boolean = false;
    public list: { start: number, len: number }[] = [];
    public start: number = -1;
    public count: number = 0;

    reduce(n: CurveNode, i: number): CurveFilter {
        if (n && n.state == State.ALIVE) {
            if (!this.exist)
                this.start = i;
            this.exist = true;
            this.count++;
        }
        else {
            this.exist = false;
            this.list.push({ start: this.start, len: this.count });
            this.count = 0;
        }
        return this;
    }
}

export abstract class SICurve<S extends ShapeCurve<S>, N extends CurveNode>
    extends ShapedInstance<SICurve<S, N>, RENDER_TYPE.STRIP, S, SSCurve<S>>
    implements STRIP {

    public list: N[] = [];

    constructor(ss: SSCurve<S>) {
        super(RENDER_TYPE.STRIP, ss);
    }

    public getStat(): CurveFilter {
        return this.list.reduce((n, e, i) => n.reduce(e, i), new CurveFilter()).reduce(null, 0);
    }

    public distanceTo(x: number, y: number): number {
        return this.getStat().list
            .reduce((n, e) => Math.min(n, this.shaped_sprite.shape
                .distanceTo(this, e.start, e.len, x, y)), Infinity);
    }

    public render(): Array<Float32Array> {
        const cf = this.getStat();
        const ans = new Array<Float32Array>(cf.list.length);
        for (var i = 0; i < ans.length; i++) {
            ans[i] = new Float32Array(cf.list[i].len * 2);
            for (var j = 0; j < cf.list[i].len; j++) {
                ans[i][j * 2 + 0] = this.list[cf.list[i].start + j].px;
                ans[i][j * 2 + 1] = this.list[cf.list[i].start + j].py;
            }
        }
        return ans;
    }

    public abstract radius(start: number, len: number, ind: number): number;

    getSprite(): SSCurve<S> {
        return this.shaped_sprite;
    }

}

export function collide(e0: EntityAny, e1: EntityAny): boolean {
    if (e0 instanceof SIPoint && e0.shaped_sprite.shape instanceof ShapeCircle)
        return e1.distanceTo(e0.px, e0.py) < e0.shaped_sprite.shape.radius;
    if (e1 instanceof SIPoint && e1.shaped_sprite.shape instanceof ShapeCircle)
        return collide(e1, e0);
    throw new Error("non-circle non-circle collision not found");
}