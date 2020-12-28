
import { EntityPool } from "stg/stage/EntityPool";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class StopAbility extends AbstractAbility {

    constructor() {
        super(120);
    }

    public update(): void {
    }
    
    public onActivate(): boolean {
        EntityPool.INSTANCE.special_effects.time_slowdown(0, 120);
        return true;
    }

};


export const ability_stop: AbilityEntry<number> = {
    name: "stop",
    init: () => new StopAbility()
}