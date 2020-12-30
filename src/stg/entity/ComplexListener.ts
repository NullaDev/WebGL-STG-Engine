import { SCR_HALF_HEIGHT, SCR_HALF_WIDTH } from "../../platform/Screen";
import { EntityPool } from "../stage/EntityPool";
import { State } from "./Entity";
import { MovePoint, MovePointEventListener } from "./MovePoint";
import { RayLaser, RayLaserConfig, RayLaserEventListener, RayLaserMotion, SSRay } from "./RayLaser";

export type Adder<Config> = (config: Config) => (lst: MovePointEventListener) => void;
export type RLAdder<Config> = (config: Config) => (lst: RayLaserEventListener) => void;

type CS_REF = {
    in_screen: boolean;
    ref_count: number;
};

export type ReflectConfig = {
    w0: number,
    w1: number,
    h0: number,
    h1: number,
    max: number,
    inner_bound: boolean,
    outer_bound: boolean
}

export const reflect_config_default: ReflectConfig = {
    w0: -SCR_HALF_WIDTH,
    w1: SCR_HALF_WIDTH,
    h0: -SCR_HALF_HEIGHT,
    h1: SCR_HALF_HEIGHT,
    max: Infinity,
    inner_bound: true,
    outer_bound: false
}

export const reflect_linear: Adder<ReflectConfig> = (config: ReflectConfig) => (lst: MovePointEventListener) => {

    lst.onInit.push((self: MovePoint<any>) => {
        const cs = <CS_REF>self.custom_fields;
        cs.in_screen = self.px > config.w0 && self.px < config.w1 && self.py > config.h0 && self.py < config.h1;
        cs.ref_count = 0;
    });

    lst.onPostMotion.push((self: MovePoint<any>, rate: number) => {
        const cs = <CS_REF>self.custom_fields;
        const pre = cs.in_screen;
        cs.in_screen = self.px > config.w0 && self.px < config.w1 && self.py > config.h0 && self.py < config.h1;
        if (pre && !cs.in_screen && config.inner_bound) {
            if (cs.ref_count < config.max && self.px <= config.w0) {
                cs.ref_count++;
                self.vx = -self.vx;
                self.px = 2 * config.w0 - self.px;
            }
            if (cs.ref_count < config.max && self.px >= config.w1) {
                cs.ref_count++;
                self.vx = -self.vx;
                self.px = 2 * config.w1 - self.px;
            }
            if (cs.ref_count < config.max && self.py <= config.h0) {
                cs.ref_count++;
                self.vy = -self.vy;
                self.py = 2 * config.h0 - self.py;
            }
            if (cs.ref_count < config.max && self.py >= config.h1) {
                cs.ref_count++;
                self.vy = -self.vy;
                self.py = 2 * config.h1 - self.py;
            }
            self.dir = Math.atan2(self.vy, self.vx);
            cs.in_screen = true;
        }
        if (!pre && cs.in_screen && config.outer_bound) {
            if (cs.ref_count < config.max && self.px >= config.w0) {
                cs.ref_count++;
                self.vx = -self.vx;
                self.px = 2 * config.w0 - self.px;
            }
            if (cs.ref_count < config.max && self.px <= config.w1) {
                cs.ref_count++;
                self.vx = -self.vx;
                self.px = 2 * config.w1 - self.px;
            }
            if (cs.ref_count < config.max && self.py >= config.h0) {
                cs.ref_count++;
                self.vy = -self.vy;
                self.py = 2 * config.h0 - self.py;
            }
            if (cs.ref_count < config.max && self.py <= config.h1) {
                cs.ref_count++;
                self.vy = -self.vy;
                self.py = 2 * config.h1 - self.py;
            }
            self.dir = Math.atan2(self.vy, self.vx);
            cs.in_screen = false;
        }
    })
}

export const reflect_disable: (config: ReflectConfig) => (e: MovePoint<any>) => void =
    (config: ReflectConfig) => (e: MovePoint<any>) => (<CS_REF>e.custom_fields).ref_count = config.max

type CS_RL_REF = {
    vx: number,
    vy: number,
    ref_count: number,
    togrow: number,
    toshrink: number
}

export type RLReflectConfig = {
    name: string,
    w0: number,
    w1: number,
    h0: number,
    h1: number,
    max: number,
    v: number,
    maxlen: number,
    body: SSRay,
    cf: RayLaserConfig,
}

export const rl_reflect_config_default: RLReflectConfig = {
    name: "",
    w0: -SCR_HALF_WIDTH,
    w1: SCR_HALF_WIDTH,
    h0: -SCR_HALF_HEIGHT,
    h1: SCR_HALF_HEIGHT,
    max: Infinity, maxlen: NaN,
    v: NaN, body: null, cf: null
}

export const reflect_rl: RLAdder<RLReflectConfig> = (config: RLReflectConfig) => (lst: RayLaserEventListener) => {

    const motion: RayLaserMotion = (self: RayLaser, time_rate: number) => {
        const cs = <CS_RL_REF>self.custom_fields;
        if (cs.togrow > 0) {
            const g = Math.min(cs.togrow, config.v * time_rate);
            time_rate -= g / config.v;
            self.len += g;
            cs.togrow -= g;
        }
        if (time_rate > 0) {
            self.px += time_rate * cs.vx;
            self.py += time_rate * cs.vy;
        }
        if (self.shaped_sprite.end.shape.rawExitScreen(
            self.px + self.len * Math.cos(self.dir),
            self.py + self.len * Math.sin(self.dir),
            self.shaped_sprite.base, SCR_HALF_WIDTH, SCR_HALF_HEIGHT) &&
            self.shaped_sprite.base.shape.rawExitScreen(
                self.px, self.py, self.shaped_sprite.base, SCR_HALF_WIDTH, SCR_HALF_HEIGHT))
            self.state = State.DEAD;
    }

    const within = (px: number, py: number) => px > config.w0 && px < config.w1 && py > config.h0 && py < config.h1

    const bmotion: RayLaserMotion = (self: RayLaser, time_rate: number) => {
        const cs = <CS_RL_REF>self.custom_fields;

        if (cs.toshrink > 0) {
            const g = Math.min(cs.toshrink, config.v * time_rate);
            self.len -= g;
            cs.toshrink -= g;
            if (cs.toshrink <= 0)
                self.state = State.DEAD;
        }
        if (cs.togrow > 0) {
            const g = Math.min(cs.togrow, config.v * time_rate);
            time_rate -= g / config.v;
            self.len += g;
            cs.togrow -= g;
        }
        if (time_rate > 0) {
            self.px += time_rate * cs.vx;
            self.py += time_rate * cs.vy;
        }
        if (self.shaped_sprite.base.shape.rawExitScreen(self.px, self.py, self.shaped_sprite.base, SCR_HALF_WIDTH, SCR_HALF_HEIGHT))
            self.state = State.DEAD;
    }

    lst.onInit.push((self: RayLaser) => {
        const cs = <CS_RL_REF>self.custom_fields;
        cs.ref_count = 0;
        cs.vx = config.v * Math.cos(self.dir);
        cs.vy = config.v * Math.sin(self.dir);
        cs.togrow = config.maxlen;
        cs.toshrink = 0;
        self.motion = motion;
    });

    lst.onPostMotion.push((self: RayLaser, rate: number) => {
        const cs = <CS_RL_REF>self.custom_fields;
        const headw = within(self.px, self.py);
        const ex = self.px + self.len * Math.cos(self.dir);
        const ey = self.py + self.len * Math.sin(self.dir);
        const endw = within(ex, ey);
        if (!endw && cs.ref_count < config.max) {
            const rl = new RayLaser(config.body, config.cf, bmotion);
            rl.init(self.px, self.py, self.dir, self.len);
            const subcs = <CS_RL_REF>rl.custom_fields;
            subcs.vx = cs.vx;
            subcs.vy = cs.vy;
            subcs.togrow = cs.togrow;
            EntityPool.INSTANCE.add(rl);

            var mx = 0, my = 0;

            if (cs.ref_count < config.max && ex <= config.w0) {
                mx = config.w0;
                my = self.py + (config.w0 - self.px) * cs.vy / cs.vx;

                cs.ref_count++;
                cs.vx = -cs.vx;
                self.px = 2 * config.w0 - self.px;
            }
            if (cs.ref_count < config.max && ex >= config.w1) {
                mx = config.w1;
                my = self.py + (config.w1 - self.px) * cs.vy / cs.vx;

                cs.ref_count++;
                cs.vx = -cs.vx;
                self.px = 2 * config.w1 - self.px;
            }
            if (cs.ref_count < config.max && ey <= config.h0) {
                my = config.h0;
                mx = self.px + (config.h0 - self.py) * cs.vx / cs.vy;

                cs.ref_count++;
                cs.vy = -cs.vy;
                self.py = 2 * config.h0 - self.py;
            }
            if (cs.ref_count < config.max && ey >= config.h1) {
                my = config.h1;
                mx = self.px + (config.h1 - self.py) * cs.vx / cs.vy;

                cs.ref_count++;
                cs.vy = -cs.vy;
                self.py = 2 * config.h1 - self.py;
            }
            const dlen = Math.sqrt((self.px - mx) ** 2 + (self.py - my) ** 2);
            self.len -= dlen;
            self.px = mx;
            self.py = my;
            cs.togrow += dlen;
            rl.len = dlen;
            subcs.toshrink = dlen + subcs.togrow;
            self.dir = Math.atan2(cs.vy, cs.vx);
        }
    })
}
