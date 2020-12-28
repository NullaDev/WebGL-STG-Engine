import { AbilityPrototype, SelfMachine } from "../../entity/SelfMachine";

export abstract class AbstractBomb implements AbilityPrototype<number> {

    constructor(readonly time_duration: number) {

    }

    time_remain: number = 0;

    public abstract update(self:SelfMachine):void;

    public abstract activate(self:SelfMachine):boolean;

    updateEnable(self: SelfMachine, enable: boolean) {
        if(this.time_remain >0){
            this.time_remain--;
            this.update(self);
        }
        if (self.bomb_count == 0 || !enable || this.time_remain > 0 ||!this.activate(self))
            return 0;
        this.time_remain = this.time_duration;
        self.bomb_count--;
        return this.time_duration;
    }

    render(layer: number, self: SelfMachine): void {
        throw new Error("Method not implemented.");
    }

    layers(): number[] {
        throw new Error("Method not implemented.");
    }

}