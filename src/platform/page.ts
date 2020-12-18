
import { EntityPool } from "../stg/stage/EntityPool";
import { PlayerAction, SelfMachine } from "../stg/entity/SelfMachine";
import * as gl from "../stg/sprite/gl";
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
    if (platform["Shift"] >= platform.KEY_PRESS) {
        if (!ref_mouse) {
            ref_mouse = true;
            ref_scr_x = platform.mouse.x;
            ref_scr_y = platform.mouse.y;
            last_x = 0;
            last_y = 0;
        }
        pos_x = platform.mouse.x - ref_scr_x - last_x;
        pos_y = platform.mouse.y - ref_scr_y - last_y;
        last_x = pos_x;
        last_y = pos_y;
    }
    if (ref_mouse && platform["Shift"] < platform.KEY_PRESS)
        ref_mouse = false;
    const act: PlayerAction = {
        pos_x: pos_x,
        pos_y: pos_y,
        key_z: platform.keys["z"] >= platform.KEY_PRESS,
        key_x: platform.keys["x"] == platform.KEY_CLICK,
        key_c: platform.keys["c"] == platform.KEY_CLICK
    };
    return act;
}