import { ShapeRay, SSRay } from "../entity/RayLaser";
import { SSCurve } from "./Curve";
import { ShapeCircle, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";
import { Sprite } from "./sprites";

const radius = [[1.4], [2.4, 2.4, 4, 4, 2.4, 2.4, 2.4, 2.8, 2.4, 2.4, 4, 2.4, 2.4, 2.4, 2.4, 2.4], [6, 7, 8.5, 7, 6, 7, 0, 10], [14, 14]];

export function getSSCircle(sprite: Sprite, magn: number, alpha: number): SSPoint<ShapeCircle> {
    return {
        sprite: sprite,
        shape: new ShapeCircle(radius[sprite.category][sprite.type] * magn),
        w: sprite.tw,
        h: sprite.th,
        renderType: RENDER_TYPE.RECT,
        alpha: alpha
    };
}