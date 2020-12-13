import * as stg from "./stg/test"
import * as pf from "./platform/platform_init"

async function main() {
    await pf.test_fps();
    pf.setup_canvas();
    await stg.init();
    pf.start();
    window.debug_info.stg = {
        init: stg.init,
        start: pf.start,
        terminate: pf.terminate
    };
}

window.onload = main;