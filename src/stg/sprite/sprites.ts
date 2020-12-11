import { Shape, ShapeCircle } from "./Shape";

export type Sprite = {
    sprite: string,
    tx: number,
    ty: number,
    tw: number,
    th: number
};

export type ShapedSprite = {
    sprite: string,
    shape : Shape,
    w: number,
    h: number
}

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

export const SHAPES: { [key: string]: ShapedSprite } = {
    "small_round_red": {
        "sprite": "round_red",
        "shape" : new ShapeCircle(1),
        "w": 1,
        "h": 1
    }
}