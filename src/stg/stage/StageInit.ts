import { SelfMachine } from "../entity/SelfMachine";
import { Scheduler } from "./Scheuler";

export type StageEntry = {
    name: string,
    default_scale: number,
    init: (time_scale: number) => Scheduler
};

export type StageInit = {
    load_sprite: () => Promise<void>,
    add_player: () => SelfMachine,
    add_schedule: (time_scale: number) => Scheduler
}