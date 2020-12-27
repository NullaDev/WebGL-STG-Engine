import { AbilityPrototype, PlayerAbility, PlayerPrototype, SelfMachine } from "./entity/SelfMachine";
import { SpriteManager } from "./util/SpriteManager";
import * as Res from "./util/sprites";
import * as SRes from "./util/shaped_sprites";
import { EntityPool } from "./stage/EntityPool";
import { StageEntry, StageInit } from "./stage/StageInit";
import { SlowAbility } from "./data/SlowAbility";
import { StopAbility } from "./data/StopAbility";
import { stage_000 } from "./data/stage/stage/stage_000";
import { stage_001 } from "./data/stage/stage/stage_001";
import { stage_002 } from "./data/stage/stage/stage_002";
import { stage_003 } from "./data/stage/stage/stage_003";
import { stage_004 } from "./data/stage/stage/stage_004";
import { stage_005 } from "./data/stage/stage/stage_005";
import { test_000 } from "./data/stage/test/test_000";
import { test_001 } from "./data/stage/test/test_001";

const abilities: (() => AbilityPrototype)[] = [() => new SlowAbility(), () => new StopAbility()];
const stage_list: StageEntry[] = [stage_000, stage_001, stage_002, stage_003, stage_004, stage_005, test_000, test_001];

const sm_abi: PlayerAbility = {
    pre_miss: 30,
    miss_time: 60,
    bomb_time: 60,
    graze_radius: 24,
    max_graze: 600,
    init_bomb: 3,
    init_life: 3,
    init_ability: 5,
    max_bomb: 10,
    max_life: 10,
    max_ability: 5
}

const stage_settings = {
    init: init,
    stage: 1,
    scale: 3,
    ability: 1,
    list: stage_list
}

const sinit: StageInit = {
    load_sprite: () => SpriteManager.get(Res.res_000.path).load(),
    add_player: () => new SelfMachine(
        SRes.getSSCircle(Res.self_machine_foreground, 1),
        new PlayerPrototype(null, null, abilities[stage_settings.ability]()),
        sm_abi, 0, -192),
    add_schedule: null
}

export async function init() {
    await sinit.load_sprite();
    var pool = new EntityPool();
    pool.add(sinit.add_player());
    pool.add(stage_list[stage_settings.stage].init(stage_settings.scale));
    eval("window.debug_info.pool = pool");
    eval("window.debug_info.stage = stage_settings");

}
