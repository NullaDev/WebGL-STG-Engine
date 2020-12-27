import { move_point_event_listener_template, reflect_config_default, reflect_disable, reflect_linear } from "stg/entity/ComplexListener";
import { clone } from "stg/entity/Entity";
import { MovePoint, template_config_bullet } from "stg/entity/MovePoint";
import { EntityPool } from "stg/stage/EntityPool";
import { Mover, MoverConfig, Scheduler } from "stg/stage/Scheuler";
import { StageEntry } from "stg/stage/StageInit";
import * as SRes from "stg/util/shaped_sprites";
import * as Res from "stg/util/sprites";
import { nonblock, repeat } from "../StageBase";

export const stage_003: StageEntry = {
    name: "reflect and delayed altering",
    default_scale: 3,
    init: (time_scale: number) => {
        const ss = SRes.getSSCircle(Res.get_small(Res.S_Type.Grain, Res.S_Color.Red, Res.Sprite_Mode.Overlay), 1);
        const cf = clone(template_config_bullet);
        cf.listener = move_point_event_listener_template();
        const refcf = clone(reflect_config_default);
        refcf.max = 100;
        reflect_linear(refcf)(cf.listener);

        const n = 40;
        const m = 20;
        const da = Math.PI / 24;
        const v = 6 / time_scale;
        const t0 = 100 * time_scale;
        const ti0 = 1 * time_scale;
        const ti1 = 1 * time_scale;

        const rm: MoverConfig = {
            duration: t0 - ti1 * n - ti0 * m,
            px0: -96,
            px1: 96,
            py0: 32,
            py1: 112,
            dx1: 64,
            dy1: 64,
            ease: (a: number) => (1 - Math.cos(Math.PI * a)) / 2
        }

        const boss = new MovePoint(SRes.getSSCircle(Res.boss_background, 2), template_config_bullet)
            .setMotion((e) => (e.dir = e.time * Math.PI * 2 / 600, false)).simpleInit(0, 64, 0, 0);

        var a0 = 0;
        return new Scheduler([
            () => EntityPool.INSTANCE.add(boss),
            30 * time_scale,
            repeat((i0) => [
                () => a0 = Math.random() * Math.PI * 2,
                repeat((i0) => [
                    nonblock([repeat(() => [
                        () => EntityPool.INSTANCE.add(new MovePoint(ss, cf)
                            .setMotion((e, time_rate) => {
                                const t1 = t0 - i0 * ti1;
                                if (e.time - time_rate < t1 && e.time >= t1) {
                                    reflect_disable(refcf)(e);
                                    e.simpleInit(e.px, e.py, v, e.dir + (Math.random() * 2 - 1) * da);
                                }
                                return true;
                            })
                            .simpleInit(boss.px, boss.py, v, a0 + Math.PI * 2 / n * i0)),
                        ti0
                    ], m)]),
                    ti1
                ], n),
                ti0 * m,
                Mover.random(boss, rm)
            ])
        ]);
    }
}