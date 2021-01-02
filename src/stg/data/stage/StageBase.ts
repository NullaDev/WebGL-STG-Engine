import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { reflect_rl, RLReflectConfig, rl_reflect_config_default } from "../../entity/ComplexListener";
import { clone } from "../../entity/Entity";
import { template_config_bullet } from "../../entity/MovePoint";
import { RayLaserConfig, RayLaserEventListener, SSRay } from "../../entity/RayLaser";
import { EntityPool } from "../../stage/EntityPool";
import { Repeat, RepeatSupplier, Scheduler, SchedulerParam } from "../../stage/Scheuler";

export const repeat = (item: Repeat, n: number = Infinity) => () => new RepeatSupplier(item, n);

export const nonblock = (item: SchedulerParam) => () => EntityPool.INSTANCE.add(new Scheduler(item));

export function reflect_laser(v: number, len: number, max_ref: number, c1: Res.M_Color): [SSRay, RayLaserConfig, RLReflectConfig] {
    const c0 = colormap_m2s(c1);
    const rlhead = SRes.getRayLaser(SRes.RayLaserType.Grain, c0, c1, Res.Sprite_Mode.AddBlend, 0, 0.5, 1);
    const rlbody = SRes.getRayLaser(SRes.RayLaserType.Grain, c0, c1, Res.Sprite_Mode.AddBlend, 0, 1, 1);
    const cf: RayLaserConfig = {
        render_layer: template_config_bullet.render_layer,
        collide_group: template_config_bullet.collide_group,
        collide_mask: template_config_bullet.collide_mask,
        warning_time: 0,
        open_time: 0,
        alive_time: Infinity,
        close_time: 0,
        listener: null,
        damage_info: null
    };
    const bcf = clone(cf);
    cf.listener = new RayLaserEventListener();
    const rlcf = clone(rl_reflect_config_default);
    rlcf.max = max_ref;
    rlcf.v = v;
    rlcf.maxlen = len;
    rlcf.body = rlbody;
    rlcf.cf = bcf;
    reflect_rl(rlcf)(cf.listener);
    return [rlhead, cf, rlcf];
}

const l2m = [Res.M_Color.Red, Res.M_Color.Blue, Res.M_Color.Green, Res.M_Color.Yellow];
const m2s = [Res.S_Color.Grey, Res.S_Color.Red, Res.S_Color.Pink, Res.S_Color.Blue, Res.S_Color.Cyan, Res.S_Color.Green, Res.S_Color.Yellow, Res.S_Color.White];

export function colormap_l2m(c: Res.L_Color) { return l2m[c] };
export function colormap_m2s(c: Res.M_Color) { return m2s[c] };