import { ShapeCircle, ShapedInstance, SSPoint } from "../util/Shape";
import { CUSTOM, RENDER_TYPE, SpriteManager } from "../util/SpriteManager";
import * as Screen from "../../platform/Screen";
import { Config, Entity, EntityAny, RL_PLAYER, State, template_config_player } from "./Entity";
import { EntityPool } from "../stage/EntityPool";
import * as gl from "../../platform/gl"
import * as Res from "../util/sprites"

export type PlayerAction = {
    pos_x: number,
    pos_y: number,
    key_z: boolean,
    key_x: boolean,
    key_c: boolean
}

export type PlayerAbility = {
    readonly radius: number,
    readonly pre_miss: number,
    readonly miss_time: number,
    readonly graze_radius: number,
    readonly max_graze: number,
    readonly init_bomb: number,
    readonly max_bomb: number,
    readonly init_life: number,
    readonly max_life: number,
    readonly init_ability: number,
    readonly max_ability: number
}

export interface AbilityPrototype<T> {
    updateEnable(self: SelfMachine, enable: boolean): T;
    render(layer: number, self: SelfMachine): void;
    layers(): number[];
}

export class PlayerPrototype {

    constructor(
        public shoot: AbilityPrototype<void>,
        public bomb: AbilityPrototype<number>,
        public ability: AbilityPrototype<number>
    ) { }

    updateShoot(self: SelfMachine, shoot: boolean): void {
        this.shoot?.updateEnable(self, shoot);
    }

    updateBomb(self: SelfMachine, bomb: boolean): number {
        return this.bomb?.updateEnable(self, bomb);

    }

    updateAbility(self: SelfMachine, ability: boolean): number {
        return this.ability?.updateEnable(self, ability);

    }

    render(layer: number, self: SelfMachine): void {
        this.shoot?.render(layer, self);
        this.bomb?.render(layer, self);
        this.ability?.render(layer, self);
    }

    layers(): number[] {
        var ans: number[] = [];
        if (this.shoot) ans = ans.concat(this.shoot.layers());
        if (this.bomb) ans = ans.concat(this.bomb.layers());
        if (this.ability) ans = ans.concat(this.ability.layers());
        return ans;
    }
}

type SME = Entity<SelfMachine, RENDER_TYPE.CUSTOM, any, any> & CUSTOM;

const granularity = 2;

export class SelfMachine extends ShapedInstance<SelfMachine, RENDER_TYPE.CUSTOM, any, any> implements SME {

    public static INSTANCE: SelfMachine = null;
    private static action: PlayerAction = null;

    public static updateState(act: PlayerAction) {
        SelfMachine.action = act;
    }

    config: Config = template_config_player;
    state: State = State.ALIVE;
    readonly proto: PlayerPrototype;
    readonly ability: PlayerAbility;
    readonly sprite: SSPoint<ShapeCircle>;

    missed: boolean = false;
    bombed: number = 0;
    grazed: boolean = false;
    post_grazed: boolean = false;
    pre_miss: number = 0;
    miss_time: number = 0;
    invince_time: number = 0;
    px = 0;
    py = 0;
    dir = 0;
    prex = 0;
    prey = 0;

    graze_total: number = 0;
    graze_current: number = 0;
    bomb_count: number;
    life_count: number;
    ability_count: number;
    magn: number = 1;

    constructor(ss: SSPoint<ShapeCircle>, proto: PlayerPrototype, abi: PlayerAbility, x: number, y: number) {
        super(RENDER_TYPE.CUSTOM, null);
        SelfMachine.INSTANCE = this;
        this.proto = proto;
        this.ability = abi;
        this.sprite = ss;
        this.px = x;
        this.py = y;
        this.dir = 0;
        this.bomb_count = abi.init_bomb;
        this.life_count = abi.init_life;
        this.ability_count = abi.init_ability;
        this.renderType = RENDER_TYPE.CUSTOM;
    }

    update(_: SME): void {
        if (!SelfMachine.action)
            return;
        this.prex = this.px;
        this.prey = this.py;
        const rate = EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        this.px += SelfMachine.action.pos_x;
        this.py += SelfMachine.action.pos_y;
        if (this.px < -Screen.SCR_HALF_WIDTH)
            this.px = -Screen.SCR_HALF_WIDTH;
        if (this.px > Screen.SCR_HALF_WIDTH)
            this.px = Screen.SCR_HALF_WIDTH;
        if (this.py < - Screen.SCR_HALF_HEIGHT)
            this.py = -Screen.SCR_HALF_HEIGHT;
        if (this.py > Screen.SCR_HALF_HEIGHT)
            this.py = Screen.SCR_HALF_HEIGHT;
        this.dir = this.time * this.sprite.sprite.sprite.omega;
        this.proto.updateShoot(this, SelfMachine.action.key_z);
        this.bombed = this.proto.updateBomb(this, SelfMachine.action.key_x);
        if (!this.bombed)
            this.bombed = this.proto.updateAbility(this, SelfMachine.action.key_c);
    }

    postUpdate(_: SME): void {
        this.post_grazed = this.grazed;
        if (this.grazed) {
            if (this.graze_current < this.ability.max_graze)
                this.graze_current += EntityPool.INSTANCE.special_effects.time_rate;
            this.graze_total++;
            if (this.graze_current >= this.ability.max_graze) {
                if (this.ability_count < this.ability.max_ability) {
                    this.ability_count++;
                    this.graze_current = 0;
                }
            }
            this.grazed = false;
        }
        if (this.miss_time > 0)
            this.miss_time--;
        if (this.pre_miss > 0) {
            this.pre_miss--;
            if (this.pre_miss == 0) {
                // Miss
                console.log("missed");
                this.miss_time = this.ability.miss_time;
            }
        }
        if (this.missed) {
            this.missed = false;
            this.pre_miss = this.ability.pre_miss;
        }
        if (this.bombed) {
            this.miss_time = this.bombed;
            this.bombed = 0;
            if (this.pre_miss > 0) {
                // bomb after miss
                console.log("bomb after miss");
                this.pre_miss = 0;
            }
        }
        if (this.miss_time > 0 || this.pre_miss > 0) {
            this.state = State.LEAVING;
            this.invince_time++;
            if (Math.floor(this.invince_time / 6) % 2 == 0) {
                this.shaped_sprite = null;
            }
            else {
                this.shaped_sprite = this.sprite;
            }
        }
        else {
            this.state = State.ALIVE;
            this.invince_time = 0;
            this.shaped_sprite = this.sprite;
        }
    }

    attack(_: SME, target: EntityAny): void {

    }

    public damaged(_: SME, s: EntityAny) {
        if (this.pre_miss == 0 && this.miss_time == 0)
            this.missed = true;
        return s.damaged(s, this);
    }

    public collideCheck = (s: EntityAny) => {
        const len = Math.sqrt((this.px - this.prex) ** 2 + (this.py - this.prey) ** 2);
        const num = Math.max(1, Math.ceil(len / granularity));
        var min = Infinity;
        for (var i = 0; i < num; i++) {
            const x = this.px + (this.prex - this.px) * i / num;
            const y = this.py + (this.prey - this.py) * i / num;
            min = Math.min(min, s.distanceTo(x, y));
        }
        const rad = this.sprite.shape.radius * this.ability.radius * this.magn;
        if (min - rad < this.ability.graze_radius)
            this.grazed = true;
        return min < rad;
    }

    public layers() {
        return [...this.proto.layers(), RL_PLAYER];
    }

    public render(layer: number) {
        const xyrwh: number[] = [];
        var i = 0;
        var img = null;
        const addRect = (x: number, y: number, dir: number, alpha: number, ss: SSPoint<any>) => {
            xyrwh.push(x);
            xyrwh.push(y);
            xyrwh.push(dir + Math.PI / 2);
            xyrwh.push(ss.w / 2);
            xyrwh.push(ss.h / 2);
            const sprite = ss.sprite;
            sprite.pushXYWH(xyrwh,this.time);
            xyrwh.push(alpha);
            i++;
            img = SpriteManager.get(sprite.sprite.sprite.path).img;
        }
        this.proto.render(layer, this);
        if (layer == RL_PLAYER && this.shaped_sprite?.sprite) {
            addRect(this.px, this.py, this.dir, 1, this.shaped_sprite);
            gl.setMode(Res.Sprite_Mode.Overlay);
            gl.drawRects(new Float32Array(xyrwh), i, img);
        }
    }

}

