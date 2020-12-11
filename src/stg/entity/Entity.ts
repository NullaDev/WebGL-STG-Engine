import { ShapedSprite } from "../sprite/sprites";

export type CollideGroup = number;
export type CollideMask = number;
export type RenderLayer = number;

export const CG_PLAYER: CollideGroup = 0;
export const CG_BOSS: CollideGroup = 1;
export const CG_ENEMY: CollideGroup = 2;
export const CG_BULLET: CollideGroup = 3;
export const CG_BOMB: CollideGroup = 4;
export const CG_GHOST: CollideGroup = 5;

export const CM_PLAYER: CollideMask = 0;
export const CM_BOSS: CollideMask = 1;
export const CM_ENEMY: CollideMask = 1;
export const CM_BULLET: CollideMask = 1;
export const CM_BOMB: CollideMask = 14;
export const CM_GHOST: CollideMask = 0;

export const RL_BG: RenderLayer = 0;
export const RL_BOSS: RenderLayer = 100;
export const RL_ENEMY: RenderLayer = 200;
export const RL_BULLET: RenderLayer = 300;
export const RL_BOMB: RenderLayer = 400;
export const RL_PLAYER: RenderLayer = 500;
export const RL_UI: RenderLayer = 600;
export const RL_MAX: RenderLayer = 1000;

export type Config = {
    render_layer: RenderLayer,
    collide_group: CollideGroup,
    collide_mask: CollideMask,
}

export enum State {
    PRE_ENTRY,
    ALIVE,
    LEAVING,
    DEAD
}

export function clone<T>(t: T): T {
    return Object.assign({}, t);
}

export interface Entity {
    config: Config,
    state: State,
    sprite: ShapedSprite,
    px: number,
    py: number,
    dir: number,
    update: (self: Entity) => void,
    attack: (self: Entity, target: Entity) => void,
    postUpdate: (self: Entity) => void,
}

export const template_config_player: Config = {
    render_layer: RL_PLAYER,
    collide_group: CG_PLAYER,
    collide_mask: CM_PLAYER
}

export const template_config_boss: Config = {
    render_layer: RL_BOSS,
    collide_group: CG_BOSS,
    collide_mask: CM_BOSS
}

export const template_config_enemy: Config = {
    render_layer: RL_ENEMY,
    collide_group: CG_ENEMY,
    collide_mask: CM_ENEMY
}