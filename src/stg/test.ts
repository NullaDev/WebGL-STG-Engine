import { Bullet, template_config_bullet } from "./entity/Bullet";
import { Scheduler } from "./schedule/Scheuler";
import { small_round_red } from "./sprite/sprites";
import { EntityPool } from "./stage/EntityPool";

const pool = new EntityPool();

pool.add(new Scheduler([
    120,
    () => pool.add(new Bullet(small_round_red, template_config_bullet).simpleInit(0, 0, 1, 0)),
    10
]));

export function update() {
    pool.update();
    pool.render();
}

setInterval(update, 16);