import { ShapeRay, SSRay } from "../entity/RayLaser";
import { CurveNode, ShapeCurve, SSCurve } from "./Curve";
import { ShapeCircle, ShapeDualArc, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";
import { Sprite, get_small, S_Type, S_Color, Sprite_Mode, Category, get_middle, M_Type, M_Color } from "./sprites";

export const enum RayLaserType { Laser = S_Type.Laser, Scale = S_Type.Scale, Grain = S_Type.Grain }

const radius = [[Math.sqrt(27), 0], [2.4, 2.4, 4, 4, 2.4, 2.4, 2.4, 2.8, 2.4, 2.4, 4, 2.4, 2.4, 2.4, 2.4, 2.4], [6, 7, 8.5, 7, 6, 7, 0, 10], [14, 14]];
const mag = 0.75;

function radiusTransform(r: number) {
    return Math.sqrt(r ** 2 + 3 ** 2) - 3;
}

export function getSSCircle(sprite: Sprite, magn: number): SSPoint<ShapeCircle> {
    magn *= mag;
    return {
        sprite: sprite,
        shape: new ShapeCircle(radiusTransform(radius[sprite.category][sprite.type]) * magn),
        w: sprite.tw * magn,
        h: sprite.th * magn,
        renderType: RENDER_TYPE.RECT
    };
}

export function getLongBullet(color: S_Color, mode: Sprite_Mode, len: number): SSPoint<ShapeDualArc> {
    const sprite = get_small(S_Type.Grain, color, mode);
    return {
        sprite: sprite,
        shape: new ShapeDualArc(len, radiusTransform(radius[Category.Small][S_Type.Grain]) * mag),
        renderType: RENDER_TYPE.RECT,
        w: sprite.tw * mag,
        h: len * 1.25
    }
}

export function getRayLaser(type: RayLaserType, scolor: S_Color, mcolor: M_Color, mode: Sprite_Mode, head: number, end: number, magn: number): SSRay {
    const sprite = get_small(<number>type, scolor, mode);
    sprite.ty += type == RayLaserType.Laser ? 4 : type == RayLaserType.Grain ? 1 : type == RayLaserType.Scale ? 1 : NaN;
    sprite.th -= type == RayLaserType.Laser ? 8 : type == RayLaserType.Grain ? 2 : type == RayLaserType.Scale ? 1 : NaN;
    return {
        sprite: sprite,
        shape: new ShapeRay(
            type == RayLaserType.Laser ? ShapeRay.line_circle :
                type == RayLaserType.Scale ? ShapeRay.half_arc :
                    type == RayLaserType.Grain ? ShapeRay.double_arc :
                        null),
        renderType: RENDER_TYPE.RECT,
        sprite_width: sprite.tw * mag / 2 * magn,
        hitbox_width: radiusTransform(2.4) * mag * magn,
        l_ratio: type == RayLaserType.Laser ? 1 : end > 0 ? 1 : type == RayLaserType.Grain ? 1.15 : type == RayLaserType.Scale ? 1.2 : NaN,
        base: getSSCircle(get_middle(M_Type.Light, mcolor, mode), head * magn),
        end: getSSCircle(get_middle(M_Type.Light, mcolor, mode), end * magn)
    }
}

export function getCurveLaser<S extends ShapeCurve<S, CN>, CN extends CurveNode>(color: S_Color, mode: Sprite_Mode, shape: S): SSCurve<S, CN> {
    const sprite = get_small(S_Type.Curve, color, mode);
    const w = radiusTransform(radius[Category.Small][S_Type.Curve]);
    return {
        sprite: sprite,
        shape: shape,
        renderType: RENDER_TYPE.STRIP,
        w: w,
        radius: (start, len, i) => {
            const a = w * 16;
            if (i / len * 16 < 0.5 || i / len * 16 > 15.5)
                return -Infinity;
            const x = (i + 0.5) / len * w * 16;
            const o = 255 * w / 2;
            const y = Math.sqrt((o + w) ** 2 - x ** 2) - o;
            return y * mag;
        }
    };
}