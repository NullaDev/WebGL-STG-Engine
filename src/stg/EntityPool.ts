import * as BASE from "./EntityBase";
import { collide } from "./Shape";
import { SpriteManager } from "./SpriteManager";

type CollidePoll = {
    id: BASE.CollideGroup,
    mask: BASE.CollideMask,
    list: BASE.Entity[],
}

enum UpdateStage {
    PRE_INIT,
    UPDATE,
    POST_UPDATE,
    ADD_BACK
}

export class EntityPool {

    public static INSTANCE : EntityPool;

    private groups: CollidePoll[] = [];
    private pending: BASE.Entity[] = [];
    private update_stage: UpdateStage = UpdateStage.PRE_INIT;

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

    public add(e: BASE.Entity) {
        if (this.update_stage != UpdateStage.ADD_BACK)
            this.pending.push(e);
        else
            this.groups[e.config.collide_group].list.push(e);
    }

    public update() {
        EntityPool.INSTANCE = this;
        this.update_stage = UpdateStage.UPDATE;
        this.groups.forEach(pool => pool.list.forEach(e => e.update(e)));
        for (var i = 0; i < this.groups.length; i++) {
            for (var j = 0; j < this.groups.length; j++) {
                if (this.groups[i].mask & j) {
                    // group i can attack group j
                    for (var ei of this.groups[i].list) {
                        if (ei.state != BASE.State.ALIVE || !ei.sprite || !ei.sprite.shape)
                            continue;
                        for (var ej of this.groups[j].list) {
                            if (ej.state != BASE.State.ALIVE || !ej.sprite || !ej.sprite.shape)
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
        this.pending.forEach(this.add);
        this.pending = [];
        EntityPool.INSTANCE = null;
    }

    public async render() {
        var map: Map<number, Map<string, BASE.Entity[]>> = new Map();
        for (var pool of this.groups) {
            for (var entity of pool.list) {
                if (!map.has(entity.config.render_layer))
                    map.set(entity.config.render_layer, new Map());
                const submap = map.get(entity.config.render_layer);
                if (!submap.has(entity.sprite.sprite))
                    submap.set(entity.sprite.sprite, []);
                submap.get(entity.sprite.sprite).push(entity);
            }
        }
        var rlist: { rl: number, v: Map<string, BASE.Entity[]> }[] = [];
        map.forEach((v0, k0) => rlist.push({ rl: k0, v: v0 }));
        rlist.sort((a,b)=>a.rl - b.rl);
        rlist.forEach(rl=>rl.v.forEach((v1,k1)=>SpriteManager.get(k1).drawRect(v1)));
    }

}