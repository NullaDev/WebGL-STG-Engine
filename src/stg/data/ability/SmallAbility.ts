
import { EntityPool } from "stg/stage/EntityPool";
import { SelfMachine } from "../../entity/SelfMachine";
import { AbilityEntry, AbstractAbility } from "./AbstractAbility";

class InvincAbility extends AbstractAbility {

    constructor() {
        super(300);
    }

    public update(self: SelfMachine): void {
        self.magn = this.special_remain > 0 ? 0 : 1;
    }

    public onActivate() {
        return true;
    }

};

export const ability_small: AbilityEntry<number> = {
    name: "small hitbox",
    init: () => new InvincAbility()
}