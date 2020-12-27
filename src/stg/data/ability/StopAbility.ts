
import { EntityPool } from "stg/stage/EntityPool";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class StopAbility extends AbstractAbility {

    constructor() {
        super(120);
    }

    public update(): void {
        EntityPool.INSTANCE.special_effects.time_slowdown(0);
        this.special_remain --;
    }
    public onActivate(): void {
    }

};


export const ability_stop : AbilityEntry = {
    name:"stop",
    init: ()=>new StopAbility()
}