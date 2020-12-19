import * as stg from "./stg/test"
import * as pf from "./platform/platform_init"

async function main() {
    pf.test_fps();
    pf.setup_canvas();
    await stg.init();
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