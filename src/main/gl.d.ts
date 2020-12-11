
export type GLTEXTURE = any;

export function loadImage(url: string): Promise<any>;

export function loadTexture(image: any): GLTEXTURE;

export function draw(vec: Float32Array, tex: Float32Array, texture: GLTEXTURE);

export function drawRects(xyrwh: Float32Array, size: number, texture: GLTEXTURE): void;