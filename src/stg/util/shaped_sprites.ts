import { ShapeRay, SSRay } from "../entity/RayLaser";
import { ShapeCircle, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";
import { Sprite, get_small, S_Type, S_Color, Sprite_Mode } from "./sprites";

export enum RayLaserType { Laser = S_Type.Laser, Scale = S_Type.Scale, Grain = S_Type.Grain }

const radius = [[1.4, 0], [2.4, 2.4, 4, 4, 2.4, 2.4, 2.4, 2.8, 2.4, 2.4, 4, 2.4, 2.4, 2.4, 2.4, 2.4], [6, 7, 8.5, 7, 6, 7, 0, 10], [14, 14]];

const mag = 0.75;

export function getSSCircle(sprite: Sprite, magn: number): SSPoint<ShapeCircle> {
    magn *= mag;
    return {
        sprite: sprite,
        shape: new ShapeCircle(radius[sprite.category][sprite.type] * magn),
        w: sprite.tw * magn,
        h: sprite.th * magn,
        renderType: RENDER_TYPE.RECT
    };
}

export function getRayLaser(type: RayLaserType, color: S_Color, mode: Sprite_Mode): SSRay {
    const sprite = get_small(<number>type, color, mode);
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
        sprite_width: sprite.tw * mag / 2,
        hitbox_width: radius[sprite.category][sprite.type] * mag,
        l_ratio: type == RayLaserType.Laser ? 1 : type == RayLaserType.Grain ? 1 : type == RayLaserType.Scale ? 1 : NaN
    }
}