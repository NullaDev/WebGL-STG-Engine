
import { EntityPool } from "../stg/stage/EntityPool";
import { PlayerAction, SelfMachine } from "../stg/entity/SelfMachine";
import * as gl from "./gl";
import * as Screen from "./Screen";
import * as platform from "./platform_init";

var paused = false;
var ref_mouse = false;
var ref_scr_x = 0;
var ref_scr_y = 0;
var last_x = 0;
var last_y = 0;

export function page_update() {
    stg_update();
}

function stg_update() {
    var pool = EntityPool.INSTANCE;
    if (pool) {
        const act = update_input();
        if (!paused) {
            SelfMachine.updateState(act);
            if (!paused)
                for (var i = 0; i < platform.last_update_rate; i++)
                    pool.update();
        }
        gl.clear();
        pool.render();
    }
}

function update_input() {
    if (platform.keys["Escape"] == platform.KEY_CLICK)
        paused = !paused;
    if (paused) {
        ref_mouse = false;
        return null;
    }
    var pos_x = 0;
    var pos_y = 0;
    const mover =
        platform.keys["Shift"] >= platform.KEY_PRESS ||
        platform.keys["_touch"] >= platform.KEY_PRESS ||
        platform.keys["_press"] >= platform.KEY_PRESS;
    if (mover) {
        if (!ref_mouse) {
            ref_mouse = true;
            ref_scr_x = platform.mouse.x;
            ref_scr_y = platform.mouse.y;
            last_x = 0;
            last_y = 0;
        }
        pos_x = platform.mouse.x - ref_scr_x - last_x;
        pos_y = platform.mouse.y - ref_scr_y - last_y;
        last_x += pos_x;
        last_y += pos_y;
    }
    else
        ref_mouse = false;
    pos_x = pos_x / platform.canvas_width * Screen.SCR_HALF_WIN_WIDTH * 2;
    pos_y = -pos_y / platform.canvas_height * Screen.SCR_HALF_WIN_HEIGHT * 2;
    const speed = platform.keys["Shift"] >= platform.KEY_PRESS ? 2 : 3;
    if (platform.keys["w"] >= platform.KEY_PRESS || platform.keys["ArrowUp"] >= platform.KEY_PRESS)
        pos_y += speed;
    if (platform.keys["s"] >= platform.KEY_PRESS || platform.keys["ArrowDown"] >= platform.KEY_PRESS)
        pos_y -= speed;
    if (platform.keys["a"] >= platform.KEY_PRESS || platform.keys["ArrowLeft"] >= platform.KEY_PRESS)
        pos_x -= speed;
    if (platform.keys["d"] >= platform.KEY_PRESS || platform.keys["ArrowRight"] >= platform.KEY_PRESS)
        pos_x += speed;

    const act: PlayerAction = {
        pos_x: pos_x,
        pos_y: pos_y,
        key_z: platform.keys["z"] >= platform.KEY_PRESS,
        key_x: platform.keys["x"] == platform.KEY_CLICK,
        key_c: platform.keys["c"] == platform.KEY_CLICK
    };
    return act;
}