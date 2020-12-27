import * as gl from "platform/gl"
import { GLHelper } from "stg/../platform/gl_ui";
import * as Res from "stg/util/sprites";
import * as SRes from "stg/util/shaped_sprites";
import { AbilityPrototype, SelfMachine } from "stg/entity/SelfMachine";
import { SpriteManager } from "stg/util/SpriteManager";
import { RL_BG } from "stg/entity/Entity";

const bright_alpha = 0.7;
const full_alpha = 0.5;
const partial_alpha = 0.2;
const ability_alpha = 1;
const resolutoon = 32;
const graze_ss = SRes.getSSCircle(Res.boss_background, 1);

export abstract class AbstractAbility implements AbilityPrototype {

    constructor(public readonly special_duration: number) { }

    special_remain: number = 0;

    public abstract update(): void;

    public abstract onActivate(): void;

    updateEnable(self: SelfMachine, special: boolean) {
        if (this.special_remain > 0) {
            this.update();
        }
        if (this.special_remain > 0)
            return false;
        if (special && self.ability_count > 0) {
            self.ability_count--;
            this.special_remain = this.special_duration;
            this.onActivate();
            return false;
        }
        return false;
    }

    render(layer: number, self: SelfMachine) {
        if (layer != RL_BG + 50)
            return;
        const helper = new GLHelper();
        gl.setMode(Res.Sprite_Mode.Overlay);

        const sp = graze_ss.sprite;
        const ts = [
            (sp.tx + sp.tw / 2) / sp.sprite.w,
            (sp.ty + sp.th / 2) / sp.sprite.h,
            sp.tw / 2 / sp.sprite.w,
            sp.th / 2 / sp.sprite.h
        ];
        helper.bind(SpriteManager.get(sp.sprite.path).img);
        if (this.special_remain == 0) {
            const da0 = Math.PI * 2 * self.ability_count / (self.ability.max_ability + 1);
            const da1 = Math.PI * 2 * (self.graze_current / self.ability.max_graze) / (self.ability.max_ability + 1);
            const a0 = self.post_grazed ? bright_alpha : full_alpha;
            const a1 = self.graze_current == self.ability.max_graze ? a0 : self.post_grazed ? bright_alpha : partial_alpha;

            helper.fan([da0, Math.PI / 2, self.px, self.py, graze_ss.w / 2, Math.PI / 6, ...ts, a0], resolutoon);
            helper.fan([da1, Math.PI / 2 + da0, self.px, self.py, graze_ss.w / 2, Math.PI / 6 + da0, ...ts, a1], resolutoon);

        }
        else {
            const da0 = Math.PI * 2 * this.special_remain / this.special_duration;
            helper.fan([da0, -da0 + Math.PI / 2, self.px, self.py, graze_ss.w / 2, -da0 + Math.PI / 6, ...ts, ability_alpha], resolutoon);
        }
        helper.flush();
    }

    layers() {
        return [RL_BG + 50];
    }
};

export type AbilityEntry = {
    name: string,
    init: ()=>AbilityPrototype
}