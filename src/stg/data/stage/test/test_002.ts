import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { CurveMask, template_config_curve_mask } from "../../../entity/CurveLaser";
import { clone } from "../../../entity/Entity";
import { MovePoint, template_config_bullet } from "../../../entity/MovePoint";
import { EntityPool } from "../../../stage/EntityPool";
import { Scheduler } from "../../../stage/Scheuler";
import { StageEntry } from "../../../stage/StageInit";
import { nonblock, repeat } from "../StageBase";


export const test_002: StageEntry = {
    name: "curve test",
    default_scale: 1,
    init: (time_scale: number) => {
        const ssb = SRes.getSSCircle(Res.get_small(Res.S_Type.Germ, Res.S_Color.Red, Res.Sprite_Mode.Overlay), 1);
        const ssc = SRes.getCurveLaser(Res.S_Color.Red, Res.Sprite_Mode.AddBlend, null);
        const cfb = clone(template_config_bullet);
        const cfc = clone(template_config_curve_mask);
        cfb.init_stall = 5*time_scale;
        cfb.exit_margin = 50;
        ssb.sprite = null;

        const motion = (a0: number, da: number, w0: number) => (self: MovePoint<any>, time_rate: number) => {
            const a = a0 + da * Math.sin(self.time * w0);
            self.vx = v * Math.cos(a);
            self.vy = v * Math.sin(a);
            return true;
        }

        type S_DATA = {
            curve: CurveMask,
            a0: number,
        }

        const v = 2 / time_scale;
        const n = 32, m = 5;
        const da = Math.PI * 2 / 4;
        const w0 = Math.PI * 2 / 180 / time_scale;


        var a0: number;
        return new Scheduler([
            60 * time_scale,
            repeat((i0) => [
                () => { a0 = Math.PI * 2 * Math.random(); },
                repeat((i1) => [
                    nonblock((s: Scheduler, data: S_DATA = s.custom_fields) => [
                        () => {
                            data.curve = new CurveMask(ssc, cfc);
                            EntityPool.INSTANCE.add(data.curve);
                            data.a0 = a0 + Math.PI * 2 / n * m * i1;
                        },
                        repeat((i2) => [
                            () => {
                                const bullet = new MovePoint(ssb, cfb);
                                bullet.setMotion(motion(data.a0, da, w0));
                                bullet.simpleInit(0, 0, v, data.a0);
                                data.curve.add(bullet);
                                EntityPool.INSTANCE.add(bullet);
                            },
                            5 * time_scale,
                        ], 32),
                    ]),
                    4 * time_scale,
                ], n),
                240 * time_scale
            ])
        ]);
    }
}