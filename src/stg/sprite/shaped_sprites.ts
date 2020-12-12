import { ShapeRay, SSRay } from "../entity/RayLaser";
import { SSCurve } from "./Curve";
import { ShapeCircle, SSPoint } from "./Shape";
import { RENDER_TYPE } from "./SpriteManager";

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