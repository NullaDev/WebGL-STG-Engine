
import { EntityPool } from "stg/stage/EntityPool";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class SlowAbility extends AbstractAbility {

    constructor() {
        super(240);
    }

    public update(): void {
    }

    public onActivate(): boolean {
        EntityPool.INSTANCE.special_effects.time_slowdown(0.5, 240);
        return true;
    }

};

export const ability_slow: AbilityEntry<number> = {
    name: "slow",
    init: () => new SlowAbility()
}