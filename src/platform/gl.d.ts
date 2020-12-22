import { Sprite_Mode } from "../stg/util/sprites";

export type GLTEXTURE = any;
export type IMAGE = any;

export function setup(): void;
export function clear(): void;

export function loadImage(url: string): Promise<IMAGE>;
export function loadTexture(image: IMAGE): GLTEXTURE;

export function setMode(mode: Sprite_Mode): void;

export function draw(vec: Float32Array, tex: Float32Array, texture: GLTEXTURE, size: number): void;
export function drawStrip(vec: Float32Array, tex: Float32Array, ind: Int16Array, texture: GLTEXTURE, size: number): void;

export function drawRects(xyrwh: Float32Array, size: number, texture: GLTEXTURE): void;
export function drawSnake(xy: Float32Array, w: number, size: number, tx: number, ty: number, tw: number, th: number, texture: GLTEXTURE): void;