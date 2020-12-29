import { move_point_event_listener_template } from "stg/entity/ComplexListener";
import { clone } from "stg/entity/Entity";
import { MovePoint, template_config_bullet } from "stg/entity/MovePoint";
import { EntityPool } from "stg/stage/EntityPool";
import { Mover, MoverConfig, Scheduler } from "stg/stage/Scheuler";
import { StageEntry } from "stg/stage/StageInit";
import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { nonblock, repeat } from "../StageBase";

export const test_001: StageEntry = {
    name: "Local Variable Test",
    default_scale: 1,
    init: (time_scale: number) => {
        type BulletStore = { callback: () => void };
        const cf = clone(template_config_bullet);
        cf.listener = move_point_event_listener_template();
        cf.listener.onAttack.push((self) => (<BulletStore>self.custom_fields).callback());
        const ss0 = SRes.getSSCircle(Res.get_small(Res.S_Type.Ball, Res.S_Color.Blue, Res.Sprite_Mode.Overlay), 1);
        const ss1 = SRes.getSSCircle(Res.get_large(Res.L_Type.Ball, Res.L_Color.Blue, Res.Sprite_Mode.AddBlend), 1);
        const ss2 = SRes.getSSCircle(Res.get_small(Res.S_Type.Ball, Res.S_Color.Red, Res.Sprite_Mode.Overlay), 1);
        const ss3 = SRes.getSSCircle(Res.get_large(Res.L_Type.Ball, Res.L_Color.Red, Res.Sprite_Mode.AddBlend), 1);
        const ss4 = SRes.getSSCircle(Res.get_small(Res.S_Type.Ball, Res.S_Color.Yellow, Res.Sprite_Mode.Overlay), 1);
        const ss5 = SRes.getSSCircle(Res.get_large(Res.L_Type.Ball, Res.L_Color.Yellow, Res.Sprite_Mode.AddBlend), 1);
        const ss6 = SRes.getSSCircle(Res.get_small(Res.S_Type.Ball, Res.S_Color.Green, Res.Sprite_Mode.Overlay), 1);
        const ss7 = SRes.getSSCircle(Res.get_large(Res.L_Type.Ball, Res.L_Color.Green, Res.Sprite_Mode.AddBlend), 1);

        const sss = [[ss0, ss1], [ss2, ss3], [ss4, ss5], [ss6, ss7]];

        const rm: MoverConfig = {
            duration: 40 * time_scale,
            px0: -96,
            px1: 96,
            py0: 32,
            py1: 112,
            dx1: 64,
            dy1: 64,
            ease: (a: number) => (1 - Math.cos(Math.PI * a)) / 2
        }

        type TaskStore = { px: number, py: number, count: number };
        const r = 50;
        const m = 40;
        const v = 2.5 / time_scale;
        const adder = (ind: number) => (scheduler: Scheduler, data: TaskStore = scheduler.custom_fields) => [
            () => {
                const a0 = Math.random() * Math.PI * 2;
                data.px = r * Math.cos(a0);
                data.py = 64 + r * Math.sin(a0);
                data.count = 0;
            },
            repeat([
                repeat((i) => [
                    () => EntityPool.INSTANCE.add(new MovePoint(data.count == 0 ? sss[ind][0] : sss[ind][1], cf)
                        .simpleInit(data.px, data.py, v, Math.PI * 2 / m * i)
                        .init((bullet, bullet_data: BulletStore = bullet.custom_fields) => {
                            bullet_data.callback = () => data.count++;
                        })),
                ], m),
                () => data.count = 0,
                Mover.random(data, rm)
            ])
        ];
        return [new Scheduler([
            60 * time_scale,
            repeat((i) => [
                nonblock(adder(i)),
                150 * time_scale
            ], 4)
        ])];
    }
}