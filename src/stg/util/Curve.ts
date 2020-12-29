import { State } from "../entity/Entity";
import { Shape, ShapedInstance, ShapedSprite } from "./Shape";
import { RENDER_TYPE, STRIP } from "./SpriteManager";

export abstract class ShapeCurve<S extends ShapeCurve<S, N>, N extends CurveNode> extends Shape<SICurve<S, N>> {

    public distanceTo(curve: SICurve<S, N>, x: number, y: number): number {
        return curve.getStat().list.reduce((n, e) => Math.min(n, this._distanceTo(curve, e.start, e.len, x, y)), Infinity);
    }

    protected abstract _distanceTo(curve: SICurve<S, N>, start: number, len: number, x: number, y: number): number;

}

export class SSCurve<S extends ShapeCurve<S, CN>, CN extends CurveNode> extends ShapedSprite<SSCurve<S, CN>, RENDER_TYPE.STRIP, SICurve<S, CN>, S>{
    public sp_w: number;
    public w: number;
    public radius: (start: number, len: number, ind: number) => number;
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
        else if (this.exist) {
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

    public preRender() {
        const cf = this.getStat();
        return { curve: this, list: cf.list };
    }

    getSprite(): SSCurve<S, CN> {
        return this.shaped_sprite;
    }

}
