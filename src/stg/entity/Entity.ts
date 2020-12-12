import { Shape, ShapedInstance, ShapedSprite } from "../sprite/Shape";
import { RenderType, RENDER_TYPE } from "../sprite/SpriteManager";

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

export const RL_INVISIBLE: RenderLayer = 0;
export const RL_BG: RenderLayer = 100;
export const RL_BOSS: RenderLayer = 200;
export const RL_ENEMY: RenderLayer = 300;
export const RL_BULLET: RenderLayer = 400;
export const RL_BOMB: RenderLayer = 500;
export const RL_PLAYER: RenderLayer = 600;
export const RL_UI: RenderLayer = 700;
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

export type EntityAny = Entity<any, any, Shape<any>, ShapedSprite<any, any, any, any>>;

export interface Entity<
        E extends Entity<E, RT, S, SS> & RenderType<E, RT>,
        RT extends RENDER_TYPE, 
        S extends Shape<E>, 
        SS extends ShapedSprite<SS, RT, E, S>> 
    extends ShapedInstance<E, RT, S, SS> {
    config: Config,
    state: State,
    update: (self: Entity<E, RT, S, SS>) => void,
    attack: (self: Entity<E, RT, S, SS>, target: EntityAny) => void,
    postUpdate: (self: Entity<E, RT, S, SS>) => void,
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