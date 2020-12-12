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