import { Bullet, template_config_bullet } from "./entity/Bullet";
import { Repeat, RepeatSupplier, Scheduler } from "./schedule/Scheuler";
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

var time = 0;

export function update() {
    var t0 = +new Date();
    if (Math.abs(t0 - time - 16) > 2)
        console.log("interval:", t0 - time);
    time = t0;
    pool.update();
    pool.render();
    var t1 = +new Date();
    if (t1 - t0 > 15)
        console.log("consume: ", t1 - t0);
}