import { Bullet, template_config_bullet } from "./entity/Bullet";
import { Repeat, RepeatSupplier, Scheduler } from "./schedule/Scheuler";
import { clear } from "./sprite/gl";
import { small_round_red } from "./sprite/shaped_sprites";
import { SpriteManager } from "./sprite/SpriteManager";
import { SPRITES } from "./sprite/sprites";
import { EntityPool } from "./stage/EntityPool";

var pool: EntityPool = null;;

export async function init() {
    pool = new EntityPool();

    eval("window.debug_info.pool = pool");

    const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);

    await SpriteManager.get(SPRITES[small_round_red.sprite].sprite).load();

    const n = 8;

    pool.add(new Scheduler([
        120,
        repeat((i0) => [
            repeat((i1) => [
                () => pool.add(new Bullet(
                    small_round_red,
                    template_config_bullet)
                    .simpleInit(0, 0, 2, 0.002 * i0 * i0 + Math.PI * 2 / n * i1)),
            ], n),
            3
        ], Infinity)
    ]));

}

var started = false;

export function start() {
    if (started)
        return;
    started = true;
    update();
}

export function terminate() {
    started = false;
}

function update() {
    pool.update();
    clear();
    pool.render();
    if (started)
        requestAnimationFrame(update);
}