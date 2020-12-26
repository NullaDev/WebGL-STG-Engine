# Structure of Project function:
1. define all config ans shaped sprites
2. define boss object, global variables, and local variable types
3. define components if necessary
4. return Scheduler object

# Types:

```
Input = number | (() => void | number | ScheduleEntry) | ScheduleEntry | ScheduleSupplier
```

- `number`: waiting time in tick (precompiled on entry)
- `ScheduleEntry` is supplied by library functions of single action, such as `Mover`
- `ScheduleSupplier` is supplied by library frameworks, such as `repeat`
- arrow function:
  - `void`: execute a single action
  - `number`: wait, but compile at run time
  - `ScheduleEntry`: single action, but compile at run time
  - `ScheduleSupplier`: a set of actions, parameters specified ar run time

```
type Repeat = ((i?: number) => Input[]) | Input[];
const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);
```
loop through the input array n times, be aware of the difference between using arrow function or not

# Caveat
The values and parameters of elements are specified at the entry of the enclosing lambda function. For example:
```
a = 5;

repeat([
    () => a = 10,
    a,
    () => {...}
])
```
will wait 5 ticks each loop, because the value of a is specified statically.
```
a = 5;

repeat([
    () => a = 10,
    () => a,
    () => {...}
])
```
will wait 10 ticks each loop, because the value of a is specified at execution.
```
a = 5;

repeat(()=>[
    () => a = 10,
    a,
    () => {...}
])
```
will wait 5 ticks in the first loop, and then 10 ticks each loop, because the value of a is specified on entry of the loop block.
```
a = 100;

() => a = 5,
repeat([
    () => a = 10,
    a,
    () => {...}
])
```
will wait 100 ticks each loop, because the value of a is specified statically
```
a = 100;

() => a = 5,
() => repeat([
    () => a = 10,
    a,
    () => {...}
])
```
will wait 5 ticks each loop, because the value of a is specified on execution of the repeat block.

