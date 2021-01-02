import { Scheduler } from "../../../stage/Scheuler";
import { StageEntry } from "../../../stage/StageInit";
import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { clone } from "../../../entity/Entity";
import { MovePoint, template_config_bullet } from "../../../entity/MovePoint";
import { repeat } from "../StageBase";
import { EntityPool } from "../../../stage/EntityPool";

export const stage_007: StageEntry = {
    name: "aligned rotation",
    default_scale: 1,
    init: (time_scale: number) => {
        const ss = SRes.getSSCircle(Res.get_small(Res.S_Type.Ball, Res.S_Color.Blue, Res.Sprite_Mode.Overlay), 1);
        const cf = clone(template_config_bullet);
        cf.exit_margin = 100;

        const n = 6;
        const v = 1 / time_scale;
        const w0 = Math.PI * 2 / 4800 / time_scale;
        const w1 = - w0;
        const wi = Math.PI / 2;
        const wj = Math.PI * 2 / 4800 / time_scale;
        const l0 = 150;
        const dl = 50;
        const t0 = 25 * time_scale;

        const motion = (s: Scheduler, i: number, j: number) => (self: MovePoint<any>, rate: number) => {
            const a0 = Math.sin(s.time * w0) * wi + Math.PI * 2 / n * i;
            const a1 = Math.cos(s.time * w1) * wi + Math.PI * 2 / n * j;
            const l = l0 - dl * Math.cos(s.time * wj);
            self.px = l * Math.cos(a0) + v * self.time * Math.cos(a1);
            self.py = l * Math.sin(a0) + v * self.time * Math.sin(a1);
            self.dir = a1;
            return false;
        }

        return [new Scheduler((s: Scheduler) => [
            60 * time_scale,
            repeat((i0) => [
                () => {
                    for (var i1 = 0; i1 < n; i1++)
                        for (var i2 = 0; i2 < n; i2++) {
                            EntityPool.INSTANCE.add(new MovePoint(ss, cf).setMotion(motion(s, i1, i2)));
                        }
                },
                t0
            ])
        ])];
    }
}