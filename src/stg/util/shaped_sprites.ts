import { ShapeRay, SSRay } from "../entity/RayLaser";
import { ShapeCircle, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";
import { Sprite } from "./sprites";

const radius = [[1.4, 0], [2.4, 2.4, 4, 4, 2.4, 2.4, 2.4, 2.8, 2.4, 2.4, 4, 2.4, 2.4, 2.4, 2.4, 2.4], [6, 7, 8.5, 7, 6, 7, 0, 10], [14, 14]];

const mag = 0.75;

export function getSSCircle(sprite: Sprite, magn: number): SSPoint<ShapeCircle> {
    magn *= mag;
    return {
        sprite: sprite,
        shape: new ShapeCircle(radius[sprite.category][sprite.type] * magn),
        w: sprite.tw *magn,
        h: sprite.th *magn,
        renderType: RENDER_TYPE.RECT
    };
}

export function getRayLaser(sprite: Sprite): SSRay {
    return {
        sprite: sprite,
        shape: new ShapeRay(ShapeRay.line_circle),
        renderType: RENDER_TYPE.RECT,
        w_ratio: radius[sprite.category][sprite.type] / 2,
        l_ratio: 1
    }
}