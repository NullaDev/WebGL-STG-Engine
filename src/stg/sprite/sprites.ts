import { ShapeRay, SSRay } from "../entity/RayLaser";
import { SSCurve } from "./Curve";
import { ShapeCircle, ShapedSprite, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";

export type Sprite = {
    sprite: string,
    tx: number,
    ty: number,
    tw: number,
    th: number
};

export const SPRITES: { [key: string]: Sprite } = {
    "round_red":
    {
        "sprite": "assets/missile_red.png",
        "tx": 0,
        "ty": 0,
        "tw": 1,
        "th": 1
    }
}

export const small_round_red: SSPoint<ShapeCircle> = {
    renderType: RENDER_TYPE.RECT,
    sprite: "round_red",
    shape: new ShapeCircle(1),
    w: 1,
    h: 1
};

export const ray_laser_red: SSRay = {
    renderType: RENDER_TYPE.RECT,
    sprite: "",
    shape: ShapeRay.INS,
    w: 1,
    l: 1
};

//abstract
export const curve_laser_red: SSCurve<any, any> = {
    renderType: RENDER_TYPE.STRIP,
    sprite: "",
    shape: null,
    w: 1
};