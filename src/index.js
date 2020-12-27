import * as stg from "./stg/test"
import * as pf from "./platform/platform_init"

async function main() {
    console.log("window loaded");
    //pf.test_fps();
    pf.setup_canvas();
    console.log("canvas setup");
    await stg.init();
    console.log("stage initialized");
    require("./platform/buttons");
    pf.mainloop_start();
    window.debug_info.stg = {
        fps: pf.test_fps,
        init: stg.init,
        start: pf.mainloop_start,
        terminate: pf.mainloop_terminate,
    };
    window.debug_info.platform = pf;
}

window.onload = main;