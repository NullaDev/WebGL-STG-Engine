import { ShapeRay, SSRay } from "../entity/RayLaser";
import { CurveNode, ShapeCurve, SSCurve } from "./Curve";
import { ShapeCircle, ShapeDualArc, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";
import { Category, get_middle, get_small, M_Color, M_Type, SpriteRenderer, Sprite_Mode, S_Color, S_Type } from "./sprites";

export const enum RayLaserType { Laser = S_Type.Laser, Scale = S_Type.Scale, Grain = S_Type.Grain }

const radius = [[Math.sqrt(27), 0], [2.4, 2.4, 4, 4, 2.4, 2.4, 2.4, 2.8, 2.4, 2.4, 4, 2.4, 2.4, 2.4, 2.4, 2.4], [6, 7, 8.5, 7, 6, 7, 0, 10], [14, 14]];
const mag = 0.75;

function radiusTransform(r: number) {
    return Math.sqrt(r ** 2 + 3 ** 2) - 3;
}

export function getSSCircle(sprite: SpriteRenderer, magn: number, shape_mag = 1): SSPoint<ShapeCircle> {
    magn *= mag;
    const iden = sprite.sprite;
    return {
        sprite: sprite,
        shape: new ShapeCircle(radiusTransform(radius[iden.category][iden.type]) * magn * shape_mag),
        w: iden.tw * magn,
        h: iden.th * magn,
        renderType: RENDER_TYPE.RECT
    };
}

export function getLongBullet(color: S_Color, mode: Sprite_Mode, len: number, shape_mag = 1): SSPoint<ShapeDualArc> {
    const sprite = get_small(S_Type.Grain, color, mode);
    return {
        sprite: sprite,
        shape: new ShapeDualArc(len, radiusTransform(radius[Category.Small][S_Type.Grain]) * mag * shape_mag),
        renderType: RENDER_TYPE.RECT,
        w: sprite.sprite.tw * mag,
        h: len * 1.25
    }
}

export function getRayLaser(type: RayLaserType, scolor: S_Color, mcolor: M_Color, mode: Sprite_Mode, head: number, end: number, magn: number, shape_mag = 1): SSRay {
    const sprite = get_small(<number>type, scolor, mode);
    const iden = sprite.sprite;
    iden.ty += type == RayLaserType.Laser ? 4 : type == RayLaserType.Grain ? 1 : type == RayLaserType.Scale ? 1 : NaN;
    iden.th -= type == RayLaserType.Laser ? 8 : type == RayLaserType.Grain ? 2 : type == RayLaserType.Scale ? 1 : NaN;
    return {
        sprite: sprite,
        shape: new ShapeRay(
            type == RayLaserType.Laser ? ShapeRay.line_circle :
                type == RayLaserType.Scale ? ShapeRay.half_arc :
                    type == RayLaserType.Grain ? ShapeRay.double_arc :
                        null),
        renderType: RENDER_TYPE.RECT,
        sprite_width: iden.tw * mag / 2 * magn,
        hitbox_width: radiusTransform(2.4) * mag * magn * shape_mag,
        l_ratio: type == RayLaserType.Laser ? 1 : end > 0 ? 1 : type == RayLaserType.Grain ? 1.15 : type == RayLaserType.Scale ? 1.2 : NaN,
        base: getSSCircle(get_middle(M_Type.Light, mcolor, mode), head * magn, shape_mag),
        end: getSSCircle(get_middle(M_Type.Light, mcolor, mode), end * magn, shape_mag)
    }
}

export function getCurveLaser<S extends ShapeCurve<S, CN>, CN extends CurveNode>(color: S_Color, mode: Sprite_Mode, shape: S): SSCurve<S, CN> {
    const sprite = get_small(S_Type.Curve, color, mode);
    const w = radiusTransform(radius[Category.Small][S_Type.Curve]) * mag;
    return {
        sprite: sprite,
        shape: shape,
        renderType: RENDER_TYPE.STRIP,
        w: w,
        sp_w: sprite.sprite.th * mag,
        radius: (start, len, i) => {
            const a = w * 16;
            if (len <= 2 || i / (len - 1) * 16 < 0.5 || i / (len - 1) * 16 > 15.5)
                return -Infinity;
            const x = ((i + 0.5) / len - 0.5) * w * 16;
            const o = 255 * w / 2;
            const y = Math.sqrt((o + w) ** 2 - x ** 2) - o;
            return y / w;
        }
    };
}