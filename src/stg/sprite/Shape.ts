import { Entity } from "../entity/Entity";


export abstract class Shape {

    protected abstract _distanceTo(x: number, y: number): number;

    public abstract exitScreen(sx: number, sy: number, sd: number, rw: number, rh: number): boolean;

    public distanceTo(sx: number, sy: number, sd: number, px: number, py: number): number {
        px = px - sx;
        py = py - sy;
        sx = px * Math.cos(-sd) - py * Math.sin(-sd);
        sy = py * Math.cos(-sd) + px * Math.sin(-sd);
        return this._distanceTo(sx, sy);
    }

}

export class ShapeCircle extends Shape {

    public radius: number;

    constructor(r: number) {
        super();
        this.radius = r;
    }

    public exitScreen(sx: number, sy: number, _: number, rw: number, rh: number): boolean {
        return Math.abs(sx) > rw + this.radius || Math.abs(sy) > rh + this.radius;
    }

    protected _distanceTo(x: number, y: number): number {
        return Math.sqrt(x * x + y * y) - this.radius;
    }

}

export class ShapeLine extends Shape {

    public rw: number;
    public rl: number;

    constructor(w: number, l: number) {
        super();
        this.rw = w / 2;
        this.rl = l / 2;
    }

    protected _distanceTo(x: number, y: number): number {
        x = Math.abs(x);
        if (x > this.rl)
            return Math.sqrt(y * y + (x - this.rl) * (x - this.rl)) - this.rw;
        return Math.abs(y) - this.rw;
    }

    public exitScreen(sx: number, sy: number, sd: number, rw: number, rh: number): boolean {
        const x0 = Math.abs(sx) - this.rl * Math.cos(sd) - this.rw;
        const y0 = Math.abs(sy) - this.rl * Math.sin(sd) - this.rw;
        return x0 > rw || y0 > rh;
    }

}

export function collide(e0: Entity, e1: Entity) {
    if (e0.sprite.shape instanceof ShapeCircle)
        return e1.sprite.shape.distanceTo(e1.px, e1.py, e1.dir, e0.px, e0.py) - e0.sprite.shape.radius;
    if (e1.sprite.shape instanceof ShapeCircle)
        return collide(e1, e0);
    throw new Error("non-circle non-circle collision not found");
}