import { SelfMachine } from "../entity/SelfMachine";
import { Scheduler } from "../schedule/Scheuler";

export type StageInit = {
    load_sprite: () => Promise<void>,
    add_player: () => SelfMachine,
    add_schedule: (time_scale: number) => Scheduler
}