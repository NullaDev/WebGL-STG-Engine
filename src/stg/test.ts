import { MovePoint, template_config_bullet, MovePointConfig, Motion } from "./entity/MovePoint";
import { PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { Input, Mover, MoverConfig, Repeat, RepeatSupplier, Scheduler } from "./stage/Scheuler";
import { SpriteManager } from "./util/SpriteManager";
import * as Res from "./util/sprites";
import * as SRes from "./util/shaped_sprites";
import { EntityPool } from "./stage/EntityPool";
import { StageInit } from "./stage/StageInit";
import { ShapeCircle, ShapeDualArc, ShapePoint, SIPoint, SSPoint } from "./util/Shape";
import { clone } from "./entity/Entity";
import { RayLaser, RayLaserConfig, RayLaserMotion } from "./entity/RayLaser";
import { move_point_event_listener_template, ray_laser_event_listener_template, ReflectConfig, reflect_config_default, reflect_disable, reflect_linear, reflect_rl, rl_reflect_config_default } from "./entity/ComplexListener";

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
const nonblock = (item: Input[]) => () => EntityPool.INSTANCE.add(new Scheduler(item));

const sinit: StageInit = {
    load_sprite: () => SpriteManager.get(Res.res_000.path).load(),
    add_player: () => new SelfMachine(SRes.getSSCircle(Res.self_machine_foreground, 1), sm_proto, sm_abi, 0, -192),
    add_schedule: null
}

{

    // 波与粒的境界
    const stage_000 = (time_scale: number) => {
        const n = 5;
        const sprite = Res.get_middle(Res.M_Type.Oval, Res.M_Color.Red, Res.Sprite_Mode.Overlay);
        const ss = SRes.getSSCircle(sprite, 1);

        return new Scheduler([
            30 * time_scale,
            repeat((i0) => [
                repeat((i1) => [
                    () => EntityPool.INSTANCE.add(new MovePoint(ss, template_config_bullet)
                        .simpleInit(0, 0, 8 / time_scale, 0.003 / time_scale * i0 * i0 + Math.PI * 2 / n * i1)),
                ], n),
                1 * time_scale
            ], Infinity)
        ])
    }

    // 龙纹弹
    const stage_001 = (time_scale: number) => {
        const motion_orbit: (center: SIPoint<any>, a0: number, w: number, r: number, wr: number) => Motion =
            (center: SIPoint<any>, a0: number, w: number, r: number, wr: number) => ((self: MovePoint<any>, time_rate: number) => {

                const sa = a0 + w * self.time;
                const tr = r * Math.sin(wr * self.time);
                self.px = center.px + tr * Math.cos(sa);
                self.py = center.py + tr * Math.sin(sa);
                self.dir = Math.atan2(tr * w, r * wr * Math.cos(wr * self.time)) + sa;
                return false;
            });
        const ssg = (c: Res.S_Color) => SRes.getSSCircle(Res.get_small(Res.S_Type.Scale, c, Res.Sprite_Mode.Overlay), 1);
        const cf1: MovePointConfig = clone(template_config_bullet);
        cf1.life = 180 * time_scale;
        cf1.kill_on_exit = false;

        const rm: MoverConfig = {
            duration: 100 * time_scale,
            px0: -96,
            px1: 96,
            py0: 32,
            py1: 112,
            dx1: 64,
            dy1: 64,
            ease: (a: number) => (1 - Math.cos(Math.PI * a)) / 2
        }

        const nx = 1, n0 = 47, n1 = 30, r0 = 70;
        const t1 = 1 * time_scale;
        const v0 = 3 / time_scale, dr = -v0 / r0, w0 = 0.06 / time_scale;
        const boss = new MovePoint(SRes.getSSCircle(Res.boss_background, 2), template_config_bullet)
            .setMotion((e) => (e.dir = e.time * Math.PI * 2 / 600, false)).simpleInit(0, 64, 0, 0);
        var host: MovePoint<ShapePoint> = null;
        var adder = (dir: number, da: number, c0: SSPoint<ShapeCircle>, c1: SSPoint<ShapeCircle>) => EntityPool.INSTANCE.add(new Scheduler([
            repeat((i0) => [
                () => EntityPool.INSTANCE.add(host = new MovePoint(null, cf1)
                    .simpleInit(boss.px, boss.py, v0, Math.PI * 2 / n0 * i0 * da * dir)),
                repeat((i1) => [
                    () => EntityPool.INSTANCE.add(new MovePoint(i0 % 2 == 0 ? c0 : c1, template_config_bullet)
                        .setMotion(motion_orbit(host, Math.PI * 2 / n1 * i1, w0 * dir, r0, dr)))
                ], n1),
                t1
            ], n0 * nx)
        ]));

        return new Scheduler([
            () => EntityPool.INSTANCE.add(boss),
            30 * time_scale,
            repeat((i0) => [
                () => adder(i0 % 2 * 2 - 1, 7, ssg(Res.S_Color.Red), ssg(Res.S_Color.Green)),
                50 * time_scale,
                () => adder(i0 % 2 * 2 - 1, 5, ssg(Res.S_Color.Yellow), ssg(Res.S_Color.Blue)),
                50 * time_scale,
                () => adder(i0 % 2 * 2 - 1, 1, ssg(Res.S_Color.Cyan), ssg(Res.S_Color.Pink)),
                Mover.random(boss, rm)
            ])
        ]);
    }

    // RayLaser Hitbox & Sprite Test
    const test_000 = (time_scale: number) => {
        const rslla = (t: SRes.RayLaserType, h: number, e: number) => SRes.getRayLaser(t, Res.S_Color.Red, Res.M_Color.Red, Res.Sprite_Mode.AddBlend, h, e, 1);
        const rlsss = [
            rslla(SRes.RayLaserType.Laser, 0, 0),
            rslla(SRes.RayLaserType.Laser, 1, 1),
            rslla(SRes.RayLaserType.Laser, 0, 1),
            rslla(SRes.RayLaserType.Laser, 1, 0),
            rslla(SRes.RayLaserType.Grain, 0, 0),
            rslla(SRes.RayLaserType.Grain, 1, 1),
            rslla(SRes.RayLaserType.Grain, 0, 1),
            rslla(SRes.RayLaserType.Grain, 1, 0),
            rslla(SRes.RayLaserType.Scale, 0, 0),
            rslla(SRes.RayLaserType.Scale, 1, 0),
        ];
        const cf: RayLaserConfig = {
            render_layer: template_config_bullet.render_layer,
            collide_group: template_config_bullet.collide_group,
            collide_mask: template_config_bullet.collide_mask,
            warning_time: 30 * time_scale,
            open_time: 10 * time_scale,
            alive_time: 6000 * time_scale,
            close_time: 10 * time_scale,
            listener: null
        };

        const motion: (w: number) => RayLaserMotion = (w: number) => (self: RayLaser, time_rate: number) => self.dir += time_rate * w;

        const n = 10;
        const w0 = 0 * Math.PI * 2 / 240 / time_scale;

        return new Scheduler([
            30 * time_scale,
            repeat((i0) => [
                repeat((i1) => [
                    () => EntityPool.INSTANCE.add(new RayLaser(rlsss[i1], cf, motion(w0 * (i0 % 2 * 2 - 1)))
                        .init(Math.cos(Math.PI * 2 / n * i1) * 50, Math.sin(Math.PI * 2 / n * i1) * 50, Math.PI * 2 / n * i1, 100))
                ], n),
                6000 * time_scale
            ])
        ]);
    }

    // rotating long bullet
    const stage_002 = (time_scale: number) => {
        const ss = SRes.getLongBullet(Res.S_Color.Red, Res.Sprite_Mode.Overlay, 64);
        const cf = clone(template_config_bullet);
        cf.auto_direction = false;

        const rm: MoverConfig = {
            duration: 50 * time_scale,
            px0: -96,
            px1: 96,
            py0: 32,
            py1: 112,
            dx1: 64,
            dy1: 64,
            ease: (a: number) => (1 - Math.cos(Math.PI * a)) / 2
        }

        const boss = new MovePoint(SRes.getSSCircle(Res.boss_background, 2), template_config_bullet)
            .setMotion((e) => (e.dir = e.time * Math.PI * 2 / 600, false)).simpleInit(0, 64, 0, 0);

        const add = (w0: number) => repeat((i1) => [
            () => EntityPool.INSTANCE.add(new MovePoint<ShapeDualArc>(ss, cf)
                .setMotion((e, t) => (e.dir += t * w0, true))
                .simpleInit(boss.px, boss.py, v, a0 + Math.PI * 2 / n * i1)
                .init((e) => e.dir += Math.PI * 2 * nr / n * i1))
        ], n);

        const n = 50;
        const nr = 2.5;
        const w = Math.PI * 2 / 60 / time_scale;
        const v = 6 / time_scale;
        var a0 = 0;
        return new Scheduler([
            () => EntityPool.INSTANCE.add(boss),
            30 * time_scale,
            repeat((i0) => [
                () => a0 = Math.random() * Math.PI * 2,
                add(w),
                20 * time_scale,
                add(-w),
                Mover.random(boss, rm)
            ])
        ]);
    }

    // reflect and delayed altering
    const stage_003 = (time_scale: number) => {
        const ss = SRes.getSSCircle(Res.get_small(Res.S_Type.Grain, Res.S_Color.Red, Res.Sprite_Mode.Overlay), 1);
        const cf = clone(template_config_bullet);
        cf.listener = clone(move_point_event_listener_template);
        const refcf = clone(reflect_config_default);
        refcf.max = 100;
        reflect_linear(refcf)(cf.listener);

        const n = 40;
        const m = 20;
        const da = Math.PI / 24;
        const v = 6 / time_scale;
        const t0 = 100 * time_scale;
        const ti0 = 1 * time_scale;
        const ti1 = 1 * time_scale;

        const rm: MoverConfig = {
            duration: t0 - ti1 * n - ti0 * m,
            px0: -96,
            px1: 96,
            py0: 32,
            py1: 112,
            dx1: 64,
            dy1: 64,
            ease: (a: number) => (1 - Math.cos(Math.PI * a)) / 2
        }

        const boss = new MovePoint(SRes.getSSCircle(Res.boss_background, 2), template_config_bullet)
            .setMotion((e) => (e.dir = e.time * Math.PI * 2 / 600, false)).simpleInit(0, 64, 0, 0);

        var a0 = 0;
        return new Scheduler([
            () => EntityPool.INSTANCE.add(boss),
            30 * time_scale,
            repeat((i0) => [
                () => a0 = Math.random() * Math.PI * 2,
                repeat((i0) => [
                    nonblock([repeat((i1) => [
                        () => EntityPool.INSTANCE.add(new MovePoint(ss, cf)
                            .setMotion((e, time_rate) => {
                                const t1 = t0 - i0 * ti1;
                                if (e.time - time_rate < t1 && e.time >= t1) {
                                    reflect_disable(refcf)(e);
                                    e.simpleInit(e.px, e.py, v, e.dir + (Math.random() * 2 - 1) * da);
                                }
                                return true;
                            })
                            .simpleInit(boss.px, boss.py, v, a0 + Math.PI * 2 / n * i0)),
                        ti0
                    ], m)]),
                    ti1
                ], n),
                ti0 * m,
                Mover.random(boss, rm)
            ])
        ]);
    }

    // finite reflect
    const stage_004 = (time_scale: number) => {
        const ss0 = SRes.getSSCircle(Res.get_small(Res.S_Type.Grain, Res.S_Color.Red, Res.Sprite_Mode.Overlay), 1);
        const ss1 = SRes.getSSCircle(Res.get_small(Res.S_Type.Grain, Res.S_Color.Blue, Res.Sprite_Mode.Overlay), 1);
        const sss = [ss0, ss1];
        const cf0 = clone(template_config_bullet);
        const cf1 = clone(template_config_bullet);
        cf0.listener = clone(move_point_event_listener_template);
        cf1.listener = clone(move_point_event_listener_template);
        const refcf0 = clone(reflect_config_default);
        const refcf1 = clone(reflect_config_default);
        refcf0.max = 2;
        refcf0.h0 = -Infinity;
        refcf1.max = 1;
        refcf1.h0 = -Infinity;
        reflect_linear(refcf0)(cf0.listener);
        reflect_linear(refcf1)(cf1.listener);

        const n0 = 4, n1 = 8;
        const mx = 0.5;
        const v = 6 / time_scale;
        const ti0 = 1 * time_scale;
        const ti1 = 3 * time_scale;

        const rm: MoverConfig = {
            duration: 40 * time_scale,
            px0: -96,
            px1: 96,
            py0: 32,
            py1: 112,
            dx1: 64,
            dy1: 64,
            ease: (a: number) => (1 - Math.cos(Math.PI * a)) / 2
        }

        const boss = new MovePoint(SRes.getSSCircle(Res.boss_background, 2), template_config_bullet)
            .setMotion((e) => (e.dir = e.time * Math.PI * 2 / 600, false)).simpleInit(0, 64, 0, 0);

        var a0 = 0;

        const add = (ssi: SSPoint<ShapeCircle>, m: number, dir: number, cf: MovePointConfig) => repeat((i0) => [
            nonblock([repeat((i1) => [
                repeat((i2) => [() => EntityPool.INSTANCE.add(new MovePoint(ssi, cf)
                    .simpleInit(boss.px, boss.py, v, a0 + dir * Math.PI * 2 * (i0 / n1 / n0 + i2 / n0 + i1 / n0 / n1 / m * mx)))], n1),
                ti0
            ], m)]),
            ti1
        ], n1);

        return new Scheduler([
            () => EntityPool.INSTANCE.add(boss),
            30 * time_scale,
            repeat((ix) => [
                () => a0 = Math.random() * Math.PI * 2,
                add(sss[0], 10, 1, cf0),
                ti0 * 10,
                Mover.random(boss, rm),
                add(sss[1], 15, -1, cf1),
                ti0 * 20,
                Mover.random(boss, rm)
            ])
        ]);
    }

    // reflect laser
    const stage_005 = (time_scale: number) => {
        const magn = 0.75;
        const rlbody = SRes.getRayLaser(SRes.RayLaserType.Grain, Res.S_Color.Blue, Res.M_Color.Blue, Res.Sprite_Mode.AddBlend, 1, 1, magn);
        const cf: RayLaserConfig = {
            render_layer: template_config_bullet.render_layer,
            collide_group: template_config_bullet.collide_group,
            collide_mask: template_config_bullet.collide_mask,
            warning_time: 0,
            open_time: 0,
            alive_time: Infinity,
            close_time: 0,
            listener: null
        };
        const bcf = clone(cf);
        cf.listener = clone(ray_laser_event_listener_template);
        const rlcf = clone(rl_reflect_config_default);
        rlcf.max = 2;
        rlcf.v = 8 / time_scale;
        rlcf.maxlen = 128;
        rlcf.body = rlbody;
        rlcf.cf = bcf;
        reflect_rl(rlcf)(cf.listener);

        const a0 = Math.random() * 2 * Math.PI;

        return new Scheduler([
            30 * time_scale,
            repeat((i0) => [
                () => EntityPool.INSTANCE.add(new RayLaser(rlbody, cf, null).init(0, 0, a0 + Math.PI * 2 *0.0234 * i0, 0)),
                3 * time_scale
            ])
        ]);
    }

    sinit.add_schedule = stage_005;

}

export async function init() {
    await sinit.load_sprite();
    var pool = new EntityPool();
    pool.add(sinit.add_player());
    pool.add(sinit.add_schedule(3));
    eval("window.debug_info.pool = pool");
}
