
import { EntityPool } from "stg/stage/EntityPool";
import { SelfMachine } from "../../entity/SelfMachine";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class InvincAbility extends AbstractAbility {

    constructor() {
        super(30);
    }

    public update(self: SelfMachine): void {
        self.magn = this.special_remain > 0 ? -Infinity : 1;
    }

    public onActivate() {
        return true;
    }

};

export const ability_invinc: AbilityEntry<number> = {
    name: "invincibility",
    init: () => new InvincAbility()
}