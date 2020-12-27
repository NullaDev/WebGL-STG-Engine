import { EntityPool } from "../../stage/EntityPool";
import { Repeat, RepeatSupplier, Scheduler, SchedulerParam } from "../../stage/Scheuler";

export const repeat = (item: Repeat, n: number = Infinity) => () => new RepeatSupplier(item, n);
export const nonblock = (item: SchedulerParam) => () => EntityPool.INSTANCE.add(new Scheduler(item));
