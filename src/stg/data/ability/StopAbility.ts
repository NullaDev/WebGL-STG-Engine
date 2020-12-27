
import { EntityPool } from "stg/stage/EntityPool";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class StopAbility extends AbstractAbility {

    constructor() {
        super(120);
    }

    public update(): void {
        this.special_remain--;
    }
    public onActivate(): boolean {
        if (EntityPool.INSTANCE.special_effects.list.length > 0)
            return false;
            EntityPool.INSTANCE.special_effects.time_slowdown(0, 120);
        return true;
    }

};


export const ability_stop: AbilityEntry = {
    name: "stop",
    init: () => new StopAbility()
}