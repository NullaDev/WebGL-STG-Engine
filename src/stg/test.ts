import { Bullet, template_config_bullet } from "./entity/Bullet";
import { PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { Repeat, RepeatSupplier, Scheduler } from "./schedule/Scheuler";
import { SpriteManager } from "./sprite/SpriteManager";
import * as Res from "./sprite/sprites";
import * as SRes from "./sprite/shaped_sprites";
import { EntityPool } from "./stage/EntityPool";
import { StageInit } from "./stage/StageInit";

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

const sinit: StageInit = {
    load_sprite: () => SpriteManager.get(Res.res_000.path).load(),
    add_player: () => new SelfMachine(SRes.getSSCircle(Res.self_machine_foreground, 1, 1), sm_proto, sm_abi, 0, -192),
    add_schedule: (time_scale: number) => {
        const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);

        const n = 5;
        const sprite = Res.get_middle(Res.M_Type.Oval, Res.M_Color.Red, Res.Sprite_Mode.Overlay);
        const ss = SRes.getSSCircle(sprite, 1, 1);

        return new Scheduler([
            60 * time_scale,
            repeat((i0) => [
                repeat((i1) => [
                    () => EntityPool.INSTANCE.add(new Bullet(ss, template_config_bullet)
                        .simpleInit(0, 0, 3 / time_scale, 0.0005 / time_scale * i0 * i0 + Math.PI * 2 / n * i1)),
                ], n),
                1 * time_scale
            ], Infinity)
        ])
    }
}

export async function init() {
    await sinit.load_sprite();
    var pool = new EntityPool();
    pool.add(sinit.add_player());
    pool.add(sinit.add_schedule(1));
    eval("window.debug_info.pool = pool");
}
