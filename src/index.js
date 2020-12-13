import { setup, loadImage, loadTexture, clear, drawSnake, drawRects } from "./stg/sprite/gl";
import { init, start, terminate } from "./stg/test"

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
    await init();
    start();
    window.debug_info.stg = {
        init: init,
        start: start,
        terminate: terminate
    };
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

window.onload = main;