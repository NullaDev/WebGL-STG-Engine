import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { clone } from "../../../entity/Entity";
import { MovePoint, template_config_bullet } from "../../../entity/MovePoint";
import { SelfMachine } from "../../../entity/SelfMachine";
import { EntityPool } from "../../../stage/EntityPool";
import { Scheduler } from "../../../stage/Scheuler";
import { StageEntry } from "../../../stage/StageInit";
import { nonblock, repeat } from "../StageBase";




export const stage_006: StageEntry = {
    name: "Test Special Effect",
    default_scale: 1,
    init: (time_scale: number) => {

        const ss0s = SRes.getSSCircle(Res.get_small(Res.S_Type.Scale, Res.S_Color.Red, Res.Sprite_Mode.Overlay), 1);
        const ss0x = SRes.getSSCircle(Res.get_small(Res.S_Type.Scale, Res.S_Color.RedX, Res.Sprite_Mode.Overlay), 1);
        const ss0l = SRes.getSSCircle(Res.get_large(Res.L_Type.Ball, Res.L_Color.Red, Res.Sprite_Mode.AddBlend), 1);
        const cf0 = template_config_bullet;
        const cf1 = clone(template_config_bullet);
        cf1.life = 160 * time_scale;
        cf1.kill_on_exit = false;
        cf1.kill_by = () => false;

        const n = 8, l0 = 160, l1 = 160, l2 = 240;
        const v0 = 6 / time_scale;
        const v1 = v0 * 0.4;
        const t0 = 2 * time_scale;
        const t1 = 6 * time_scale;
        const rate = 4;

        type S_DATA = {
            host: MovePoint<any>,
            plx: number,
            ply: number,
            dir: number,
            a1: number
        }

        const adder = (dir: number, da: number, a0 = Math.PI / 2) => repeat((i0) => [
            nonblock((s: Scheduler, data: S_DATA = s.custom_fields) => [
                () => {
                    data.a1 = a0 + Math.PI * 2 * i0 / n * dir;
                    const a2 = data.a1 + Math.PI / 2 * dir;
                    EntityPool.INSTANCE.add(data.host = new MovePoint(ss0l, cf1)
                        .simpleInit(l0 * Math.cos(data.a1) - l2 * Math.cos(a2), l0 * Math.sin(data.a1) - l2 * Math.sin(a2), v0, a2))
                },
                nonblock([
                    repeat(() => [
                        repeat((i1) => [
                            repeat((i2) => [
                                () => EntityPool.INSTANCE.add(new MovePoint(ss0x, cf0)
                                    .simpleInit(data.host.px, data.host.py, v1 * (2 + i1) / 4, data.a1 + (i2 - 1) * Math.PI / 3))
                            ], 3),
                        ], 3),
                        t0
                    ], Math.round(l2 * 2 / v0 / t0))
                ]),
                Math.round((l2 - l1) / v0),
                () => {
                    data.plx = SelfMachine.INSTANCE.px;
                    data.ply = SelfMachine.INSTANCE.py;
                },
                repeat(() => [
                    () => { data.dir = Math.atan2(data.ply - data.host.py, data.plx - data.host.px) },
                    repeat((i1) => [
                        repeat((i2) => [
                            () => EntityPool.INSTANCE.add(new MovePoint(ss0s, cf0)
                                .simpleInit(data.host.px, data.host.py, v1 * (2 + i1) / 4, data.dir + (i2 - 1) * da))
                        ], 3)
                    ], 3),

                    t0
                ], Math.round(l1 * 2 / v0 / t0))
            ]),
            t1
        ], n);



        return new Scheduler([
            30 * time_scale,
            repeat((i0) => [
                () => EntityPool.INSTANCE.special_effects.time_slowdown(1 / rate, (n * t1 + l1 / v0) * rate),
                adder(i0 % 2 * 2 - 1, Math.PI / 3),
                240 * time_scale
            ])
        ]);
    }
}