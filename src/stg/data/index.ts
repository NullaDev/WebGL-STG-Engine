import * as abilities from "./ability/index";
import * as stages from "./stage/index";
import { StageEntry } from "../stage/StageInit";
import { AbilityEntry } from "./ability/AbstractAbility";

export const ability_list: AbilityEntry<number>[] = Object.values(abilities)
export const stage_list: StageEntry[] = Object.values(stages);