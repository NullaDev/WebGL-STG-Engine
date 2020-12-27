
import { EntityPool } from "stg/stage/EntityPool";
import { SelfMachine } from "../../entity/SelfMachine";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class InvincAbility extends AbstractAbility {

    constructor() {
        super(300);
    }

    public update(self: SelfMachine): void {
        this.special_remain -= EntityPool.INSTANCE.special_effects.time_rate;
        self.magn = this.special_remain > 0 ? 0 : 1;
    }

    public onActivate() {
        return true;
    }

};

export const ability_small: AbilityEntry = {
    name: "small hitbox",
    init: () => new InvincAbility()
}