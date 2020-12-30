# WebGL-STG-Engine
test project to experiment with WebGL

# Install

install npm, and then run
```
npm install
```
- `build`: build webpack project in production mode
- `serve`: host local hot-update webpack server in development mode
- `local`: host local server

# How to Play

moving:
1. WASD (use shift for precise control)
2. 4 arrow keys (use shift for precise control)
3. mouse: press and drag
4. Shift + mouse motion (don't need to press mouse)

control:
`Esc` for pause
`c` for special abilities

Note: this engine detects frame rate automatically, if the page is not active during loading, it will have a very slow frame rate and thus update multiple cycles per frame, making the engine goes insanely fast. If this happens, please refresh.

# Structure of Project File:
1. define all config ans shaped sprites
2. define boss object, global variables, and local variable types
3. define components if necessary
4. return Scheduler object

# Types:

## Resources

In general, you can refer to files in `src/stg/data/stage/**/*` for reference. They contains demo of all features of this engine.

### Sprite and ShapedSprite

Sprite: sprite of a prototype of bullet, laser, or curve laser. use `sprites.get_small`, `sprites.get_middle`, `sprites.get_large` to get coresponding bullet sprites. use `S_Type`, `M_Type`, `L_Type`, `S_Color`, `M_Color`, `L_Color`, and `Sprite_Mode` to choose the shape (type), color, and blending mode (Overlay for normal sprite or AddBlend for glowing sprite).

ShapedSprite: sprite and shape of a prototype of bullet, laser, or curve laser. Use `shaped_sprites.getSSCircle` to get round bullet, `shaped_sprites.getLongBullet` to get bar-like bullet, `shaped_sprites.getRayLaser` to get Laser SS, and `shaped_sprites.getCurveLaser` to get Curve Laser SS.

You need ShapedSprite for most instances.

### EntityPool

EntityPool contains all instances. You can call `EntityPool.INSTANCE` to refer to it, add things to it, or get information.

`EntityPool.INSTANCE.special_effects` contains information of active special effects, currently there is only one, time rate. It can be used to slow the engine down.

### SelfMachine

use `SelfMachine.INSTANCE` to get player information.

## Input
`Input` defines the elements of project tree
```ts
type Item = ScheduleEntry | ScheduleSupplier
type ItemSup = () => (void | number | Item)
type Input = ItemSup | number
type SchedulerPAram = (s:Scheduler) => Input[] | Input[]
```

- `number`: waiting time in frame (precompiled on entry)
- `()=>void`: execute a single action
- `()=>number`: wait, but compile at run time
- `()=>ScheduleEntry`: single action supplied by library functions, such as `Mover`
- `()=>ScheduleSupplier`: a set of actions supplied by library frameworks, such as `repeat`

## Repeat

```ts
type Repeat = ((i?: number) => Input[]) | Input[];
const repeat = (item: Repeat, n: number = Infinity) => new RepeatSupplier(item, n);
```
loop through the input array n times, be aware of the difference between using arrow function or not

## nonblock
nonblock takes the same argument as Scheduler, it offers non-blocking execution, or parallel tasks.
Note that nonblock has 1 frame delay, as what it actually does it adding a new Scheduler.

# Caveat: Arrow Function or Not

## Common Mistake
1. When you are using `()=>{}` as code blocks for only one line, please don't use `() => a = b`, as it will be interpreted as `()=>number` and makes your stage weird. Use `() => { a = b }` to prevent unwanted behavior. You can solve this issue by using eslint.

2. When the delay time is variable, please don't use it directly. For example, 
```
repeat((i0)=>[
    i0,
    ()=>{...}
])
```
will work correctly, but
```
repeat((i0)=>[
    ()=>{a=i0}
    a,
    ()=>{...}
])
```
will not.

It will be explained in the following section.

## Scope and Initialization Time

The values and parameters of elements are specified at the entry of the enclosing lambda function. For example:
```ts
a = 5;

repeat([
    () => { a = 10 },
    a,
    () => {...}
])
```
will wait 5 frames each loop, because the value of a is specified statically.
```ts
a = 5;

repeat([
    () => { a = 10 },
    () => a,
    () => {...}
])
```
will wait 10 frames each loop, because the value of a is specified at execution.
```ts
a = 5;

repeat(()=>[
    () => { a = 10 },
    a,
    () => {...}
])
```
will wait 5 frames in the first loop, and then 10 frames each loop, because the value of a is specified on entry of the loop block.
```ts
a = 100;

() => a = 5,
repeat([
    () => { a = 10 },
    a,
    () => {...}
])
```
will wait 100 frames each loop, because the value of a is specified statically
```ts
a = 100;

() => a = 5,
repeat(() => [
    () => { a = 10 },
    a,
    () => {...}
])
```
will wait 5 frames each loop, because the value of a is specified on execution of the repeat block.

# Config

## General Config
Config specifies the render layer, collide group, and collide mask. each group can only have one mask, so if you want your bullet to have a different mask, you must create a new group. Config is shared across multiple instances to reduce memory usage and garbage collection time. Event Listeners are also in config (A set of Event Listeners for each bullet would be a hell for the VM).

## Bullet Config
Bullet Config contains more information, such as whether you want the direction of your bullet to aligned to its velocity settings, whether this bullet should be destroyed on exiting screen, or whether this bullet can be killed by colliding with player or player bomb.

## RayLaser Config
RayLaser config contains the open time and close time information. 

# Bullet Motion
Motion is implemented through arrow function. If you don't specify motion, it will go with linear motion. If you return true from the motion function, it means that you probably just modified the velocity and still want the bullet to move by velocity. If you return false, it means that you abandoned the velocity implementation and rather go with your own motion.

# Template: Reuse code

usually you can write an arrow function in the form of 
```ts
const template : (...args) => Input
```
where `args` are the parameters of this template, such as `n` for loop count, `ss` for various different sprites, and `w` for two rounds of lauchers with opposite directions.

# Bullet Config and Event Listener
You can either use the default config or clone the default config and modify it. Default config has no listener, if you want listener, get a new listener template and attach it to the config. The listener has a list for each events, push your event handler to the list to handle events. You are not allowed create variables in listener. To store bullet-specific information, you will need to define a type that contains all variables you want to define on each bullet, and cast the `custom_fields` field in bullet when accessing it. You may want to listen to `onOnit` to initialize `custom_fields`.

There are some common properties defined in `ComplexListener`, such as reflection of bullet and ray lasers. You can create a config of such property and inject the event listener with it. For example, to let bullets reflect off the walls, do 
```ts
const reflect_config = clone(reflect_config_default);
reflect_config.max = 2; // set max reflection to 2
reflect_config.h0 = -Infinity; // disable the lower refection boundary
const bullet_config = clone(template_config_bullet);
bullet_config = new MovePointEventListener();
reflect_linear(reflect_config)(bullet_config.listener)
```

# Global Variables

Global variables can be defined in the body of the project function. They can be accessed with arrow function. However, you should be aware that you should always use arrow function when you want to access those variables, otherwise the value you actually get might be an old value.

You should never access global variable in parallel tasks, as their values might be modified by another parallel task. In this case, use local variables instead.

# Local Variables

Local variables can be defined in `Scheduler`, or the task container. You have access to `Scheduler` within the project tree, and it has a field called `custom_fields` with type `any`. Define a type for your code and cast it to this type to enjoy typed local variables.
