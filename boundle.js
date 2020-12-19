/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/platform/page.ts":
/*!******************************!*\
  !*** ./src/platform/page.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "page_update": () => /* binding */ page_update
/* harmony export */ });
/* harmony import */ var _stg_stage_EntityPool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stg/stage/EntityPool */ "./src/stg/stage/EntityPool.ts");
/* harmony import */ var _stg_entity_SelfMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../stg/entity/SelfMachine */ "./src/stg/entity/SelfMachine.ts");
/* harmony import */ var _stg_sprite_gl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stg/sprite/gl */ "./src/stg/sprite/gl.js");
/* harmony import */ var _stg_stage_Screen__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../stg/stage/Screen */ "./src/stg/stage/Screen.ts");
/* harmony import */ var _platform_init__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./platform_init */ "./src/platform/platform_init.js");





var paused = false;
var ref_mouse = false;
var ref_scr_x = 0;
var ref_scr_y = 0;
var last_x = 0;
var last_y = 0;
function page_update() {
    stg_update();
}
function stg_update() {
    var pool = _stg_stage_EntityPool__WEBPACK_IMPORTED_MODULE_0__.EntityPool.INSTANCE;
    if (pool) {
        var act = update_input();
        if (!paused) {
            _stg_entity_SelfMachine__WEBPACK_IMPORTED_MODULE_1__.SelfMachine.updateState(act);
            if (!paused)
                for (var i = 0; i < _platform_init__WEBPACK_IMPORTED_MODULE_4__.last_update_rate; i++)
                    pool.update();
        }
        _stg_sprite_gl__WEBPACK_IMPORTED_MODULE_2__.clear();
        pool.render();
    }
}
function update_input() {
    if (_platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.Escape == _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_CLICK)
        paused = !paused;
    if (paused) {
        ref_mouse = false;
        return null;
    }
    var pos_x = 0;
    var pos_y = 0;
    if (_platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.Shift >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS) {
        if (!ref_mouse) {
            ref_mouse = true;
            ref_scr_x = _platform_init__WEBPACK_IMPORTED_MODULE_4__.mouse.x;
            ref_scr_y = _platform_init__WEBPACK_IMPORTED_MODULE_4__.mouse.y;
            last_x = 0;
            last_y = 0;
        }
        pos_x = _platform_init__WEBPACK_IMPORTED_MODULE_4__.mouse.x - ref_scr_x - last_x;
        pos_y = _platform_init__WEBPACK_IMPORTED_MODULE_4__.mouse.y - ref_scr_y - last_y;
        last_x += pos_x;
        last_y += pos_y;
    }
    if (ref_mouse && _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.Shift < _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS)
        ref_mouse = false;
    var act = {
        pos_x: pos_x / _platform_init__WEBPACK_IMPORTED_MODULE_4__.canvas_width * _stg_stage_Screen__WEBPACK_IMPORTED_MODULE_3__.SCR_HALF_WIN_WIDTH * 2,
        pos_y: -pos_y / _platform_init__WEBPACK_IMPORTED_MODULE_4__.canvas_height * _stg_stage_Screen__WEBPACK_IMPORTED_MODULE_3__.SCR_HALF_WIN_HEIGHT * 2,
        key_z: _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.z >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS,
        key_x: _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.x == _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_CLICK,
        key_c: _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.c == _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_CLICK
    };
    return act;
}


/***/ }),

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
        if (this.state == _Entity__WEBPACK_IMPORTED_MODULE_0__.State.PRE_ENTRY)
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
        e.damaged(e, this);
    };
    Bullet.prototype.damaged = function (_, s) {
        if (this.config.kill_by_bomb && (s.config.collide_group == _Entity__WEBPACK_IMPORTED_MODULE_0__.CG_BOMB || s.config.collide_group == _Entity__WEBPACK_IMPORTED_MODULE_0__.CG_PLAYER)) {
            this.state = _Entity__WEBPACK_IMPORTED_MODULE_0__.State.LEAVING;
            return true;
        }
        return false;
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
    RayLaser.prototype.damaged = function (_, source) {
        return false;
    };
    return RayLaser;
}(SIRay));



/***/ }),

/***/ "./src/stg/entity/SelfMachine.ts":
/*!***************************************!*\
  !*** ./src/stg/entity/SelfMachine.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SelfMachine": () => /* binding */ SelfMachine
/* harmony export */ });
/* harmony import */ var _sprite_Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sprite/Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sprite/shaped_sprites */ "./src/stg/sprite/shaped_sprites.ts");
/* harmony import */ var _stage_Screen__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../stage/Screen */ "./src/stg/stage/Screen.ts");
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Entity */ "./src/stg/entity/Entity.ts");
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




var SelfMachine = /** @class */ (function (_super) {
    __extends(SelfMachine, _super);
    function SelfMachine(proto, abi, x, y) {
        var _this = _super.call(this, (0,_Entity__WEBPACK_IMPORTED_MODULE_3__.clone)(_sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_1__.self_machine)) || this;
        _this.config = _Entity__WEBPACK_IMPORTED_MODULE_3__.template_config_player;
        _this.state = _Entity__WEBPACK_IMPORTED_MODULE_3__.State.ALIVE;
        _this.miss = false;
        _this.bomb = false;
        _this.pre_miss = 0;
        _this.miss_time = 0;
        _this.invince_time = 0;
        SelfMachine.INSTANCE = _this;
        _this.proto = proto;
        _this.ability = abi;
        _this.px = x;
        _this.py = y;
        _this.dir = 0;
        return _this;
    }
    SelfMachine.updateState = function (act) {
        SelfMachine.action = act;
    };
    SelfMachine.prototype.update = function (_) {
        if (!SelfMachine.action)
            return;
        this.px += SelfMachine.action.pos_x;
        this.py += SelfMachine.action.pos_y;
        if (this.px < -_stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_WIDTH)
            this.px = -_stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_WIDTH;
        if (this.px > _stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_WIDTH)
            this.px = _stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_WIDTH;
        if (this.py < -_stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_HEIGHT)
            this.py = -_stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_HEIGHT;
        if (this.py > _stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_HEIGHT)
            this.py = _stage_Screen__WEBPACK_IMPORTED_MODULE_2__.SCR_HALF_HEIGHT;
        this.proto.updateShoot(SelfMachine.action.key_z);
        this.bomb = this.proto.updateBomb(SelfMachine.action.key_x);
        this.proto.updateSpecial(SelfMachine.action.key_c);
    };
    SelfMachine.prototype.postUpdate = function (_) {
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
        if (this.miss) {
            this.miss = false;
            this.pre_miss = this.ability.pre_miss;
        }
        if (this.bomb) {
            this.bomb = false;
            this.miss_time = this.ability.bomb_time;
            if (this.pre_miss > 0) {
                // bomb after miss
                console.log("bomb after miss");
                this.pre_miss = 0;
            }
        }
        if (this.miss_time > 0 || this.pre_miss > 0) {
            this.invince_time++;
            if (Math.floor(this.invince_time / 6) % 2 == 0) {
                this.shaped_sprite.sprite = null;
            }
            else {
                this.shaped_sprite.sprite = _sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_1__.self_machine.sprite;
            }
        }
        else {
            this.invince_time = 0;
            this.shaped_sprite.sprite = _sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_1__.self_machine.sprite;
        }
    };
    SelfMachine.prototype.attack = function (_, target) {
    };
    SelfMachine.prototype.damaged = function (_, s) {
        if (this.pre_miss == 0 && this.miss_time == 0)
            this.miss = true;
        return s.damaged(s, this);
    };
    SelfMachine.INSTANCE = null;
    SelfMachine.action = null;
    return SelfMachine;
}(_sprite_Shape__WEBPACK_IMPORTED_MODULE_0__.SIPoint));



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
    Scheduler.prototype.damaged = function (_, s) {
        return false;
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
    ShapeCircle.prototype.distanceTo = function (self, px, py) {
        px -= self.px;
        py -= self.py;
        return Math.sqrt(px * px + py * py) - this.radius;
    };
    ShapeCircle.prototype._distanceTo = function (px, py) {
        return Math.sqrt(px * px + py * py) - this.radius;
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
/* harmony export */   "self_machine": () => /* binding */ self_machine,
/* harmony export */   "ray_laser_red": () => /* binding */ ray_laser_red,
/* harmony export */   "curve_laser_red": () => /* binding */ curve_laser_red
/* harmony export */ });
/* harmony import */ var _entity_RayLaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity/RayLaser */ "./src/stg/entity/RayLaser.ts");
/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteManager */ "./src/stg/sprite/SpriteManager.ts");



var small_round_red = {
    renderType: _SpriteManager__WEBPACK_IMPORTED_MODULE_2__.RENDER_TYPE.RECT,
    sprite: "round_red",
    shape: new _Shape__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle(3),
    w: 4,
    h: 4
};
var self_machine = {
    renderType: _SpriteManager__WEBPACK_IMPORTED_MODULE_2__.RENDER_TYPE.RECT,
    sprite: "round_blue",
    shape: new _Shape__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle(3),
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
    },
    "round_blue": {
        "sprite": "assets/missile_blue.png",
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
                if (this.groups[i].mask & (1 << j)) {
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
                        if (!entity.config.render_layer || !entity.shaped_sprite || !entity.shaped_sprite.sprite)
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
var SCR_HALF_WIDTH = 250;
var SCR_HALF_HEIGHT = 250;
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
/* harmony export */   "init": () => /* binding */ init
/* harmony export */ });
/* harmony import */ var _entity_Bullet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity/Bullet */ "./src/stg/entity/Bullet.ts");
/* harmony import */ var _entity_SelfMachine__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./entity/SelfMachine */ "./src/stg/entity/SelfMachine.ts");
/* harmony import */ var _schedule_Scheuler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./schedule/Scheuler */ "./src/stg/schedule/Scheuler.ts");
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







var sm_proto = {
    updateShoot: function (shoot) {
        return false;
    },
    updateBomb: function (bomb) {
        return false;
    },
    updateSpecial: function (special) {
        return false;
    }
};
var sm_abi = {
    pre_miss: 30,
    miss_time: 60,
    bomb_time: 60
};
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, repeat, n;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pool = new _stage_EntityPool__WEBPACK_IMPORTED_MODULE_6__.EntityPool();
                    pool.add(new _entity_SelfMachine__WEBPACK_IMPORTED_MODULE_1__.SelfMachine(sm_proto, sm_abi, 0, 0));
                    eval("window.debug_info.pool = pool");
                    repeat = function (item, n) {
                        if (n === void 0) { n = Infinity; }
                        return new _schedule_Scheuler__WEBPACK_IMPORTED_MODULE_2__.RepeatSupplier(item, n);
                    };
                    return [4 /*yield*/, _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.SpriteManager.get(_sprite_sprites__WEBPACK_IMPORTED_MODULE_5__.SPRITES[_sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_3__.small_round_red.sprite].sprite).load()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_4__.SpriteManager.get(_sprite_sprites__WEBPACK_IMPORTED_MODULE_5__.SPRITES[_sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_3__.self_machine.sprite].sprite).load()];
                case 2:
                    _a.sent();
                    n = 5;
                    pool.add(new _schedule_Scheuler__WEBPACK_IMPORTED_MODULE_2__.Scheduler([
                        60,
                        repeat(function (i0) { return [
                            repeat(function (i1) { return [
                                function () { return pool.add(new _entity_Bullet__WEBPACK_IMPORTED_MODULE_0__.Bullet(_sprite_shaped_sprites__WEBPACK_IMPORTED_MODULE_3__.small_round_red, _entity_Bullet__WEBPACK_IMPORTED_MODULE_0__.template_config_bullet)
                                    .simpleInit(0, 0, 2, 0.0008 * i0 * i0 + Math.PI * 2 / n * i1)); },
                            ]; }, n),
                            2
                        ]; }, Infinity)
                    ]));
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stg_test__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stg/test */ "./src/stg/test.ts");
/* harmony import */ var _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platform/platform_init */ "./src/platform/platform_init.js");



async function main() {
    _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__.test_fps();
    _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__.setup_canvas();
    await _stg_test__WEBPACK_IMPORTED_MODULE_0__.init();
    _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__.mainloop_start();
    window.debug_info.stg = {
        fps: _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__.test_fps,
        init: _stg_test__WEBPACK_IMPORTED_MODULE_0__.init,
        start: _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__.mainloop_start,
        terminate: _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__.mainloop_terminate,
    };
    window.debug_info.platform = _platform_platform_init__WEBPACK_IMPORTED_MODULE_1__;
}

window.onload = main;

/***/ }),

/***/ "./src/platform/platform_init.js":
/*!***************************************!*\
  !*** ./src/platform/platform_init.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "devicePixelRatio": () => /* binding */ devicePixelRatio,
/* harmony export */   "last_update_rate": () => /* binding */ last_update_rate,
/* harmony export */   "canvas_width": () => /* binding */ canvas_width,
/* harmony export */   "canvas_height": () => /* binding */ canvas_height,
/* harmony export */   "test_fps": () => /* binding */ test_fps,
/* harmony export */   "setup_canvas": () => /* binding */ setup_canvas,
/* harmony export */   "mainloop_start": () => /* binding */ mainloop_start,
/* harmony export */   "mainloop_terminate": () => /* binding */ mainloop_terminate,
/* harmony export */   "mouse": () => /* binding */ mouse,
/* harmony export */   "keys": () => /* binding */ keys,
/* harmony export */   "KEY_PRESS": () => /* binding */ KEY_PRESS,
/* harmony export */   "KEY_CLICK": () => /* binding */ KEY_CLICK
/* harmony export */ });
/* harmony import */ var _stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stg/sprite/gl */ "./src/stg/sprite/gl.js");
/* harmony import */ var _page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./page */ "./src/platform/page.ts");


;


var test_n = 240;
var fps_start = 0;
var fps_total = 0;
var resolver = null;
var devicePixelRatio = 1;
var last_update_rate = 1;
var canvas_width;
var canvas_height;

function test_fps() {
    fps_start = performance.now();
    fps_total = test_n + 1;
    fps_update();
    return new Promise((resolve, reject) => {
        resolver = resolve;
    })
}

function fps_update() {
    fps_total--;
    if (fps_total) {
        requestAnimationFrame(fps_update);
        return;
    }
    var rate = (performance.now() - fps_start) / test_n;
    last_update_rate = Math.round(rate / (1000.0 / 60));
    resolver(last_update_rate);
}

function setup_canvas() {
    var winw = window.innerWidth;
    var winh = window.innerHeight;
    var winr = Math.min(winw, winh) * 0.8;
    var canvas = document.getElementById("glcanvas");
    canvas_width = winr;
    canvas_height = winr;
    canvas.style.width = winr + "px";
    canvas.style.height = winr + "px";
    devicePixelRatio = window.devicePixelRatio || 1;
    canvas.width = winr * devicePixelRatio;
    canvas.height = winr * devicePixelRatio;
    _stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.setup();
}

var started = false;

function mainloop_start() {
    if (started)
        return;
    started = true;
    mainloop_update();
}

function mainloop_terminate() {
    started = false;
}

function mainloop_update() {
    (0,_page__WEBPACK_IMPORTED_MODULE_1__.page_update)();
    keys_update();
    if (started)
        requestAnimationFrame(mainloop_update);
}

var mouse = { x: 0, y: 0 };
var keys = {};

document.onmousemove = (event) => {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
}

document.addEventListener('keydown', (event) => {
    keys[event.key] = 3;
}, false);

document.addEventListener('keyup', (event) => {
    keys[event.key] = 1;
}, false);

function keys_update() {
    for (var key in keys) {
        if (keys[key] == 3)
            keys[key] = 2;
        if (keys[key] == 1)
            keys[key] = 0;
    }
}

const KEY_PRESS = 2;
const KEY_CLICK = 3;


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


;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9wbGF0Zm9ybS9wYWdlLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9lbnRpdHkvQnVsbGV0LnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9lbnRpdHkvRW50aXR5LnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9lbnRpdHkvUmF5TGFzZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL2VudGl0eS9TZWxmTWFjaGluZS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc2NoZWR1bGUvU2NoZXVsZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3Nwcml0ZS9TaGFwZS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL1Nwcml0ZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3Nwcml0ZS9zaGFwZWRfc3ByaXRlcy50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL3Nwcml0ZXMudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3N0YWdlL0VudGl0eVBvb2wudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3N0YWdlL1NjcmVlbi50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvdGVzdC50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9wbGF0Zm9ybS9wbGF0Zm9ybV9pbml0LmpzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvZ2wuanMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFxRDtBQUNHO0FBQ2pCO0FBQ087QUFDRjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0VBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLFlBQVksNEVBQXVCO0FBQ25DO0FBQ0EsK0JBQStCLEtBQUssNERBQXlCLENBQUM7QUFDOUQ7QUFDQTtBQUNBLFFBQVEsaURBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUF1QixJQUFJLHFEQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNCLElBQUkscURBQWtCO0FBQ3BEO0FBQ0E7QUFDQSx3QkFBd0IsbURBQWdCO0FBQ3hDLHdCQUF3QixtREFBZ0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1EQUFnQjtBQUNoQyxnQkFBZ0IsbURBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixzREFBc0IsR0FBRyxxREFBa0I7QUFDaEU7QUFDQTtBQUNBLHVCQUF1Qix3REFBcUIsR0FBRyxpRUFBeUI7QUFDeEUsd0JBQXdCLHlE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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBUTtBQUNaOztBQUVBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLGtEQUFXO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sYUFBYTtBQUNiOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRks7O0FBRVosQ0FBK0U7O0FBRS9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDLG9CQUFvQixvRUFBcUI7QUFDekMsd0JBQXdCLG9FQUFxQjtBQUM3QztBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0IsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O1VDM1FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3JCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsc0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7VUNOQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJib3VuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuLi9zdGcvc3RhZ2UvRW50aXR5UG9vbFwiO1xuaW1wb3J0IHsgU2VsZk1hY2hpbmUgfSBmcm9tIFwiLi4vc3RnL2VudGl0eS9TZWxmTWFjaGluZVwiO1xuaW1wb3J0ICogYXMgZ2wgZnJvbSBcIi4uL3N0Zy9zcHJpdGUvZ2xcIjtcbmltcG9ydCAqIGFzIFNjcmVlbiBmcm9tIFwiLi4vc3RnL3N0YWdlL1NjcmVlblwiO1xuaW1wb3J0ICogYXMgcGxhdGZvcm0gZnJvbSBcIi4vcGxhdGZvcm1faW5pdFwiO1xudmFyIHBhdXNlZCA9IGZhbHNlO1xudmFyIHJlZl9tb3VzZSA9IGZhbHNlO1xudmFyIHJlZl9zY3JfeCA9IDA7XG52YXIgcmVmX3Njcl95ID0gMDtcbnZhciBsYXN0X3ggPSAwO1xudmFyIGxhc3RfeSA9IDA7XG5leHBvcnQgZnVuY3Rpb24gcGFnZV91cGRhdGUoKSB7XG4gICAgc3RnX3VwZGF0ZSgpO1xufVxuZnVuY3Rpb24gc3RnX3VwZGF0ZSgpIHtcbiAgICB2YXIgcG9vbCA9IEVudGl0eVBvb2wuSU5TVEFOQ0U7XG4gICAgaWYgKHBvb2wpIHtcbiAgICAgICAgdmFyIGFjdCA9IHVwZGF0ZV9pbnB1dCgpO1xuICAgICAgICBpZiAoIXBhdXNlZCkge1xuICAgICAgICAgICAgU2VsZk1hY2hpbmUudXBkYXRlU3RhdGUoYWN0KTtcbiAgICAgICAgICAgIGlmICghcGF1c2VkKVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxhdGZvcm0ubGFzdF91cGRhdGVfcmF0ZTsgaSsrKVxuICAgICAgICAgICAgICAgICAgICBwb29sLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGdsLmNsZWFyKCk7XG4gICAgICAgIHBvb2wucmVuZGVyKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlX2lucHV0KCkge1xuICAgIGlmIChwbGF0Zm9ybS5rZXlzW1wiRXNjYXBlXCJdID09IHBsYXRmb3JtLktFWV9DTElDSylcbiAgICAgICAgcGF1c2VkID0gIXBhdXNlZDtcbiAgICBpZiAocGF1c2VkKSB7XG4gICAgICAgIHJlZl9tb3VzZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIHBvc194ID0gMDtcbiAgICB2YXIgcG9zX3kgPSAwO1xuICAgIGlmIChwbGF0Zm9ybS5rZXlzW1wiU2hpZnRcIl0gPj0gcGxhdGZvcm0uS0VZX1BSRVNTKSB7XG4gICAgICAgIGlmICghcmVmX21vdXNlKSB7XG4gICAgICAgICAgICByZWZfbW91c2UgPSB0cnVlO1xuICAgICAgICAgICAgcmVmX3Njcl94ID0gcGxhdGZvcm0ubW91c2UueDtcbiAgICAgICAgICAgIHJlZl9zY3JfeSA9IHBsYXRmb3JtLm1vdXNlLnk7XG4gICAgICAgICAgICBsYXN0X3ggPSAwO1xuICAgICAgICAgICAgbGFzdF95ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwb3NfeCA9IHBsYXRmb3JtLm1vdXNlLnggLSByZWZfc2NyX3ggLSBsYXN0X3g7XG4gICAgICAgIHBvc195ID0gcGxhdGZvcm0ubW91c2UueSAtIHJlZl9zY3JfeSAtIGxhc3RfeTtcbiAgICAgICAgbGFzdF94ICs9IHBvc194O1xuICAgICAgICBsYXN0X3kgKz0gcG9zX3k7XG4gICAgfVxuICAgIGlmIChyZWZfbW91c2UgJiYgcGxhdGZvcm0ua2V5c1tcIlNoaWZ0XCJdIDwgcGxhdGZvcm0uS0VZX1BSRVNTKVxuICAgICAgICByZWZfbW91c2UgPSBmYWxzZTtcbiAgICB2YXIgYWN0ID0ge1xuICAgICAgICBwb3NfeDogcG9zX3ggLyBwbGF0Zm9ybS5jYW52YXNfd2lkdGggKiBTY3JlZW4uU0NSX0hBTEZfV0lOX1dJRFRIICogMixcbiAgICAgICAgcG9zX3k6IC1wb3NfeSAvIHBsYXRmb3JtLmNhbnZhc19oZWlnaHQgKiBTY3JlZW4uU0NSX0hBTEZfV0lOX0hFSUdIVCAqIDIsXG4gICAgICAgIGtleV96OiBwbGF0Zm9ybS5rZXlzW1wielwiXSA+PSBwbGF0Zm9ybS5LRVlfUFJFU1MsXG4gICAgICAgIGtleV94OiBwbGF0Zm9ybS5rZXlzW1wieFwiXSA9PSBwbGF0Zm9ybS5LRVlfQ0xJQ0ssXG4gICAgICAgIGtleV9jOiBwbGF0Zm9ybS5rZXlzW1wiY1wiXSA9PSBwbGF0Zm9ybS5LRVlfQ0xJQ0tcbiAgICB9O1xuICAgIHJldHVybiBhY3Q7XG59XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgQ0dfQk9NQiwgQ0dfQlVMTEVULCBDR19QTEFZRVIsIFJMX0JVTExFVCwgU3RhdGUgfSBmcm9tIFwiLi9FbnRpdHlcIjtcbmltcG9ydCB7IEVudGl0eVBvb2wgfSBmcm9tIFwiLi4vc3RhZ2UvRW50aXR5UG9vbFwiO1xuaW1wb3J0IHsgU0NSX0hBTEZfSEVJR0hULCBTQ1JfSEFMRl9XSURUSCB9IGZyb20gXCIuLi9zdGFnZS9TY3JlZW5cIjtcbmltcG9ydCB7IFNJUG9pbnQgfSBmcm9tIFwiLi4vc3ByaXRlL1NoYXBlXCI7XG5leHBvcnQgdmFyIHRlbXBsYXRlX2NvbmZpZ19idWxsZXQgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9CVUxMRVQsXG4gICAgY29sbGlkZV9ncm91cDogQ0dfQlVMTEVULFxuICAgIGNvbGxpZGVfbWFzazogQ0dfQlVMTEVULFxuICAgIGtpbGxfb25fZXhpdDogdHJ1ZSxcbiAgICBraWxsX2J5X2JvbWI6IHRydWUsXG4gICAgYXV0b19kaXJlY3Rpb246IHRydWVcbn07XG52YXIgQnVsbGV0ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdWxsZXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnVsbGV0KHNoYXBlZF9zaGFwZSwgYmMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2hhcGVkX3NoYXBlKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWTtcbiAgICAgICAgX3RoaXMuY29uZmlnID0gYmM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQnVsbGV0LnByb3RvdHlwZS5zaW1wbGVJbml0ID0gZnVuY3Rpb24gKHgwLCB5MCwgdiwgYSkge1xuICAgICAgICB0aGlzLnB4ID0geDA7XG4gICAgICAgIHRoaXMucHkgPSB5MDtcbiAgICAgICAgdGhpcy52eCA9IHYgKiBNYXRoLmNvcyhhKTtcbiAgICAgICAgdGhpcy52eSA9IHYgKiBNYXRoLnNpbihhKTtcbiAgICAgICAgdGhpcy5kaXIgPSBhO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEJ1bGxldC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU3RhdGUuUFJFX0VOVFJZKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkFMSVZFO1xuICAgICAgICB2YXIgcmF0ZSA9IEVudGl0eVBvb2wuSU5TVEFOQ0Uuc3BlY2lhbF9lZmZlY3RzLnRpbWVfcmF0ZTtcbiAgICAgICAgLy8gRXZlbnQ6IE9uVXBkYXRlKHRpbWVfcmF0ZSk7XG4gICAgICAgIHRoaXMucHggKz0gdGhpcy52eCAqIHJhdGU7XG4gICAgICAgIHRoaXMucHkgKz0gdGhpcy52eSAqIHJhdGU7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hdXRvX2RpcmVjdGlvbilcbiAgICAgICAgICAgIHRoaXMuZGlyID0gTWF0aC5hdGFuMih0aGlzLnZ5LCB0aGlzLnZ4KTtcbiAgICB9O1xuICAgIEJ1bGxldC5wcm90b3R5cGUucG9zdFVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICh0aGlzLnNoYXBlZF9zcHJpdGUuc2hhcGUuZXhpdFNjcmVlbih0aGlzLnB4LCB0aGlzLnB5LCB0aGlzLmRpciwgU0NSX0hBTEZfV0lEVEgsIFNDUl9IQUxGX0hFSUdIVCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5raWxsX29uX2V4aXQpXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkxFQVZJTkc7XG4gICAgICAgICAgICAvLyBFdmVudDogT25FeGl0U2NyZWVuXG4gICAgICAgIH1cbiAgICAgICAgLy8gRXZlbnQ6IE9uUG9zdFVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MRUFWSU5HKSB7XG4gICAgICAgICAgICAvLyBFdmVudDogT25EZXN0cm95XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuREVBRDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQnVsbGV0LnByb3RvdHlwZS5hdHRhY2sgPSBmdW5jdGlvbiAoXywgZSkge1xuICAgICAgICAvLyBFdmVudDogT25BdHRhY2soZSlcbiAgICAgICAgZS5kYW1hZ2VkKGUsIHRoaXMpO1xuICAgIH07XG4gICAgQnVsbGV0LnByb3RvdHlwZS5kYW1hZ2VkID0gZnVuY3Rpb24gKF8sIHMpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uZmlnLmtpbGxfYnlfYm9tYiAmJiAocy5jb25maWcuY29sbGlkZV9ncm91cCA9PSBDR19CT01CIHx8IHMuY29uZmlnLmNvbGxpZGVfZ3JvdXAgPT0gQ0dfUExBWUVSKSkge1xuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkxFQVZJTkc7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICByZXR1cm4gQnVsbGV0O1xufShTSVBvaW50KSk7XG5leHBvcnQgeyBCdWxsZXQgfTtcbiIsImV4cG9ydCB2YXIgQ0dfUExBWUVSID0gMDtcbmV4cG9ydCB2YXIgQ0dfQk9TUyA9IDE7XG5leHBvcnQgdmFyIENHX0VORU1ZID0gMjtcbmV4cG9ydCB2YXIgQ0dfQlVMTEVUID0gMztcbmV4cG9ydCB2YXIgQ0dfQk9NQiA9IDQ7XG5leHBvcnQgdmFyIENHX0dIT1NUID0gNTtcbmV4cG9ydCB2YXIgQ01fUExBWUVSID0gMDtcbmV4cG9ydCB2YXIgQ01fQk9TUyA9IDE7XG5leHBvcnQgdmFyIENNX0VORU1ZID0gMTtcbmV4cG9ydCB2YXIgQ01fQlVMTEVUID0gMTtcbmV4cG9ydCB2YXIgQ01fQk9NQiA9IDE0O1xuZXhwb3J0IHZhciBDTV9HSE9TVCA9IDA7XG5leHBvcnQgdmFyIFJMX0lOVklTSUJMRSA9IDA7XG5leHBvcnQgdmFyIFJMX0JHID0gMTAwO1xuZXhwb3J0IHZhciBSTF9CT1NTID0gMjAwO1xuZXhwb3J0IHZhciBSTF9FTkVNWSA9IDMwMDtcbmV4cG9ydCB2YXIgUkxfQlVMTEVUID0gNDAwO1xuZXhwb3J0IHZhciBSTF9CT01CID0gNTAwO1xuZXhwb3J0IHZhciBSTF9QTEFZRVIgPSA2MDA7XG5leHBvcnQgdmFyIFJMX1VJID0gNzAwO1xuZXhwb3J0IHZhciBSTF9NQVggPSAxMDAwO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZVtTdGF0ZVtcIlBSRV9FTlRSWVwiXSA9IDBdID0gXCJQUkVfRU5UUllcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkFMSVZFXCJdID0gMV0gPSBcIkFMSVZFXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJMRUFWSU5HXCJdID0gMl0gPSBcIkxFQVZJTkdcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkRFQURcIl0gPSAzXSA9IFwiREVBRFwiO1xufSkoU3RhdGUgfHwgKFN0YXRlID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSh0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHQpO1xufVxuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfcGxheWVyID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfUExBWUVSLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX1BMQVlFUixcbiAgICBjb2xsaWRlX21hc2s6IENNX1BMQVlFUlxufTtcbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX2Jvc3MgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9CT1NTLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX0JPU1MsXG4gICAgY29sbGlkZV9tYXNrOiBDTV9CT1NTXG59O1xuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfZW5lbXkgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9FTkVNWSxcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19FTkVNWSxcbiAgICBjb2xsaWRlX21hc2s6IENNX0VORU1ZXG59O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFNoYXBlLCBTaGFwZWRJbnN0YW5jZSwgU2hhcGVkU3ByaXRlIH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuaW1wb3J0IHsgUkVOREVSX1RZUEUgfSBmcm9tIFwiLi4vc3ByaXRlL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi4vc3ByaXRlL3Nwcml0ZXNcIjtcbmltcG9ydCB7IEVudGl0eVBvb2wgfSBmcm9tIFwiLi4vc3RhZ2UvRW50aXR5UG9vbFwiO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9FbnRpdHlcIjtcbnZhciBTaGFwZVJheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2hhcGVSYXksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVSYXkoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgU2hhcGVSYXkucHJvdG90eXBlLmRpc3RhbmNlVG8gPSBmdW5jdGlvbiAoc2VsZiwgeCwgeSkge1xuICAgICAgICB2YXIgeDAgPSBzZWxmLnB4O1xuICAgICAgICB2YXIgeTAgPSBzZWxmLnB5O1xuICAgICAgICB2YXIgeDEgPSBzZWxmLnB4ICsgc2VsZi5sZW4gKiBNYXRoLmNvcyhzZWxmLmRpcik7XG4gICAgICAgIHZhciB5MSA9IHNlbGYucHkgKyBzZWxmLmxlbiAqIE1hdGguc2luKHNlbGYuZGlyKTtcbiAgICAgICAgdmFyIHJsID0gTWF0aC5zcXJ0KCh4MCAtIHgxKSAqICh4MCAtIHgxKSArICh5MCAtIHkxKSAqICh5MCAtIHkxKSk7XG4gICAgICAgIHZhciBkaXMgPSBNYXRoLmFicygoeDEgLSB4MCkgKiAoeTAgLSB5KSAtICh4MCAtIHgpICogKHkxIC0geTApKTtcbiAgICAgICAgdmFyIGQwID0gTWF0aC5zcXJ0KCh4MCAtIHgpICogKHgwIC0geCkgKyAoeTAgLSB5KSAqICh5MCAtIHkpKTtcbiAgICAgICAgdmFyIGQxID0gTWF0aC5zcXJ0KCh4MSAtIHgpICogKHgxIC0geCkgKyAoeTEgLSB5KSAqICh5MSAtIHkpKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGRpcyAvIHJsLCBkMCwgZDEpIC0gc2VsZi5zaGFwZWRfc3ByaXRlLnc7XG4gICAgfTtcbiAgICBTaGFwZVJheS5JTlMgPSBuZXcgU2hhcGVSYXkoKTtcbiAgICByZXR1cm4gU2hhcGVSYXk7XG59KFNoYXBlKSk7XG5leHBvcnQgeyBTaGFwZVJheSB9O1xuZXhwb3J0IHZhciBSYXlMYXNlclN0YXRlO1xuKGZ1bmN0aW9uIChSYXlMYXNlclN0YXRlKSB7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiV0FSTklOR1wiXSA9IDBdID0gXCJXQVJOSU5HXCI7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiT1BFTklOR1wiXSA9IDFdID0gXCJPUEVOSU5HXCI7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiT1BFTkVEXCJdID0gMl0gPSBcIk9QRU5FRFwiO1xuICAgIFJheUxhc2VyU3RhdGVbUmF5TGFzZXJTdGF0ZVtcIkNMT1NJTkdcIl0gPSAzXSA9IFwiQ0xPU0lOR1wiO1xufSkoUmF5TGFzZXJTdGF0ZSB8fCAoUmF5TGFzZXJTdGF0ZSA9IHt9KSk7XG52YXIgU1NSYXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNTUmF5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNTUmF5KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTU1JheTtcbn0oU2hhcGVkU3ByaXRlKSk7XG5leHBvcnQgeyBTU1JheSB9O1xudmFyIFNJUmF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTSVJheSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTSVJheShzcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgUkVOREVSX1RZUEUuUkVDVCwgc3MpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNJUmF5LnByb3RvdHlwZS5yZWN0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG4gICAgU0lSYXkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh4eXJ3aCwgaSkge1xuICAgICAgICB2YXIgdyA9IHRoaXMuc2hhcGVkX3Nwcml0ZS53O1xuICAgICAgICB2YXIgbCA9IHRoaXMuc2hhcGVkX3Nwcml0ZS5sO1xuICAgICAgICB4eXJ3aFtpICogNSArIDBdID0gdGhpcy5weCArIGwgLyAyICogTWF0aC5jb3ModGhpcy5kaXIpO1xuICAgICAgICB4eXJ3aFtpICogNSArIDFdID0gdGhpcy5weSArIGwgLyAyICogTWF0aC5zaW4odGhpcy5kaXIpO1xuICAgICAgICA7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgMl0gPSB0aGlzLmRpcjtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyAzXSA9IHcgLyAyO1xuICAgICAgICB4eXJ3aFtpICogNSArIDRdID0gbCAvIDI7XG4gICAgICAgIHZhciBzcHJpdGUgPSBTUFJJVEVTW3RoaXMuc2hhcGVkX3Nwcml0ZS5zcHJpdGVdO1xuICAgICAgICB4eXJ3aFtpICogNSArIDVdID0gc3ByaXRlLnR4O1xuICAgICAgICB4eXJ3aFtpICogNSArIDZdID0gc3ByaXRlLnR5O1xuICAgICAgICB4eXJ3aFtpICogNSArIDddID0gc3ByaXRlLnR3O1xuICAgICAgICB4eXJ3aFtpICogNSArIDhdID0gc3ByaXRlLnRoO1xuICAgIH07XG4gICAgcmV0dXJuIFNJUmF5O1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lSYXkgfTtcbnZhciBSYXlMYXNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmF5TGFzZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmF5TGFzZXIoc2hhcGVkX3NoYXBlLCBjZikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzaGFwZWRfc2hhcGUpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnN0YXRlID0gU3RhdGUuUFJFX0VOVFJZO1xuICAgICAgICBfdGhpcy5yc3RhdGUgPSBSYXlMYXNlclN0YXRlLldBUk5JTkc7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IGNmO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJheUxhc2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgdmFyIHJhdGUgPSBFbnRpdHlQb29sLklOU1RBTkNFLnNwZWNpYWxfZWZmZWN0cy50aW1lX3JhdGU7XG4gICAgICAgIHRoaXMudGltZSArPSByYXRlO1xuICAgICAgICBpZiAodGhpcy5yc3RhdGUgPT0gUmF5TGFzZXJTdGF0ZS5XQVJOSU5HICYmIHRoaXMudGltZSA+IHRoaXMuY29uZmlnLndhcm5pbmdfdGltZSkge1xuICAgICAgICAgICAgdGhpcy5yc3RhdGUgPSBSYXlMYXNlclN0YXRlLk9QRU5JTkc7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gdGhpcy5jb25maWcud2FybmluZ190aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJzdGF0ZSA9PSBSYXlMYXNlclN0YXRlLk9QRU5JTkcpIHtcbiAgICAgICAgfVxuICAgICAgICAvLyBFdmVudDogT25VcGRhdGUodGltZV9yYXRlKTtcbiAgICB9O1xuICAgIFJheUxhc2VyLnByb3RvdHlwZS5wb3N0VXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgLy8gRXZlbnQ6IE9uUG9zdFVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MRUFWSU5HKSB7XG4gICAgICAgICAgICAvLyBFdmVudDogT25EZXN0cm95XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuREVBRDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmF5TGFzZXIucHJvdG90eXBlLmF0dGFjayA9IGZ1bmN0aW9uIChfLCBlKSB7XG4gICAgICAgIC8vIEV2ZW50OiBPbkF0dGFjayhlKVxuICAgIH07XG4gICAgUmF5TGFzZXIucHJvdG90eXBlLmRhbWFnZWQgPSBmdW5jdGlvbiAoXywgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBSYXlMYXNlcjtcbn0oU0lSYXkpKTtcbmV4cG9ydCB7IFJheUxhc2VyIH07XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgU0lQb2ludCB9IGZyb20gXCIuLi9zcHJpdGUvU2hhcGVcIjtcbmltcG9ydCB7IHNlbGZfbWFjaGluZSB9IGZyb20gXCIuLi9zcHJpdGUvc2hhcGVkX3Nwcml0ZXNcIjtcbmltcG9ydCAqIGFzIFNjcmVlbiBmcm9tIFwiLi4vc3RhZ2UvU2NyZWVuXCI7XG5pbXBvcnQgeyBTdGF0ZSwgdGVtcGxhdGVfY29uZmlnX3BsYXllciwgY2xvbmUgfSBmcm9tIFwiLi9FbnRpdHlcIjtcbnZhciBTZWxmTWFjaGluZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2VsZk1hY2hpbmUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2VsZk1hY2hpbmUocHJvdG8sIGFiaSwgeCwgeSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBjbG9uZShzZWxmX21hY2hpbmUpKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb25maWcgPSB0ZW1wbGF0ZV9jb25maWdfcGxheWVyO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IFN0YXRlLkFMSVZFO1xuICAgICAgICBfdGhpcy5taXNzID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmJvbWIgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMucHJlX21pc3MgPSAwO1xuICAgICAgICBfdGhpcy5taXNzX3RpbWUgPSAwO1xuICAgICAgICBfdGhpcy5pbnZpbmNlX3RpbWUgPSAwO1xuICAgICAgICBTZWxmTWFjaGluZS5JTlNUQU5DRSA9IF90aGlzO1xuICAgICAgICBfdGhpcy5wcm90byA9IHByb3RvO1xuICAgICAgICBfdGhpcy5hYmlsaXR5ID0gYWJpO1xuICAgICAgICBfdGhpcy5weCA9IHg7XG4gICAgICAgIF90aGlzLnB5ID0geTtcbiAgICAgICAgX3RoaXMuZGlyID0gMDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTZWxmTWFjaGluZS51cGRhdGVTdGF0ZSA9IGZ1bmN0aW9uIChhY3QpIHtcbiAgICAgICAgU2VsZk1hY2hpbmUuYWN0aW9uID0gYWN0O1xuICAgIH07XG4gICAgU2VsZk1hY2hpbmUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghU2VsZk1hY2hpbmUuYWN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnB4ICs9IFNlbGZNYWNoaW5lLmFjdGlvbi5wb3NfeDtcbiAgICAgICAgdGhpcy5weSArPSBTZWxmTWFjaGluZS5hY3Rpb24ucG9zX3k7XG4gICAgICAgIGlmICh0aGlzLnB4IDwgLVNjcmVlbi5TQ1JfSEFMRl9XSURUSClcbiAgICAgICAgICAgIHRoaXMucHggPSAtU2NyZWVuLlNDUl9IQUxGX1dJRFRIO1xuICAgICAgICBpZiAodGhpcy5weCA+IFNjcmVlbi5TQ1JfSEFMRl9XSURUSClcbiAgICAgICAgICAgIHRoaXMucHggPSBTY3JlZW4uU0NSX0hBTEZfV0lEVEg7XG4gICAgICAgIGlmICh0aGlzLnB5IDwgLVNjcmVlbi5TQ1JfSEFMRl9IRUlHSFQpXG4gICAgICAgICAgICB0aGlzLnB5ID0gLVNjcmVlbi5TQ1JfSEFMRl9IRUlHSFQ7XG4gICAgICAgIGlmICh0aGlzLnB5ID4gU2NyZWVuLlNDUl9IQUxGX0hFSUdIVClcbiAgICAgICAgICAgIHRoaXMucHkgPSBTY3JlZW4uU0NSX0hBTEZfSEVJR0hUO1xuICAgICAgICB0aGlzLnByb3RvLnVwZGF0ZVNob290KFNlbGZNYWNoaW5lLmFjdGlvbi5rZXlfeik7XG4gICAgICAgIHRoaXMuYm9tYiA9IHRoaXMucHJvdG8udXBkYXRlQm9tYihTZWxmTWFjaGluZS5hY3Rpb24ua2V5X3gpO1xuICAgICAgICB0aGlzLnByb3RvLnVwZGF0ZVNwZWNpYWwoU2VsZk1hY2hpbmUuYWN0aW9uLmtleV9jKTtcbiAgICB9O1xuICAgIFNlbGZNYWNoaW5lLnByb3RvdHlwZS5wb3N0VXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKHRoaXMubWlzc190aW1lID4gMClcbiAgICAgICAgICAgIHRoaXMubWlzc190aW1lLS07XG4gICAgICAgIGlmICh0aGlzLnByZV9taXNzID4gMCkge1xuICAgICAgICAgICAgdGhpcy5wcmVfbWlzcy0tO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlX21pc3MgPT0gMCkge1xuICAgICAgICAgICAgICAgIC8vIE1pc3NcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1pc3NlZFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1pc3NfdGltZSA9IHRoaXMuYWJpbGl0eS5taXNzX3RpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWlzcykge1xuICAgICAgICAgICAgdGhpcy5taXNzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnByZV9taXNzID0gdGhpcy5hYmlsaXR5LnByZV9taXNzO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmJvbWIpIHtcbiAgICAgICAgICAgIHRoaXMuYm9tYiA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5taXNzX3RpbWUgPSB0aGlzLmFiaWxpdHkuYm9tYl90aW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMucHJlX21pc3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gYm9tYiBhZnRlciBtaXNzXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJib21iIGFmdGVyIG1pc3NcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmVfbWlzcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubWlzc190aW1lID4gMCB8fCB0aGlzLnByZV9taXNzID4gMCkge1xuICAgICAgICAgICAgdGhpcy5pbnZpbmNlX3RpbWUrKztcbiAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHRoaXMuaW52aW5jZV90aW1lIC8gNikgJSAyID09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlZF9zcHJpdGUuc3ByaXRlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGVkX3Nwcml0ZS5zcHJpdGUgPSBzZWxmX21hY2hpbmUuc3ByaXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pbnZpbmNlX3RpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zaGFwZWRfc3ByaXRlLnNwcml0ZSA9IHNlbGZfbWFjaGluZS5zcHJpdGU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNlbGZNYWNoaW5lLnByb3RvdHlwZS5hdHRhY2sgPSBmdW5jdGlvbiAoXywgdGFyZ2V0KSB7XG4gICAgfTtcbiAgICBTZWxmTWFjaGluZS5wcm90b3R5cGUuZGFtYWdlZCA9IGZ1bmN0aW9uIChfLCBzKSB7XG4gICAgICAgIGlmICh0aGlzLnByZV9taXNzID09IDAgJiYgdGhpcy5taXNzX3RpbWUgPT0gMClcbiAgICAgICAgICAgIHRoaXMubWlzcyA9IHRydWU7XG4gICAgICAgIHJldHVybiBzLmRhbWFnZWQocywgdGhpcyk7XG4gICAgfTtcbiAgICBTZWxmTWFjaGluZS5JTlNUQU5DRSA9IG51bGw7XG4gICAgU2VsZk1hY2hpbmUuYWN0aW9uID0gbnVsbDtcbiAgICByZXR1cm4gU2VsZk1hY2hpbmU7XG59KFNJUG9pbnQpKTtcbmV4cG9ydCB7IFNlbGZNYWNoaW5lIH07XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIF9fc3ByZWFkQXJyYXlzID0gKHRoaXMgJiYgdGhpcy5fX3NwcmVhZEFycmF5cykgfHwgZnVuY3Rpb24gKCkge1xuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcbiAgICAgICAgZm9yICh2YXIgYSA9IGFyZ3VtZW50c1tpXSwgaiA9IDAsIGpsID0gYS5sZW5ndGg7IGogPCBqbDsgaisrLCBrKyspXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcbiAgICByZXR1cm4gcjtcbn07XG5pbXBvcnQgeyBDR19HSE9TVCwgQ01fR0hPU1QsIFJMX0lOVklTSUJMRSwgU3RhdGUgfSBmcm9tIFwiLi4vZW50aXR5L0VudGl0eVwiO1xuaW1wb3J0IHsgU0lOdWxsIH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuLi9zdGFnZS9FbnRpdHlQb29sXCI7XG52YXIgU2NoZWR1bGVFbnRyeSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZUVudHJ5KCkge1xuICAgIH1cbiAgICByZXR1cm4gU2NoZWR1bGVFbnRyeTtcbn0oKSk7XG52YXIgV2FpdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoV2FpdCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBXYWl0KGlucHV0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJlbWFpbiA9IGlucHV0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFdhaXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICh0aW1lX3JhdGUpIHtcbiAgICAgICAgdGhpcy5yZW1haW4gLT0gdGltZV9yYXRlO1xuICAgICAgICBpZiAodGhpcy5yZW1haW4gPCAwKVxuICAgICAgICAgICAgcmV0dXJuIC10aGlzLnJlbWFpbjtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICByZXR1cm4gV2FpdDtcbn0oU2NoZWR1bGVFbnRyeSkpO1xudmFyIEFkZGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhBZGRlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBBZGRlcihpbnB1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy50b2RvID0gaW5wdXQ7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgQWRkZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICh0aW1lX3JhdGUpIHtcbiAgICAgICAgdGhpcy50b2RvKCk7XG4gICAgICAgIHJldHVybiB0aW1lX3JhdGU7XG4gICAgfTtcbiAgICByZXR1cm4gQWRkZXI7XG59KFNjaGVkdWxlRW50cnkpKTtcbnZhciBTY2hlZHVsZVN1cHBsaWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlU3VwcGxpZXIoKSB7XG4gICAgfVxuICAgIHJldHVybiBTY2hlZHVsZVN1cHBsaWVyO1xufSgpKTtcbmV4cG9ydCB7IFNjaGVkdWxlU3VwcGxpZXIgfTtcbmZ1bmN0aW9uIHBhcnNlKGlucHV0KSB7XG4gICAgcmV0dXJuIGlucHV0Lm1hcChmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGUgPT0gXCJudW1iZXJcIiA/IG5ldyBXYWl0KGUpIDpcbiAgICAgICAgICAgIHR5cGVvZiBlID09IFwiZnVuY3Rpb25cIiA/IG5ldyBBZGRlcihlKSA6XG4gICAgICAgICAgICAgICAgZTtcbiAgICB9KTtcbn1cbnZhciBSZXBlYXRTdXBwbGllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVwZWF0U3VwcGxpZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVwZWF0U3VwcGxpZXIoaW5wdXQsIG4pIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuaW5kZXggPSAwO1xuICAgICAgICBfdGhpcy50b2RvID0gaW5wdXQ7XG4gICAgICAgIF90aGlzLnRvdGFsID0gbjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSZXBlYXRTdXBwbGllci5wcm90b3R5cGUuc3VwcGx5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pbmRleCA+PSB0aGlzLnRvdGFsKVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhciBhbnM7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy50b2RvID09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgIGFucyA9IHRoaXMudG9kbyh0aGlzLmluZGV4KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgYW5zID0gdGhpcy50b2RvO1xuICAgICAgICB0aGlzLmluZGV4Kys7XG4gICAgICAgIHJldHVybiBwYXJzZShhbnMpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlcGVhdFN1cHBsaWVyO1xufShTY2hlZHVsZVN1cHBsaWVyKSk7XG5leHBvcnQgeyBSZXBlYXRTdXBwbGllciB9O1xuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfc2NoZWR1bGVyID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfSU5WSVNJQkxFLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX0dIT1NULFxuICAgIGNvbGxpZGVfbWFzazogQ01fR0hPU1Rcbn07XG52YXIgU2NoZWR1bGVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTY2hlZHVsZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2NoZWR1bGVyKGlucHV0KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IHRlbXBsYXRlX2NvbmZpZ19zY2hlZHVsZXI7XG4gICAgICAgIF90aGlzLnN0YXRlID0gU3RhdGUuUFJFX0VOVFJZO1xuICAgICAgICBfdGhpcy5saXN0ID0gcGFyc2UoaW5wdXQpO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNjaGVkdWxlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU3RhdGUuUFJFX0VOVFJZKVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkFMSVZFO1xuICAgICAgICB2YXIgdCA9IEVudGl0eVBvb2wuSU5TVEFOQ0Uuc3BlY2lhbF9lZmZlY3RzLnRpbWVfcmF0ZTtcbiAgICAgICAgd2hpbGUgKHRoaXMubGlzdC5sZW5ndGggPiAwICYmIHQpIHtcbiAgICAgICAgICAgIHZhciBzc3MgPSB0aGlzLmxpc3RbMF07XG4gICAgICAgICAgICBpZiAoc3NzIGluc3RhbmNlb2YgU2NoZWR1bGVTdXBwbGllcikge1xuICAgICAgICAgICAgICAgIHZhciBsaXN0ID0gc3NzLnN1cHBseSgpO1xuICAgICAgICAgICAgICAgIGlmICghbGlzdCB8fCAhbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ID0gX19zcHJlYWRBcnJheXMobGlzdCwgdGhpcy5saXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHQgPSBzc3MudXBkYXRlKHQpO1xuICAgICAgICAgICAgICAgIGlmICh0ID4gMClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGlzdC5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5MRUFWSU5HO1xuICAgIH07XG4gICAgU2NoZWR1bGVyLnByb3RvdHlwZS5wb3N0VXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU3RhdGUuTEVBVklORylcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5ERUFEO1xuICAgIH07XG4gICAgU2NoZWR1bGVyLnByb3RvdHlwZS5hdHRhY2sgPSBmdW5jdGlvbiAoXykge1xuICAgIH07XG4gICAgU2NoZWR1bGVyLnByb3RvdHlwZS5kYW1hZ2VkID0gZnVuY3Rpb24gKF8sIHMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIFNjaGVkdWxlcjtcbn0oU0lOdWxsKSk7XG5leHBvcnQgeyBTY2hlZHVsZXIgfTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBSRU5ERVJfVFlQRSB9IGZyb20gXCIuL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG52YXIgU2hhcGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGUoKSB7XG4gICAgfVxuICAgIHJldHVybiBTaGFwZTtcbn0oKSk7XG5leHBvcnQgeyBTaGFwZSB9O1xudmFyIFNoYXBlUG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNoYXBlUG9pbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTaGFwZVBvaW50LnByb3RvdHlwZS5kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHNlbGYsIHB4LCBweSkge1xuICAgICAgICBweCA9IHB4IC0gc2VsZi5weDtcbiAgICAgICAgcHkgPSBweSAtIHNlbGYucHk7XG4gICAgICAgIHZhciBzZCA9IHNlbGYuZGlyO1xuICAgICAgICB2YXIgc3ggPSBweCAqIE1hdGguY29zKC1zZCkgLSBweSAqIE1hdGguc2luKC1zZCk7XG4gICAgICAgIHZhciBzeSA9IHB5ICogTWF0aC5jb3MoLXNkKSArIHB4ICogTWF0aC5zaW4oLXNkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3RhbmNlVG8oc3gsIHN5KTtcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZVBvaW50O1xufShTaGFwZSkpO1xuZXhwb3J0IHsgU2hhcGVQb2ludCB9O1xudmFyIFNoYXBlQ2lyY2xlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaGFwZUNpcmNsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaGFwZUNpcmNsZShyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJhZGl1cyA9IHI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2hhcGVDaXJjbGUucHJvdG90eXBlLmV4aXRTY3JlZW4gPSBmdW5jdGlvbiAoc3gsIHN5LCBfLCBydywgcmgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHN4KSA+IHJ3ICsgdGhpcy5yYWRpdXMgfHwgTWF0aC5hYnMoc3kpID4gcmggKyB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIFNoYXBlQ2lyY2xlLnByb3RvdHlwZS5kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHNlbGYsIHB4LCBweSkge1xuICAgICAgICBweCAtPSBzZWxmLnB4O1xuICAgICAgICBweSAtPSBzZWxmLnB5O1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHB4ICogcHggKyBweSAqIHB5KSAtIHRoaXMucmFkaXVzO1xuICAgIH07XG4gICAgU2hhcGVDaXJjbGUucHJvdG90eXBlLl9kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHB4LCBweSkge1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHB4ICogcHggKyBweSAqIHB5KSAtIHRoaXMucmFkaXVzO1xuICAgIH07XG4gICAgcmV0dXJuIFNoYXBlQ2lyY2xlO1xufShTaGFwZVBvaW50KSk7XG5leHBvcnQgeyBTaGFwZUNpcmNsZSB9O1xudmFyIFNoYXBlZFNwcml0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaGFwZWRTcHJpdGUoKSB7XG4gICAgfVxuICAgIHJldHVybiBTaGFwZWRTcHJpdGU7XG59KCkpO1xuZXhwb3J0IHsgU2hhcGVkU3ByaXRlIH07XG52YXIgU1NQb2ludCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU1NQb2ludCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTU1BvaW50KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTU1BvaW50O1xufShTaGFwZWRTcHJpdGUpKTtcbmV4cG9ydCB7IFNTUG9pbnQgfTtcbnZhciBTaGFwZWRJbnN0YW5jZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTaGFwZWRJbnN0YW5jZShydCwgc3MpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJUeXBlID0gcnQ7XG4gICAgICAgIHRoaXMuc2hhcGVkX3Nwcml0ZSA9IHNzO1xuICAgIH1cbiAgICBTaGFwZWRJbnN0YW5jZS5wcm90b3R5cGUuZGlzdGFuY2VUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNoYXBlZF9zcHJpdGUuc2hhcGUuZGlzdGFuY2VUbyh0aGlzLCB4LCB5KTtcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZWRJbnN0YW5jZTtcbn0oKSk7XG5leHBvcnQgeyBTaGFwZWRJbnN0YW5jZSB9O1xudmFyIFNJUG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNJUG9pbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU0lQb2ludChzcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgUkVOREVSX1RZUEUuUkVDVCwgc3MpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNJUG9pbnQucHJvdG90eXBlLnJlY3RDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgfTtcbiAgICBTSVBvaW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoeHlyd2gsIGkpIHtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyAwXSA9IHRoaXMucHg7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMV0gPSB0aGlzLnB5O1xuICAgICAgICB4eXJ3aFtpICogOSArIDJdID0gdGhpcy5kaXI7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgM10gPSB0aGlzLnNoYXBlZF9zcHJpdGUudztcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA0XSA9IHRoaXMuc2hhcGVkX3Nwcml0ZS5oO1xuICAgICAgICB2YXIgc3ByaXRlID0gU1BSSVRFU1t0aGlzLnNoYXBlZF9zcHJpdGUuc3ByaXRlXTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA1XSA9IHNwcml0ZS50eDtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA2XSA9IHNwcml0ZS50eTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA3XSA9IHNwcml0ZS50dztcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA4XSA9IHNwcml0ZS50aDtcbiAgICB9O1xuICAgIHJldHVybiBTSVBvaW50O1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lQb2ludCB9O1xudmFyIFNJTnVsbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU0lOdWxsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNJTnVsbCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIG51bGwsIG51bGwpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTSU51bGw7XG59KFNoYXBlZEluc3RhbmNlKSk7XG5leHBvcnQgeyBTSU51bGwgfTtcbmV4cG9ydCBmdW5jdGlvbiBjb2xsaWRlKGUwLCBlMSkge1xuICAgIGlmIChlMCBpbnN0YW5jZW9mIFNJUG9pbnQgJiYgZTAuc2hhcGVkX3Nwcml0ZS5zaGFwZSBpbnN0YW5jZW9mIFNoYXBlQ2lyY2xlKVxuICAgICAgICByZXR1cm4gZTEuZGlzdGFuY2VUbyhlMC5weCwgZTAucHkpIDwgZTAuc2hhcGVkX3Nwcml0ZS5zaGFwZS5yYWRpdXM7XG4gICAgaWYgKGUxIGluc3RhbmNlb2YgU0lQb2ludCAmJiBlMS5zaGFwZWRfc3ByaXRlLnNoYXBlIGluc3RhbmNlb2YgU2hhcGVDaXJjbGUpXG4gICAgICAgIHJldHVybiBjb2xsaWRlKGUxLCBlMCk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm9uLWNpcmNsZSBub24tY2lyY2xlIGNvbGxpc2lvbiBub3QgZm91bmRcIik7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgbG9hZFRleHR1cmUsIGxvYWRJbWFnZSwgZHJhd1JlY3RzLCBkcmF3U25ha2UgfSBmcm9tIFwiLi9nbFwiO1xuaW1wb3J0IHsgU1BSSVRFUyB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbmV4cG9ydCB2YXIgUkVOREVSX1RZUEU7XG4oZnVuY3Rpb24gKFJFTkRFUl9UWVBFKSB7XG4gICAgUkVOREVSX1RZUEVbUkVOREVSX1RZUEVbXCJSRUNUXCJdID0gMF0gPSBcIlJFQ1RcIjtcbiAgICBSRU5ERVJfVFlQRVtSRU5ERVJfVFlQRVtcIlNUUklQXCJdID0gMV0gPSBcIlNUUklQXCI7XG59KShSRU5ERVJfVFlQRSB8fCAoUkVOREVSX1RZUEUgPSB7fSkpO1xuO1xudmFyIFNwcml0ZU1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3ByaXRlTWFuYWdlcih1cmwpIHtcbiAgICAgICAgdGhpcy5pbWcgPSBudWxsO1xuICAgICAgICB0aGlzLnBhdGggPSB1cmw7XG4gICAgfVxuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmxvYWRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1nO1xuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGltZztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIFs0IC8qeWllbGQqLywgbG9hZEltYWdlKHRoaXMucGF0aCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWcgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmltZyA9IGxvYWRUZXh0dXJlKGltZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5nZXQgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgIGlmIChTcHJpdGVNYW5hZ2VyLklOU1t1cmxdKVxuICAgICAgICAgICAgcmV0dXJuIFNwcml0ZU1hbmFnZXIuSU5TW3VybF07XG4gICAgICAgIHJldHVybiAoU3ByaXRlTWFuYWdlci5JTlNbdXJsXSA9IG5ldyBTcHJpdGVNYW5hZ2VyKHVybCkpO1xuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChsaXN0KSB7XG4gICAgICAgIHZhciByZWN0biA9IGxpc3QucmVkdWNlKGZ1bmN0aW9uIChuLCBlKSB7IHJldHVybiBlLnJlbmRlclR5cGUgPT0gUkVOREVSX1RZUEUuUkVDVCA/IG4gKyBlLnJlY3RDb3VudCgpIDogbjsgfSwgMCk7XG4gICAgICAgIHZhciB4eXJ3aCA9IG5ldyBGbG9hdDMyQXJyYXkocmVjdG4gKiA5KTtcbiAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIGxpc3RfMSA9IGxpc3Q7IF9pIDwgbGlzdF8xLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgdmFyIGUgPSBsaXN0XzFbX2ldO1xuICAgICAgICAgICAgaWYgKGUucmVuZGVyVHlwZSA9PSBSRU5ERVJfVFlQRS5SRUNUKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBlO1xuICAgICAgICAgICAgICAgIHIucmVuZGVyKHh5cndoLCBpKTtcbiAgICAgICAgICAgICAgICBpICs9IHIucmVjdENvdW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZHJhd1JlY3RzKHh5cndoLCBsaXN0Lmxlbmd0aCwgdGhpcy5pbWcpO1xuICAgICAgICBmb3IgKHZhciBfYSA9IDAsIGxpc3RfMiA9IGxpc3Q7IF9hIDwgbGlzdF8yLmxlbmd0aDsgX2ErKykge1xuICAgICAgICAgICAgdmFyIGUgPSBsaXN0XzJbX2FdO1xuICAgICAgICAgICAgaWYgKGUucmVuZGVyVHlwZSA9PSBSRU5ERVJfVFlQRS5TVFJJUCkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gZTtcbiAgICAgICAgICAgICAgICB2YXIgc3MgPSBzLmdldFNwcml0ZSgpO1xuICAgICAgICAgICAgICAgIHZhciBzcCA9IFNQUklURVNbc3Muc3ByaXRlXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gcy5yZW5kZXIoKTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGEgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgIGRyYXdTbmFrZShhLCBzcy53LCBhLmxlbmd0aCAvIDIsIHNwLnR4LCBzcC50eSwgc3AudHcsIHNwLnRoLCB0aGlzLmltZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTcHJpdGVNYW5hZ2VyLklOUyA9IHt9O1xuICAgIHJldHVybiBTcHJpdGVNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IFNwcml0ZU1hbmFnZXIgfTtcbiIsImltcG9ydCB7IFNoYXBlUmF5IH0gZnJvbSBcIi4uL2VudGl0eS9SYXlMYXNlclwiO1xuaW1wb3J0IHsgU2hhcGVDaXJjbGUgfSBmcm9tIFwiLi9TaGFwZVwiO1xuaW1wb3J0IHsgUkVOREVSX1RZUEUgfSBmcm9tIFwiLi9TcHJpdGVNYW5hZ2VyXCI7XG5leHBvcnQgdmFyIHNtYWxsX3JvdW5kX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJyb3VuZF9yZWRcIixcbiAgICBzaGFwZTogbmV3IFNoYXBlQ2lyY2xlKDMpLFxuICAgIHc6IDQsXG4gICAgaDogNFxufTtcbmV4cG9ydCB2YXIgc2VsZl9tYWNoaW5lID0ge1xuICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlJFQ1QsXG4gICAgc3ByaXRlOiBcInJvdW5kX2JsdWVcIixcbiAgICBzaGFwZTogbmV3IFNoYXBlQ2lyY2xlKDMpLFxuICAgIHc6IDQsXG4gICAgaDogNFxufTtcbmV4cG9ydCB2YXIgcmF5X2xhc2VyX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJcIixcbiAgICBzaGFwZTogU2hhcGVSYXkuSU5TLFxuICAgIHc6IDEsXG4gICAgbDogMVxufTtcbi8vYWJzdHJhY3RcbmV4cG9ydCB2YXIgY3VydmVfbGFzZXJfcmVkID0ge1xuICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlNUUklQLFxuICAgIHNwcml0ZTogXCJcIixcbiAgICBzaGFwZTogbnVsbCxcbiAgICB3OiAxXG59O1xuIiwiZXhwb3J0IHZhciBTUFJJVEVTID0ge1xuICAgIFwicm91bmRfcmVkXCI6IHtcbiAgICAgICAgXCJzcHJpdGVcIjogXCJhc3NldHMvbWlzc2lsZV9yZWQucG5nXCIsXG4gICAgICAgIFwidHhcIjogMCxcbiAgICAgICAgXCJ0eVwiOiAwLFxuICAgICAgICBcInR3XCI6IDEsXG4gICAgICAgIFwidGhcIjogMVxuICAgIH0sXG4gICAgXCJyb3VuZF9ibHVlXCI6IHtcbiAgICAgICAgXCJzcHJpdGVcIjogXCJhc3NldHMvbWlzc2lsZV9ibHVlLnBuZ1wiLFxuICAgICAgICBcInR4XCI6IDAsXG4gICAgICAgIFwidHlcIjogMCxcbiAgICAgICAgXCJ0d1wiOiAxLFxuICAgICAgICBcInRoXCI6IDFcbiAgICB9XG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCAqIGFzIEJBU0UgZnJvbSBcIi4uL2VudGl0eS9FbnRpdHlcIjtcbmltcG9ydCB7IGNvbGxpZGUgfSBmcm9tIFwiLi4vc3ByaXRlL1NoYXBlXCI7XG5pbXBvcnQgeyBTcHJpdGVNYW5hZ2VyIH0gZnJvbSBcIi4uL3Nwcml0ZS9TcHJpdGVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTUFJJVEVTIH0gZnJvbSBcIi4uL3Nwcml0ZS9zcHJpdGVzXCI7XG52YXIgU3BlY2lhbEVmZmVjdHMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3BlY2lhbEVmZmVjdHMoKSB7XG4gICAgICAgIHRoaXMudGltZV9yYXRlID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIFNwZWNpYWxFZmZlY3RzO1xufSgpKTtcbmV4cG9ydCB7IFNwZWNpYWxFZmZlY3RzIH07XG47XG52YXIgVXBkYXRlU3RhZ2U7XG4oZnVuY3Rpb24gKFVwZGF0ZVN0YWdlKSB7XG4gICAgVXBkYXRlU3RhZ2VbVXBkYXRlU3RhZ2VbXCJQUkVfSU5JVFwiXSA9IDBdID0gXCJQUkVfSU5JVFwiO1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiVVBEQVRFXCJdID0gMV0gPSBcIlVQREFURVwiO1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiUE9TVF9VUERBVEVcIl0gPSAyXSA9IFwiUE9TVF9VUERBVEVcIjtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIkFERF9CQUNLXCJdID0gM10gPSBcIkFERF9CQUNLXCI7XG59KShVcGRhdGVTdGFnZSB8fCAoVXBkYXRlU3RhZ2UgPSB7fSkpO1xudmFyIEVudGl0eVBvb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW50aXR5UG9vbCgpIHtcbiAgICAgICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuUFJFX0lOSVQ7XG4gICAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgICAgIHRoaXMuc3BlY2lhbF9lZmZlY3RzID0gbmV3IFNwZWNpYWxFZmZlY3RzKCk7XG4gICAgICAgIEVudGl0eVBvb2wuSU5TVEFOQ0UgPSB0aGlzO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfUExBWUVSLCBtYXNrOiBCQVNFLkNNX1BMQVlFUiwgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19CT1NTLCBtYXNrOiBCQVNFLkNNX0JPU1MsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfRU5FTVksIG1hc2s6IEJBU0UuQ01fRU5FTVksIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfQlVMTEVULCBtYXNrOiBCQVNFLkNNX0JVTExFVCwgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19CT01CLCBtYXNrOiBCQVNFLkNNX0JPTUIsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfR0hPU1QsIG1hc2s6IEJBU0UuQ01fR0hPU1QsIGxpc3Q6IFtdIH0pO1xuICAgIH1cbiAgICBFbnRpdHlQb29sLnByb3RvdHlwZS5yZWdpc3Rlckdyb3VwID0gZnVuY3Rpb24gKG1hc2spIHtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuZ3JvdXBzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiByZXQsIG1hc2s6IG1hc2ssIGxpc3Q6IFtdIH0pO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlX3N0YWdlICE9IFVwZGF0ZVN0YWdlLkFERF9CQUNLICYmIHRoaXMudXBkYXRlX3N0YWdlICE9IFVwZGF0ZVN0YWdlLlBSRV9JTklUKVxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nLnB1c2goZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2UuY29uZmlnLmNvbGxpZGVfZ3JvdXBdLmxpc3QucHVzaChlKTtcbiAgICB9O1xuICAgIEVudGl0eVBvb2wucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy51cGRhdGVfc3RhZ2UgPSBVcGRhdGVTdGFnZS5VUERBVEU7XG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKHBvb2wpIHsgcmV0dXJuIHBvb2wubGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnVwZGF0ZShlKTsgfSk7IH0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuZ3JvdXBzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ3JvdXBzW2ldLm1hc2sgJiAoMSA8PCBqKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBncm91cCBpIGNhbiBhdHRhY2sgZ3JvdXAgalxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5ncm91cHNbaV0ubGlzdDsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlaSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlaS5zdGF0ZSAhPSBCQVNFLlN0YXRlLkFMSVZFIHx8ICFlaS5zaGFwZWRfc3ByaXRlIHx8ICFlaS5zaGFwZWRfc3ByaXRlLnNoYXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHRoaXMuZ3JvdXBzW2pdLmxpc3Q7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVqID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlai5zdGF0ZSAhPSBCQVNFLlN0YXRlLkFMSVZFIHx8ICFlai5zaGFwZWRfc3ByaXRlIHx8ICFlai5zaGFwZWRfc3ByaXRlLnNoYXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZShlaSwgZWopKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlaS5hdHRhY2soZWksIGVqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlBPU1RfVVBEQVRFO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5wb3N0VXBkYXRlKGUpOyB9KTsgfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKHBvb2wpIHsgcmV0dXJuIHBvb2wubGlzdCA9IHBvb2wubGlzdC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RhdGUgIT0gQkFTRS5TdGF0ZS5ERUFEOyB9KTsgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuQUREX0JBQ0s7XG4gICAgICAgIHRoaXMucGVuZGluZy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7IHJldHVybiBfdGhpcy5hZGQoZSk7IH0pO1xuICAgICAgICB0aGlzLnBlbmRpbmcgPSBbXTtcbiAgICAgICAgdGhpcy50aW1lKys7XG4gICAgfTtcbiAgICBFbnRpdHlQb29sLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBtYXAsIF9pLCBfYSwgcG9vbCwgX2IsIF9jLCBlbnRpdHksIHN1Ym1hcCwgcmxpc3Q7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9kKSB7XG4gICAgICAgICAgICAgICAgbWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGZvciAoX2kgPSAwLCBfYSA9IHRoaXMuZ3JvdXBzOyBfaSA8IF9hLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgICAgICAgICBwb29sID0gX2FbX2ldO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKF9iID0gMCwgX2MgPSBwb29sLmxpc3Q7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbnRpdHkgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVudGl0eS5jb25maWcucmVuZGVyX2xheWVyIHx8ICFlbnRpdHkuc2hhcGVkX3Nwcml0ZSB8fCAhZW50aXR5LnNoYXBlZF9zcHJpdGUuc3ByaXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXAuaGFzKGVudGl0eS5jb25maWcucmVuZGVyX2xheWVyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0KGVudGl0eS5jb25maWcucmVuZGVyX2xheWVyLCBuZXcgTWFwKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFwID0gbWFwLmdldChlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN1Ym1hcC5oYXMoZW50aXR5LnNoYXBlZF9zcHJpdGUuc3ByaXRlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJtYXAuc2V0KGVudGl0eS5zaGFwZWRfc3ByaXRlLnNwcml0ZSwgW10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFwLmdldChlbnRpdHkuc2hhcGVkX3Nwcml0ZS5zcHJpdGUpLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBybGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2MCwgazApIHsgcmV0dXJuIHJsaXN0LnB1c2goeyBybDogazAsIHY6IHYwIH0pOyB9KTtcbiAgICAgICAgICAgICAgICBybGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLnJsIC0gYi5ybDsgfSk7XG4gICAgICAgICAgICAgICAgcmxpc3QuZm9yRWFjaChmdW5jdGlvbiAocmwpIHsgcmV0dXJuIHJsLnYuZm9yRWFjaChmdW5jdGlvbiAodjEsIGsxKSB7IHJldHVybiBTcHJpdGVNYW5hZ2VyLmdldChTUFJJVEVTW2sxXS5zcHJpdGUpLmRyYXcodjEpOyB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEVudGl0eVBvb2w7XG59KCkpO1xuZXhwb3J0IHsgRW50aXR5UG9vbCB9O1xuIiwiZXhwb3J0IHZhciBTQ1JfSEFMRl9XSURUSCA9IDI1MDtcbmV4cG9ydCB2YXIgU0NSX0hBTEZfSEVJR0hUID0gMjUwO1xuZXhwb3J0IHZhciBTQ1JfSEFMRl9XSU5fV0lEVEggPSAyNTA7XG5leHBvcnQgdmFyIFNDUl9IQUxGX1dJTl9IRUlHSFQgPSAyNTA7XG5leHBvcnQgZnVuY3Rpb24gc2NyQ29vcmRfdG9fR0xDb29yZF94KHgpIHtcbiAgICByZXR1cm4geCAvIFNDUl9IQUxGX1dJTl9XSURUSDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JDb29yZF90b19HTENvb3JkX3koeSkge1xuICAgIHJldHVybiB5IC8gU0NSX0hBTEZfV0lOX0hFSUdIVDtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBCdWxsZXQsIHRlbXBsYXRlX2NvbmZpZ19idWxsZXQgfSBmcm9tIFwiLi9lbnRpdHkvQnVsbGV0XCI7XG5pbXBvcnQgeyBTZWxmTWFjaGluZSB9IGZyb20gXCIuL2VudGl0eS9TZWxmTWFjaGluZVwiO1xuaW1wb3J0IHsgUmVwZWF0U3VwcGxpZXIsIFNjaGVkdWxlciB9IGZyb20gXCIuL3NjaGVkdWxlL1NjaGV1bGVyXCI7XG5pbXBvcnQgKiBhcyBzcHJpdGUgZnJvbSBcIi4vc3ByaXRlL3NoYXBlZF9zcHJpdGVzXCI7XG5pbXBvcnQgeyBTcHJpdGVNYW5hZ2VyIH0gZnJvbSBcIi4vc3ByaXRlL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi9zcHJpdGUvc3ByaXRlc1wiO1xuaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuL3N0YWdlL0VudGl0eVBvb2xcIjtcbnZhciBzbV9wcm90byA9IHtcbiAgICB1cGRhdGVTaG9vdDogZnVuY3Rpb24gKHNob290KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHVwZGF0ZUJvbWI6IGZ1bmN0aW9uIChib21iKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHVwZGF0ZVNwZWNpYWw6IGZ1bmN0aW9uIChzcGVjaWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xudmFyIHNtX2FiaSA9IHtcbiAgICBwcmVfbWlzczogMzAsXG4gICAgbWlzc190aW1lOiA2MCxcbiAgICBib21iX3RpbWU6IDYwXG59O1xuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcG9vbCwgcmVwZWF0LCBuO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBwb29sID0gbmV3IEVudGl0eVBvb2woKTtcbiAgICAgICAgICAgICAgICAgICAgcG9vbC5hZGQobmV3IFNlbGZNYWNoaW5lKHNtX3Byb3RvLCBzbV9hYmksIDAsIDApKTtcbiAgICAgICAgICAgICAgICAgICAgZXZhbChcIndpbmRvdy5kZWJ1Z19pbmZvLnBvb2wgPSBwb29sXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXBlYXQgPSBmdW5jdGlvbiAoaXRlbSwgbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG4gPT09IHZvaWQgMCkgeyBuID0gSW5maW5pdHk7IH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUmVwZWF0U3VwcGxpZXIoaXRlbSwgbik7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIFNwcml0ZU1hbmFnZXIuZ2V0KFNQUklURVNbc3ByaXRlLnNtYWxsX3JvdW5kX3JlZC5zcHJpdGVdLnNwcml0ZSkubG9hZCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgU3ByaXRlTWFuYWdlci5nZXQoU1BSSVRFU1tzcHJpdGUuc2VsZl9tYWNoaW5lLnNwcml0ZV0uc3ByaXRlKS5sb2FkKCldO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBuID0gNTtcbiAgICAgICAgICAgICAgICAgICAgcG9vbC5hZGQobmV3IFNjaGVkdWxlcihbXG4gICAgICAgICAgICAgICAgICAgICAgICA2MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdChmdW5jdGlvbiAoaTApIHsgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQoZnVuY3Rpb24gKGkxKSB7IHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvb2wuYWRkKG5ldyBCdWxsZXQoc3ByaXRlLnNtYWxsX3JvdW5kX3JlZCwgdGVtcGxhdGVfY29uZmlnX2J1bGxldClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zaW1wbGVJbml0KDAsIDAsIDIsIDAuMDAwOCAqIGkwICogaTAgKyBNYXRoLlBJICogMiAvIG4gKiBpMSkpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF07IH0sIG4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDJcbiAgICAgICAgICAgICAgICAgICAgICAgIF07IH0sIEluZmluaXR5KVxuICAgICAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgKiBhcyBzdGcgZnJvbSBcIi4vc3RnL3Rlc3RcIlxuaW1wb3J0ICogYXMgcGYgZnJvbSBcIi4vcGxhdGZvcm0vcGxhdGZvcm1faW5pdFwiXG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gICAgcGYudGVzdF9mcHMoKTtcbiAgICBwZi5zZXR1cF9jYW52YXMoKTtcbiAgICBhd2FpdCBzdGcuaW5pdCgpO1xuICAgIHBmLm1haW5sb29wX3N0YXJ0KCk7XG4gICAgd2luZG93LmRlYnVnX2luZm8uc3RnID0ge1xuICAgICAgICBmcHM6IHBmLnRlc3RfZnBzLFxuICAgICAgICBpbml0OiBzdGcuaW5pdCxcbiAgICAgICAgc3RhcnQ6IHBmLm1haW5sb29wX3N0YXJ0LFxuICAgICAgICB0ZXJtaW5hdGU6IHBmLm1haW5sb29wX3Rlcm1pbmF0ZSxcbiAgICB9O1xuICAgIHdpbmRvdy5kZWJ1Z19pbmZvLnBsYXRmb3JtID0gcGY7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluOyIsIid1c2Ugc3RyaWN0J1xuXG5pbXBvcnQgKiBhcyBnbCBmcm9tIFwiLi4vc3RnL3Nwcml0ZS9nbFwiO1xuaW1wb3J0IHsgcGFnZV91cGRhdGUgfSBmcm9tIFwiLi9wYWdlXCI7XG5cbnZhciB0ZXN0X24gPSAyNDA7XG52YXIgZnBzX3N0YXJ0ID0gMDtcbnZhciBmcHNfdG90YWwgPSAwO1xudmFyIHJlc29sdmVyID0gbnVsbDtcbmV4cG9ydCB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IDE7XG5leHBvcnQgdmFyIGxhc3RfdXBkYXRlX3JhdGUgPSAxO1xuZXhwb3J0IHZhciBjYW52YXNfd2lkdGg7XG5leHBvcnQgdmFyIGNhbnZhc19oZWlnaHQ7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0X2ZwcygpIHtcbiAgICBmcHNfc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICBmcHNfdG90YWwgPSB0ZXN0X24gKyAxO1xuICAgIGZwc191cGRhdGUoKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICByZXNvbHZlciA9IHJlc29sdmU7XG4gICAgfSlcbn1cblxuZnVuY3Rpb24gZnBzX3VwZGF0ZSgpIHtcbiAgICBmcHNfdG90YWwtLTtcbiAgICBpZiAoZnBzX3RvdGFsKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShmcHNfdXBkYXRlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmF0ZSA9IChwZXJmb3JtYW5jZS5ub3coKSAtIGZwc19zdGFydCkgLyB0ZXN0X247XG4gICAgbGFzdF91cGRhdGVfcmF0ZSA9IE1hdGgucm91bmQocmF0ZSAvICgxMDAwLjAgLyA2MCkpO1xuICAgIHJlc29sdmVyKGxhc3RfdXBkYXRlX3JhdGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBfY2FudmFzKCkge1xuICAgIHZhciB3aW53ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHdpbmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIHdpbnIgPSBNYXRoLm1pbih3aW53LCB3aW5oKSAqIDAuODtcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnbGNhbnZhc1wiKTtcbiAgICBjYW52YXNfd2lkdGggPSB3aW5yO1xuICAgIGNhbnZhc19oZWlnaHQgPSB3aW5yO1xuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IHdpbnIgKyBcInB4XCI7XG4gICAgY2FudmFzLnN0eWxlLmhlaWdodCA9IHdpbnIgKyBcInB4XCI7XG4gICAgZGV2aWNlUGl4ZWxSYXRpbyA9IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgY2FudmFzLndpZHRoID0gd2luciAqIGRldmljZVBpeGVsUmF0aW87XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbnIgKiBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIGdsLnNldHVwKCk7XG59XG5cbnZhciBzdGFydGVkID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWlubG9vcF9zdGFydCgpIHtcbiAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICAgIG1haW5sb29wX3VwZGF0ZSgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFpbmxvb3BfdGVybWluYXRlKCkge1xuICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gbWFpbmxvb3BfdXBkYXRlKCkge1xuICAgIHBhZ2VfdXBkYXRlKCk7XG4gICAga2V5c191cGRhdGUoKTtcbiAgICBpZiAoc3RhcnRlZClcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1haW5sb29wX3VwZGF0ZSk7XG59XG5cbmV4cG9ydCB2YXIgbW91c2UgPSB7IHg6IDAsIHk6IDAgfTtcbmV4cG9ydCB2YXIga2V5cyA9IHt9O1xuXG5kb2N1bWVudC5vbm1vdXNlbW92ZSA9IChldmVudCkgPT4ge1xuICAgIG1vdXNlLnggPSBldmVudC5wYWdlWDtcbiAgICBtb3VzZS55ID0gZXZlbnQucGFnZVk7XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICBrZXlzW2V2ZW50LmtleV0gPSAzO1xufSwgZmFsc2UpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgIGtleXNbZXZlbnQua2V5XSA9IDE7XG59LCBmYWxzZSk7XG5cbmZ1bmN0aW9uIGtleXNfdXBkYXRlKCkge1xuICAgIGZvciAodmFyIGtleSBpbiBrZXlzKSB7XG4gICAgICAgIGlmIChrZXlzW2tleV0gPT0gMylcbiAgICAgICAgICAgIGtleXNba2V5XSA9IDI7XG4gICAgICAgIGlmIChrZXlzW2tleV0gPT0gMSlcbiAgICAgICAgICAgIGtleXNba2V5XSA9IDA7XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgS0VZX1BSRVNTID0gMjtcbmV4cG9ydCBjb25zdCBLRVlfQ0xJQ0sgPSAzO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmltcG9ydCB7IHNjckNvb3JkX3RvX0dMQ29vcmRfeCwgc2NyQ29vcmRfdG9fR0xDb29yZF95IH0gZnJvbSBcIi4uL3N0YWdlL1NjcmVlblwiO1xuXG5jb25zdCB2ZXJ0ZXhDb2RlID0gYFxuYXR0cmlidXRlIHZlYzIgY29vcmQ7XG5hdHRyaWJ1dGUgdmVjMiB0ZXg7XG52YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleENvb3JkO1xudm9pZCBtYWluKHZvaWQpIHtcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoY29vcmQsIDAuMCwgMS4wKTtcbiAgICB2VGV4Q29vcmQgPSB0ZXg7XG59XG5gO1xuXG5jb25zdCBmcmFnbWVudENvZGUgPSBgXG52YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleENvb3JkO1xudW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG52b2lkIG1haW4odm9pZCkge1xuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleENvb3JkKTtcbn1cbmA7XG5cbmNvbnN0IGdsb2JhbF9nbCA9IHtcbiAgICBnbDogbnVsbCxcbiAgICBzaGFkZXI6IHtcbiAgICAgICAgcHJvZ3JhbTogMCxcbiAgICAgICAgYXR0cmlidXRlOiB7XG4gICAgICAgICAgICBjb29yZDogMCxcbiAgICAgICAgICAgIHRleDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgdW5pZm9ybToge1xuICAgICAgICAgICAgdVNhbXBsZXI6IDAsXG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbGNhbnZhcycpO1xuICAgIHZhciBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xuICAgIGlmIChnbCA9PT0gbnVsbCkge1xuICAgICAgICBhbGVydChcIlVuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMLiBZb3VyIGJyb3dzZXIgb3IgbWFjaGluZSBtYXkgbm90IHN1cHBvcnQgaXQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2xvYmFsX2dsLmdsID0gZ2w7XG4gICAgdmFyIHZlcnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgdmFyIGZyYWdTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydFNoYWRlciwgdmVydGV4Q29kZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdTaGFkZXIsIGZyYWdtZW50Q29kZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdTaGFkZXIpO1xuICAgIHZhciBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCB2ZXJ0U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ1NoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG4gICAgZ2wudXNlUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgICBjb25zdCBzaGFkZXIgPSBnbG9iYWxfZ2wuc2hhZGVyO1xuICAgIHNoYWRlci5wcm9ncmFtID0gc2hhZGVyUHJvZ3JhbTtcbiAgICBzaGFkZXIuYXR0cmlidXRlLmNvb3JkID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2Nvb3JkJyk7XG4gICAgc2hhZGVyLmF0dHJpYnV0ZS50ZXggPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndGV4Jyk7XG4gICAgc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG5cbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wudmlld3BvcnQoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoaW1nKVxuICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdFxuICAgICAgICBpbWcuc3JjID0gc3JjXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcodmVyX2FyciwgdGV4X2FyciwgdGV4dHVyZSwgc2l6ZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXgpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgc2l6ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U3RyaXAodmVyX2FyciwgdGV4X2FyciwgaW5kX2FyciwgdGV4dHVyZSwgc2l6ZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXgpO1xuXG4gICAgY29uc3QgaW5kX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShnbG9iYWxfZ2wuc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIsIDApO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZShpbWFnZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9TSE9SVF80XzRfNF80LCBpbWFnZSlcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAxLjAsIDEuMCk7XG59XG5cbmNvbnN0IHZlcmFuZyA9IFszLCAtMywgLTEsIDMsIDEsIC0xXTtcbmNvbnN0IHRleHggPSBbMCwgMCwgMSwgMCwgMSwgMV07XG5jb25zdCB0ZXh5ID0gWzAsIDEsIDEsIDAsIDAsIDFdO1xuXG5mdW5jdGlvbiBzY3JDb29yZF90b19HTENvb3JkKGZhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmYS5sZW5ndGggLyAyOyBpKyspIHtcbiAgICAgICAgZmFbaSAqIDJdID0gc2NyQ29vcmRfdG9fR0xDb29yZF94KGZhW2kgKiAyXSk7XG4gICAgICAgIGZhW2kgKiAyICsgMV0gPSBzY3JDb29yZF90b19HTENvb3JkX3koZmFbaSAqIDIgKyAxXSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3RzKHh5cndoLCBzaXplLCB0ZXh0dXJlKSB7XG4gICAgY29uc3QgdmVyID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogMTIpO1xuICAgIGNvbnN0IHRleCA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDEyKTtcbiAgICBjb25zdCBwaWQ0ID0gTWF0aC5QSSAvIDQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA2OyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSB4eXJ3aFtpICogOSArIDJdICsgdmVyYW5nW2pdICogcGlkNDtcbiAgICAgICAgICAgIHZlcltpICogMTIgKyBqICogMiArIDBdID0geHlyd2hbaSAqIDkgKyAwXSArIHh5cndoW2kgKiA5ICsgM10gKiBNYXRoLmNvcyhhKSAtIHh5cndoW2kgKiA5ICsgNF0gKiBNYXRoLnNpbihhKTtcbiAgICAgICAgICAgIHZlcltpICogMTIgKyBqICogMiArIDFdID0geHlyd2hbaSAqIDkgKyAxXSArIHh5cndoW2kgKiA5ICsgM10gKiBNYXRoLnNpbihhKSArIHh5cndoW2kgKiA5ICsgNF0gKiBNYXRoLmNvcyhhKTtcbiAgICAgICAgICAgIHRleFtpICogMTIgKyBqICogMiArIDBdID0geHlyd2hbaSAqIDkgKyA1XSArIHRleHhbal0gKiB4eXJ3aFtpICogOSArIDddO1xuICAgICAgICAgICAgdGV4W2kgKiAxMiArIGogKiAyICsgMV0gPSB4eXJ3aFtpICogOSArIDZdICsgdGV4eVtqXSAqIHh5cndoW2kgKiA5ICsgOF07XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgIH1cbiAgICBzY3JDb29yZF90b19HTENvb3JkKHZlcik7XG4gICAgZHJhdyh2ZXIsIHRleCwgdGV4dHVyZSwgc2l6ZSAqIDYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1NuYWtlKHh5LCB3LCBzaXplLCB0eCwgdHksIHR3LCB0aCwgdGV4dHVyZSkge1xuICAgIGNvbnN0IHZlciA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDYpO1xuICAgIGNvbnN0IGxlbiA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSk7XG4gICAgY29uc3QgdGV4ID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogNik7XG4gICAgY29uc3QgaW5kID0gbmV3IEludDE2QXJyYXkoKHNpemUgLSAxKSAqIDIpO1xuICAgIHZhciB0b3QgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZSAtIDE7IGkrKykge1xuICAgICAgICBjb25zdCBweCA9IHh5W2kgKiAyXTtcbiAgICAgICAgY29uc3QgcHkgPSB4eVtpICogMiArIDFdO1xuICAgICAgICBjb25zdCBueCA9IHh5W2kgKiAyICsgMl07XG4gICAgICAgIGNvbnN0IG55ID0geHlbaSAqIDIgKyAzXTtcbiAgICAgICAgY29uc3Qgb3ggPSAocHggKyBueCkgLyAyO1xuICAgICAgICBjb25zdCBveSA9IChweSArIG55KSAvIDI7XG5cbiAgICAgICAgY29uc3QgbCA9IE1hdGguc3FydCgobnggLSBweCkgKiAobnggLSBweCkgKyAobnkgLSBweSkgKiAobnkgLSBweSkpO1xuICAgICAgICBsZW5baV0gPSBsO1xuICAgICAgICB0b3QgKz0gbDtcblxuICAgICAgICB2ZXJbaSAqIDYgKyAwXSA9IHB4O1xuICAgICAgICB2ZXJbaSAqIDYgKyAxXSA9IHB5O1xuICAgICAgICB2ZXJbaSAqIDYgKyAyXSA9IG94IC0gKG95IC0gcHkpIC8gbCAqIHc7XG4gICAgICAgIHZlcltpICogNiArIDNdID0gb3kgKyAob3ggLSBweCkgLyBsICogdztcbiAgICAgICAgdmVyW2kgKiA2ICsgNF0gPSBveCArIChveSAtIHB5KSAvIGwgKiB3O1xuICAgICAgICB2ZXJbaSAqIDYgKyA1XSA9IG95IC0gKG94IC0gcHgpIC8gbCAqIHc7XG4gICAgfVxuICAgIHNjckNvb3JkX3RvX0dMQ29vcmQodmVyKTtcbiAgICB0b3QgLT0gbGVuWzBdIC8gMiArIGxlbltzaXplIC0gMV0gLyAyO1xuXG4gICAgdmFyIHN0YSA9IC1sZW5bMF0gLyAyO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHRleFtpICogNiArIDBdID0gdHggKyB0dyAqIHN0YSAvIHRvdDtcbiAgICAgICAgdGV4W2kgKiA2ICsgMV0gPSB0eSArIHRoIC8gMjtcbiAgICAgICAgc3RhICs9IGxlbltpXSAvIDI7XG4gICAgICAgIHRleFtpICogNiArIDJdID0gdHggKyB0dyAqIHN0YSAvIHRvdDtcbiAgICAgICAgdGV4W2kgKiA2ICsgM10gPSB0eTtcbiAgICAgICAgdGV4W2kgKiA2ICsgNF0gPSB0eCArIHR3ICogc3RhIC8gdG90O1xuICAgICAgICB0ZXhbaSAqIDYgKyA1XSA9IHR5ICsgdGg7XG4gICAgICAgIHN0YSArPSBsZW5baV0gLyAyO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICAgICAgaW5kW2kgKiAyICsgMF0gPSBpICogMyArIDE7XG4gICAgICAgIGluZFtpICogMiArIDFdID0gaSAqIDMgKyAzO1xuICAgIH1cbiAgICBpbmRbc2l6ZSAqIDIgLSAzXS0tO1xuXG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdmVyX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IGNvb3JkID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUuY29vcmQ7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcl9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGNvb3JkLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGNvb3JkKTtcblxuICAgIGNvbnN0IHRleF9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCB0ZXhjID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUudGV4O1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4LCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcih0ZXhjLCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleGMpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBjb25zdCBpbmRfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kX2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVfU1RSSVAsIHNpemUgKiAyIC0gMiwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgICAgIGluZFtpICogMiArIDBdID0gaSAqIDM7XG4gICAgICAgIGluZFtpICogMiArIDFdID0gaSAqIDMgKyAyO1xuICAgIH1cbiAgICBpbmRbMF0rKztcblxuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZCwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplICogMiAtIDIsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcblxufVxuXG53aW5kb3cuZGVidWdfaW5mbyA9IHt9O1xud2luZG93LmRlYnVnX2luZm8uZ2xvYmFsX2dsID0gZ2xvYmFsX2dsO1xud2luZG93LmRlYnVnX2luZm8uZ2xfZnVuYyA9IHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgY2xlYXI6IGNsZWFyLFxuICAgIGRyYXc6IGRyYXcsXG4gICAgZHJhd1N0cmlwOiBkcmF3U3RyaXAsXG4gICAgZHJhd1JlY3RzOiBkcmF3UmVjdHMsXG4gICAgZHJhd1NuYWtlOiBkcmF3U25ha2Vcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=