import * as gl from "../../platform/gl";
import { EntityAny } from "../entity/Entity";
import { CurveNode, SICurve, SSCurve } from "./Curve";
import { Sprite_Mode } from "./sprites";

export const enum RENDER_TYPE {
    RECT,
    STRIP,
    CUSTOM
}

export interface RenderType<T extends RenderType<T, R>, R extends RENDER_TYPE> {
    renderType: R;
};

export interface RECT extends RenderType<RECT, RENDER_TYPE.RECT> {
    rectCount(): number;
    render(arr: Float32Array, ind: number): void;
}

export interface STRIP extends RenderType<STRIP, RENDER_TYPE.STRIP> {
    preRender(): { curve: SICurve<any, CurveNode>, list: { start: number, len: number }[] };
    getSprite(): SSCurve<any, any>;
}

export interface CUSTOM extends RenderType<CUSTOM, RENDER_TYPE.CUSTOM> {
    render(layer: number): void;
    layers(): number[];
}

export class SpriteManager {

    private static INS: { [key: string]: SpriteManager } = {};
    private path: string;

    public img: any = null;

    constructor(url: string) {
        this.path = url;
    }

    public loaded(): boolean {
        return this.img;
    }

    public async load(): Promise<void> {
        const img = await gl.loadImage(this.path);
        this.img = gl.loadTexture(img);
    }

    public static get(url: string): SpriteManager {
        if (SpriteManager.INS[url])
            return SpriteManager.INS[url];
        return (SpriteManager.INS[url] = new SpriteManager(url));
    }

    public draw(list: EntityAny[]) {
        this.drawRect(list, Sprite_Mode.Overlay);
        this.drawRect(list, Sprite_Mode.AddBlend);
        this.drawCurve(list, Sprite_Mode.Overlay);
        this.drawCurve(list, Sprite_Mode.AddBlend);

    }

    private drawRect(list: EntityAny[], mode: Sprite_Mode) {
        var rectn = list.reduce((n, e) =>
            e.renderType == RENDER_TYPE.RECT && e.shaped_sprite.sprite.sprite.mode == mode ?
                n + (<RECT><RenderType<RECT, RENDER_TYPE.RECT>>e).rectCount() : n, 0);
        if (rectn)
            gl.setMode(mode);
        else return;
        var xyrwh = new Float32Array(rectn * 10);
        var i = 0;
        for (var e of list)
            if (e.renderType == RENDER_TYPE.RECT && e.shaped_sprite.sprite.sprite.mode == mode) {
                const r = <RECT><RenderType<RECT, RENDER_TYPE.RECT>>e;
                r.render(xyrwh, i);
                i += r.rectCount();
            }
        gl.drawRects(xyrwh, rectn, this.img);
    }

    private drawCurve(list: EntityAny[], mode: Sprite_Mode) {
        const l = list.filter(e => e.renderType == RENDER_TYPE.STRIP && e.shaped_sprite.sprite.sprite.mode == mode);
        const rs = (<STRIP[]><RenderType<STRIP, RENDER_TYPE.STRIP>[]>l).map((e: STRIP) => e.preRender());
        const stat = rs.reduce((n, e) => e.list.reduce((m, x) => x.len <= 1 ? m : m + x.len, n), 0);
        if (stat == 0)
            return;
        gl.setMode(mode);
        const xys = new Float32Array(stat * 2);
        var i = 0;
        for (var r of rs) {
            for (var s of r.list) {
                if (s.len <= 1)
                    continue;
                for (var j = 0; j < s.len; j++) {
                    xys[i++] = r.curve.list[j + s.start].px;
                    xys[i++] = r.curve.list[j + s.start].py;
                }
            }
        }
        
        const obj = rs.map(e => (e.curve.shaped_sprite.sprite.setXYWH({
            w: e.curve.shaped_sprite.sp_w,
            len: e.list.map(x => x.len).filter(a => a > 1),
            tx: 0,ty: 0,tw: 0,th: 0
        }, e.curve.time))).filter(e => e.len.length > 0);
        gl.drawSnake(xys, obj, this.img);

    }

}