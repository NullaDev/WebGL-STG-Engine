import * as BASE from "../entity/Entity";
import { collide } from "../util/Shape";
import { SpriteManager } from "../util/SpriteManager";

export class SpecialEffects {

    public time_rate: number = 1;

    constructor() {

    }

};

type CollidePoll = {
    id: BASE.CollideGroup,
    mask: BASE.CollideMask,
    list: BASE.EntityAny[],
}

const enum UpdateStage {
    PRE_INIT,
    UPDATE,
    POST_UPDATE,
    ADD_BACK
}

export class EntityPool {

    public static INSTANCE: EntityPool;

    private groups: CollidePoll[] = [];
    private pending: BASE.EntityAny[] = [];
    private update_stage: UpdateStage = UpdateStage.PRE_INIT;
    private time: number = 0;

    public special_effects: SpecialEffects = new SpecialEffects();

    constructor() {
        EntityPool.INSTANCE = this;
        this.groups.push({ id: BASE.CG_PLAYER, mask: BASE.CM_PLAYER, list: [] });
        this.groups.push({ id: BASE.CG_BOSS, mask: BASE.CM_BOSS, list: [] });
        this.groups.push({ id: BASE.CG_ENEMY, mask: BASE.CM_ENEMY, list: [] });
        this.groups.push({ id: BASE.CG_BULLET, mask: BASE.CM_BULLET, list: [] });
        this.groups.push({ id: BASE.CG_BOMB, mask: BASE.CM_BOMB, list: [] });
        this.groups.push({ id: BASE.CG_GHOST, mask: BASE.CM_GHOST, list: [] });
    }

    public registerGroup(mask: BASE.CollideMask): BASE.CollideGroup {
        const ret = this.groups.length;
        this.groups.push({ id: ret, mask: mask, list: [] });
        return ret;
    }

    public add(e: BASE.EntityAny) {
        if (this.update_stage != UpdateStage.ADD_BACK && this.update_stage != UpdateStage.PRE_INIT)
            this.pending.push(e);
        else
            this.groups[e.config.collide_group].list.push(e);
    }

    public update() {
        this.update_stage = UpdateStage.UPDATE;
        this.groups.forEach(pool => pool.list.forEach(e => e.update(e)));
        for (var i = 0; i < this.groups.length; i++) {
            for (var j = 0; j < this.groups.length; j++) {
                if (this.groups[i].mask & (1 << j)) {
                    // group i can attack group j
                    for (var ei of this.groups[i].list) {
                        if (ei.state != BASE.State.ALIVE || !ei.shaped_sprite || !ei.shaped_sprite.shape)
                            continue;
                        for (var ej of this.groups[j].list) {
                            if (ej.state != BASE.State.ALIVE || !ej.shaped_sprite || !ej.shaped_sprite.shape)
                                continue;
                            if (collide(ei, ej))
                                ei.attack(ei, ej);
                        }
                    }
                }
            }
        }
        this.update_stage = UpdateStage.POST_UPDATE;
        this.groups.forEach(pool => pool.list.forEach(e => e.postUpdate(e)));
        this.groups.forEach(pool => pool.list = pool.list.filter(e => e.state != BASE.State.DEAD));
        this.update_stage = UpdateStage.ADD_BACK;
        this.pending.forEach(e => this.add(e));
        this.pending = [];
        this.time++;
    }

    public async render() {
        var map: Map<number, Map<string, BASE.EntityAny[]>> = new Map();
        for (var pool of this.groups) {
            for (var entity of pool.list) {
                if (!entity.config.render_layer || !entity.shaped_sprite?.sprite)
                    continue;
                if (!map.has(entity.config.render_layer))
                    map.set(entity.config.render_layer, new Map());
                const submap = map.get(entity.config.render_layer);
                const path = entity.shaped_sprite?.sprite?.sprite?.path;
                if (!submap.has(path))
                    submap.set(path, []);
                submap.get(path).push(entity);
            }
        }
        var rlist: { rl: number, v: Map<string, BASE.EntityAny[]> }[] = [];
        map.forEach((v0, k0) => rlist.push({ rl: k0, v: v0 }));
        rlist.sort((a, b) => a.rl - b.rl);
        rlist.forEach(rl => rl.v.forEach((v1, k1) => SpriteManager.get(k1).draw(v1)));
    }

}