import { Bullet, template_config_bullet } from "./entity/Bullet";
import { PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { Repeat, RepeatSupplier, Scheduler } from "./schedule/Scheuler";
import { SpriteManager } from "./sprite/SpriteManager";
import * as Res from "./sprite/sprites";
import * as SRes from "./sprite/shaped_sprites";
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
    await SpriteManager.get(Res.res_000.path).load();

    var pool = new EntityPool();
    pool.add(new SelfMachine(SRes.getSSCircle(Res.self_machine_foreground, 1, 1), sm_proto, sm_abi, 0, 0));
    eval("window.debug_info.pool = pool");

    const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);

    const n = 5;
    const sprite = Res.get_small(Res.S_Type.Scale, Res.S_Color.Red, Res.Sprite_Mode.Overlay);
    const ss = SRes.getSSCircle(sprite, 1, 1);

    pool.add(new Scheduler([
        60,
        repeat((i0) => [
            repeat((i1) => [
                () => pool.add(new Bullet(ss, template_config_bullet)
                    .simpleInit(0, 0, 2, 0.0008 * i0 * i0 + Math.PI * 2 / n * i1)),
            ], n),
            2
        ], Infinity)
    ]));

}
