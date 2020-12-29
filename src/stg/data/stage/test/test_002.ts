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
        const ssc0 = SRes.getCurveLaser(Res.S_Color.RedX, Res.Sprite_Mode.AddBlend, null);
        const ssc1 = SRes.getCurveLaser(Res.S_Color.YellowX, Res.Sprite_Mode.AddBlend, null);
        const ssc = [ssc0, ssc1];
        const cfb = clone(template_config_bullet);
        const cfc = clone(template_config_curve_mask);
        cfb.init_stall = 5 * time_scale;
        cfb.exit_margin = 100;
        ssb.sprite = null;

        type S1_DATA = {
            curve: CurveMask[]
        }

        type S0_DATA = {
            n: number,
            a0: number
        };

        const v = 2.5 / time_scale;
        const n0 = 24, n1 = 32;
        const da = Math.PI * 2 * 0.3;
        const w0 = Math.PI * 2 / 240 / time_scale;
        const t0 = 140 * time_scale;
        const t2 = 5 * time_scale;
        const ph = Math.PI * 0.17;

        const motion = (a0: number, da: number, w0: number) => (self: MovePoint<any>, time_rate: number) => {
            const a = a0 + da * Math.sin(self.time * w0 + ph);
            self.vx = v * Math.cos(a);
            self.vy = v * Math.sin(a);
            return true;
        }

        return [new Scheduler([
            60 * time_scale,
            repeat((i0) => [
                nonblock((s0: Scheduler, d0: S0_DATA = s0.custom_fields) => [
                    () => {
                        d0.n = Math.min(n0, Math.floor(n0 / 2 + i0 / 4));
                        d0.a0 = Math.PI * 2 * Math.random();
                    },
                    nonblock((s: Scheduler, d1: S1_DATA = s.custom_fields) => [
                        () => {
                            d1.curve = [];
                            for (var i1 = 0; i1 < d0.n; i1++) {
                                const c = new CurveMask(ssc[i0 % 2], cfc);
                                EntityPool.INSTANCE.add(c);
                                d1.curve.push(c);
                            }
                        },
                        repeat(() => [
                            () => {
                                for (var i1 = 0; i1 < d0.n; i1++) {
                                    const a0 = d0.a0 + (Math.floor((i0 + 1) / 2) % 2 * 2 - 1) * Math.PI * 2 / d0.n * i1;
                                    const bullet = new MovePoint(ssb, cfb);
                                    bullet.setMotion(motion(a0, (Math.floor((i0 + 1) / 2) % 2 * 2 - 1) * da, (i0 % 2 * 2 - 1) * w0));
                                    bullet.simpleInit(0, 0, v, a0);
                                    d1.curve[i1].add(bullet);
                                    EntityPool.INSTANCE.add(bullet);
                                }
                            },
                            t2
                        ], n1),
                    ])
                ]),

                t0
            ])
        ])];
    }
}