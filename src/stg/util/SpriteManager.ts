import * as gl from "../../platform/gl";
import { EntityAny } from "../entity/Entity";
import { SSCurve } from "./Curve";
import { Sprite_Mode } from "./sprites";

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

    private img: gl.GLTEXTURE = null;

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
        for (var e of list)
            if (e.renderType == RENDER_TYPE.STRIP) {
                const s = <STRIP><RenderType<STRIP, RENDER_TYPE.STRIP>>e;
                const ss = s.getSprite();
                const sp = ss.sprite;
                for (var a of s.render())
                    gl.drawSnake(a, ss.w, a.length / 2, sp.tx, sp.ty, sp.tw, sp.th, this.img);
            }
    }

    private drawRect(list: EntityAny[], mode: Sprite_Mode) {
        var rectn = list.reduce((n, e) =>
            e.renderType == RENDER_TYPE.RECT && e.shaped_sprite.sprite.mode == mode ?
                n + (<RECT><RenderType<RECT, RENDER_TYPE.RECT>>e).rectCount() : n, 0);
        if (rectn)
            gl.setMode(mode);
        else return;
        var xyrwh = new Float32Array(rectn * 10);
        var i = 0;
        for (var e of list)
            if (e.renderType == RENDER_TYPE.RECT && e.shaped_sprite.sprite.mode == mode) {
                const r = <RECT><RenderType<RECT, RENDER_TYPE.RECT>>e;
                r.render(xyrwh, i);
                i += r.rectCount();
            }
        gl.drawRects(xyrwh, list.length, this.img);
    }

}