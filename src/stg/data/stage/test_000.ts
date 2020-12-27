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

export const test_000: StageEntry = {
    name: "RayLaser Hitbox Test",
    default_scale: 3,
    init: (time_scale: number) => {
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
}