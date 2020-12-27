
import { EntityPool } from "../stage/EntityPool";
import { AbstractAbility } from "./AbstractAbility";

export class StopAbility extends AbstractAbility {

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