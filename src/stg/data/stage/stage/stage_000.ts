import { MovePoint, template_config_bullet} from "stg/entity/MovePoint";
import { Scheduler } from "stg/stage/Scheuler";
import * as Res from "stg/util/sprites";
import * as SRes from "stg/util/shaped_sprites";
import { EntityPool } from "stg/stage/EntityPool";
import { StageEntry } from "stg/stage/StageInit";
import { repeat } from "stg/data/stage/StageBase";

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