import { GLTEXTURE, loadTexture, loadImage, drawRects, drawSnake } from "./gl";
import { EntityAny } from "../entity/Entity";
import { SSCurve } from "./Curve";

export enum RENDER_TYPE {
    RECT,
    STRIP
}

export interface RenderType<T extends RenderType<T, R>, R extends RENDER_TYPE> {
    renderType: R;
};

export interface RECT extends RenderType<RECT, RENDER_TYPE.RECT> {
    rectCount(): number;
    render(arr: Float32Array, ind: number): void;
}

export interface STRIP extends RenderType<STRIP, RENDER_TYPE.STRIP> {
    render(): Array<Float32Array>;
    getSprite(): SSCurve<any, any>;
}

export class SpriteManager {

    private static INS: { [key: string]: SpriteManager } = {};
    private path: string;

    private img: GLTEXTURE = null;

    constructor(url: string) {
        this.path = url;
    }

    public loaded(): boolean {
        return this.img;
    }

    public async load(): Promise<void> {
        const img = await loadImage(this.path);
        this.img = loadTexture(img);
    }

    public static get(url: string): SpriteManager {
        if (SpriteManager.INS[url])
            return SpriteManager.INS[url];
        return (SpriteManager.INS[url] = new SpriteManager(url));
    }

    public draw(list: EntityAny[]) {
        const rectn = list.reduce((n, e) => e.renderType == RENDER_TYPE.RECT ? n + (<RECT><RenderType<RECT, RENDER_TYPE.RECT>>e).rectCount() : n, 0);
        const xyrwh = new Float32Array(rectn * 9);
        var i = 0;
        for (var e of list)
            if (e.renderType == RENDER_TYPE.RECT) {
                const r = <RECT><RenderType<RECT, RENDER_TYPE.RECT>>e;
                r.render(xyrwh, i);
                i += r.rectCount();
            }
        drawRects(xyrwh, list.length, this.img);
        for (var e of list)
            if (e.renderType == RENDER_TYPE.STRIP) {
                const s = <STRIP><RenderType<STRIP, RENDER_TYPE.STRIP>>e;
                const ss = s.getSprite();
                const sp = ss.sprite;
                for (var a of s.render())
                    drawSnake(a, ss.w, a.length / 2, sp.tx, sp.ty, sp.tw, sp.th, this.img);
            }
    }

}