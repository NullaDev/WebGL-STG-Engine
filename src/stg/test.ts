import { Bullet, template_config_bullet, BulletConfig, Motion } from "./entity/Bullet";
import { PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { Repeat, RepeatSupplier, Scheduler } from "./stage/Scheuler";
import { SpriteManager } from "./util/SpriteManager";
import * as Res from "./util/sprites";
import * as SRes from "./util/shaped_sprites";
import { EntityPool } from "./stage/EntityPool";
import { StageInit } from "./stage/StageInit";
import { ShapePoint, SIPoint } from "./util/Shape";
import { clone } from "./entity/Entity";

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

const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);

// 波与粒的境界
const stage_000 = (time_scale: number) => {
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

// 龙纹弹
const stage_001 = (time_scale: number) => {
    const motion_orbit: (center: SIPoint<any>, a0: number, w: number, r: number, wr: number) => Motion =
        (center: SIPoint<any>, a0: number, w: number, r: number, wr: number) => ((self: Bullet<any>, time_rate: number) => {
            if (self.motion_stat == null)
                self.motion_stat = { a: a0 };
            self.motion_stat.a += w * time_rate;
            const tr = r * Math.sin(wr * self.time);
            self.px = center.px + tr * Math.cos(self.motion_stat.a);
            self.py = center.py + tr * Math.sin(self.motion_stat.a);
            self.dir = Math.atan2(tr * w, r * wr * Math.cos(wr * self.time)) + self.motion_stat.a;
            return false;
        });
    const ssg = (c: Res.S_Color) => SRes.getSSCircle(Res.get_small(Res.S_Type.Scale, c, Res.Sprite_Mode.Overlay), 1, 1);
    const cf1: BulletConfig = clone(template_config_bullet);
    cf1.life = 120 * time_scale;
    cf1.kill_on_exit = false;


    const nx = 1, n0 = 47, n1 = 40, r0 = 55;
    const t1 = 1 * time_scale;
    const v0 = 3 / time_scale, dr = -v0 / r0, w0 = 0.06 / time_scale;

    var host: Bullet<ShapePoint> = null;
    var adder = (dir: number, da: number, c0: Res.S_Color, c1: Res.S_Color) => EntityPool.INSTANCE.add(new Scheduler([
        repeat((i0) => [
            () => EntityPool.INSTANCE.add(host = new Bullet(null, cf1)
                .simpleInit(0, 0, v0, Math.PI * 2 / n0 * i0 * da * dir)),
            repeat((i1) => [
                () => EntityPool.INSTANCE.add(new Bullet(ssg(i0 % 2 == 0 ? c0 : c1), template_config_bullet)
                    .setMotion(motion_orbit(host, Math.PI * 2 / n1 * i1, w0 * dir, r0, dr)))
            ], n1),
            t1
        ], n0 * nx)
    ]));

    const das = [7, 3, 1];
    const cls = [Res.S_Color.Red, Res.S_Color.Blue, Res.S_Color.Green];

    return new Scheduler([
        30 * time_scale,
        repeat((i0) => [
            () => adder(i0 % 2 * 2 - 1, 7, Res.S_Color.Red, Res.S_Color.Green),
            45 * time_scale,
            () => adder(i0 % 2 * 2 - 1, 3, Res.S_Color.Yellow, Res.S_Color.Blue),
            45 * time_scale,
            () => adder(i0 % 2 * 2 - 1, 1, Res.S_Color.Cyan, Res.S_Color.Pink),
            90 * time_scale
        ]
        )
    ]);
}

const sinit: StageInit = {
    load_sprite: () => SpriteManager.get(Res.res_000.path).load(),
    add_player: () => new SelfMachine(SRes.getSSCircle(Res.self_machine_foreground, 1, 1), sm_proto, sm_abi, 0, -192),
    add_schedule: stage_001
}

export async function init() {
    await sinit.load_sprite();
    var pool = new EntityPool();
    pool.add(sinit.add_player());
    pool.add(sinit.add_schedule(2));
    eval("window.debug_info.pool = pool");
}
