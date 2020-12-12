import { setup, loadImage, loadTexture, clear, drawSnake, drawRects } from "./main/gl";

import { EntityPool } from "./stg/stage/EntityPool"

async function main() {

    var winw = window.innerWidth;
    var winh = window.innerHeight;
    var winr = Math.min(winw, winh) * 0.8;

    var canvas = document.getElementById("glcanvas");

    // set the display size of the canvas.
    canvas.style.width = winr + "px";
    canvas.style.height = winr + "px";

    // set the size of the drawingBuffer
    var devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = winr * devicePixelRatio;
    canvas.height = winr * devicePixelRatio;

    setup();
    await testCurve();

}

async function testCurve() {
    const image = await loadImage("assets/missile_green.png");
    const texture = loadTexture(image);
    clear();
    var size = 500;
    var xy = new Float32Array(size * 2);
    for (var i = 0; i < size; i++) {
        xy[i * 2 + 0] = Math.sin(i * 10 * Math.PI / size) * 0.1;
        xy[i * 2 + 1] = 1.8 * i / size - 0.9;
    }
    timer(() => drawSnake(xy, 0.03, size, 0, 0, 1, 1, texture));
}

async function testRect() {
    const image = await loadImage("assets/blend_test.png");
    const texture = loadTexture(image);
    clear();
    var size = 10000;
    var xyrwh = new Float32Array(size * 9);
    for (var i = 0; i < size; i++) {
        xyrwh[i * 9 + 0] = Math.random() * 2 - 1;
        xyrwh[i * 9 + 1] = Math.random() * 2 - 1;
        xyrwh[i * 9 + 2] = Math.random() * 2 * Math.PI;
        xyrwh[i * 9 + 3] = 0.03;
        xyrwh[i * 9 + 4] = 0.03;
        xyrwh[i * 9 + 5] = 0;
        xyrwh[i * 9 + 6] = 0;
        xyrwh[i * 9 + 7] = 1;
        xyrwh[i * 9 + 8] = 1;
    }
    timer(() => drawRects(xyrwh, size, texture));
}

function timer(a) {
    var t0 = + new Date();
    a();
    var t1 = + new Date();
    console.log(t1 - t0);
}

window.onload = main;