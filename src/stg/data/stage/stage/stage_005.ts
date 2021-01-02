import { RayLaser } from "stg/entity/RayLaser";
import { EntityPool } from "stg/stage/EntityPool";
import { Scheduler } from "stg/stage/Scheuler";
import { StageEntry } from "stg/stage/StageInit";
import * as Res from "stg/util/sprites";
import { reflect_laser, repeat } from "../StageBase";

export const stage_005: StageEntry = {
    name: "reflect laser",
    default_scale: 3,
    init: (time_scale: number) => {

        const data = [
            reflect_laser(8 / time_scale, 128, 2, Res.M_Color.Blue),
            reflect_laser(8 / time_scale, 128, 2, Res.M_Color.Red)
        ];

        const w = Math.PI * 2 / time_scale;
        const t0 = time_scale;

        const adder = (n0: number, ind: number, ni: number, wi: number, ti: number, ai: number) => repeat((i0) => [
            repeat((i1) => [
                () => EntityPool.INSTANCE.add(new RayLaser(data[ind][0], data[ind][1], null)
                    .init(0, 0, ai + Math.PI * 2 / ni * i1 + wi * i0, 0)),
            ], ni),
            ti
        ], n0);

        return [new Scheduler([
            30 * time_scale,
            repeat((i0) => [
                adder(20, 0, 3, (i0 % 2 * 2 - 1) * w * 0.0678, t0 * 6, Math.random() * 2 * Math.PI),
                100 * time_scale,
                adder(120, 1, 1, (i0 % 2 * 2 - 1) * w * 0.0234, t0, Math.random() * 2 * Math.PI),
                100 * time_scale
            ]),
        ])];
    }
}