import { State } from "../entity/Entity";
import { Shape, ShapedInstance, ShapedSprite } from "./Shape";
import { RENDER_TYPE, STRIP } from "./SpriteManager";


export abstract class ShapeCurve<S extends ShapeCurve<S, N>, N extends CurveNode> extends Shape<SICurve<S, N>> {

    public distanceTo(curve: SICurve<S, N>, x: number, y: number): number {
        return curve.getStat().list.reduce((n, e) => Math.min(n, this._distanceTo(curve.list, e.start, e.len, x, y)), Infinity);
    }

    protected abstract _distanceTo(curve: N[], start: number, len: number, x: number, y: number): number;

    public abstract radius(start: number, len: number, ind: number): number;

}

export abstract class PointCurve extends ShapeCurve<PointCurve, CurveNode> {

    protected _distanceTo(list: CurveNode[], start: number, len: number, x: number, y: number): number {
        var min = Infinity;
        for (var i = 0; i < len; i++) {
            var node = list[i + start];
            var dis = Math.sqrt((node.px - x) * (node.px - x) + (node.py - y) * (node.py - y));
            min = Math.min(min, dis - this.radius(start, len, i));
        }
        return min;
    }

}

export class ShapeLine extends Shape<DDLine> {

    public static INS: ShapeLine = new ShapeLine();

    public distanceTo(line: DDLine, x: number, y: number) {
        const rl = Math.sqrt((line.x0 - line.x1) * (line.x0 - line.x1) + (line.y0 - line.y1) * (line.y0 - line.y1));
        const dis = Math.abs((line.x1 - line.x0) * (line.y0 - y) - (line.x0 - x) * (line.y1 - line.y0));
        const d0 = Math.sqrt((line.x0 - x) * (line.x0 - x) + (line.y0 - y) * (line.y0 - y));
        const d1 = Math.sqrt((line.x1 - x) * (line.x1 - x) + (line.y1 - y) * (line.y1 - y));
        return Math.min(dis / rl, d0, d1) - line.r;
    }

}

export abstract class LineCurve extends ShapeCurve<LineCurve, CurveNode> {

    protected _distanceTo(list: CurveNode[], start: number, len: number, x: number, y: number): number {
        var min = Infinity;
        const ddl = { x0: 0, x1: 0, y0: 0, y1: 0, r: 0 };
        for (var i = 0; i < len - 1; i++) {
            ddl.x0 = list[start + i].px;
            ddl.y0 = list[start + i].py;
            ddl.x1 = list[start + i + 1].px;
            ddl.y1 = list[start + i + 1].py;
            ddl.r = (this.radius(start, len, i) + this.radius(start, len, i + 1)) / 2;
            min = Math.min(min, ShapeLine.INS.distanceTo(ddl, x, y));
        }
        return min;
    }

}

export class SSCurve<S extends ShapeCurve<S, CN>, CN extends CurveNode> extends ShapedSprite<SSCurve<S, CN>, RENDER_TYPE.STRIP, SICurve<S, CN>, S>{
    public w: number;
}

export type CurveNode = {
    px: number,
    py: number,
    state: State
}

export type DDLine = {
    x0: number,
    x1: number,
    y0: number,
    y1: number,
    r: number
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

export class SICurve<S extends ShapeCurve<S, CN>, CN extends CurveNode> extends ShapedInstance<SICurve<S, CN>, RENDER_TYPE.STRIP, S, SSCurve<S, CN>> implements STRIP {

    public list: CN[] = [];

    constructor(ss: SSCurve<S, CN>) {
        super(RENDER_TYPE.STRIP, ss);
    }

    public getStat(): CurveFilter {
        return this.list.reduce((n, e, i) => n.reduce(e, i), new CurveFilter()).reduce(null, 0);
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

    getSprite(): SSCurve<S, CN> {
        return this.shaped_sprite;
    }

}
