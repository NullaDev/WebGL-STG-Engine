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

    const n = 12;
    console.log(SPRITES[small_round_red.sprite].sprite);
    await SpriteManager.get(SPRITES[small_round_red.sprite].sprite).load();

    pool.add(new Scheduler([
        120,
        repeat([
            repeat((i) => [
                () => pool.add(new Bullet(
                    small_round_red,
                    template_config_bullet)
                    .simpleInit(0, 0, 1, Math.PI * 2 / n * i)),
                1
            ], n),
            120
        ], 1)
    ]));

}

export function update() {
    pool.update();
    pool.render();
}