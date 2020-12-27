import { MovePoint, template_config_bullet, MovePointConfig, Motion } from "../../entity/MovePoint";
import { Mover, MoverConfig, Repeat, RepeatSupplier, Scheduler, SchedulerParam } from "../../stage/Scheuler";
import { SpriteManager } from "../../util/SpriteManager";
import * as Res from "../../util/sprites";
import * as SRes from "../../util/shaped_sprites";
import { EntityPool } from "../../stage/EntityPool";
import { StageEntry, StageInit } from "../../stage/StageInit";
import { ShapeCircle, ShapeDualArc, ShapePoint, SIPoint, SSPoint } from "../../util/Shape";
import { clone } from "../../entity/Entity";
import { RayLaser, RayLaserConfig, RayLaserMotion, SSRay } from "../../entity/RayLaser";
import { move_point_event_listener_template, ray_laser_event_listener_template, reflect_config_default, reflect_disable, reflect_linear, reflect_rl, RLReflectConfig, rl_reflect_config_default } from "../../entity/ComplexListener";
import { repeat } from "./StageBase";

export const stage_002: StageEntry = {
    name: "rotating long bullet",
    default_scale: 3,
    init: (time_scale: number) => {
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
}