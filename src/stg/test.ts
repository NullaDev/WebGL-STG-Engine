import { Bullet, template_config_bullet } from "./entity/Bullet";
import { PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { Repeat, RepeatSupplier, Scheduler } from "./schedule/Scheuler";
import { clear } from "./sprite/gl";
import * as sprite from "./sprite/shaped_sprites";
import { SpriteManager } from "./sprite/SpriteManager";
import { SPRITES } from "./sprite/sprites";
import { EntityPool } from "./stage/EntityPool";

const sm_proto: PlayerPrototype = {
    updateShoot(shoot: boolean) {
        return false;
    },
    updateBomb(bomb: boolean) {
        return false;
    },
    updateSpecial(special: boolean) {
        return false;
    }
};

const sm_abi: PlayerAbility = {
    pre_miss: 30,
    miss_time: 60,
    bomb_time: 60
}

export async function init() {
    var pool = new EntityPool();
    pool.add(new SelfMachine(sm_proto, sm_abi, 0, 0));
    eval("window.debug_info.pool = pool");

    const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);
    await SpriteManager.get(SPRITES[sprite.small_round_red.sprite].sprite).load();
    await SpriteManager.get(SPRITES[sprite.self_machine.sprite].sprite).load();
    const n = 5;
    pool.add(new Scheduler([
        60,
        repeat((i0) => [
            repeat((i1) => [
                () => pool.add(new Bullet(
                    sprite.small_round_red,
                    template_config_bullet)
                    .simpleInit(0, 0, 2, 0.0008 * i0 * i0 + Math.PI * 2 / n * i1)),
            ], n),
            2
        ], Infinity)
    ]));

}
