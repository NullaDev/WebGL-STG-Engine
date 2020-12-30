import { ShapeCircle, SSPoint } from "../util/Shape";
import { DamageInfo, EntityAny, State } from "./Entity";
import { MovePoint, MovePointConfig, MovePointEventListener } from "./MovePoint";

type HealthMark = {
    _health_marks: {
        mark: number,
        cleared: boolean
    }[]
}

export class LifeEventListener extends MovePointEventListener {
    onHealthDamaged: ((self: Life, source: EntityAny, dmg: number) => void)[] = [];
    onHealthZeroed: ((self: Life) => void)[] = [];

    addHealthMarker(mark: number, func: (self: Life) => void) {
        this.onInit.push((a) => {
            const hm: HealthMark = a.custom_fields;
            if (!hm._health_marks)
                hm._health_marks = [];
            const link = {
                mark: mark,
                cleared: false,
            }
            const cb = (a: Life) => {
                if (!link.cleared && a.health <= mark) {
                    link.cleared = true;
                    func(a);
                }
            }
            hm._health_marks.push(link);
            this.onHealthDamaged.push(cb);
        });
    }
}

export type LifeConfig = MovePointConfig<LifeEventListener> & {
    max_health: number,
    defense: (dmg: DamageInfo) => number
};

export class Life extends MovePoint<ShapeCircle, LifeConfig> {

    public health: number;

    constructor(ss: SSPoint<ShapeCircle>, config: LifeConfig) {
        super(ss, config);
        this.health = config.max_health;
    }

    public attack(_: Life, e: EntityAny) {
        this.config.listener?.onAttack?.forEach(x => x(this, e));
        e.damaged(e, this);
    }

    public damaged(_: Life, s: EntityAny) {
        if (this.config.damaged_by(s.config.collide_group)) {
            if (s.config.damage_info) {
                const damage = this.config.defense(s.config.damage_info);
                this.health -= damage;
                this.config.listener?.onHealthDamaged.forEach(e => e(this, s, damage));
            }
            this.config.listener?.onDamaged?.forEach(e => e(this, s));
            return true;
        }
        return false;
    }

    public postUpdate(_: Life) {
        if (this.health <= 0) {
            this.state = State.LEAVING;
            this.config.listener?.onHealthZeroed.forEach(e => e(this));
        }
        super.postUpdate(_);
    }

}