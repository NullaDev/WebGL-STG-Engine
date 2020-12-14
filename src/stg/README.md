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
- update: update logic 1
- attack: collision logic
- postUpdate: update logic 2

#### Config
- RenderLayer
- CollisionGroup
- CollisionMask: what groups to check for collision

#### Shape
- Circle, Line, or Curve, add more later
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

#### Entity Class Type Hierarchy

- `Shape`: A shape template
  - `ShapePoint`
    - `ShapeCircle`
      - Circle denoted by center and direction
      - Properties: `radius`
    - `SPLine`
      - Line denoted by center and direction
      - Properties: `rw` (half width), `rl` (half length)
  - `ShapeCurve`
    - `PointCurve`: Curve as a collection of points
    - `LineCurve`: Curve as a collection of connected points
  - `ShapeLine`: Line denoted by 2 endpoints and radius
- `ShapedSprite`: A shape template connected with a sprite
  - Defines relative size of sprite and shape
  - Properties: `shape`, `sprite`, `renderType`
  - `SSPoint`: shape is a `ShapePoint`, single sprite
  - `SSCurve`: shape is a `ShapeCurve`
- `ShapedInstance`: An instance that has a shaped sprite
  - Superclass of Entity
  - contains methods for rendering and collision 
  - `SIPoint`
  - `SICurve`
  - `SINull`
- `Entity`
  - `Scheduler`
  - `SelfMachine`
  - `Bullet`
  - `RayLaser`
  

### Page

### WebGL
- drawRect
- TODO: drawCurveLaser