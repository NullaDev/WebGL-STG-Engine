
import { EntityPool } from "stg/stage/EntityPool";
import { SelfMachine } from "../../entity/SelfMachine";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class InvincAbility extends AbstractAbility {

    constructor() {
        super(30);
    }

    public update(self: SelfMachine): void {
        this.special_remain -= EntityPool.INSTANCE.special_effects.time_rate;
        self.magn = this.special_remain > 0 ? -Infinity : 1;
    }

    public onActivate(): void {
    }

};

export const ability_invinc: AbilityEntry = {
    name: "invincibility",
    init: () => new InvincAbility()
}