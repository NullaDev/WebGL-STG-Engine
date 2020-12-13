/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/stg/entity/Bullet.ts":
/*!**********************************!*\
  !*** ./src/stg/entity/Bullet.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "template_config_bullet": () => /* binding */ template_config_bullet,
/* harmony export */   "Bullet": () => /* binding */ Bullet
/* harmony export */ });
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ "./src/stg/entity/Entity.ts");
/* harmony import */ var _stage_EntityPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stage/EntityPool */ "./src/stg/stage/EntityPool.ts");
/* harmony import */ var _stage_Screen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stage/Screen */ "./src/stg/stage/Screen.ts");
/* harmony import */ var _sprite_Shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sprite/Shape */ "./src/stg/sprite/Shape.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var template_config_bullet = {
    render_layer: _Entity__WEBPACK_IMPORTED_MODULE_0__.RL_BULLET,
    collide_group: _Entity__WEBPACK_IMPORTED_MODULE_0__.CG_BULLET,
    collide_mask: _Entity__WEBPACK_IMPORTED_MODULE_0__.CG_BULLET,
    kill_on_exit: true,
    kill_by_bomb: true,
    auto_direction: true
};
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    function Bullet(shaped_shape, bc) {
        var _this = _super.call(this, shaped_shape) || this;
        _this.state = _Entity__WEBPACK_IMPORTED_MODULE_0__.State.PRE_ENTRY;
        _this.config = bc;
        return _this;
    }
    Bullet.prototype.simpleInit = function (x0, y0, v, a) {
        this.px = x0;
        this.py = y0;
        this.vx = v * Math.cos(a);
        this.vy = v * Math.sin(a);
        this.dir = a;
        return this;
    };
    Bullet.prototype.update = function (_) {
        if (this.state = _Entity__WEBPACK_IMPORTED_MODULE_0__.State.PRE_ENTRY)
            this.state = _Entity__WEBPACK_IMPORTED_MODULE_0__.State.ALIVE;
        var rate = _stage_EntityPool__WEBPACK_IMPORTED_MODULE_1__.EntityPool.INSTANCE.special_effects.time_rate;
        // Event: OnUpdate(time_rate);
        this.px += this.vx * rate;
        this.py += this.vy * rate;
        if (this.config.auto_direction)
            this.dir = Math.atan2(this.vy, this.vx);
    };
    Bullet.prototype.postUpdate = function (_) {
        if (this.shaped_sprite.shape.exitScreen(this.px, this.py, this.dir, _stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_WIDTH, _stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_HEIGHT)) {
            if (this.config.kill_on_exit)
                this.state = _Entity__WEBPACK_IMPORTED_MODULE_0__.State.LEAVING;
            // Event: OnExitScreen
        }
        // Event: OnPostUpdate
        if (this.state == _Entity__WEBPACK_IMPORTED_MODULE_0__.State.LEAVING) {
            // Event: OnDestroy
            this.state = _Entity__WEBPACK_IMPORTED_MODULE_0__.State.DEAD;
        }
    };
    Bullet.prototype.attack = function (_, e) {
        // Event: OnAttack(e)
    };
    return Bullet;
}(_sprite_Shape__WEBPACK_IMPORTED_MODULE_3__.SIPoint));



/***/ }),

/***/ "./src/stg/entity/Entity.ts":
/*!**********************************!*\
  !*** ./src/stg/entity/Entity.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CG_PLAYER": () => /* binding */ CG_PLAYER,
/* harmony export */   "CG_BOSS": () => /* binding */ CG_BOSS,
/* harmony export */   "CG_ENEMY": () => /* binding */ CG_ENEMY,
/* harmony export */   "CG_BULLET": () => /* binding */ CG_BULLET,
/* harmony export */   "CG_BOMB": () => /* binding */ CG_BOMB,
/* harmony export */   "CG_GHOST": () => /* binding */ CG_GHOST,
/* harmony export */   "CM_PLAYER": () => /* binding */ CM_PLAYER,
/* harmony export */   "CM_BOSS": () => /* binding */ CM_BOSS,
/* harmony export */   "CM_ENEMY": () => /* binding */ CM_ENEMY,
/* harmony export */   "CM_BULLET": () => /* binding */ CM_BULLET,
/* harmony export */   "CM_BOMB": () => /* binding */ CM_BOMB,
/* harmony export */   "CM_GHOST": () => /* binding */ CM_GHOST,
/* harmony export */   "RL_INVISIBLE": () => /* binding */ RL_INVISIBLE,
/* harmony export */   "RL_BG": () => /* binding */ RL_BG,
/* harmony export */   "RL_BOSS": () => /* binding */ RL_BOSS,
/* harmony export */   "RL_ENEMY": () => /* binding */ RL_ENEMY,
/* harmony export */   "RL_BULLET": () => /* binding */ RL_BULLET,
/* harmony export */   "RL_BOMB": () => /* binding */ RL_BOMB,
/* harmony export */   "RL_PLAYER": () => /* binding */ RL_PLAYER,
/* harmony export */   "RL_UI": () => /* binding */ RL_UI,
/* harmony export */   "RL_MAX": () => /* binding */ RL_MAX,
/* harmony export */   "State": () => /* binding */ State,
/* harmony export */   "clone": () => /* binding */ clone,
/* harmony export */   "template_config_player": () => /* binding */ template_config_player,
/* harmony export */   "template_config_boss": () => /* binding */ template_config_boss,
/* harmony export */   "template_config_enemy": () => /* binding */ template_config_enemy
/* harmony export */ });
var CG_PLAYER = 0;
var CG_BOSS = 1;
var CG_ENEMY = 2;
var CG_BULLET = 3;
var CG_BOMB = 4;
var CG_GHOST = 5;
var CM_PLAYER = 0;
var CM_BOSS = 1;
var CM_ENEMY = 1;
var CM_BULLET = 1;
var CM_BOMB = 14;
var CM_GHOST = 0;
var RL_INVISIBLE = 0;
var RL_BG = 100;
var RL_BOSS = 200;
var RL_ENEMY = 300;
var RL_BULLET = 400;
var RL_BOMB = 500;
var RL_PLAYER = 600;
var RL_UI = 700;
var RL_MAX = 1000;
var State;
(function (State) {
    State[State["PRE_ENTRY"] = 0] = "PRE_ENTRY";
    State[State["ALIVE"] = 1] = "ALIVE";
    State[State["LEAVING"] = 2] = "LEAVING";
    State[State["DEAD"] = 3] = "DEAD";
})(State || (State = {}));
function clone(t) {
    return Object.assign({}, t);
}
var template_config_player = {
    render_layer: RL_PLAYER,
    collide_group: CG_PLAYER,
    collide_mask: CM_PLAYER
};
var template_config_boss = {
    render_layer: RL_BOSS,
    collide_group: CG_BOSS,
    collide_mask: CM_BOSS
};
var template_config_enemy = {
    render_layer: RL_ENEMY,
    collide_group: CG_ENEMY,
    collide_mask: CM_ENEMY
};


/***/ }),

/***/ "./src/stg/entity/RayLaser.ts":
/*!************************************!*\
  !*** ./src/stg/entity/RayLaser.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ShapeRay": () => /* binding */ ShapeRay,
/* harmony export */   "RayLaserState": () => /* binding */ RayLaserState,
/* harmony export */   "SSRay": () => /* binding */ SSRay,
/* harmony export */   "SIRay": () => /* binding */ SIRay,
/* harmony export */   "RayLaser": () => /* binding */ RayLaser
/* harmony export */ });
/* harmony import */ var _sprite_Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sprite/Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprite/SpriteManager */ "./src/stg/sprite/SpriteManager.ts");
/* harmony import */ var _sprite_sprites__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sprite/sprites */ "./src/stg/sprite/sprites.ts");
/* harmony import */ var _stage_EntityPool__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stage/EntityPool */ "./src/stg/stage/EntityPool.ts");
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Entity */ "./src/stg/entity/Entity.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var ShapeRay = /** @class */ (function (_super) {
    __extends(ShapeRay, _super);
    function ShapeRay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapeRay.prototype.distanceTo = function (self, x, y) {
        var x0 = self.px;
        var y0 = self.py;
        var x1 = self.px + self.len * Math.cos(self.dir);
        var y1 = self.py + self.len * Math.sin(self.dir);
        var rl = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
        var dis = Math.abs((x1 - x0) * (y0 - y) - (x0 - x) * (y1 - y0));
        var d0 = Math.sqrt((x0 - x) * (x0 - x) + (y0 - y) * (y0 - y));
        var d1 = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        return Math.min(dis / rl, d0, d1) - self.shaped_sprite.w;
    };
    ShapeRay.INS = new ShapeRay();
    return ShapeRay;
}(_sprite_Shape__WEBPACK_IMPORTED_MODULE_0__.Shape));

var RayLaserState;
(function (RayLaserState) {
    RayLaserState[RayLaserState["WARNING"] = 0] = "WARNING";
    RayLaserState[RayLaserState["OPENING"] = 1] = "OPENING";
    RayLaserState[RayLaserState["OPENED"] = 2] = "OPENED";
    RayLaserState[RayLaserState["CLOSING"] = 3] = "CLOSING";
})(RayLaserState || (RayLaserState = {}));
var SSRay = /** @class */ (function (_super) {
    __extends(SSRay, _super);
    function SSRay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SSRay;
}(_sprite_Shape__WEBPACK_IMPORTED_MODULE_0__.ShapedSprite));

var SIRay = /** @class */ (function (_super) {
    __extends(SIRay, _super);
    function SIRay(ss) {
        return _super.call(this, _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_1__.RENDER_TYPE.RECT, ss) || this;
    }
    SIRay.prototype.rectCount = function () {
        return 1;
    };
    SIRay.prototype.render = function (xyrwh, i) {
        var w = this.shaped_sprite.w;
        var l = this.shaped_sprite.l;
        xyrwh[i * 5 + 0] = this.px + l / 2 * Math.cos(this.dir);
        xyrwh[i * 5 + 1] = this.py + l / 2 * Math.sin(this.dir);
        ;
        xyrwh[i * 5 + 2] = this.dir;
        xyrwh[i * 5 + 3] = w / 2;
        xyrwh[i * 5 + 4] = l / 2;
        var sprite = _sprite_sprites__WEBPACK_IMPORTED_MODULE_2__.SPRITES[this.shaped_sprite.sprite];
        xyrwh[i * 5 + 5] = sprite.tx;
        xyrwh[i * 5 + 6] = sprite.ty;
        xyrwh[i * 5 + 7] = sprite.tw;
        xyrwh[i * 5 + 8] = sprite.th;
    };
    return SIRay;
}(_sprite_Shape__WEBPACK_IMPORTED_MODULE_0__.ShapedInstance));

var RayLaser = /** @class */ (function (_super) {
    __extends(RayLaser, _super);
    function RayLaser(shaped_shape, cf) {
        var _this = _super.call(this, shaped_shape) || this;
        _this.state = _Entity__WEBPACK_IMPORTED_MODULE_4__.State.PRE_ENTRY;
        _this.rstate = RayLaserState.WARNING;
        _this.config = cf;
        return _this;
    }
    RayLaser.prototype.update = function (_) {
        if (this.state = _Entity__WEBPACK_IMPORTED_MODULE_4__.State.PRE_ENTRY)
            this.state = _Entity__WEBPACK_IMPORTED_MODULE_4__.State.ALIVE;
        var rate = _stage_EntityPool__WEBPACK_IMPORTED_MODULE_3__.EntityPool.INSTANCE.special_effects.time_rate;
        this.time += rate;
        if (this.rstate == RayLaserState.WARNING && this.time > this.config.warning_time) {
            this.rstate = RayLaserState.OPENING;
            this.time -= this.config.warning_time;
        }
        if (this.rstate == RayLaserState.OPENING) {
        }
        // Event: OnUpdate(time_rate);
    };
    RayLaser.prototype.postUpdate = function (_) {
        // Event: OnPostUpdate
        if (this.state == _Entity__WEBPACK_IMPORTED_MODULE_4__.State.LEAVING) {
            // Event: OnDestroy
            this.state = _Entity__WEBPACK_IMPORTED_MODULE_4__.State.DEAD;
        }
    };
    RayLaser.prototype.attack = function (_, e) {
        // Event: OnAttack(e)
    };
    return RayLaser;
}(SIRay));



/***/ }),

/***/ "./src/stg/schedule/Scheuler.ts":
/*!**************************************!*\
  !*** ./src/stg/schedule/Scheuler.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScheduleSupplier": () => /* binding */ ScheduleSupplier,
/* harmony export */   "RepeatSupplier": () => /* binding */ RepeatSupplier,
/* harmony export */   "template_config_scheduler": () => /* binding */ template_config_scheduler,
/* harmony export */   "Scheduler": () => /* binding */ Scheduler
/* harmony export */ });
/* harmony import */ var _entity_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity/Entity */ "./src/stg/entity/Entity.ts");
/* harmony import */ var _sprite_Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprite/Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _stage_EntityPool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stage/EntityPool */ "./src/stg/stage/EntityPool.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (undefined && undefined.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};



var ScheduleEntry = /** @class */ (function () {
    function ScheduleEntry() {
    }
    return ScheduleEntry;
}());
var Wait = /** @class */ (function (_super) {
    __extends(Wait, _super);
    function Wait(input) {
        var _this = _super.call(this) || this;
        _this.remain = input;
        return _this;
    }
    Wait.prototype.update = function (time_rate) {
        this.remain -= time_rate;
        if (this.remain < 0)
            return -this.remain;
        return 0;
    };
    return Wait;
}(ScheduleEntry));
var Adder = /** @class */ (function (_super) {
    __extends(Adder, _super);
    function Adder(input) {
        var _this = _super.call(this) || this;
        _this.todo = input;
        return _this;
    }
    Adder.prototype.update = function (time_rate) {
        this.todo();
        return time_rate;
    };
    return Adder;
}(ScheduleEntry));
var ScheduleSupplier = /** @class */ (function () {
    function ScheduleSupplier() {
    }
    return ScheduleSupplier;
}());

function parse(input) {
    return input.map(function (e) {
        return typeof e == "number" ? new Wait(e) :
            typeof e == "function" ? new Adder(e) :
                e;
    });
}
var RepeatSupplier = /** @class */ (function (_super) {
    __extends(RepeatSupplier, _super);
    function RepeatSupplier(input, n) {
        var _this = _super.call(this) || this;
        _this.index = 0;
        _this.todo = input;
        _this.total = n;
        return _this;
    }
    RepeatSupplier.prototype.supply = function () {
        if (this.index >= this.total)
            return null;
        var ans;
        if (typeof this.todo == "function")
            ans = this.todo(this.index);
        else
            ans = this.todo;
        this.index++;
        return parse(ans);
    };
    return RepeatSupplier;
}(ScheduleSupplier));

var template_config_scheduler = {
    render_layer: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.RL_INVISIBLE,
    collide_group: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_GHOST,
    collide_mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_GHOST
};
var Scheduler = /** @class */ (function (_super) {
    __extends(Scheduler, _super);
    function Scheduler(input) {
        var _this = _super.call(this) || this;
        _this.config = template_config_scheduler;
        _this.state = _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.PRE_ENTRY;
        _this.list = parse(input);
        return _this;
    }
    Scheduler.prototype.update = function (_) {
        if (this.state == _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.PRE_ENTRY)
            this.state = _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.ALIVE;
        var t = _stage_EntityPool__WEBPACK_IMPORTED_MODULE_2__.EntityPool.INSTANCE.special_effects.time_rate;
        while (this.list.length > 0 && t) {
            var sss = this.list[0];
            if (sss instanceof ScheduleSupplier) {
                var list = sss.supply();
                if (!list || !list.length) {
                    this.list.shift();
                }
                else
                    this.list = __spreadArrays(list, this.list);
            }
            else {
                t = sss.update(t);
                if (t > 0)
                    this.list.shift();
            }
        }
        if (this.list.length == 0)
            this.state = _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.LEAVING;
    };
    Scheduler.prototype.postUpdate = function (_) {
        if (this.state == _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.LEAVING)
            this.state = _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.DEAD;
    };
    Scheduler.prototype.attack = function (_) {
    };
    return Scheduler;
}(_sprite_Shape__WEBPACK_IMPORTED_MODULE_1__.SINull));



/***/ }),

/***/ "./src/stg/sprite/Shape.ts":
/*!*********************************!*\
  !*** ./src/stg/sprite/Shape.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shape": () => /* binding */ Shape,
/* harmony export */   "ShapePoint": () => /* binding */ ShapePoint,
/* harmony export */   "ShapeCircle": () => /* binding */ ShapeCircle,
/* harmony export */   "ShapedSprite": () => /* binding */ ShapedSprite,
/* harmony export */   "SSPoint": () => /* binding */ SSPoint,
/* harmony export */   "ShapedInstance": () => /* binding */ ShapedInstance,
/* harmony export */   "SIPoint": () => /* binding */ SIPoint,
/* harmony export */   "SINull": () => /* binding */ SINull,
/* harmony export */   "collide": () => /* binding */ collide
/* harmony export */ });
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteManager */ "./src/stg/sprite/SpriteManager.ts");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprites */ "./src/stg/sprite/sprites.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Shape = /** @class */ (function () {
    function Shape() {
    }
    return Shape;
}());

var ShapePoint = /** @class */ (function (_super) {
    __extends(ShapePoint, _super);
    function ShapePoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShapePoint.prototype.distanceTo = function (self, px, py) {
        px = px - self.px;
        py = py - self.py;
        var sd = self.dir;
        var sx = px * Math.cos(-sd) - py * Math.sin(-sd);
        var sy = py * Math.cos(-sd) + px * Math.sin(-sd);
        return this._distanceTo(sx, sy);
    };
    return ShapePoint;
}(Shape));

var ShapeCircle = /** @class */ (function (_super) {
    __extends(ShapeCircle, _super);
    function ShapeCircle(r) {
        var _this = _super.call(this) || this;
        _this.radius = r;
        return _this;
    }
    ShapeCircle.prototype.exitScreen = function (sx, sy, _, rw, rh) {
        return Math.abs(sx) > rw + this.radius || Math.abs(sy) > rh + this.radius;
    };
    ShapeCircle.prototype._distanceTo = function (x, y) {
        return Math.sqrt(x * x + y * y) - this.radius;
    };
    return ShapeCircle;
}(ShapePoint));

var ShapedSprite = /** @class */ (function () {
    function ShapedSprite() {
    }
    return ShapedSprite;
}());

var SSPoint = /** @class */ (function (_super) {
    __extends(SSPoint, _super);
    function SSPoint() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SSPoint;
}(ShapedSprite));

var ShapedInstance = /** @class */ (function () {
    function ShapedInstance(rt, ss) {
        this.renderType = rt;
        this.shaped_sprite = ss;
    }
    ShapedInstance.prototype.distanceTo = function (x, y) {
        return this.shaped_sprite.shape.distanceTo(this, x, y);
    };
    return ShapedInstance;
}());

var SIPoint = /** @class */ (function (_super) {
    __extends(SIPoint, _super);
    function SIPoint(ss) {
        return _super.call(this, _SpriteManager__WEBPACK_IMPORTED_MODULE_0__.RENDER_TYPE.RECT, ss) || this;
    }
    SIPoint.prototype.rectCount = function () {
        return 1;
    };
    SIPoint.prototype.render = function (xyrwh, i) {
        xyrwh[i * 9 + 0] = this.px;
        xyrwh[i * 9 + 1] = this.py;
        xyrwh[i * 9 + 2] = this.dir;
        xyrwh[i * 9 + 3] = this.shaped_sprite.w;
        xyrwh[i * 9 + 4] = this.shaped_sprite.h;
        var sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__.SPRITES[this.shaped_sprite.sprite];
        xyrwh[i * 9 + 5] = sprite.tx;
        xyrwh[i * 9 + 6] = sprite.ty;
        xyrwh[i * 9 + 7] = sprite.tw;
        xyrwh[i * 9 + 8] = sprite.th;
    };
    return SIPoint;
}(ShapedInstance));

var SINull = /** @class */ (function (_super) {
    __extends(SINull, _super);
    function SINull() {
        return _super.call(this, null, null) || this;
    }
    return SINull;
}(ShapedInstance));

function collide(e0, e1) {
    if (e0 instanceof SIPoint && e0.shaped_sprite.shape instanceof ShapeCircle)
        return e1.distanceTo(e0.px, e0.py) < e0.shaped_sprite.shape.radius;
    if (e1 instanceof SIPoint && e1.shaped_sprite.shape instanceof ShapeCircle)
        return collide(e1, e0);
    throw new Error("non-circle non-circle collision not found");
}


/***/ }),

/***/ "./src/stg/sprite/SpriteManager.ts":
/*!*****************************************!*\
  !*** ./src/stg/sprite/SpriteManager.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RENDER_TYPE": () => /* binding */ RENDER_TYPE,
/* harmony export */   "SpriteManager": () => /* binding */ SpriteManager
/* harmony export */ });
/* harmony import */ var _gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gl */ "./src/stg/sprite/gl.js");
/* harmony import */ var _sprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprites */ "./src/stg/sprite/sprites.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};


var RENDER_TYPE;
(function (RENDER_TYPE) {
    RENDER_TYPE[RENDER_TYPE["RECT"] = 0] = "RECT";
    RENDER_TYPE[RENDER_TYPE["STRIP"] = 1] = "STRIP";
})(RENDER_TYPE || (RENDER_TYPE = {}));
;
var SpriteManager = /** @class */ (function () {
    function SpriteManager(url) {
        this.img = null;
        this.path = url;
    }
    SpriteManager.prototype.loaded = function () {
        return this.img;
    };
    SpriteManager.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var img;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0,_gl__WEBPACK_IMPORTED_MODULE_0__.loadImage)(this.path)];
                    case 1:
                        img = _a.sent();
                        this.img = (0,_gl__WEBPACK_IMPORTED_MODULE_0__.loadTexture)(img);
                        return [2 /*return*/];
                }
            });
        });
    };
    SpriteManager.get = function (url) {
        if (SpriteManager.INS[url])
            return SpriteManager.INS[url];
        return (SpriteManager.INS[url] = new SpriteManager(url));
    };
    SpriteManager.prototype.draw = function (list) {
        var rectn = list.reduce(function (n, e) { return e.renderType == RENDER_TYPE.RECT ? n + e.rectCount() : n; }, 0);
        var xyrwh = new Float32Array(rectn * 9);
        var i = 0;
        for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
            var e = list_1[_i];
            if (e.renderType == RENDER_TYPE.RECT) {
                var r = e;
                r.render(xyrwh, i);
                i += r.rectCount();
            }
        }
        (0,_gl__WEBPACK_IMPORTED_MODULE_0__.drawRects)(xyrwh, list.length, this.img);
        for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
            var e = list_2[_a];
            if (e.renderType == RENDER_TYPE.STRIP) {
                var s = e;
                var ss = s.getSprite();
                var sp = _sprites__WEBPACK_IMPORTED_MODULE_1__.SPRITES[ss.sprite];
                for (var _b = 0, _c = s.render(); _b < _c.length; _b++) {
                    var a = _c[_b];
                    (0,_gl__WEBPACK_IMPORTED_MODULE_0__.drawSnake)(a, ss.w, a.length / 2, sp.tx, sp.ty, sp.tw, sp.th, this.img);
                }
            }
        }
    };
    SpriteManager.INS = {};
    return SpriteManager;
}());



/***/ }),

/***/ "./src/stg/sprite/shaped_sprites.ts":
/*!******************************************!*\
  !*** ./src/stg/sprite/shaped_sprites.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "small_round_red": () => /* binding */ small_round_red,
/* harmony export */   "ray_laser_red": () => /* binding */ ray_laser_red,
/* harmony export */   "curve_laser_red": () => /* binding */ curve_laser_red
/* harmony export */ });
/* harmony import */ var _entity_RayLaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity/RayLaser */ "./src/stg/entity/RayLaser.ts");
/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteManager */ "./src/stg/sprite/SpriteManager.ts");



var small_round_red = {
    renderType: _SpriteManager__WEBPACK_IMPORTED_MODULE_2__.RENDER_TYPE.RECT,
    sprite: "round_red",
    shape: new _Shape__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle(1),
    w: 4,
    h: 4
};
var ray_laser_red = {
    renderType: _SpriteManager__WEBPACK_IMPORTED_MODULE_2__.RENDER_TYPE.RECT,
    sprite: "",
    shape: _entity_RayLaser__WEBPACK_IMPORTED_MODULE_0__.ShapeRay.INS,
    w: 1,
    l: 1
};
//abstract
var curve_laser_red = {
    renderType: _SpriteManager__WEBPACK_IMPORTED_MODULE_2__.RENDER_TYPE.STRIP,
    sprite: "",
    shape: null,
    w: 1
};


/***/ }),

/***/ "./src/stg/sprite/sprites.ts":
/*!***********************************!*\
  !*** ./src/stg/sprite/sprites.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SPRITES": () => /* binding */ SPRITES
/* harmony export */ });
var SPRITES = {
    "round_red": {
        "sprite": "assets/missile_red.png",
        "tx": 0,
        "ty": 0,
        "tw": 1,
        "th": 1
    }
};


/***/ }),

/***/ "./src/stg/stage/EntityPool.ts":
/*!*************************************!*\
  !*** ./src/stg/stage/EntityPool.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SpecialEffects": () => /* binding */ SpecialEffects,
/* harmony export */   "EntityPool": () => /* binding */ EntityPool
/* harmony export */ });
/* harmony import */ var _entity_Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity/Entity */ "./src/stg/entity/Entity.ts");
/* harmony import */ var _sprite_Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprite/Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sprite/SpriteManager */ "./src/stg/sprite/SpriteManager.ts");
/* harmony import */ var _sprite_sprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sprite/sprites */ "./src/stg/sprite/sprites.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var SpecialEffects = /** @class */ (function () {
    function SpecialEffects() {
        this.time_rate = 1;
    }
    return SpecialEffects;
}());

;
var UpdateStage;
(function (UpdateStage) {
    UpdateStage[UpdateStage["PRE_INIT"] = 0] = "PRE_INIT";
    UpdateStage[UpdateStage["UPDATE"] = 1] = "UPDATE";
    UpdateStage[UpdateStage["POST_UPDATE"] = 2] = "POST_UPDATE";
    UpdateStage[UpdateStage["ADD_BACK"] = 3] = "ADD_BACK";
})(UpdateStage || (UpdateStage = {}));
var EntityPool = /** @class */ (function () {
    function EntityPool() {
        this.groups = [];
        this.pending = [];
        this.update_stage = UpdateStage.PRE_INIT;
        this.time = 0;
        this.special_effects = new SpecialEffects();
        EntityPool.INSTANCE = this;
        this.groups.push({ id: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_PLAYER, mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_PLAYER, list: [] });
        this.groups.push({ id: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_BOSS, mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_BOSS, list: [] });
        this.groups.push({ id: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_ENEMY, mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_ENEMY, list: [] });
        this.groups.push({ id: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_BULLET, mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_BULLET, list: [] });
        this.groups.push({ id: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_BOMB, mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_BOMB, list: [] });
        this.groups.push({ id: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CG_GHOST, mask: _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.CM_GHOST, list: [] });
    }
    EntityPool.prototype.registerGroup = function (mask) {
        var ret = this.groups.length;
        this.groups.push({ id: ret, mask: mask, list: [] });
        return ret;
    };
    EntityPool.prototype.add = function (e) {
        if (this.update_stage != UpdateStage.ADD_BACK && this.update_stage != UpdateStage.PRE_INIT)
            this.pending.push(e);
        else
            this.groups[e.config.collide_group].list.push(e);
    };
    EntityPool.prototype.update = function () {
        var _this = this;
        this.update_stage = UpdateStage.UPDATE;
        this.groups.forEach(function (pool) { return pool.list.forEach(function (e) { return e.update(e); }); });
        for (var i = 0; i < this.groups.length; i++) {
            for (var j = 0; j < this.groups.length; j++) {
                if (this.groups[i].mask & j) {
                    // group i can attack group j
                    for (var _i = 0, _a = this.groups[i].list; _i < _a.length; _i++) {
                        var ei = _a[_i];
                        if (ei.state != _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.ALIVE || !ei.shaped_sprite || !ei.shaped_sprite.shape)
                            continue;
                        for (var _b = 0, _c = this.groups[j].list; _b < _c.length; _b++) {
                            var ej = _c[_b];
                            if (ej.state != _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.ALIVE || !ej.shaped_sprite || !ej.shaped_sprite.shape)
                                continue;
                            if ((0,_sprite_Shape__WEBPACK_IMPORTED_MODULE_1__.collide)(ei, ej))
                                ei.attack(ei, ej);
                        }
                    }
                }
            }
        }
        this.update_stage = UpdateStage.POST_UPDATE;
        this.groups.forEach(function (pool) { return pool.list.forEach(function (e) { return e.postUpdate(e); }); });
        this.groups.forEach(function (pool) { return pool.list = pool.list.filter(function (e) { return e.state != _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.DEAD; }); });
        this.update_stage = UpdateStage.ADD_BACK;
        this.pending.forEach(function (e) { return _this.add(e); });
        this.pending = [];
        this.time++;
    };
    EntityPool.prototype.render = function () {
        return __awaiter(this, void 0, void 0, function () {
            var map, _i, _a, pool, _b, _c, entity, submap, rlist;
            return __generator(this, function (_d) {
                map = new Map();
                for (_i = 0, _a = this.groups; _i < _a.length; _i++) {
                    pool = _a[_i];
                    for (_b = 0, _c = pool.list; _b < _c.length; _b++) {
                        entity = _c[_b];
                        if (!entity.config.render_layer)
                            continue;
                        if (!map.has(entity.config.render_layer))
                            map.set(entity.config.render_layer, new Map());
                        submap = map.get(entity.config.render_layer);
                        if (!submap.has(entity.shaped_sprite.sprite))
                            submap.set(entity.shaped_sprite.sprite, []);
                        submap.get(entity.shaped_sprite.sprite).push(entity);
                    }
                }
                rlist = [];
                map.forEach(function (v0, k0) { return rlist.push({ rl: k0, v: v0 }); });
                rlist.sort(function (a, b) { return a.rl - b.rl; });
                rlist.forEach(function (rl) { return rl.v.forEach(function (v1, k1) { return _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_2__.SpriteManager.get(_sprite_sprites__WEBPACK_IMPORTED_MODULE_3__.SPRITES[k1].sprite).draw(v1); }); });
                return [2 /*return*/];
            });
        });
    };
    return EntityPool;
}());



/***/ }),

/***/ "./src/stg/stage/Screen.ts":
/*!*********************************!*\
  !*** ./src/stg/stage/Screen.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SCR_HALF_WIDTH": () => /* binding */ SCR_HALF_WIDTH,
/* harmony export */   "SCR_HALF_HEIGHT": () => /* binding */ SCR_HALF_HEIGHT,
/* harmony export */   "SCR_HALF_WIN_WIDTH": () => /* binding */ SCR_HALF_WIN_WIDTH,
/* harmony export */   "SCR_HALF_WIN_HEIGHT": () => /* binding */ SCR_HALF_WIN_HEIGHT,
/* harmony export */   "scrCoord_to_GLCoord_x": () => /* binding */ scrCoord_to_GLCoord_x,
/* harmony export */   "scrCoord_to_GLCoord_y": () => /* binding */ scrCoord_to_GLCoord_y
/* harmony export */ });
var SCR_HALF_WIDTH = 192;
var SCR_HALF_HEIGHT = 224;
var SCR_HALF_WIN_WIDTH = 250;
var SCR_HALF_WIN_HEIGHT = 250;
function scrCoord_to_GLCoord_x(x) {
    return x / SCR_HALF_WIN_WIDTH;
}
function scrCoord_to_GLCoord_y(y) {
    return y / SCR_HALF_WIN_HEIGHT;
}


/***/ }),

/***/ "./src/stg/test.ts":
/*!*************************!*\
  !*** ./src/stg/test.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => /* binding */ init,
/* harmony export */   "start": () => /* binding */ start,
/* harmony export */   "terminate": () => /* binding */ terminate
/* harmony export */ });
/* harmony import */ var _entity_Bullet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity/Bullet */ "./src/stg/entity/Bullet.ts");
/* harmony import */ var _schedule_Scheuler__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule/Scheuler */ "./src/stg/schedule/Scheuler.ts");
/* harmony import */ var _sprite_gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprite/gl */ "./src/stg/sprite/gl.js");
/* harmony import */ var _sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprite/shaped_sprites */ "./src/stg/sprite/shaped_sprites.ts");
/* harmony import */ var _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprite/SpriteManager */ "./src/stg/sprite/SpriteManager.ts");
/* harmony import */ var _sprite_sprites__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sprite/sprites */ "./src/stg/sprite/sprites.ts");
/* harmony import */ var _stage_EntityPool__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stage/EntityPool */ "./src/stg/stage/EntityPool.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};







var pool = null;
;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var repeat, n;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pool = new _stage_EntityPool__WEBPACK_IMPORTED_MODULE_6__.EntityPool();
                    eval("window.debug_info.pool = pool");
                    repeat = function (item, n) {
                        if (n === void 0) { n = Infinity; }
                        return new _schedule_Scheuler__WEBPACK_IMPORTED_MODULE_1__.RepeatSupplier(item, n);
                    };
                    return [4 /*yield*/, _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.SpriteManager.get(_sprite_sprites__WEBPACK_IMPORTED_MODULE_5__.SPRITES[_sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_3__.small_round_red.sprite].sprite).load()];
                case 1:
                    _a.sent();
                    n = 8;
                    pool.add(new _schedule_Scheuler__WEBPACK_IMPORTED_MODULE_1__.Scheduler([
                        120,
                        repeat(function (i0) { return [
                            repeat(function (i1) { return [
                                function () { return pool.add(new _entity_Bullet__WEBPACK_IMPORTED_MODULE_0__.Bullet(_sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_3__.small_round_red, _entity_Bullet__WEBPACK_IMPORTED_MODULE_0__.template_config_bullet)
                                    .simpleInit(0, 0, 2, 0.002 * i0 * i0 + Math.PI * 2 / n * i1)); },
                            ]; }, n),
                            3
                        ]; }, Infinity)
                    ]));
                    return [2 /*return*/];
            }
        });
    });
}
var started = false;
function start() {
    if (started)
        return;
    started = true;
    update();
}
function terminate() {
    started = false;
}
function update() {
    pool.update();
    (0,_sprite_gl__WEBPACK_IMPORTED_MODULE_2__.clear)();
    pool.render();
    if (started)
        requestAnimationFrame(update);
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stg/sprite/gl */ "./src/stg/sprite/gl.js");
/* harmony import */ var _stg_test__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stg/test */ "./src/stg/test.ts");



async function main() {

    var winw = window.innerWidth;
    var winh = window.innerHeight;
    var winr = Math.min(winw, winh) * 0.8;

    var canvas = document.getElementById("glcanvas");

    // set the display size of the canvas.
    canvas.style.width = winr + "px";
    canvas.style.height = winr + "px";

    // set the size of the drawingBuffer
    var devicePixelRatio = window.devicePixelRatio || 1;

    canvas.width = winr * devicePixelRatio;
    canvas.height = winr * devicePixelRatio;

    (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.setup)();
    await (0,_stg_test__WEBPACK_IMPORTED_MODULE_1__.init)();
    (0,_stg_test__WEBPACK_IMPORTED_MODULE_1__.start)();
    window.debug_info.stg = {
        init: _stg_test__WEBPACK_IMPORTED_MODULE_1__.init,
        start: _stg_test__WEBPACK_IMPORTED_MODULE_1__.start,
        terminate: _stg_test__WEBPACK_IMPORTED_MODULE_1__.terminate
    };
}

async function testCurve() {
    const image = await (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.loadImage)("assets/missile_green.png");
    const texture = (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.loadTexture)(image);
    (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.clear)();
    var size = 500;
    var xy = new Float32Array(size * 2);
    for (var i = 0; i < size; i++) {
        xy[i * 2 + 0] = Math.sin(i * 10 * Math.PI / size) * 0.1;
        xy[i * 2 + 1] = 1.8 * i / size - 0.9;
    }
    timer(() => (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.drawSnake)(xy, 0.03, size, 0, 0, 1, 1, texture));
}

window.onload = main;

/***/ }),

/***/ "./src/stg/sprite/gl.js":
/*!******************************!*\
  !*** ./src/stg/sprite/gl.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setup": () => /* binding */ setup,
/* harmony export */   "loadImage": () => /* binding */ loadImage,
/* harmony export */   "draw": () => /* binding */ draw,
/* harmony export */   "drawStrip": () => /* binding */ drawStrip,
/* harmony export */   "loadTexture": () => /* binding */ loadTexture,
/* harmony export */   "clear": () => /* binding */ clear,
/* harmony export */   "drawRects": () => /* binding */ drawRects,
/* harmony export */   "drawSnake": () => /* binding */ drawSnake
/* harmony export */ });
/* harmony import */ var _stage_Screen__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stage/Screen */ "./src/stg/stage/Screen.ts");


const vertexCode = `
attribute vec2 coord;
attribute vec2 tex;
varying highp vec2 vTexCoord;
void main(void) {
    gl_Position = vec4(coord, 0.0, 1.0);
    vTexCoord = tex;
}
`;

const fragmentCode = `
varying highp vec2 vTexCoord;
uniform sampler2D uSampler;
void main(void) {
    gl_FragColor = texture2D(uSampler, vTexCoord);
}
`;

const global_gl = {
    gl: null,
    shader: {
        program: 0,
        attribute: {
            coord: 0,
            tex: 0,
        },
        uniform: {
            uSampler: 0,
        },
    }
}

function setup() {
    var canvas = document.getElementById('glcanvas');
    var gl = canvas.getContext('webgl');
    if (gl === null) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    global_gl.gl = gl;
    var vertShader = gl.createShader(gl.VERTEX_SHADER);
    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(vertShader, vertexCode);
    gl.shaderSource(fragShader, fragmentCode);
    gl.compileShader(vertShader);
    gl.compileShader(fragShader);
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertShader);
    gl.attachShader(shaderProgram, fragShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    const shader = global_gl.shader;
    shader.program = shaderProgram;
    shader.attribute.coord = gl.getAttribLocation(shaderProgram, 'coord');
    shader.attribute.tex = gl.getAttribLocation(shaderProgram, 'tex');
    shader.uniform.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');

    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.disable(gl.DEPTH_TEST);
    gl.viewport(0, 0, canvas.width, canvas.height);
}

function loadImage(src) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => resolve(img)
        img.onerror = reject
        img.src = src
    })
}

function draw(ver_arr, tex_arr, texture, size) {
    const gl = global_gl.gl;
    const ver_buffer = gl.createBuffer();
    const coord = global_gl.shader.attribute.coord;
    gl.bindBuffer(gl.ARRAY_BUFFER, ver_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ver_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    const tex_buffer = gl.createBuffer();
    const tex = global_gl.shader.attribute.tex;
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tex_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tex);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(global_gl.shader.uniform.uSampler, 0);

    gl.drawArrays(gl.TRIANGLES, 0, size);
}

function drawStrip(ver_arr, tex_arr, ind_arr, texture, size) {
    const gl = global_gl.gl;
    const ver_buffer = gl.createBuffer();
    const coord = global_gl.shader.attribute.coord;
    gl.bindBuffer(gl.ARRAY_BUFFER, ver_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ver_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    const tex_buffer = gl.createBuffer();
    const tex = global_gl.shader.attribute.tex;
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tex_arr, gl.STATIC_DRAW);
    gl.vertexAttribPointer(tex, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(tex);

    const ind_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ind_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ind_arr, gl.STATIC_DRAW);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(global_gl.shader.uniform.uSampler, 0);

    gl.drawElements(gl.TRIANGLE_STRIP, size, gl.UNSIGNED_SHORT, 0);
}

function loadTexture(image) {
    const gl = global_gl.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_SHORT_4_4_4_4, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.generateMipmap(gl.TEXTURE_2D);
    return texture;
}

function clear() {
    const gl = global_gl.gl;
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clearColor(0.0, 0.0, 1.0, 1.0);
}

const verang = [3, -3, -1, 3, 1, -1];
const texx = [0, 0, 1, 0, 1, 1];
const texy = [0, 1, 1, 0, 0, 1];

function scrCoord_to_GLCoord(fa) {
    for (var i = 0; i < fa.length / 2; i++) {
        fa[i * 2] = (0,_stage_Screen__WEBPACK_IMPORTED_MODULE_0__.scrCoord_to_GLCoord_x)(fa[i * 2]);
        fa[i * 2 + 1] = (0,_stage_Screen__WEBPACK_IMPORTED_MODULE_0__.scrCoord_to_GLCoord_y)(fa[i * 2 + 1]);
    }
}

function drawRects(xyrwh, size, texture) {
    const ver = new Float32Array(size * 12);
    const tex = new Float32Array(size * 12);
    const pid4 = Math.PI / 4;
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < 6; j++) {
            const a = xyrwh[i * 9 + 2] + verang[j] * pid4;
            ver[i * 12 + j * 2 + 0] = xyrwh[i * 9 + 0] + xyrwh[i * 9 + 3] * Math.cos(a) - xyrwh[i * 9 + 4] * Math.sin(a);
            ver[i * 12 + j * 2 + 1] = xyrwh[i * 9 + 1] + xyrwh[i * 9 + 3] * Math.sin(a) + xyrwh[i * 9 + 4] * Math.cos(a);
            tex[i * 12 + j * 2 + 0] = xyrwh[i * 9 + 5] + texx[j] * xyrwh[i * 9 + 7];
            tex[i * 12 + j * 2 + 1] = xyrwh[i * 9 + 6] + texy[j] * xyrwh[i * 9 + 8];
            
        }
    }
    scrCoord_to_GLCoord(ver);
    draw(ver, tex, texture, size * 6);
}

function drawSnake(xy, w, size, tx, ty, tw, th, texture) {
    const ver = new Float32Array(size * 6);
    const len = new Float32Array(size);
    const tex = new Float32Array(size * 6);
    const ind = new Int16Array((size - 1) * 2);
    var tot = 0;
    for (var i = 0; i < size - 1; i++) {
        const px = xy[i * 2];
        const py = xy[i * 2 + 1];
        const nx = xy[i * 2 + 2];
        const ny = xy[i * 2 + 3];
        const ox = (px + nx) / 2;
        const oy = (py + ny) / 2;

        const l = Math.sqrt((nx - px) * (nx - px) + (ny - py) * (ny - py));
        len[i] = l;
        tot += l;

        ver[i * 6 + 0] = px;
        ver[i * 6 + 1] = py;
        ver[i * 6 + 2] = ox - (oy - py) / l * w;
        ver[i * 6 + 3] = oy + (ox - px) / l * w;
        ver[i * 6 + 4] = ox + (oy - py) / l * w;
        ver[i * 6 + 5] = oy - (ox - px) / l * w;
    }
    scrCoord_to_GLCoord(ver);
    tot -= len[0] / 2 + len[size - 1] / 2;

    var sta = -len[0] / 2;
    for (var i = 1; i < size; i++) {
        tex[i * 6 + 0] = tx + tw * sta / tot;
        tex[i * 6 + 1] = ty + th / 2;
        sta += len[i] / 2;
        tex[i * 6 + 2] = tx + tw * sta / tot;
        tex[i * 6 + 3] = ty;
        tex[i * 6 + 4] = tx + tw * sta / tot;
        tex[i * 6 + 5] = ty + th;
        sta += len[i] / 2;
    }
    for (var i = 0; i < size - 1; i++) {
        ind[i * 2 + 0] = i * 3 + 1;
        ind[i * 2 + 1] = i * 3 + 3;
    }
    ind[size * 2 - 3]--;

    const gl = global_gl.gl;
    const ver_buffer = gl.createBuffer();
    const coord = global_gl.shader.attribute.coord;
    gl.bindBuffer(gl.ARRAY_BUFFER, ver_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, ver, gl.STATIC_DRAW);
    gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coord);

    const tex_buffer = gl.createBuffer();
    const texc = global_gl.shader.attribute.tex;
    gl.bindBuffer(gl.ARRAY_BUFFER, tex_buffer);
    gl.bufferData(gl.ARRAY_BUFFER, tex, gl.STATIC_DRAW);
    gl.vertexAttribPointer(texc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(texc);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.uniform1i(global_gl.shader.uniform.uSampler, 0);

    const ind_buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ind_buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ind, gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLE_STRIP, size * 2 - 2, gl.UNSIGNED_SHORT, 0);

    for (var i = 0; i < size - 1; i++) {
        ind[i * 2 + 0] = i * 3;
        ind[i * 2 + 1] = i * 3 + 2;
    }
    ind[0]++;

    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, ind, gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLE_STRIP, size * 2 - 2, gl.UNSIGNED_SHORT, 0);

}

window.debug_info = {};
window.debug_info.global_gl = global_gl;
window.debug_info.gl_func = {
    setup: setup,
    clear: clear,
    draw: draw,
    drawStrip: drawStrip,
    drawRects: drawRects,
    drawSnake: drawSnake
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvZW50aXR5L0J1bGxldC50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvZW50aXR5L0VudGl0eS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvZW50aXR5L1JheUxhc2VyLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zY2hlZHVsZS9TY2hldWxlci50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL1NoYXBlLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvU3ByaXRlTWFuYWdlci50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL3NoYXBlZF9zcHJpdGVzLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvc3ByaXRlcy50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3RhZ2UvRW50aXR5UG9vbC50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3RhZ2UvU2NyZWVuLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy90ZXN0LnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvZ2wuanMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlCQUFpQixTQUFJLElBQUksU0FBSTtBQUM3QjtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0Isc0NBQXNDLGlCQUFpQixFQUFFO0FBQ3ZGLDZCQUE2Qiw4RUFBOEU7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQSxDQUFDO0FBQ3NEO0FBQ047QUFDaUI7QUFDeEI7QUFDbkM7QUFDUCxrQkFBa0IsOENBQVM7QUFDM0IsbUJBQW1CLDhDQUFTO0FBQzVCLGtCQUFrQiw4Q0FBUztBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLG9EQUFlO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixvREFBZTtBQUN4Qyx5QkFBeUIsZ0RBQVc7QUFDcEMsbUJBQW1CLDRGQUE2QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RSx5REFBYyxFQUFFLDBEQUFlO0FBQzNHO0FBQ0EsNkJBQTZCLGtEQUFhO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixrREFBYTtBQUN2QztBQUNBLHlCQUF5QiwrQ0FBVTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLENBQUMsa0RBQU87QUFDUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDelFBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJib3VuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IENHX0JVTExFVCwgUkxfQlVMTEVULCBTdGF0ZSB9IGZyb20gXCIuL0VudGl0eVwiO1xuaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuLi9zdGFnZS9FbnRpdHlQb29sXCI7XG5pbXBvcnQgeyBTQ1JfSEFMRl9IRUlHSFQsIFNDUl9IQUxGX1dJRFRIIH0gZnJvbSBcIi4uL3N0YWdlL1NjcmVlblwiO1xuaW1wb3J0IHsgU0lQb2ludCB9IGZyb20gXCIuLi9zcHJpdGUvU2hhcGVcIjtcbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX2J1bGxldCA9IHtcbiAgICByZW5kZXJfbGF5ZXI6IFJMX0JVTExFVCxcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19CVUxMRVQsXG4gICAgY29sbGlkZV9tYXNrOiBDR19CVUxMRVQsXG4gICAga2lsbF9vbl9leGl0OiB0cnVlLFxuICAgIGtpbGxfYnlfYm9tYjogdHJ1ZSxcbiAgICBhdXRvX2RpcmVjdGlvbjogdHJ1ZVxufTtcbnZhciBCdWxsZXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1bGxldCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCdWxsZXQoc2hhcGVkX3NoYXBlLCBiYykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzaGFwZWRfc2hhcGUpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnN0YXRlID0gU3RhdGUuUFJFX0VOVFJZO1xuICAgICAgICBfdGhpcy5jb25maWcgPSBiYztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBCdWxsZXQucHJvdG90eXBlLnNpbXBsZUluaXQgPSBmdW5jdGlvbiAoeDAsIHkwLCB2LCBhKSB7XG4gICAgICAgIHRoaXMucHggPSB4MDtcbiAgICAgICAgdGhpcy5weSA9IHkwO1xuICAgICAgICB0aGlzLnZ4ID0gdiAqIE1hdGguY29zKGEpO1xuICAgICAgICB0aGlzLnZ5ID0gdiAqIE1hdGguc2luKGEpO1xuICAgICAgICB0aGlzLmRpciA9IGE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQnVsbGV0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgdmFyIHJhdGUgPSBFbnRpdHlQb29sLklOU1RBTkNFLnNwZWNpYWxfZWZmZWN0cy50aW1lX3JhdGU7XG4gICAgICAgIC8vIEV2ZW50OiBPblVwZGF0ZSh0aW1lX3JhdGUpO1xuICAgICAgICB0aGlzLnB4ICs9IHRoaXMudnggKiByYXRlO1xuICAgICAgICB0aGlzLnB5ICs9IHRoaXMudnkgKiByYXRlO1xuICAgICAgICBpZiAodGhpcy5jb25maWcuYXV0b19kaXJlY3Rpb24pXG4gICAgICAgICAgICB0aGlzLmRpciA9IE1hdGguYXRhbjIodGhpcy52eSwgdGhpcy52eCk7XG4gICAgfTtcbiAgICBCdWxsZXQucHJvdG90eXBlLnBvc3RVcGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zaGFwZWRfc3ByaXRlLnNoYXBlLmV4aXRTY3JlZW4odGhpcy5weCwgdGhpcy5weSwgdGhpcy5kaXIsIFNDUl9IQUxGX1dJRFRILCBTQ1JfSEFMRl9IRUlHSFQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcua2lsbF9vbl9leGl0KVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5MRUFWSU5HO1xuICAgICAgICAgICAgLy8gRXZlbnQ6IE9uRXhpdFNjcmVlblxuICAgICAgICB9XG4gICAgICAgIC8vIEV2ZW50OiBPblBvc3RVcGRhdGVcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU3RhdGUuTEVBVklORykge1xuICAgICAgICAgICAgLy8gRXZlbnQ6IE9uRGVzdHJveVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkRFQUQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJ1bGxldC5wcm90b3R5cGUuYXR0YWNrID0gZnVuY3Rpb24gKF8sIGUpIHtcbiAgICAgICAgLy8gRXZlbnQ6IE9uQXR0YWNrKGUpXG4gICAgfTtcbiAgICByZXR1cm4gQnVsbGV0O1xufShTSVBvaW50KSk7XG5leHBvcnQgeyBCdWxsZXQgfTtcbiIsImV4cG9ydCB2YXIgQ0dfUExBWUVSID0gMDtcbmV4cG9ydCB2YXIgQ0dfQk9TUyA9IDE7XG5leHBvcnQgdmFyIENHX0VORU1ZID0gMjtcbmV4cG9ydCB2YXIgQ0dfQlVMTEVUID0gMztcbmV4cG9ydCB2YXIgQ0dfQk9NQiA9IDQ7XG5leHBvcnQgdmFyIENHX0dIT1NUID0gNTtcbmV4cG9ydCB2YXIgQ01fUExBWUVSID0gMDtcbmV4cG9ydCB2YXIgQ01fQk9TUyA9IDE7XG5leHBvcnQgdmFyIENNX0VORU1ZID0gMTtcbmV4cG9ydCB2YXIgQ01fQlVMTEVUID0gMTtcbmV4cG9ydCB2YXIgQ01fQk9NQiA9IDE0O1xuZXhwb3J0IHZhciBDTV9HSE9TVCA9IDA7XG5leHBvcnQgdmFyIFJMX0lOVklTSUJMRSA9IDA7XG5leHBvcnQgdmFyIFJMX0JHID0gMTAwO1xuZXhwb3J0IHZhciBSTF9CT1NTID0gMjAwO1xuZXhwb3J0IHZhciBSTF9FTkVNWSA9IDMwMDtcbmV4cG9ydCB2YXIgUkxfQlVMTEVUID0gNDAwO1xuZXhwb3J0IHZhciBSTF9CT01CID0gNTAwO1xuZXhwb3J0IHZhciBSTF9QTEFZRVIgPSA2MDA7XG5leHBvcnQgdmFyIFJMX1VJID0gNzAwO1xuZXhwb3J0IHZhciBSTF9NQVggPSAxMDAwO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZVtTdGF0ZVtcIlBSRV9FTlRSWVwiXSA9IDBdID0gXCJQUkVfRU5UUllcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkFMSVZFXCJdID0gMV0gPSBcIkFMSVZFXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJMRUFWSU5HXCJdID0gMl0gPSBcIkxFQVZJTkdcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkRFQURcIl0gPSAzXSA9IFwiREVBRFwiO1xufSkoU3RhdGUgfHwgKFN0YXRlID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSh0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHQpO1xufVxuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfcGxheWVyID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfUExBWUVSLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX1BMQVlFUixcbiAgICBjb2xsaWRlX21hc2s6IENNX1BMQVlFUlxufTtcbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX2Jvc3MgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9CT1NTLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX0JPU1MsXG4gICAgY29sbGlkZV9tYXNrOiBDTV9CT1NTXG59O1xuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfZW5lbXkgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9FTkVNWSxcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19FTkVNWSxcbiAgICBjb2xsaWRlX21hc2s6IENNX0VORU1ZXG59O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFNoYXBlLCBTaGFwZWRJbnN0YW5jZSwgU2hhcGVkU3ByaXRlIH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuaW1wb3J0IHsgUkVOREVSX1RZUEUgfSBmcm9tIFwiLi4vc3ByaXRlL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi4vc3ByaXRlL3Nwcml0ZXNcIjtcbmltcG9ydCB7IEVudGl0eVBvb2wgfSBmcm9tIFwiLi4vc3RhZ2UvRW50aXR5UG9vbFwiO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9FbnRpdHlcIjtcbnZhciBTaGFwZVJheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2hhcGVSYXksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVSYXkoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgU2hhcGVSYXkucHJvdG90eXBlLmRpc3RhbmNlVG8gPSBmdW5jdGlvbiAoc2VsZiwgeCwgeSkge1xuICAgICAgICB2YXIgeDAgPSBzZWxmLnB4O1xuICAgICAgICB2YXIgeTAgPSBzZWxmLnB5O1xuICAgICAgICB2YXIgeDEgPSBzZWxmLnB4ICsgc2VsZi5sZW4gKiBNYXRoLmNvcyhzZWxmLmRpcik7XG4gICAgICAgIHZhciB5MSA9IHNlbGYucHkgKyBzZWxmLmxlbiAqIE1hdGguc2luKHNlbGYuZGlyKTtcbiAgICAgICAgdmFyIHJsID0gTWF0aC5zcXJ0KCh4MCAtIHgxKSAqICh4MCAtIHgxKSArICh5MCAtIHkxKSAqICh5MCAtIHkxKSk7XG4gICAgICAgIHZhciBkaXMgPSBNYXRoLmFicygoeDEgLSB4MCkgKiAoeTAgLSB5KSAtICh4MCAtIHgpICogKHkxIC0geTApKTtcbiAgICAgICAgdmFyIGQwID0gTWF0aC5zcXJ0KCh4MCAtIHgpICogKHgwIC0geCkgKyAoeTAgLSB5KSAqICh5MCAtIHkpKTtcbiAgICAgICAgdmFyIGQxID0gTWF0aC5zcXJ0KCh4MSAtIHgpICogKHgxIC0geCkgKyAoeTEgLSB5KSAqICh5MSAtIHkpKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGRpcyAvIHJsLCBkMCwgZDEpIC0gc2VsZi5zaGFwZWRfc3ByaXRlLnc7XG4gICAgfTtcbiAgICBTaGFwZVJheS5JTlMgPSBuZXcgU2hhcGVSYXkoKTtcbiAgICByZXR1cm4gU2hhcGVSYXk7XG59KFNoYXBlKSk7XG5leHBvcnQgeyBTaGFwZVJheSB9O1xuZXhwb3J0IHZhciBSYXlMYXNlclN0YXRlO1xuKGZ1bmN0aW9uIChSYXlMYXNlclN0YXRlKSB7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiV0FSTklOR1wiXSA9IDBdID0gXCJXQVJOSU5HXCI7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiT1BFTklOR1wiXSA9IDFdID0gXCJPUEVOSU5HXCI7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiT1BFTkVEXCJdID0gMl0gPSBcIk9QRU5FRFwiO1xuICAgIFJheUxhc2VyU3RhdGVbUmF5TGFzZXJTdGF0ZVtcIkNMT1NJTkdcIl0gPSAzXSA9IFwiQ0xPU0lOR1wiO1xufSkoUmF5TGFzZXJTdGF0ZSB8fCAoUmF5TGFzZXJTdGF0ZSA9IHt9KSk7XG52YXIgU1NSYXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNTUmF5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNTUmF5KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTU1JheTtcbn0oU2hhcGVkU3ByaXRlKSk7XG5leHBvcnQgeyBTU1JheSB9O1xudmFyIFNJUmF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTSVJheSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTSVJheShzcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgUkVOREVSX1RZUEUuUkVDVCwgc3MpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNJUmF5LnByb3RvdHlwZS5yZWN0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG4gICAgU0lSYXkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh4eXJ3aCwgaSkge1xuICAgICAgICB2YXIgdyA9IHRoaXMuc2hhcGVkX3Nwcml0ZS53O1xuICAgICAgICB2YXIgbCA9IHRoaXMuc2hhcGVkX3Nwcml0ZS5sO1xuICAgICAgICB4eXJ3aFtpICogNSArIDBdID0gdGhpcy5weCArIGwgLyAyICogTWF0aC5jb3ModGhpcy5kaXIpO1xuICAgICAgICB4eXJ3aFtpICogNSArIDFdID0gdGhpcy5weSArIGwgLyAyICogTWF0aC5zaW4odGhpcy5kaXIpO1xuICAgICAgICA7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgMl0gPSB0aGlzLmRpcjtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyAzXSA9IHcgLyAyO1xuICAgICAgICB4eXJ3aFtpICogNSArIDRdID0gbCAvIDI7XG4gICAgICAgIHZhciBzcHJpdGUgPSBTUFJJVEVTW3RoaXMuc2hhcGVkX3Nwcml0ZS5zcHJpdGVdO1xuICAgICAgICB4eXJ3aFtpICogNSArIDVdID0gc3ByaXRlLnR4O1xuICAgICAgICB4eXJ3aFtpICogNSArIDZdID0gc3ByaXRlLnR5O1xuICAgICAgICB4eXJ3aFtpICogNSArIDddID0gc3ByaXRlLnR3O1xuICAgICAgICB4eXJ3aFtpICogNSArIDhdID0gc3ByaXRlLnRoO1xuICAgIH07XG4gICAgcmV0dXJuIFNJUmF5O1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lSYXkgfTtcbnZhciBSYXlMYXNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmF5TGFzZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmF5TGFzZXIoc2hhcGVkX3NoYXBlLCBjZikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzaGFwZWRfc2hhcGUpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnN0YXRlID0gU3RhdGUuUFJFX0VOVFJZO1xuICAgICAgICBfdGhpcy5yc3RhdGUgPSBSYXlMYXNlclN0YXRlLldBUk5JTkc7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IGNmO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJheUxhc2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgdmFyIHJhdGUgPSBFbnRpdHlQb29sLklOU1RBTkNFLnNwZWNpYWxfZWZmZWN0cy50aW1lX3JhdGU7XG4gICAgICAgIHRoaXMudGltZSArPSByYXRlO1xuICAgICAgICBpZiAodGhpcy5yc3RhdGUgPT0gUmF5TGFzZXJTdGF0ZS5XQVJOSU5HICYmIHRoaXMudGltZSA+IHRoaXMuY29uZmlnLndhcm5pbmdfdGltZSkge1xuICAgICAgICAgICAgdGhpcy5yc3RhdGUgPSBSYXlMYXNlclN0YXRlLk9QRU5JTkc7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gdGhpcy5jb25maWcud2FybmluZ190aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJzdGF0ZSA9PSBSYXlMYXNlclN0YXRlLk9QRU5JTkcpIHtcbiAgICAgICAgfVxuICAgICAgICAvLyBFdmVudDogT25VcGRhdGUodGltZV9yYXRlKTtcbiAgICB9O1xuICAgIFJheUxhc2VyLnByb3RvdHlwZS5wb3N0VXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgLy8gRXZlbnQ6IE9uUG9zdFVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MRUFWSU5HKSB7XG4gICAgICAgICAgICAvLyBFdmVudDogT25EZXN0cm95XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuREVBRDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmF5TGFzZXIucHJvdG90eXBlLmF0dGFjayA9IGZ1bmN0aW9uIChfLCBlKSB7XG4gICAgICAgIC8vIEV2ZW50OiBPbkF0dGFjayhlKVxuICAgIH07XG4gICAgcmV0dXJuIFJheUxhc2VyO1xufShTSVJheSkpO1xuZXhwb3J0IHsgUmF5TGFzZXIgfTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG52YXIgX19zcHJlYWRBcnJheXMgPSAodGhpcyAmJiB0aGlzLl9fc3ByZWFkQXJyYXlzKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgZm9yICh2YXIgcyA9IDAsIGkgPSAwLCBpbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBpbDsgaSsrKSBzICs9IGFyZ3VtZW50c1tpXS5sZW5ndGg7XG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcbiAgICAgICAgICAgIHJba10gPSBhW2pdO1xuICAgIHJldHVybiByO1xufTtcbmltcG9ydCB7IENHX0dIT1NULCBDTV9HSE9TVCwgUkxfSU5WSVNJQkxFLCBTdGF0ZSB9IGZyb20gXCIuLi9lbnRpdHkvRW50aXR5XCI7XG5pbXBvcnQgeyBTSU51bGwgfSBmcm9tIFwiLi4vc3ByaXRlL1NoYXBlXCI7XG5pbXBvcnQgeyBFbnRpdHlQb29sIH0gZnJvbSBcIi4uL3N0YWdlL0VudGl0eVBvb2xcIjtcbnZhciBTY2hlZHVsZUVudHJ5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlRW50cnkoKSB7XG4gICAgfVxuICAgIHJldHVybiBTY2hlZHVsZUVudHJ5O1xufSgpKTtcbnZhciBXYWl0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhXYWl0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFdhaXQoaW5wdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmVtYWluID0gaW5wdXQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgV2FpdC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHRpbWVfcmF0ZSkge1xuICAgICAgICB0aGlzLnJlbWFpbiAtPSB0aW1lX3JhdGU7XG4gICAgICAgIGlmICh0aGlzLnJlbWFpbiA8IDApXG4gICAgICAgICAgICByZXR1cm4gLXRoaXMucmVtYWluO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xuICAgIHJldHVybiBXYWl0O1xufShTY2hlZHVsZUVudHJ5KSk7XG52YXIgQWRkZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEFkZGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEFkZGVyKGlucHV0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnRvZG8gPSBpbnB1dDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBBZGRlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHRpbWVfcmF0ZSkge1xuICAgICAgICB0aGlzLnRvZG8oKTtcbiAgICAgICAgcmV0dXJuIHRpbWVfcmF0ZTtcbiAgICB9O1xuICAgIHJldHVybiBBZGRlcjtcbn0oU2NoZWR1bGVFbnRyeSkpO1xudmFyIFNjaGVkdWxlU3VwcGxpZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2NoZWR1bGVTdXBwbGllcigpIHtcbiAgICB9XG4gICAgcmV0dXJuIFNjaGVkdWxlU3VwcGxpZXI7XG59KCkpO1xuZXhwb3J0IHsgU2NoZWR1bGVTdXBwbGllciB9O1xuZnVuY3Rpb24gcGFyc2UoaW5wdXQpIHtcbiAgICByZXR1cm4gaW5wdXQubWFwKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZSA9PSBcIm51bWJlclwiID8gbmV3IFdhaXQoZSkgOlxuICAgICAgICAgICAgdHlwZW9mIGUgPT0gXCJmdW5jdGlvblwiID8gbmV3IEFkZGVyKGUpIDpcbiAgICAgICAgICAgICAgICBlO1xuICAgIH0pO1xufVxudmFyIFJlcGVhdFN1cHBsaWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZXBlYXRTdXBwbGllciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZXBlYXRTdXBwbGllcihpbnB1dCwgbikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5pbmRleCA9IDA7XG4gICAgICAgIF90aGlzLnRvZG8gPSBpbnB1dDtcbiAgICAgICAgX3RoaXMudG90YWwgPSBuO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJlcGVhdFN1cHBsaWVyLnByb3RvdHlwZS5zdXBwbHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmluZGV4ID49IHRoaXMudG90YWwpXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgdmFyIGFucztcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnRvZG8gPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgYW5zID0gdGhpcy50b2RvKHRoaXMuaW5kZXgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBhbnMgPSB0aGlzLnRvZG87XG4gICAgICAgIHRoaXMuaW5kZXgrKztcbiAgICAgICAgcmV0dXJuIHBhcnNlKGFucyk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVwZWF0U3VwcGxpZXI7XG59KFNjaGVkdWxlU3VwcGxpZXIpKTtcbmV4cG9ydCB7IFJlcGVhdFN1cHBsaWVyIH07XG5leHBvcnQgdmFyIHRlbXBsYXRlX2NvbmZpZ19zY2hlZHVsZXIgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9JTlZJU0lCTEUsXG4gICAgY29sbGlkZV9ncm91cDogQ0dfR0hPU1QsXG4gICAgY29sbGlkZV9tYXNrOiBDTV9HSE9TVFxufTtcbnZhciBTY2hlZHVsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNjaGVkdWxlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZXIoaW5wdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29uZmlnID0gdGVtcGxhdGVfY29uZmlnX3NjaGVkdWxlcjtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBTdGF0ZS5QUkVfRU5UUlk7XG4gICAgICAgIF90aGlzLmxpc3QgPSBwYXJzZShpbnB1dCk7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2NoZWR1bGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTdGF0ZS5QUkVfRU5UUlkpXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuQUxJVkU7XG4gICAgICAgIHZhciB0ID0gRW50aXR5UG9vbC5JTlNUQU5DRS5zcGVjaWFsX2VmZmVjdHMudGltZV9yYXRlO1xuICAgICAgICB3aGlsZSAodGhpcy5saXN0Lmxlbmd0aCA+IDAgJiYgdCkge1xuICAgICAgICAgICAgdmFyIHNzcyA9IHRoaXMubGlzdFswXTtcbiAgICAgICAgICAgIGlmIChzc3MgaW5zdGFuY2VvZiBTY2hlZHVsZVN1cHBsaWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpc3QgPSBzc3Muc3VwcGx5KCk7XG4gICAgICAgICAgICAgICAgaWYgKCFsaXN0IHx8ICFsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc2hpZnQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3QgPSBfX3NwcmVhZEFycmF5cyhsaXN0LCB0aGlzLmxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdCA9IHNzcy51cGRhdGUodCk7XG4gICAgICAgICAgICAgICAgaWYgKHQgPiAwKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3Quc2hpZnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5saXN0Lmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkxFQVZJTkc7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnBvc3RVcGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MRUFWSU5HKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkRFQUQ7XG4gICAgfTtcbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLmF0dGFjayA9IGZ1bmN0aW9uIChfKSB7XG4gICAgfTtcbiAgICByZXR1cm4gU2NoZWR1bGVyO1xufShTSU51bGwpKTtcbmV4cG9ydCB7IFNjaGVkdWxlciB9O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFJFTkRFUl9UWVBFIH0gZnJvbSBcIi4vU3ByaXRlTWFuYWdlclwiO1xuaW1wb3J0IHsgU1BSSVRFUyB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbnZhciBTaGFwZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaGFwZSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFNoYXBlO1xufSgpKTtcbmV4cG9ydCB7IFNoYXBlIH07XG52YXIgU2hhcGVQb2ludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2hhcGVQb2ludCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaGFwZVBvaW50KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNoYXBlUG9pbnQucHJvdG90eXBlLmRpc3RhbmNlVG8gPSBmdW5jdGlvbiAoc2VsZiwgcHgsIHB5KSB7XG4gICAgICAgIHB4ID0gcHggLSBzZWxmLnB4O1xuICAgICAgICBweSA9IHB5IC0gc2VsZi5weTtcbiAgICAgICAgdmFyIHNkID0gc2VsZi5kaXI7XG4gICAgICAgIHZhciBzeCA9IHB4ICogTWF0aC5jb3MoLXNkKSAtIHB5ICogTWF0aC5zaW4oLXNkKTtcbiAgICAgICAgdmFyIHN5ID0gcHkgKiBNYXRoLmNvcygtc2QpICsgcHggKiBNYXRoLnNpbigtc2QpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlzdGFuY2VUbyhzeCwgc3kpO1xuICAgIH07XG4gICAgcmV0dXJuIFNoYXBlUG9pbnQ7XG59KFNoYXBlKSk7XG5leHBvcnQgeyBTaGFwZVBvaW50IH07XG52YXIgU2hhcGVDaXJjbGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNoYXBlQ2lyY2xlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNoYXBlQ2lyY2xlKHIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucmFkaXVzID0gcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTaGFwZUNpcmNsZS5wcm90b3R5cGUuZXhpdFNjcmVlbiA9IGZ1bmN0aW9uIChzeCwgc3ksIF8sIHJ3LCByaCkge1xuICAgICAgICByZXR1cm4gTWF0aC5hYnMoc3gpID4gcncgKyB0aGlzLnJhZGl1cyB8fCBNYXRoLmFicyhzeSkgPiByaCArIHRoaXMucmFkaXVzO1xuICAgIH07XG4gICAgU2hhcGVDaXJjbGUucHJvdG90eXBlLl9kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KSAtIHRoaXMucmFkaXVzO1xuICAgIH07XG4gICAgcmV0dXJuIFNoYXBlQ2lyY2xlO1xufShTaGFwZVBvaW50KSk7XG5leHBvcnQgeyBTaGFwZUNpcmNsZSB9O1xudmFyIFNoYXBlZFNwcml0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaGFwZWRTcHJpdGUoKSB7XG4gICAgfVxuICAgIHJldHVybiBTaGFwZWRTcHJpdGU7XG59KCkpO1xuZXhwb3J0IHsgU2hhcGVkU3ByaXRlIH07XG52YXIgU1NQb2ludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU1NQb2ludCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTU1BvaW50KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTU1BvaW50O1xufShTaGFwZWRTcHJpdGUpKTtcbmV4cG9ydCB7IFNTUG9pbnQgfTtcbnZhciBTaGFwZWRJbnN0YW5jZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaGFwZWRJbnN0YW5jZShydCwgc3MpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gcnQ7XG4gICAgICAgIHRoaXMuc2hhcGVkX3Nwcml0ZSA9IHNzO1xuICAgIH1cbiAgICBTaGFwZWRJbnN0YW5jZS5wcm90b3R5cGUuZGlzdGFuY2VUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXBlZF9zcHJpdGUuc2hhcGUuZGlzdGFuY2VUbyh0aGlzLCB4LCB5KTtcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZWRJbnN0YW5jZTtcbn0oKSk7XG5leHBvcnQgeyBTaGFwZWRJbnN0YW5jZSB9O1xudmFyIFNJUG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNJUG9pbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU0lQb2ludChzcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgUkVOREVSX1RZUEUuUkVDVCwgc3MpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNJUG9pbnQucHJvdG90eXBlLnJlY3RDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcbiAgICBTSVBvaW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoeHlyd2gsIGkpIHtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyAwXSA9IHRoaXMucHg7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMV0gPSB0aGlzLnB5O1xuICAgICAgICB4eXJ3aFtpICogOSArIDJdID0gdGhpcy5kaXI7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgM10gPSB0aGlzLnNoYXBlZF9zcHJpdGUudztcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA0XSA9IHRoaXMuc2hhcGVkX3Nwcml0ZS5oO1xuICAgICAgICB2YXIgc3ByaXRlID0gU1BSSVRFU1t0aGlzLnNoYXBlZF9zcHJpdGUuc3ByaXRlXTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA1XSA9IHNwcml0ZS50eDtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA2XSA9IHNwcml0ZS50eTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA3XSA9IHNwcml0ZS50dztcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA4XSA9IHNwcml0ZS50aDtcbiAgICB9O1xuICAgIHJldHVybiBTSVBvaW50O1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lQb2ludCB9O1xudmFyIFNJTnVsbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU0lOdWxsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNJTnVsbCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG51bGwsIG51bGwpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTSU51bGw7XG59KFNoYXBlZEluc3RhbmNlKSk7XG5leHBvcnQgeyBTSU51bGwgfTtcbmV4cG9ydCBmdW5jdGlvbiBjb2xsaWRlKGUwLCBlMSkge1xuICAgIGlmIChlMCBpbnN0YW5jZW9mIFNJUG9pbnQgJiYgZTAuc2hhcGVkX3Nwcml0ZS5zaGFwZSBpbnN0YW5jZW9mIFNoYXBlQ2lyY2xlKVxuICAgICAgICByZXR1cm4gZTEuZGlzdGFuY2VUbyhlMC5weCwgZTAucHkpIDwgZTAuc2hhcGVkX3Nwcml0ZS5zaGFwZS5yYWRpdXM7XG4gICAgaWYgKGUxIGluc3RhbmNlb2YgU0lQb2ludCAmJiBlMS5zaGFwZWRfc3ByaXRlLnNoYXBlIGluc3RhbmNlb2YgU2hhcGVDaXJjbGUpXG4gICAgICAgIHJldHVybiBjb2xsaWRlKGUxLCBlMCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm9uLWNpcmNsZSBub24tY2lyY2xlIGNvbGxpc2lvbiBub3QgZm91bmRcIik7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgbG9hZFRleHR1cmUsIGxvYWRJbWFnZSwgZHJhd1JlY3RzLCBkcmF3U25ha2UgfSBmcm9tIFwiLi9nbFwiO1xuaW1wb3J0IHsgU1BSSVRFUyB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbmV4cG9ydCB2YXIgUkVOREVSX1RZUEU7XG4oZnVuY3Rpb24gKFJFTkRFUl9UWVBFKSB7XG4gICAgUkVOREVSX1RZUEVbUkVOREVSX1RZUEVbXCJSRUNUXCJdID0gMF0gPSBcIlJFQ1RcIjtcbiAgICBSRU5ERVJfVFlQRVtSRU5ERVJfVFlQRVtcIlNUUklQXCJdID0gMV0gPSBcIlNUUklQXCI7XG59KShSRU5ERVJfVFlQRSB8fCAoUkVOREVSX1RZUEUgPSB7fSkpO1xuO1xudmFyIFNwcml0ZU1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3ByaXRlTWFuYWdlcih1cmwpIHtcbiAgICAgICAgdGhpcy5pbWcgPSBudWxsO1xuICAgICAgICB0aGlzLnBhdGggPSB1cmw7XG4gICAgfVxuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1nO1xuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbG9hZEltYWdlKHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltZyA9IGxvYWRUZXh0dXJlKGltZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5nZXQgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIGlmIChTcHJpdGVNYW5hZ2VyLklOU1t1cmxdKVxuICAgICAgICAgICAgcmV0dXJuIFNwcml0ZU1hbmFnZXIuSU5TW3VybF07XG4gICAgICAgIHJldHVybiAoU3ByaXRlTWFuYWdlci5JTlNbdXJsXSA9IG5ldyBTcHJpdGVNYW5hZ2VyKHVybCkpO1xuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHZhciByZWN0biA9IGxpc3QucmVkdWNlKGZ1bmN0aW9uIChuLCBlKSB7IHJldHVybiBlLnJlbmRlclR5cGUgPT0gUkVOREVSX1RZUEUuUkVDVCA/IG4gKyBlLnJlY3RDb3VudCgpIDogbjsgfSwgMCk7XG4gICAgICAgIHZhciB4eXJ3aCA9IG5ldyBGbG9hdDMyQXJyYXkocmVjdG4gKiA5KTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGxpc3RfMSA9IGxpc3Q7IF9pIDwgbGlzdF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGUgPSBsaXN0XzFbX2ldO1xuICAgICAgICAgICAgaWYgKGUucmVuZGVyVHlwZSA9PSBSRU5ERVJfVFlQRS5SRUNUKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBlO1xuICAgICAgICAgICAgICAgIHIucmVuZGVyKHh5cndoLCBpKTtcbiAgICAgICAgICAgICAgICBpICs9IHIucmVjdENvdW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHJhd1JlY3RzKHh5cndoLCBsaXN0Lmxlbmd0aCwgdGhpcy5pbWcpO1xuICAgICAgICBmb3IgKHZhciBfYSA9IDAsIGxpc3RfMiA9IGxpc3Q7IF9hIDwgbGlzdF8yLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgdmFyIGUgPSBsaXN0XzJbX2FdO1xuICAgICAgICAgICAgaWYgKGUucmVuZGVyVHlwZSA9PSBSRU5ERVJfVFlQRS5TVFJJUCkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gZTtcbiAgICAgICAgICAgICAgICB2YXIgc3MgPSBzLmdldFNwcml0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBzcCA9IFNQUklURVNbc3Muc3ByaXRlXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gcy5yZW5kZXIoKTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgIGRyYXdTbmFrZShhLCBzcy53LCBhLmxlbmd0aCAvIDIsIHNwLnR4LCBzcC50eSwgc3AudHcsIHNwLnRoLCB0aGlzLmltZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTcHJpdGVNYW5hZ2VyLklOUyA9IHt9O1xuICAgIHJldHVybiBTcHJpdGVNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IFNwcml0ZU1hbmFnZXIgfTtcbiIsImltcG9ydCB7IFNoYXBlUmF5IH0gZnJvbSBcIi4uL2VudGl0eS9SYXlMYXNlclwiO1xuaW1wb3J0IHsgU2hhcGVDaXJjbGUgfSBmcm9tIFwiLi9TaGFwZVwiO1xuaW1wb3J0IHsgUkVOREVSX1RZUEUgfSBmcm9tIFwiLi9TcHJpdGVNYW5hZ2VyXCI7XG5leHBvcnQgdmFyIHNtYWxsX3JvdW5kX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJyb3VuZF9yZWRcIixcbiAgICBzaGFwZTogbmV3IFNoYXBlQ2lyY2xlKDEpLFxuICAgIHc6IDQsXG4gICAgaDogNFxufTtcbmV4cG9ydCB2YXIgcmF5X2xhc2VyX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJcIixcbiAgICBzaGFwZTogU2hhcGVSYXkuSU5TLFxuICAgIHc6IDEsXG4gICAgbDogMVxufTtcbi8vYWJzdHJhY3RcbmV4cG9ydCB2YXIgY3VydmVfbGFzZXJfcmVkID0ge1xuICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlNUUklQLFxuICAgIHNwcml0ZTogXCJcIixcbiAgICBzaGFwZTogbnVsbCxcbiAgICB3OiAxXG59O1xuIiwiZXhwb3J0IHZhciBTUFJJVEVTID0ge1xuICAgIFwicm91bmRfcmVkXCI6IHtcbiAgICAgICAgXCJzcHJpdGVcIjogXCJhc3NldHMvbWlzc2lsZV9yZWQucG5nXCIsXG4gICAgICAgIFwidHhcIjogMCxcbiAgICAgICAgXCJ0eVwiOiAwLFxuICAgICAgICBcInR3XCI6IDEsXG4gICAgICAgIFwidGhcIjogMVxuICAgIH1cbn07XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0ICogYXMgQkFTRSBmcm9tIFwiLi4vZW50aXR5L0VudGl0eVwiO1xuaW1wb3J0IHsgY29sbGlkZSB9IGZyb20gXCIuLi9zcHJpdGUvU2hhcGVcIjtcbmltcG9ydCB7IFNwcml0ZU1hbmFnZXIgfSBmcm9tIFwiLi4vc3ByaXRlL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi4vc3ByaXRlL3Nwcml0ZXNcIjtcbnZhciBTcGVjaWFsRWZmZWN0cyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTcGVjaWFsRWZmZWN0cygpIHtcbiAgICAgICAgdGhpcy50aW1lX3JhdGUgPSAxO1xuICAgIH1cbiAgICByZXR1cm4gU3BlY2lhbEVmZmVjdHM7XG59KCkpO1xuZXhwb3J0IHsgU3BlY2lhbEVmZmVjdHMgfTtcbjtcbnZhciBVcGRhdGVTdGFnZTtcbihmdW5jdGlvbiAoVXBkYXRlU3RhZ2UpIHtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIlBSRV9JTklUXCJdID0gMF0gPSBcIlBSRV9JTklUXCI7XG4gICAgVXBkYXRlU3RhZ2VbVXBkYXRlU3RhZ2VbXCJVUERBVEVcIl0gPSAxXSA9IFwiVVBEQVRFXCI7XG4gICAgVXBkYXRlU3RhZ2VbVXBkYXRlU3RhZ2VbXCJQT1NUX1VQREFURVwiXSA9IDJdID0gXCJQT1NUX1VQREFURVwiO1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiQUREX0JBQ0tcIl0gPSAzXSA9IFwiQUREX0JBQ0tcIjtcbn0pKFVwZGF0ZVN0YWdlIHx8IChVcGRhdGVTdGFnZSA9IHt9KSk7XG52YXIgRW50aXR5UG9vbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFbnRpdHlQb29sKCkge1xuICAgICAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBbXTtcbiAgICAgICAgdGhpcy51cGRhdGVfc3RhZ2UgPSBVcGRhdGVTdGFnZS5QUkVfSU5JVDtcbiAgICAgICAgdGhpcy50aW1lID0gMDtcbiAgICAgICAgdGhpcy5zcGVjaWFsX2VmZmVjdHMgPSBuZXcgU3BlY2lhbEVmZmVjdHMoKTtcbiAgICAgICAgRW50aXR5UG9vbC5JTlNUQU5DRSA9IHRoaXM7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19QTEFZRVIsIG1hc2s6IEJBU0UuQ01fUExBWUVSLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0JPU1MsIG1hc2s6IEJBU0UuQ01fQk9TUywgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19FTkVNWSwgbWFzazogQkFTRS5DTV9FTkVNWSwgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19CVUxMRVQsIG1hc2s6IEJBU0UuQ01fQlVMTEVULCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0JPTUIsIG1hc2s6IEJBU0UuQ01fQk9NQiwgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19HSE9TVCwgbWFzazogQkFTRS5DTV9HSE9TVCwgbGlzdDogW10gfSk7XG4gICAgfVxuICAgIEVudGl0eVBvb2wucHJvdG90eXBlLnJlZ2lzdGVyR3JvdXAgPSBmdW5jdGlvbiAobWFzaykge1xuICAgICAgICB2YXIgcmV0ID0gdGhpcy5ncm91cHMubGVuZ3RoO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IHJldCwgbWFzazogbWFzaywgbGlzdDogW10gfSk7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICBFbnRpdHlQb29sLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy51cGRhdGVfc3RhZ2UgIT0gVXBkYXRlU3RhZ2UuQUREX0JBQ0sgJiYgdGhpcy51cGRhdGVfc3RhZ2UgIT0gVXBkYXRlU3RhZ2UuUFJFX0lOSVQpXG4gICAgICAgICAgICB0aGlzLnBlbmRpbmcucHVzaChlKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5ncm91cHNbZS5jb25maWcuY29sbGlkZV9ncm91cF0ubGlzdC5wdXNoKGUpO1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlVQREFURTtcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAocG9vbCkgeyByZXR1cm4gcG9vbC5saXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudXBkYXRlKGUpOyB9KTsgfSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cHNbaV0ubWFzayAmIGopIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXAgaSBjYW4gYXR0YWNrIGdyb3VwIGpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ3JvdXBzW2ldLmxpc3Q7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWkgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWkuc3RhdGUgIT0gQkFTRS5TdGF0ZS5BTElWRSB8fCAhZWkuc2hhcGVkX3Nwcml0ZSB8fCAhZWkuc2hhcGVkX3Nwcml0ZS5zaGFwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gMCwgX2MgPSB0aGlzLmdyb3Vwc1tqXS5saXN0OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlaiA9IF9jW19iXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWouc3RhdGUgIT0gQkFTRS5TdGF0ZS5BTElWRSB8fCAhZWouc2hhcGVkX3Nwcml0ZSB8fCAhZWouc2hhcGVkX3Nwcml0ZS5zaGFwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpZGUoZWksIGVqKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWkuYXR0YWNrKGVpLCBlaik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVfc3RhZ2UgPSBVcGRhdGVTdGFnZS5QT1NUX1VQREFURTtcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAocG9vbCkgeyByZXR1cm4gcG9vbC5saXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucG9zdFVwZGF0ZShlKTsgfSk7IH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QgPSBwb29sLmxpc3QuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnN0YXRlICE9IEJBU0UuU3RhdGUuREVBRDsgfSk7IH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLkFERF9CQUNLO1xuICAgICAgICB0aGlzLnBlbmRpbmcuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuYWRkKGUpOyB9KTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gW107XG4gICAgICAgIHRoaXMudGltZSsrO1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFwLCBfaSwgX2EsIHBvb2wsIF9iLCBfYywgZW50aXR5LCBzdWJtYXAsIHJsaXN0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgX2EgPSB0aGlzLmdyb3VwczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChfYiA9IDAsIF9jID0gcG9vbC5saXN0OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5ID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWFwLmhhcyhlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldChlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllciwgbmV3IE1hcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcCA9IG1hcC5nZXQoZW50aXR5LmNvbmZpZy5yZW5kZXJfbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdWJtYXAuaGFzKGVudGl0eS5zaGFwZWRfc3ByaXRlLnNwcml0ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFwLnNldChlbnRpdHkuc2hhcGVkX3Nwcml0ZS5zcHJpdGUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcC5nZXQoZW50aXR5LnNoYXBlZF9zcHJpdGUuc3ByaXRlKS5wdXNoKGVudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodjAsIGswKSB7IHJldHVybiBybGlzdC5wdXNoKHsgcmw6IGswLCB2OiB2MCB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5ybCAtIGIucmw7IH0pO1xuICAgICAgICAgICAgICAgIHJsaXN0LmZvckVhY2goZnVuY3Rpb24gKHJsKSB7IHJldHVybiBybC52LmZvckVhY2goZnVuY3Rpb24gKHYxLCBrMSkgeyByZXR1cm4gU3ByaXRlTWFuYWdlci5nZXQoU1BSSVRFU1trMV0uc3ByaXRlKS5kcmF3KHYxKTsgfSk7IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFbnRpdHlQb29sO1xufSgpKTtcbmV4cG9ydCB7IEVudGl0eVBvb2wgfTtcbiIsImV4cG9ydCB2YXIgU0NSX0hBTEZfV0lEVEggPSAxOTI7XG5leHBvcnQgdmFyIFNDUl9IQUxGX0hFSUdIVCA9IDIyNDtcbmV4cG9ydCB2YXIgU0NSX0hBTEZfV0lOX1dJRFRIID0gMjUwO1xuZXhwb3J0IHZhciBTQ1JfSEFMRl9XSU5fSEVJR0hUID0gMjUwO1xuZXhwb3J0IGZ1bmN0aW9uIHNjckNvb3JkX3RvX0dMQ29vcmRfeCh4KSB7XG4gICAgcmV0dXJuIHggLyBTQ1JfSEFMRl9XSU5fV0lEVEg7XG59XG5leHBvcnQgZnVuY3Rpb24gc2NyQ29vcmRfdG9fR0xDb29yZF95KHkpIHtcbiAgICByZXR1cm4geSAvIFNDUl9IQUxGX1dJTl9IRUlHSFQ7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgQnVsbGV0LCB0ZW1wbGF0ZV9jb25maWdfYnVsbGV0IH0gZnJvbSBcIi4vZW50aXR5L0J1bGxldFwiO1xuaW1wb3J0IHsgUmVwZWF0U3VwcGxpZXIsIFNjaGVkdWxlciB9IGZyb20gXCIuL3NjaGVkdWxlL1NjaGV1bGVyXCI7XG5pbXBvcnQgeyBjbGVhciB9IGZyb20gXCIuL3Nwcml0ZS9nbFwiO1xuaW1wb3J0IHsgc21hbGxfcm91bmRfcmVkIH0gZnJvbSBcIi4vc3ByaXRlL3NoYXBlZF9zcHJpdGVzXCI7XG5pbXBvcnQgeyBTcHJpdGVNYW5hZ2VyIH0gZnJvbSBcIi4vc3ByaXRlL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi9zcHJpdGUvc3ByaXRlc1wiO1xuaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuL3N0YWdlL0VudGl0eVBvb2xcIjtcbnZhciBwb29sID0gbnVsbDtcbjtcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcGVhdCwgbjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IG5ldyBFbnRpdHlQb29sKCk7XG4gICAgICAgICAgICAgICAgICAgIGV2YWwoXCJ3aW5kb3cuZGVidWdfaW5mby5wb29sID0gcG9vbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVwZWF0ID0gZnVuY3Rpb24gKGl0ZW0sIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuID09PSB2b2lkIDApIHsgbiA9IEluZmluaXR5OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlcGVhdFN1cHBsaWVyKGl0ZW0sIG4pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBTcHJpdGVNYW5hZ2VyLmdldChTUFJJVEVTW3NtYWxsX3JvdW5kX3JlZC5zcHJpdGVdLnNwcml0ZSkubG9hZCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgbiA9IDg7XG4gICAgICAgICAgICAgICAgICAgIHBvb2wuYWRkKG5ldyBTY2hlZHVsZXIoW1xuICAgICAgICAgICAgICAgICAgICAgICAgMTIwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0KGZ1bmN0aW9uIChpMCkgeyByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdChmdW5jdGlvbiAoaTEpIHsgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9vbC5hZGQobmV3IEJ1bGxldChzbWFsbF9yb3VuZF9yZWQsIHRlbXBsYXRlX2NvbmZpZ19idWxsZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2ltcGxlSW5pdCgwLCAwLCAyLCAwLjAwMiAqIGkwICogaTAgKyBNYXRoLlBJICogMiAvIG4gKiBpMSkpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07IH0sIG4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDNcbiAgICAgICAgICAgICAgICAgICAgICAgIF07IH0sIEluZmluaXR5KVxuICAgICAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG52YXIgc3RhcnRlZCA9IGZhbHNlO1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGlmIChzdGFydGVkKVxuICAgICAgICByZXR1cm47XG4gICAgc3RhcnRlZCA9IHRydWU7XG4gICAgdXBkYXRlKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gdGVybWluYXRlKCkge1xuICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbn1cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBwb29sLnVwZGF0ZSgpO1xuICAgIGNsZWFyKCk7XG4gICAgcG9vbC5yZW5kZXIoKTtcbiAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG4iLCJpbXBvcnQgeyBzZXR1cCwgbG9hZEltYWdlLCBsb2FkVGV4dHVyZSwgY2xlYXIsIGRyYXdTbmFrZSwgZHJhd1JlY3RzIH0gZnJvbSBcIi4vc3RnL3Nwcml0ZS9nbFwiO1xuaW1wb3J0IHsgaW5pdCwgc3RhcnQsIHRlcm1pbmF0ZSB9IGZyb20gXCIuL3N0Zy90ZXN0XCJcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIHZhciB3aW53ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHdpbmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIHdpbnIgPSBNYXRoLm1pbih3aW53LCB3aW5oKSAqIDAuODtcblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsY2FudmFzXCIpO1xuXG4gICAgLy8gc2V0IHRoZSBkaXNwbGF5IHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aW5yICsgXCJweFwiO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSB3aW5yICsgXCJweFwiO1xuXG4gICAgLy8gc2V0IHRoZSBzaXplIG9mIHRoZSBkcmF3aW5nQnVmZmVyXG4gICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2luciAqIGRldmljZVBpeGVsUmF0aW87XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbnIgKiBkZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgc2V0dXAoKTtcbiAgICBhd2FpdCBpbml0KCk7XG4gICAgc3RhcnQoKTtcbiAgICB3aW5kb3cuZGVidWdfaW5mby5zdGcgPSB7XG4gICAgICAgIGluaXQ6IGluaXQsXG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgdGVybWluYXRlOiB0ZXJtaW5hdGVcbiAgICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q3VydmUoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBsb2FkSW1hZ2UoXCJhc3NldHMvbWlzc2lsZV9ncmVlbi5wbmdcIik7XG4gICAgY29uc3QgdGV4dHVyZSA9IGxvYWRUZXh0dXJlKGltYWdlKTtcbiAgICBjbGVhcigpO1xuICAgIHZhciBzaXplID0gNTAwO1xuICAgIHZhciB4eSA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHh5W2kgKiAyICsgMF0gPSBNYXRoLnNpbihpICogMTAgKiBNYXRoLlBJIC8gc2l6ZSkgKiAwLjE7XG4gICAgICAgIHh5W2kgKiAyICsgMV0gPSAxLjggKiBpIC8gc2l6ZSAtIDAuOTtcbiAgICB9XG4gICAgdGltZXIoKCkgPT4gZHJhd1NuYWtlKHh5LCAwLjAzLCBzaXplLCAwLCAwLCAxLCAxLCB0ZXh0dXJlKSk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluOyIsImltcG9ydCB7IHNjckNvb3JkX3RvX0dMQ29vcmRfeCwgc2NyQ29vcmRfdG9fR0xDb29yZF95IH0gZnJvbSBcIi4uL3N0YWdlL1NjcmVlblwiO1xuXG5jb25zdCB2ZXJ0ZXhDb2RlID0gYFxuYXR0cmlidXRlIHZlYzIgY29vcmQ7XG5hdHRyaWJ1dGUgdmVjMiB0ZXg7XG52YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleENvb3JkO1xudm9pZCBtYWluKHZvaWQpIHtcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoY29vcmQsIDAuMCwgMS4wKTtcbiAgICB2VGV4Q29vcmQgPSB0ZXg7XG59XG5gO1xuXG5jb25zdCBmcmFnbWVudENvZGUgPSBgXG52YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleENvb3JkO1xudW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG52b2lkIG1haW4odm9pZCkge1xuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleENvb3JkKTtcbn1cbmA7XG5cbmNvbnN0IGdsb2JhbF9nbCA9IHtcbiAgICBnbDogbnVsbCxcbiAgICBzaGFkZXI6IHtcbiAgICAgICAgcHJvZ3JhbTogMCxcbiAgICAgICAgYXR0cmlidXRlOiB7XG4gICAgICAgICAgICBjb29yZDogMCxcbiAgICAgICAgICAgIHRleDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgdW5pZm9ybToge1xuICAgICAgICAgICAgdVNhbXBsZXI6IDAsXG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbGNhbnZhcycpO1xuICAgIHZhciBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xuICAgIGlmIChnbCA9PT0gbnVsbCkge1xuICAgICAgICBhbGVydChcIlVuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMLiBZb3VyIGJyb3dzZXIgb3IgbWFjaGluZSBtYXkgbm90IHN1cHBvcnQgaXQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2xvYmFsX2dsLmdsID0gZ2w7XG4gICAgdmFyIHZlcnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgdmFyIGZyYWdTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydFNoYWRlciwgdmVydGV4Q29kZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdTaGFkZXIsIGZyYWdtZW50Q29kZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdTaGFkZXIpO1xuICAgIHZhciBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCB2ZXJ0U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ1NoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG4gICAgZ2wudXNlUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgICBjb25zdCBzaGFkZXIgPSBnbG9iYWxfZ2wuc2hhZGVyO1xuICAgIHNoYWRlci5wcm9ncmFtID0gc2hhZGVyUHJvZ3JhbTtcbiAgICBzaGFkZXIuYXR0cmlidXRlLmNvb3JkID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2Nvb3JkJyk7XG4gICAgc2hhZGVyLmF0dHJpYnV0ZS50ZXggPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndGV4Jyk7XG4gICAgc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG5cbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wudmlld3BvcnQoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoaW1nKVxuICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdFxuICAgICAgICBpbWcuc3JjID0gc3JjXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcodmVyX2FyciwgdGV4X2FyciwgdGV4dHVyZSwgc2l6ZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXgpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgc2l6ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U3RyaXAodmVyX2FyciwgdGV4X2FyciwgaW5kX2FyciwgdGV4dHVyZSwgc2l6ZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXgpO1xuXG4gICAgY29uc3QgaW5kX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShnbG9iYWxfZ2wuc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIsIDApO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZShpbWFnZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9TSE9SVF80XzRfNF80LCBpbWFnZSlcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAxLjAsIDEuMCk7XG59XG5cbmNvbnN0IHZlcmFuZyA9IFszLCAtMywgLTEsIDMsIDEsIC0xXTtcbmNvbnN0IHRleHggPSBbMCwgMCwgMSwgMCwgMSwgMV07XG5jb25zdCB0ZXh5ID0gWzAsIDEsIDEsIDAsIDAsIDFdO1xuXG5mdW5jdGlvbiBzY3JDb29yZF90b19HTENvb3JkKGZhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmYS5sZW5ndGggLyAyOyBpKyspIHtcbiAgICAgICAgZmFbaSAqIDJdID0gc2NyQ29vcmRfdG9fR0xDb29yZF94KGZhW2kgKiAyXSk7XG4gICAgICAgIGZhW2kgKiAyICsgMV0gPSBzY3JDb29yZF90b19HTENvb3JkX3koZmFbaSAqIDIgKyAxXSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3RzKHh5cndoLCBzaXplLCB0ZXh0dXJlKSB7XG4gICAgY29uc3QgdmVyID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogMTIpO1xuICAgIGNvbnN0IHRleCA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDEyKTtcbiAgICBjb25zdCBwaWQ0ID0gTWF0aC5QSSAvIDQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA2OyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSB4eXJ3aFtpICogOSArIDJdICsgdmVyYW5nW2pdICogcGlkNDtcbiAgICAgICAgICAgIHZlcltpICogMTIgKyBqICogMiArIDBdID0geHlyd2hbaSAqIDkgKyAwXSArIHh5cndoW2kgKiA5ICsgM10gKiBNYXRoLmNvcyhhKSAtIHh5cndoW2kgKiA5ICsgNF0gKiBNYXRoLnNpbihhKTtcbiAgICAgICAgICAgIHZlcltpICogMTIgKyBqICogMiArIDFdID0geHlyd2hbaSAqIDkgKyAxXSArIHh5cndoW2kgKiA5ICsgM10gKiBNYXRoLnNpbihhKSArIHh5cndoW2kgKiA5ICsgNF0gKiBNYXRoLmNvcyhhKTtcbiAgICAgICAgICAgIHRleFtpICogMTIgKyBqICogMiArIDBdID0geHlyd2hbaSAqIDkgKyA1XSArIHRleHhbal0gKiB4eXJ3aFtpICogOSArIDddO1xuICAgICAgICAgICAgdGV4W2kgKiAxMiArIGogKiAyICsgMV0gPSB4eXJ3aFtpICogOSArIDZdICsgdGV4eVtqXSAqIHh5cndoW2kgKiA5ICsgOF07XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY3JDb29yZF90b19HTENvb3JkKHZlcik7XG4gICAgZHJhdyh2ZXIsIHRleCwgdGV4dHVyZSwgc2l6ZSAqIDYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1NuYWtlKHh5LCB3LCBzaXplLCB0eCwgdHksIHR3LCB0aCwgdGV4dHVyZSkge1xuICAgIGNvbnN0IHZlciA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDYpO1xuICAgIGNvbnN0IGxlbiA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSk7XG4gICAgY29uc3QgdGV4ID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogNik7XG4gICAgY29uc3QgaW5kID0gbmV3IEludDE2QXJyYXkoKHNpemUgLSAxKSAqIDIpO1xuICAgIHZhciB0b3QgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZSAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBweCA9IHh5W2kgKiAyXTtcbiAgICAgICAgY29uc3QgcHkgPSB4eVtpICogMiArIDFdO1xuICAgICAgICBjb25zdCBueCA9IHh5W2kgKiAyICsgMl07XG4gICAgICAgIGNvbnN0IG55ID0geHlbaSAqIDIgKyAzXTtcbiAgICAgICAgY29uc3Qgb3ggPSAocHggKyBueCkgLyAyO1xuICAgICAgICBjb25zdCBveSA9IChweSArIG55KSAvIDI7XG5cbiAgICAgICAgY29uc3QgbCA9IE1hdGguc3FydCgobnggLSBweCkgKiAobnggLSBweCkgKyAobnkgLSBweSkgKiAobnkgLSBweSkpO1xuICAgICAgICBsZW5baV0gPSBsO1xuICAgICAgICB0b3QgKz0gbDtcblxuICAgICAgICB2ZXJbaSAqIDYgKyAwXSA9IHB4O1xuICAgICAgICB2ZXJbaSAqIDYgKyAxXSA9IHB5O1xuICAgICAgICB2ZXJbaSAqIDYgKyAyXSA9IG94IC0gKG95IC0gcHkpIC8gbCAqIHc7XG4gICAgICAgIHZlcltpICogNiArIDNdID0gb3kgKyAob3ggLSBweCkgLyBsICogdztcbiAgICAgICAgdmVyW2kgKiA2ICsgNF0gPSBveCArIChveSAtIHB5KSAvIGwgKiB3O1xuICAgICAgICB2ZXJbaSAqIDYgKyA1XSA9IG95IC0gKG94IC0gcHgpIC8gbCAqIHc7XG4gICAgfVxuICAgIHNjckNvb3JkX3RvX0dMQ29vcmQodmVyKTtcbiAgICB0b3QgLT0gbGVuWzBdIC8gMiArIGxlbltzaXplIC0gMV0gLyAyO1xuXG4gICAgdmFyIHN0YSA9IC1sZW5bMF0gLyAyO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHRleFtpICogNiArIDBdID0gdHggKyB0dyAqIHN0YSAvIHRvdDtcbiAgICAgICAgdGV4W2kgKiA2ICsgMV0gPSB0eSArIHRoIC8gMjtcbiAgICAgICAgc3RhICs9IGxlbltpXSAvIDI7XG4gICAgICAgIHRleFtpICogNiArIDJdID0gdHggKyB0dyAqIHN0YSAvIHRvdDtcbiAgICAgICAgdGV4W2kgKiA2ICsgM10gPSB0eTtcbiAgICAgICAgdGV4W2kgKiA2ICsgNF0gPSB0eCArIHR3ICogc3RhIC8gdG90O1xuICAgICAgICB0ZXhbaSAqIDYgKyA1XSA9IHR5ICsgdGg7XG4gICAgICAgIHN0YSArPSBsZW5baV0gLyAyO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICAgICAgaW5kW2kgKiAyICsgMF0gPSBpICogMyArIDE7XG4gICAgICAgIGluZFtpICogMiArIDFdID0gaSAqIDMgKyAzO1xuICAgIH1cbiAgICBpbmRbc2l6ZSAqIDIgLSAzXS0tO1xuXG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdmVyX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IGNvb3JkID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUuY29vcmQ7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcl9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGNvb3JkLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGNvb3JkKTtcblxuICAgIGNvbnN0IHRleF9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCB0ZXhjID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUudGV4O1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4LCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXhjLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleGMpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBjb25zdCBpbmRfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kX2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVfU1RSSVAsIHNpemUgKiAyIC0gMiwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgICAgIGluZFtpICogMiArIDBdID0gaSAqIDM7XG4gICAgICAgIGluZFtpICogMiArIDFdID0gaSAqIDMgKyAyO1xuICAgIH1cbiAgICBpbmRbMF0rKztcblxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZCwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplICogMiAtIDIsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcblxufVxuXG53aW5kb3cuZGVidWdfaW5mbyA9IHt9O1xud2luZG93LmRlYnVnX2luZm8uZ2xvYmFsX2dsID0gZ2xvYmFsX2dsO1xud2luZG93LmRlYnVnX2luZm8uZ2xfZnVuYyA9IHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIGRyYXc6IGRyYXcsXG4gICAgZHJhd1N0cmlwOiBkcmF3U3RyaXAsXG4gICAgZHJhd1JlY3RzOiBkcmF3UmVjdHMsXG4gICAgZHJhd1NuYWtlOiBkcmF3U25ha2Vcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=