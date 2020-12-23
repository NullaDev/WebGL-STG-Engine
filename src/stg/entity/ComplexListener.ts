import { MovePoint, MovePointEventListener } from "./MovePoint";
import { RayLaserEventListener } from "./RayLaser";

export const move_point_event_listener_template: MovePointEventListener = {
    onInit: [],
    onUpdate: [],
    onPostMotion: [],
    onPostUpdate: [],
    onAttack: [],
    onDestroy: [],
    onExitScreen: [],
    onKill: []
}

export const ray_laser_event_listener_template: RayLaserEventListener = {
    onInit: [],
    onUpdate: [],
    onPostMotion: [],
    onStateChange: [],
    onPostUpdate: [],
    onAttack: [],
    onContact: [],
    onDestroy: []
}

export type Adder<Config> = (config: Config) => (lst: MovePointEventListener) => void;

type CS_REF = {
    in_screen: boolean;
    ref_count: 0;
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
        }
    })
}

type CS_REF_M = {
    ori_px: number,
    ori_py: number
}

export const reflect_map: Adder<ReflectConfig> = (config: ReflectConfig) => (lst: MovePointEventListener) => {

    lst.onInit.push((self: MovePoint<any>) => {
        const cs = <CS_REF_M>self.custom_fields;
        cs.ori_px = self.px;
        cs.ori_py = self.py;
    });

    lst.onUpdate.push((self: MovePoint<any>) => {
        const cs = <CS_REF_M>self.custom_fields;
        self.px = cs.ori_px;
        self.py = cs.ori_py;
    });

    lst.onPostMotion.push((self: MovePoint<any>) => {
        const cs = <CS_REF_M>self.custom_fields;
        cs.ori_px = self.px;
        cs.ori_py = self.py;
        const dw = config.w1 - config.w0;
        const dh = config.h1 - config.h0;
        self.px = (self.px - config.w0) % (dw * 2);
        if (self.px < 0) self.px += dw * 2;
        self.py = (self.py - config.h0) % (dh * 2);
        if (self.py < 0) self.py += dh * 2;

        var flipw = self.px > dw;
        if (flipw) self.px = dw * 2 - self.px;
        var fliph = self.py > dh;
        if (fliph) self.py = dh * 2 - self.py;

        if (flipw) self.dir = Math.PI - self.dir;
        if (fliph) self.dir = -self.dir;
    });

}