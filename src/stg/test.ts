import { PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { EntityPool } from "./stage/EntityPool";
import { StageInit } from "./stage/StageInit";
import * as SRes from "./util/shaped_sprites";
import * as Res from "./util/sprites";
import { SpriteManager } from "./util/SpriteManager";
import { stage_list, ability_list } from "./data/index"
import { debug_info } from "../platform/platform_init";

const sm_abi: PlayerAbility = {
    radius: 1,
    pre_miss: 30,
    miss_time: 60,
    graze_radius: 24,
    max_graze: 600,
    init_bomb: 3,
    init_life: 3,
    init_ability: 5,
    max_bomb: 10,
    max_life: 10,
    max_ability: 5
}

export const stage_settings = {
    init: init,
    stage: 6,
    scale: 1,
    ability: 1,
    stage_list: stage_list,
    ability_list: ability_list
}

const sinit: StageInit = {
    load_sprite: () => SpriteManager.get(Res.res_000.path).load(),
    add_player: () => new SelfMachine(
        SRes.getSSCircle(Res.self_machine_foreground, 1),
        new PlayerPrototype(null, null, ability_list[stage_settings.ability].init()),
        sm_abi, 0, -192),
    add_schedule: null
}

export async function init() {
    await sinit.load_sprite();
    var pool = new EntityPool();
    pool.add(sinit.add_player());
    stage_list[stage_settings.stage].init(stage_settings.scale).forEach((e) => pool.add(e));
    debug_info.pool = pool;
    debug_info.stage = stage_settings;

}
