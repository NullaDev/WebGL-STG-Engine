import * as stg from "./stg/test"
import * as pf from "./platform/platform_init"

async function main() {
    pf.setup_canvas();
    const a = pf.test_fps();
    const b = stg.init();
    await a;
    await b;
    document.getElementById("loading").hidden = true,
    require("./platform/buttons");
    pf.mainloop_start();
}

window.onload = main;