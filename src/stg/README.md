# STG Engine

## Layer & Class Structure

### Entity Pool
Update Cycle:
1. update logic 1: movement & launching
2. check collision: damage & kill
3. update logic 2: destroy & reflection
4. add back: entities launched in update logic 1 & 2 will be added to EntityPool

### Entity
- Config: Entity Type & Configuration
- State: Entity state
- Shape: Collsion Shape
- Sprite: Render Sprite
- px: location x-axis
- py: locattion, y-axis
- dir: direction, radian
- update: update logic 1
- attack: collision logic
- postUpdate: update logic 2

#### Config
- RenderLayer
- CollisionGroup
- CollisionMask: what groups to check for collision

#### Shape
- Circle or Line, add more later
- Must have one side to be circle during collision
- linked with Sprite

#### Sprite
- location on texture
- TODO: Animated Sprite, animated kill, etc

#### State
- PRE_ENTRY: before added to stage
- ALIVE: only state to check for collision
- LEAVING: killed, before deleted
- DEAD: pending to remove

### Page

### WebGL
- drawRect
- TODO: drawCurveLaser