import { ray_laser_event_listener_template, reflect_rl, RLReflectConfig, rl_reflect_config_default } from "stg/entity/ComplexListener";
import { clone } from "stg/entity/Entity";
import { template_config_bullet } from "stg/entity/MovePoint";
import { RayLaser, RayLaserConfig, SSRay } from "stg/entity/RayLaser";
import { EntityPool } from "stg/stage/EntityPool";
import { Scheduler } from "stg/stage/Scheuler";
import { StageEntry } from "stg/stage/StageInit";
import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { repeat } from "../StageBase";

export const stage_005: StageEntry = {
    name: "reflect laser",
    default_scale: 3,
    init: (time_scale: number) => {
        const magn = 0.75;

        const gen: (c0: Res.S_Color, c1: Res.M_Color) => [SSRay, RayLaserConfig, RLReflectConfig] = (c0: Res.S_Color, c1: Res.M_Color) => {
            const rlbody = SRes.getRayLaser(SRes.RayLaserType.Grain, c0, c1, Res.Sprite_Mode.AddBlend, 1, 1, magn);
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
            cf.listener = ray_laser_event_listener_template();
            const rlcf = clone(rl_reflect_config_default);
            rlcf.max = 2;
            rlcf.v = 8 / time_scale;
            rlcf.maxlen = 128;
            rlcf.body = rlbody;
            rlcf.cf = bcf;
            rlcf.name = `${c0}-${c1}`;
            reflect_rl(rlcf)(cf.listener);
            return [rlbody, cf, rlcf];
        }

        const data = [gen(Res.S_Color.Blue, Res.M_Color.Blue), gen(Res.S_Color.Red, Res.M_Color.Red)];

        const w = Math.PI * 2 / time_scale;
        const t0 = time_scale;

        const adder = (n0: number, ind: number, ni: number, wi: number, ti: number, ai: number) => repeat((i0) => [
            repeat((i1) => [
                () => EntityPool.INSTANCE.add(new RayLaser(data[ind][0], data[ind][1], null)
                    .init(0, 0, ai + Math.PI * 2 / ni * i1 + wi * i0, 0)),
            ], ni),
            ti
        ], n0);

        return new Scheduler([
            30 * time_scale,
            repeat((i0) => [
                adder(20, 0, 3, (i0 % 2 * 2 - 1) * w * 0.0678, t0 * 6, Math.random() * 2 * Math.PI),
                100 * time_scale,
                adder(120, 1, 1, (i0 % 2 * 2 - 1) * w * 0.0234, t0, Math.random() * 2 * Math.PI),
                100 * time_scale
            ]),
        ]);
    }
}