export const enum Sprite_Mode { Overlay, AddBlend }
export const enum Category { Special, Small, Medium, Large }

export type SpriteSource = {
    path: string,
    w: number,
    h: number
}

export type Sprite = {
    sprite: SpriteSource,
    tx: number,
    ty: number,
    tw: number,
    th: number,
    mode: Sprite_Mode,
    category: Category,
    type: number,
    color: number,
    omega: number
};

export const enum S_Color { Grey, RedX, Red, PinkX, Pink, BlueX, Blue, CyanX, Cyan, GreenX, Green, Lemon, YellowX, Yellow, Orange, White }
export const enum S_Type { Laser, Scale, Ring, Ball, Grain, Niddle, Knife, Spell, Bullet, Germ, Star, Planet, S_Cross, S_Ball, Curve, Drop }
export const enum M_Color { Grey, Red, Pink, Blue, Cyan, Green, Yellow, White }
export const enum M_Type { Light, Star, Ball, Butterfly, Knife, Oval, LightX, Heart }
export const enum L_Color { Red, Blue, Green, Yellow }
export const enum L_Type { Ball, Rose }

const s_rot = [0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0];
const m_rot = [1, 1, 1, 0, 0, 0, 1, 0];
const rot = Math.PI * 2 / 600;

export const res_000: SpriteSource = { path: "assets/bullet_000.png", w: 516, h: 772 };

function texTransform(s: Sprite) {
    s.tx += 0.5;
    s.ty += 0.5;
    s.tw -= 1;
    s.th -= 1;
    return s;
}

export function get_small(type: S_Type, color: S_Color, mode: Sprite_Mode): Sprite {
    const tx =
        type < 12 ? 1 + color * 16 :
            type < 14 ? 1 + color % 8 * 8 :
                type < 15 ? 1 : 258 + color * 16;
    const ty = type < 12 ? 1 + type * 16 :
        type < 14 ? (type < 13 ? 193 : 241) + (color >> 3) * 8 :
            color < 15 ? 515 + color * 16 : 449;
    const tw = type < 12 ? 16 : type < 14 ? 8 : type < 15 ? 256 : 16;
    const th = type < 12 ? 16 : type < 14 ? 8 : 16;
    return texTransform({
        sprite: res_000,
        tx: tx,
        ty: ty,
        tw: tw,
        th: th,
        mode: mode,
        category: Category.Small,
        type: type,
        color: color,
        omega: s_rot[type] * rot
    });
}

export function get_middle(type: M_Type, color: M_Color, mode: Sprite_Mode): Sprite {
    const tx = (type < 7 ? 1 : 258) + color * 32;
    const ty = type == 0 ? 209 : type < 7 ? 226 + type * 32 : 257;
    return texTransform({
        sprite: res_000,
        tx: tx,
        ty: ty,
        tw: 32,
        th: 32,
        mode: mode,
        category: Category.Medium,
        type: type,
        color: color,
        omega: m_rot[type] * rot
    });
}

export function get_large(type: L_Type, color: L_Color, mode: Sprite_Mode): Sprite {
    return texTransform({
        sprite: res_000,
        tx: (type == 0 ? 1 : 258) + color * 64,
        ty: type == 0 ? 449 : 290,
        tw: 64,
        th: 64,
        mode: mode,
        category: Category.Large,
        type: type,
        color: color,
        omega: rot
    });
}

export const self_machine_foreground: Sprite = texTransform({
    sprite: res_000,
    tx: 258, ty: 17, tw: 64, th: 64,
    mode: Sprite_Mode.Overlay,
    category: Category.Special,
    type: 0, color: 0, omega: rot
});

export const self_machine_background: Sprite = texTransform({
    sprite: res_000,
    tx: 322, ty: 17, tw: 64, th: 64,
    mode: Sprite_Mode.Overlay,
    category: Category.Special,
    type: 1, color: 0, omega: rot
});

export const boss_background: Sprite = texTransform({
    sprite: res_000,
    tx: 386, ty: 81, tw: 128, th: 128,
    mode: Sprite_Mode.Overlay,
    category: Category.Special,
    type: 2, color: 0, omega: rot
});