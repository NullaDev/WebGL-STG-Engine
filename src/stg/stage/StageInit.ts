import { SelfMachine } from "../entity/SelfMachine";
import { CheckEnabled, Scheduler } from "./Scheuler";

export type StageInit = {
    load_sprite: () => Promise<void>,
    add_player: () => SelfMachine,
    add_schedule: (time_scale: number) => Scheduler<CheckEnabled extends true ? boolean : unknown>
}