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

export const stage_000: StageEntry = {
    name: "波与粒的境界",
    default_scale: 3,
    init: (time_scale: number) => {
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
}