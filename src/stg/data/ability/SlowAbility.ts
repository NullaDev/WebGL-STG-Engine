
import { EntityPool } from "stg/stage/EntityPool";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class SlowAbility extends AbstractAbility {

    constructor() {
        super(120);
    }

    public update(): void {
        EntityPool.INSTANCE.special_effects.time_slowdown(0.5);
        this.special_remain -= EntityPool.INSTANCE.special_effects.time_rate;
    }
    public onActivate(): void {
    }

};

export const ability_slow : AbilityEntry = {
    name:"slow",
    init: ()=>new SlowAbility()
}