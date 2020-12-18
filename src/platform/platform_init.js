'use strict'

import * as gl from "../stg/sprite/gl";
import { page_update } from "page";

var test_n = 240;
var fps_start = 0;
var fps_total = 0;
var resolver = null;
export var last_update_rate = 1;

export function test_fps() {
    fps_start = performance.now();
    fps_total = test_n + 1;
    fps_update();
    return new Promise((resolve, reject) => {
        resolver = resolve;
    })
}

function fps_update() {
    fps_total--;
    if (fps_total) {
        requestAnimationFrame(fps_update);
        return;
    }
    var rate = (performance.now() - fps_start) / test_n;
    last_update_rate = Math.round(rate / (1000.0 / 60));
    resolver(last_update_rate);
}

export function setup_canvas() {
    var winw = window.innerWidth;
    var winh = window.innerHeight;
    var winr = Math.min(winw, winh) * 0.8;
    var canvas = document.getElementById("glcanvas");
    canvas.style.width = winr + "px";
    canvas.style.height = winr + "px";
    var devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = winr * devicePixelRatio;
    canvas.height = winr * devicePixelRatio;
    gl.setup();
}

var started = false;

export function mainloop_start() {
    if (started)
        return;
    started = true;
    mainloop_update();
}

export function mainloop_terminate() {
    started = false;
}

function mainloop_update() {
    page_update();
    keys_update();
    if (started)
        requestAnimationFrame(mainloop_update);
}

export var mouse = { x: 0, y: 0 };
export var keys = {};

document.onmousemove = (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
}

document.addEventListener('keydown', (event) => {
    keys[event.key] = 3;
}, false);

document.addEventListener('keyup', (event) => {
    keys[event.key] = 1;
}, false);

function keys_update() {
    for (var key in keys) {
        if (keys[key] == 3)
            keys[key] = 2;
        if (keys[key] == 1)
            keys[key] = 0;
    }
}

export const KEY_PRESS = 2;
export const KEY_CLICK = 3;
