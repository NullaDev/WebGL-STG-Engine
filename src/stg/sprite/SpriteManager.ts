import { GLTEXTURE, loadTexture, loadImage, drawRects } from "../../main/gl";
import { Entity } from "../entity/Entity";
import { SPRITES } from "./sprites";

export class SpriteManager {

    private static INS: { [key: string]: SpriteManager } = {};
    private path: string;

    private img: GLTEXTURE = -1;

    constructor(url: string) {
        this.path = url;
    }

    public loaded(): boolean {
        return this.img >= 0;
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

    public drawRect(list: Entity[]) {
        const xyrwh = new Float32Array(list.length * 9);
        list.forEach((e, i) => {
            xyrwh[i * 5 + 0] = e.px;
            xyrwh[i * 5 + 1] = e.py;
            xyrwh[i * 5 + 2] = e.dir;
            xyrwh[i * 5 + 3] = e.sprite.w;
            xyrwh[i * 5 + 4] = e.sprite.h;
            const sprite = SPRITES[e.sprite.sprite];
            xyrwh[i * 5 + 5] = sprite.tx;
            xyrwh[i * 5 + 6] = sprite.ty;
            xyrwh[i * 5 + 7] = sprite.tw;
            xyrwh[i * 5 + 8] = sprite.th;

        });
        drawRects(xyrwh, list.length, this.img);
    }

}