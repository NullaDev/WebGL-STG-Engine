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

export const stage_001: StageEntry = {
    name: "龙纹弹",
    default_scale: 3,
    init: (time_scale: number) => {
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
}