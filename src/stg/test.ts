import { Bullet, template_config_bullet } from "./entity/Bullet";
import { Repeat, RepeatSupplier, Scheduler } from "./schedule/Scheuler";
import { small_round_red } from "./sprite/sprites";
import { EntityPool } from "./stage/EntityPool";

const pool = new EntityPool();

const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);

{
    const n = 12;

    pool.add(new Scheduler([
        120,
        repeat([
            repeat((i) => [
                () => pool.add(new Bullet(
                    small_round_red,
                    template_config_bullet)
                    .simpleInit(0, 0, 1, Math.PI * 2 / n * i)),
                10
            ], n),
            120
        ], Infinity)
    ]));
}

export function update() {
    pool.update();
    pool.render();
}

setInterval(update, 16);