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
    var mover = _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.Shift >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS ||
        _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys._touch >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS ||
        _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys._press >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS;
    if (mover) {
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
    else
        ref_mouse = false;
    pos_x = pos_x / _platform_init__WEBPACK_IMPORTED_MODULE_4__.canvas_width * _stg_stage_Screen__WEBPACK_IMPORTED_MODULE_3__.SCR_HALF_WIN_WIDTH * 2;
    pos_y = -pos_y / _platform_init__WEBPACK_IMPORTED_MODULE_4__.canvas_height * _stg_stage_Screen__WEBPACK_IMPORTED_MODULE_3__.SCR_HALF_WIN_HEIGHT * 2;
    var speed = _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.Shift >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS ? 2 : 3;
    if (_platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.w >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS || _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.ArrowUp >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS)
        pos_y += speed;
    if (_platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.s >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS || _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.ArrowDown >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS)
        pos_y -= speed;
    if (_platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.a >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS || _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.ArrowLeft >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS)
        pos_x -= speed;
    if (_platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.d >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS || _platform_init__WEBPACK_IMPORTED_MODULE_4__.keys.ArrowRight >= _platform_init__WEBPACK_IMPORTED_MODULE_4__.KEY_PRESS)
        pos_x += speed;
    var act = {
        pos_x: pos_x,
        pos_y: pos_y,
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
/* harmony export */   "mouse": () => /* binding */ mouse,
/* harmony export */   "keys": () => /* binding */ keys,
/* harmony export */   "setup_canvas": () => /* binding */ setup_canvas,
/* harmony export */   "mainloop_start": () => /* binding */ mainloop_start,
/* harmony export */   "mainloop_terminate": () => /* binding */ mainloop_terminate,
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

var mouse = { x: 0, y: 0 };
var keys = {};

function setup_listener() {
    document.onmousemove = (event) => {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
    }

    document.ontouchstart = (event) => {
        keys["_touch"] = 3;
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        event.preventDefault();
    }

    document.ontouchend = (event) => {
        keys["_touch"] = 1;
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        event.preventDefault();
    }

    document.ontouchmove = (event) => {
        mouse.x = event.pageX;
        mouse.y = event.pageY;
        event.preventDefault();
    }

    document.onmousedown = (event) => {
        keys["_press"] = 3;
    }

    document.onmouseup = (event) => {
        keys["_press"] = 1;
    }

    document.addEventListener('keydown', (event) => {
        var key = event.key;
        if (key.length == 1)
            key = key.toLowerCase();
        keys[key] = 3;
    }, false);

    document.addEventListener('keyup', (event) => {
        var key = event.key;
        if (key.length == 1)
            key = key.toLowerCase();
        keys[key] = 1;
    }, false);
}

function setup_canvas() {
    setup_listener();
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
    canvas.requestPointerLock();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9wbGF0Zm9ybS9wYWdlLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9lbnRpdHkvQnVsbGV0LnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9lbnRpdHkvRW50aXR5LnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9lbnRpdHkvUmF5TGFzZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL2VudGl0eS9TZWxmTWFjaGluZS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc2NoZWR1bGUvU2NoZXVsZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3Nwcml0ZS9TaGFwZS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL1Nwcml0ZU1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3Nwcml0ZS9zaGFwZWRfc3ByaXRlcy50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL3Nwcml0ZXMudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3N0YWdlL0VudGl0eVBvb2wudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3N0YWdlL1NjcmVlbi50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvdGVzdC50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9wbGF0Zm9ybS9wbGF0Zm9ybV9pbml0LmpzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvZ2wuanMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFxRDtBQUNHO0FBQ2pCO0FBQ087QUFDRjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0VBQW1CO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLFlBQVksNEVBQXVCO0FBQ25DO0FBQ0EsK0JBQStCLEtBQUssNERBQXlCLENBQUM7QUFDOUQ7QUFDQTtBQUNBLFFBQVEsaURBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHVEQUF1QixJQUFJLHFEQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixzREFBc0IsSUFBSSxxREFBa0I7QUFDNUQsUUFBUSx1REFBdUIsSUFBSSxxREFBa0I7QUFDckQsUUFBUSx1REFBdUIsSUFBSSxxREFBa0I7QUFDckQ7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFnQjtBQUN4Qyx3QkFBd0IsbURBQWdCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtREFBZ0I7QUFDaEMsZ0JBQWdCLG1EQUFnQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9C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QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7VUMzUUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDckJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSxzRjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJvdW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlQb29sIH0gZnJvbSBcIi4uL3N0Zy9zdGFnZS9FbnRpdHlQb29sXCI7XG5pbXBvcnQgeyBTZWxmTWFjaGluZSB9IGZyb20gXCIuLi9zdGcvZW50aXR5L1NlbGZNYWNoaW5lXCI7XG5pbXBvcnQgKiBhcyBnbCBmcm9tIFwiLi4vc3RnL3Nwcml0ZS9nbFwiO1xuaW1wb3J0ICogYXMgU2NyZWVuIGZyb20gXCIuLi9zdGcvc3RhZ2UvU2NyZWVuXCI7XG5pbXBvcnQgKiBhcyBwbGF0Zm9ybSBmcm9tIFwiLi9wbGF0Zm9ybV9pbml0XCI7XG52YXIgcGF1c2VkID0gZmFsc2U7XG52YXIgcmVmX21vdXNlID0gZmFsc2U7XG52YXIgcmVmX3Njcl94ID0gMDtcbnZhciByZWZfc2NyX3kgPSAwO1xudmFyIGxhc3RfeCA9IDA7XG52YXIgbGFzdF95ID0gMDtcbmV4cG9ydCBmdW5jdGlvbiBwYWdlX3VwZGF0ZSgpIHtcbiAgICBzdGdfdXBkYXRlKCk7XG59XG5mdW5jdGlvbiBzdGdfdXBkYXRlKCkge1xuICAgIHZhciBwb29sID0gRW50aXR5UG9vbC5JTlNUQU5DRTtcbiAgICBpZiAocG9vbCkge1xuICAgICAgICB2YXIgYWN0ID0gdXBkYXRlX2lucHV0KCk7XG4gICAgICAgIGlmICghcGF1c2VkKSB7XG4gICAgICAgICAgICBTZWxmTWFjaGluZS51cGRhdGVTdGF0ZShhY3QpO1xuICAgICAgICAgICAgaWYgKCFwYXVzZWQpXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGF0Zm9ybS5sYXN0X3VwZGF0ZV9yYXRlOyBpKyspXG4gICAgICAgICAgICAgICAgICAgIHBvb2wudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZ2wuY2xlYXIoKTtcbiAgICAgICAgcG9vbC5yZW5kZXIoKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1cGRhdGVfaW5wdXQoKSB7XG4gICAgaWYgKHBsYXRmb3JtLmtleXNbXCJFc2NhcGVcIl0gPT0gcGxhdGZvcm0uS0VZX0NMSUNLKVxuICAgICAgICBwYXVzZWQgPSAhcGF1c2VkO1xuICAgIGlmIChwYXVzZWQpIHtcbiAgICAgICAgcmVmX21vdXNlID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgcG9zX3ggPSAwO1xuICAgIHZhciBwb3NfeSA9IDA7XG4gICAgdmFyIG1vdmVyID0gcGxhdGZvcm0ua2V5c1tcIlNoaWZ0XCJdID49IHBsYXRmb3JtLktFWV9QUkVTUyB8fFxuICAgICAgICBwbGF0Zm9ybS5rZXlzW1wiX3RvdWNoXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUyB8fFxuICAgICAgICBwbGF0Zm9ybS5rZXlzW1wiX3ByZXNzXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUztcbiAgICBpZiAobW92ZXIpIHtcbiAgICAgICAgaWYgKCFyZWZfbW91c2UpIHtcbiAgICAgICAgICAgIHJlZl9tb3VzZSA9IHRydWU7XG4gICAgICAgICAgICByZWZfc2NyX3ggPSBwbGF0Zm9ybS5tb3VzZS54O1xuICAgICAgICAgICAgcmVmX3Njcl95ID0gcGxhdGZvcm0ubW91c2UueTtcbiAgICAgICAgICAgIGxhc3RfeCA9IDA7XG4gICAgICAgICAgICBsYXN0X3kgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHBvc194ID0gcGxhdGZvcm0ubW91c2UueCAtIHJlZl9zY3JfeCAtIGxhc3RfeDtcbiAgICAgICAgcG9zX3kgPSBwbGF0Zm9ybS5tb3VzZS55IC0gcmVmX3Njcl95IC0gbGFzdF95O1xuICAgICAgICBsYXN0X3ggKz0gcG9zX3g7XG4gICAgICAgIGxhc3RfeSArPSBwb3NfeTtcbiAgICB9XG4gICAgZWxzZVxuICAgICAgICByZWZfbW91c2UgPSBmYWxzZTtcbiAgICBwb3NfeCA9IHBvc194IC8gcGxhdGZvcm0uY2FudmFzX3dpZHRoICogU2NyZWVuLlNDUl9IQUxGX1dJTl9XSURUSCAqIDI7XG4gICAgcG9zX3kgPSAtcG9zX3kgLyBwbGF0Zm9ybS5jYW52YXNfaGVpZ2h0ICogU2NyZWVuLlNDUl9IQUxGX1dJTl9IRUlHSFQgKiAyO1xuICAgIHZhciBzcGVlZCA9IHBsYXRmb3JtLmtleXNbXCJTaGlmdFwiXSA+PSBwbGF0Zm9ybS5LRVlfUFJFU1MgPyAyIDogMztcbiAgICBpZiAocGxhdGZvcm0ua2V5c1tcIndcIl0gPj0gcGxhdGZvcm0uS0VZX1BSRVNTIHx8IHBsYXRmb3JtLmtleXNbXCJBcnJvd1VwXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUylcbiAgICAgICAgcG9zX3kgKz0gc3BlZWQ7XG4gICAgaWYgKHBsYXRmb3JtLmtleXNbXCJzXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUyB8fCBwbGF0Zm9ybS5rZXlzW1wiQXJyb3dEb3duXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUylcbiAgICAgICAgcG9zX3kgLT0gc3BlZWQ7XG4gICAgaWYgKHBsYXRmb3JtLmtleXNbXCJhXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUyB8fCBwbGF0Zm9ybS5rZXlzW1wiQXJyb3dMZWZ0XCJdID49IHBsYXRmb3JtLktFWV9QUkVTUylcbiAgICAgICAgcG9zX3ggLT0gc3BlZWQ7XG4gICAgaWYgKHBsYXRmb3JtLmtleXNbXCJkXCJdID49IHBsYXRmb3JtLktFWV9QUkVTUyB8fCBwbGF0Zm9ybS5rZXlzW1wiQXJyb3dSaWdodFwiXSA+PSBwbGF0Zm9ybS5LRVlfUFJFU1MpXG4gICAgICAgIHBvc194ICs9IHNwZWVkO1xuICAgIHZhciBhY3QgPSB7XG4gICAgICAgIHBvc194OiBwb3NfeCxcbiAgICAgICAgcG9zX3k6IHBvc195LFxuICAgICAgICBrZXlfejogcGxhdGZvcm0ua2V5c1tcInpcIl0gPj0gcGxhdGZvcm0uS0VZX1BSRVNTLFxuICAgICAgICBrZXlfeDogcGxhdGZvcm0ua2V5c1tcInhcIl0gPT0gcGxhdGZvcm0uS0VZX0NMSUNLLFxuICAgICAgICBrZXlfYzogcGxhdGZvcm0ua2V5c1tcImNcIl0gPT0gcGxhdGZvcm0uS0VZX0NMSUNLXG4gICAgfTtcbiAgICByZXR1cm4gYWN0O1xufVxuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IENHX0JPTUIsIENHX0JVTExFVCwgQ0dfUExBWUVSLCBSTF9CVUxMRVQsIFN0YXRlIH0gZnJvbSBcIi4vRW50aXR5XCI7XG5pbXBvcnQgeyBFbnRpdHlQb29sIH0gZnJvbSBcIi4uL3N0YWdlL0VudGl0eVBvb2xcIjtcbmltcG9ydCB7IFNDUl9IQUxGX0hFSUdIVCwgU0NSX0hBTEZfV0lEVEggfSBmcm9tIFwiLi4vc3RhZ2UvU2NyZWVuXCI7XG5pbXBvcnQgeyBTSVBvaW50IH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfYnVsbGV0ID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfQlVMTEVULFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX0JVTExFVCxcbiAgICBjb2xsaWRlX21hc2s6IENHX0JVTExFVCxcbiAgICBraWxsX29uX2V4aXQ6IHRydWUsXG4gICAga2lsbF9ieV9ib21iOiB0cnVlLFxuICAgIGF1dG9fZGlyZWN0aW9uOiB0cnVlXG59O1xudmFyIEJ1bGxldCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnVsbGV0LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1bGxldChzaGFwZWRfc2hhcGUsIGJjKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHNoYXBlZF9zaGFwZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBTdGF0ZS5QUkVfRU5UUlk7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IGJjO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEJ1bGxldC5wcm90b3R5cGUuc2ltcGxlSW5pdCA9IGZ1bmN0aW9uICh4MCwgeTAsIHYsIGEpIHtcbiAgICAgICAgdGhpcy5weCA9IHgwO1xuICAgICAgICB0aGlzLnB5ID0geTA7XG4gICAgICAgIHRoaXMudnggPSB2ICogTWF0aC5jb3MoYSk7XG4gICAgICAgIHRoaXMudnkgPSB2ICogTWF0aC5zaW4oYSk7XG4gICAgICAgIHRoaXMuZGlyID0gYTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBCdWxsZXQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFN0YXRlLlBSRV9FTlRSWSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgdmFyIHJhdGUgPSBFbnRpdHlQb29sLklOU1RBTkNFLnNwZWNpYWxfZWZmZWN0cy50aW1lX3JhdGU7XG4gICAgICAgIC8vIEV2ZW50OiBPblVwZGF0ZSh0aW1lX3JhdGUpO1xuICAgICAgICB0aGlzLnB4ICs9IHRoaXMudnggKiByYXRlO1xuICAgICAgICB0aGlzLnB5ICs9IHRoaXMudnkgKiByYXRlO1xuICAgICAgICBpZiAodGhpcy5jb25maWcuYXV0b19kaXJlY3Rpb24pXG4gICAgICAgICAgICB0aGlzLmRpciA9IE1hdGguYXRhbjIodGhpcy52eSwgdGhpcy52eCk7XG4gICAgfTtcbiAgICBCdWxsZXQucHJvdG90eXBlLnBvc3RVcGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zaGFwZWRfc3ByaXRlLnNoYXBlLmV4aXRTY3JlZW4odGhpcy5weCwgdGhpcy5weSwgdGhpcy5kaXIsIFNDUl9IQUxGX1dJRFRILCBTQ1JfSEFMRl9IRUlHSFQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb25maWcua2lsbF9vbl9leGl0KVxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5MRUFWSU5HO1xuICAgICAgICAgICAgLy8gRXZlbnQ6IE9uRXhpdFNjcmVlblxuICAgICAgICB9XG4gICAgICAgIC8vIEV2ZW50OiBPblBvc3RVcGRhdGVcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU3RhdGUuTEVBVklORykge1xuICAgICAgICAgICAgLy8gRXZlbnQ6IE9uRGVzdHJveVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkRFQUQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJ1bGxldC5wcm90b3R5cGUuYXR0YWNrID0gZnVuY3Rpb24gKF8sIGUpIHtcbiAgICAgICAgLy8gRXZlbnQ6IE9uQXR0YWNrKGUpXG4gICAgICAgIGUuZGFtYWdlZChlLCB0aGlzKTtcbiAgICB9O1xuICAgIEJ1bGxldC5wcm90b3R5cGUuZGFtYWdlZCA9IGZ1bmN0aW9uIChfLCBzKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5raWxsX2J5X2JvbWIgJiYgKHMuY29uZmlnLmNvbGxpZGVfZ3JvdXAgPT0gQ0dfQk9NQiB8fCBzLmNvbmZpZy5jb2xsaWRlX2dyb3VwID09IENHX1BMQVlFUikpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5MRUFWSU5HO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1bGxldDtcbn0oU0lQb2ludCkpO1xuZXhwb3J0IHsgQnVsbGV0IH07XG4iLCJleHBvcnQgdmFyIENHX1BMQVlFUiA9IDA7XG5leHBvcnQgdmFyIENHX0JPU1MgPSAxO1xuZXhwb3J0IHZhciBDR19FTkVNWSA9IDI7XG5leHBvcnQgdmFyIENHX0JVTExFVCA9IDM7XG5leHBvcnQgdmFyIENHX0JPTUIgPSA0O1xuZXhwb3J0IHZhciBDR19HSE9TVCA9IDU7XG5leHBvcnQgdmFyIENNX1BMQVlFUiA9IDA7XG5leHBvcnQgdmFyIENNX0JPU1MgPSAxO1xuZXhwb3J0IHZhciBDTV9FTkVNWSA9IDE7XG5leHBvcnQgdmFyIENNX0JVTExFVCA9IDE7XG5leHBvcnQgdmFyIENNX0JPTUIgPSAxNDtcbmV4cG9ydCB2YXIgQ01fR0hPU1QgPSAwO1xuZXhwb3J0IHZhciBSTF9JTlZJU0lCTEUgPSAwO1xuZXhwb3J0IHZhciBSTF9CRyA9IDEwMDtcbmV4cG9ydCB2YXIgUkxfQk9TUyA9IDIwMDtcbmV4cG9ydCB2YXIgUkxfRU5FTVkgPSAzMDA7XG5leHBvcnQgdmFyIFJMX0JVTExFVCA9IDQwMDtcbmV4cG9ydCB2YXIgUkxfQk9NQiA9IDUwMDtcbmV4cG9ydCB2YXIgUkxfUExBWUVSID0gNjAwO1xuZXhwb3J0IHZhciBSTF9VSSA9IDcwMDtcbmV4cG9ydCB2YXIgUkxfTUFYID0gMTAwMDtcbmV4cG9ydCB2YXIgU3RhdGU7XG4oZnVuY3Rpb24gKFN0YXRlKSB7XG4gICAgU3RhdGVbU3RhdGVbXCJQUkVfRU5UUllcIl0gPSAwXSA9IFwiUFJFX0VOVFJZXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJBTElWRVwiXSA9IDFdID0gXCJBTElWRVwiO1xuICAgIFN0YXRlW1N0YXRlW1wiTEVBVklOR1wiXSA9IDJdID0gXCJMRUFWSU5HXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJERUFEXCJdID0gM10gPSBcIkRFQURcIjtcbn0pKFN0YXRlIHx8IChTdGF0ZSA9IHt9KSk7XG5leHBvcnQgZnVuY3Rpb24gY2xvbmUodCkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0KTtcbn1cbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX3BsYXllciA9IHtcbiAgICByZW5kZXJfbGF5ZXI6IFJMX1BMQVlFUixcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19QTEFZRVIsXG4gICAgY29sbGlkZV9tYXNrOiBDTV9QTEFZRVJcbn07XG5leHBvcnQgdmFyIHRlbXBsYXRlX2NvbmZpZ19ib3NzID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfQk9TUyxcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19CT1NTLFxuICAgIGNvbGxpZGVfbWFzazogQ01fQk9TU1xufTtcbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX2VuZW15ID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfRU5FTVksXG4gICAgY29sbGlkZV9ncm91cDogQ0dfRU5FTVksXG4gICAgY29sbGlkZV9tYXNrOiBDTV9FTkVNWVxufTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBTaGFwZSwgU2hhcGVkSW5zdGFuY2UsIFNoYXBlZFNwcml0ZSB9IGZyb20gXCIuLi9zcHJpdGUvU2hhcGVcIjtcbmltcG9ydCB7IFJFTkRFUl9UWVBFIH0gZnJvbSBcIi4uL3Nwcml0ZS9TcHJpdGVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTUFJJVEVTIH0gZnJvbSBcIi4uL3Nwcml0ZS9zcHJpdGVzXCI7XG5pbXBvcnQgeyBFbnRpdHlQb29sIH0gZnJvbSBcIi4uL3N0YWdlL0VudGl0eVBvb2xcIjtcbmltcG9ydCB7IFN0YXRlIH0gZnJvbSBcIi4vRW50aXR5XCI7XG52YXIgU2hhcGVSYXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNoYXBlUmF5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNoYXBlUmF5KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNoYXBlUmF5LnByb3RvdHlwZS5kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHNlbGYsIHgsIHkpIHtcbiAgICAgICAgdmFyIHgwID0gc2VsZi5weDtcbiAgICAgICAgdmFyIHkwID0gc2VsZi5weTtcbiAgICAgICAgdmFyIHgxID0gc2VsZi5weCArIHNlbGYubGVuICogTWF0aC5jb3Moc2VsZi5kaXIpO1xuICAgICAgICB2YXIgeTEgPSBzZWxmLnB5ICsgc2VsZi5sZW4gKiBNYXRoLnNpbihzZWxmLmRpcik7XG4gICAgICAgIHZhciBybCA9IE1hdGguc3FydCgoeDAgLSB4MSkgKiAoeDAgLSB4MSkgKyAoeTAgLSB5MSkgKiAoeTAgLSB5MSkpO1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnMoKHgxIC0geDApICogKHkwIC0geSkgLSAoeDAgLSB4KSAqICh5MSAtIHkwKSk7XG4gICAgICAgIHZhciBkMCA9IE1hdGguc3FydCgoeDAgLSB4KSAqICh4MCAtIHgpICsgKHkwIC0geSkgKiAoeTAgLSB5KSk7XG4gICAgICAgIHZhciBkMSA9IE1hdGguc3FydCgoeDEgLSB4KSAqICh4MSAtIHgpICsgKHkxIC0geSkgKiAoeTEgLSB5KSk7XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihkaXMgLyBybCwgZDAsIGQxKSAtIHNlbGYuc2hhcGVkX3Nwcml0ZS53O1xuICAgIH07XG4gICAgU2hhcGVSYXkuSU5TID0gbmV3IFNoYXBlUmF5KCk7XG4gICAgcmV0dXJuIFNoYXBlUmF5O1xufShTaGFwZSkpO1xuZXhwb3J0IHsgU2hhcGVSYXkgfTtcbmV4cG9ydCB2YXIgUmF5TGFzZXJTdGF0ZTtcbihmdW5jdGlvbiAoUmF5TGFzZXJTdGF0ZSkge1xuICAgIFJheUxhc2VyU3RhdGVbUmF5TGFzZXJTdGF0ZVtcIldBUk5JTkdcIl0gPSAwXSA9IFwiV0FSTklOR1wiO1xuICAgIFJheUxhc2VyU3RhdGVbUmF5TGFzZXJTdGF0ZVtcIk9QRU5JTkdcIl0gPSAxXSA9IFwiT1BFTklOR1wiO1xuICAgIFJheUxhc2VyU3RhdGVbUmF5TGFzZXJTdGF0ZVtcIk9QRU5FRFwiXSA9IDJdID0gXCJPUEVORURcIjtcbiAgICBSYXlMYXNlclN0YXRlW1JheUxhc2VyU3RhdGVbXCJDTE9TSU5HXCJdID0gM10gPSBcIkNMT1NJTkdcIjtcbn0pKFJheUxhc2VyU3RhdGUgfHwgKFJheUxhc2VyU3RhdGUgPSB7fSkpO1xudmFyIFNTUmF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTU1JheSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTU1JheSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU1NSYXk7XG59KFNoYXBlZFNwcml0ZSkpO1xuZXhwb3J0IHsgU1NSYXkgfTtcbnZhciBTSVJheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU0lSYXksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU0lSYXkoc3MpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFJFTkRFUl9UWVBFLlJFQ1QsIHNzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTSVJheS5wcm90b3R5cGUucmVjdENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9O1xuICAgIFNJUmF5LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoeHlyd2gsIGkpIHtcbiAgICAgICAgdmFyIHcgPSB0aGlzLnNoYXBlZF9zcHJpdGUudztcbiAgICAgICAgdmFyIGwgPSB0aGlzLnNoYXBlZF9zcHJpdGUubDtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyAwXSA9IHRoaXMucHggKyBsIC8gMiAqIE1hdGguY29zKHRoaXMuZGlyKTtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyAxXSA9IHRoaXMucHkgKyBsIC8gMiAqIE1hdGguc2luKHRoaXMuZGlyKTtcbiAgICAgICAgO1xuICAgICAgICB4eXJ3aFtpICogNSArIDJdID0gdGhpcy5kaXI7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgM10gPSB3IC8gMjtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyA0XSA9IGwgLyAyO1xuICAgICAgICB2YXIgc3ByaXRlID0gU1BSSVRFU1t0aGlzLnNoYXBlZF9zcHJpdGUuc3ByaXRlXTtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyA1XSA9IHNwcml0ZS50eDtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyA2XSA9IHNwcml0ZS50eTtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyA3XSA9IHNwcml0ZS50dztcbiAgICAgICAgeHlyd2hbaSAqIDUgKyA4XSA9IHNwcml0ZS50aDtcbiAgICB9O1xuICAgIHJldHVybiBTSVJheTtcbn0oU2hhcGVkSW5zdGFuY2UpKTtcbmV4cG9ydCB7IFNJUmF5IH07XG52YXIgUmF5TGFzZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJheUxhc2VyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJheUxhc2VyKHNoYXBlZF9zaGFwZSwgY2YpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgc2hhcGVkX3NoYXBlKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWTtcbiAgICAgICAgX3RoaXMucnN0YXRlID0gUmF5TGFzZXJTdGF0ZS5XQVJOSU5HO1xuICAgICAgICBfdGhpcy5jb25maWcgPSBjZjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSYXlMYXNlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPSBTdGF0ZS5QUkVfRU5UUlkpXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuQUxJVkU7XG4gICAgICAgIHZhciByYXRlID0gRW50aXR5UG9vbC5JTlNUQU5DRS5zcGVjaWFsX2VmZmVjdHMudGltZV9yYXRlO1xuICAgICAgICB0aGlzLnRpbWUgKz0gcmF0ZTtcbiAgICAgICAgaWYgKHRoaXMucnN0YXRlID09IFJheUxhc2VyU3RhdGUuV0FSTklORyAmJiB0aGlzLnRpbWUgPiB0aGlzLmNvbmZpZy53YXJuaW5nX3RpbWUpIHtcbiAgICAgICAgICAgIHRoaXMucnN0YXRlID0gUmF5TGFzZXJTdGF0ZS5PUEVOSU5HO1xuICAgICAgICAgICAgdGhpcy50aW1lIC09IHRoaXMuY29uZmlnLndhcm5pbmdfdGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5yc3RhdGUgPT0gUmF5TGFzZXJTdGF0ZS5PUEVOSU5HKSB7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRXZlbnQ6IE9uVXBkYXRlKHRpbWVfcmF0ZSk7XG4gICAgfTtcbiAgICBSYXlMYXNlci5wcm90b3R5cGUucG9zdFVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIC8vIEV2ZW50OiBPblBvc3RVcGRhdGVcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUgPT0gU3RhdGUuTEVBVklORykge1xuICAgICAgICAgICAgLy8gRXZlbnQ6IE9uRGVzdHJveVxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IFN0YXRlLkRFQUQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJheUxhc2VyLnByb3RvdHlwZS5hdHRhY2sgPSBmdW5jdGlvbiAoXywgZSkge1xuICAgICAgICAvLyBFdmVudDogT25BdHRhY2soZSlcbiAgICB9O1xuICAgIFJheUxhc2VyLnByb3RvdHlwZS5kYW1hZ2VkID0gZnVuY3Rpb24gKF8sIHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICByZXR1cm4gUmF5TGFzZXI7XG59KFNJUmF5KSk7XG5leHBvcnQgeyBSYXlMYXNlciB9O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFNJUG9pbnQgfSBmcm9tIFwiLi4vc3ByaXRlL1NoYXBlXCI7XG5pbXBvcnQgeyBzZWxmX21hY2hpbmUgfSBmcm9tIFwiLi4vc3ByaXRlL3NoYXBlZF9zcHJpdGVzXCI7XG5pbXBvcnQgKiBhcyBTY3JlZW4gZnJvbSBcIi4uL3N0YWdlL1NjcmVlblwiO1xuaW1wb3J0IHsgU3RhdGUsIHRlbXBsYXRlX2NvbmZpZ19wbGF5ZXIsIGNsb25lIH0gZnJvbSBcIi4vRW50aXR5XCI7XG52YXIgU2VsZk1hY2hpbmUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNlbGZNYWNoaW5lLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNlbGZNYWNoaW5lKHByb3RvLCBhYmksIHgsIHkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgY2xvbmUoc2VsZl9tYWNoaW5lKSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuY29uZmlnID0gdGVtcGxhdGVfY29uZmlnX3BsYXllcjtcbiAgICAgICAgX3RoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgX3RoaXMubWlzcyA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5ib21iID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnByZV9taXNzID0gMDtcbiAgICAgICAgX3RoaXMubWlzc190aW1lID0gMDtcbiAgICAgICAgX3RoaXMuaW52aW5jZV90aW1lID0gMDtcbiAgICAgICAgU2VsZk1hY2hpbmUuSU5TVEFOQ0UgPSBfdGhpcztcbiAgICAgICAgX3RoaXMucHJvdG8gPSBwcm90bztcbiAgICAgICAgX3RoaXMuYWJpbGl0eSA9IGFiaTtcbiAgICAgICAgX3RoaXMucHggPSB4O1xuICAgICAgICBfdGhpcy5weSA9IHk7XG4gICAgICAgIF90aGlzLmRpciA9IDA7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2VsZk1hY2hpbmUudXBkYXRlU3RhdGUgPSBmdW5jdGlvbiAoYWN0KSB7XG4gICAgICAgIFNlbGZNYWNoaW5lLmFjdGlvbiA9IGFjdDtcbiAgICB9O1xuICAgIFNlbGZNYWNoaW5lLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIVNlbGZNYWNoaW5lLmFjdGlvbilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5weCArPSBTZWxmTWFjaGluZS5hY3Rpb24ucG9zX3g7XG4gICAgICAgIHRoaXMucHkgKz0gU2VsZk1hY2hpbmUuYWN0aW9uLnBvc195O1xuICAgICAgICBpZiAodGhpcy5weCA8IC1TY3JlZW4uU0NSX0hBTEZfV0lEVEgpXG4gICAgICAgICAgICB0aGlzLnB4ID0gLVNjcmVlbi5TQ1JfSEFMRl9XSURUSDtcbiAgICAgICAgaWYgKHRoaXMucHggPiBTY3JlZW4uU0NSX0hBTEZfV0lEVEgpXG4gICAgICAgICAgICB0aGlzLnB4ID0gU2NyZWVuLlNDUl9IQUxGX1dJRFRIO1xuICAgICAgICBpZiAodGhpcy5weSA8IC1TY3JlZW4uU0NSX0hBTEZfSEVJR0hUKVxuICAgICAgICAgICAgdGhpcy5weSA9IC1TY3JlZW4uU0NSX0hBTEZfSEVJR0hUO1xuICAgICAgICBpZiAodGhpcy5weSA+IFNjcmVlbi5TQ1JfSEFMRl9IRUlHSFQpXG4gICAgICAgICAgICB0aGlzLnB5ID0gU2NyZWVuLlNDUl9IQUxGX0hFSUdIVDtcbiAgICAgICAgdGhpcy5wcm90by51cGRhdGVTaG9vdChTZWxmTWFjaGluZS5hY3Rpb24ua2V5X3opO1xuICAgICAgICB0aGlzLmJvbWIgPSB0aGlzLnByb3RvLnVwZGF0ZUJvbWIoU2VsZk1hY2hpbmUuYWN0aW9uLmtleV94KTtcbiAgICAgICAgdGhpcy5wcm90by51cGRhdGVTcGVjaWFsKFNlbGZNYWNoaW5lLmFjdGlvbi5rZXlfYyk7XG4gICAgfTtcbiAgICBTZWxmTWFjaGluZS5wcm90b3R5cGUucG9zdFVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICh0aGlzLm1pc3NfdGltZSA+IDApXG4gICAgICAgICAgICB0aGlzLm1pc3NfdGltZS0tO1xuICAgICAgICBpZiAodGhpcy5wcmVfbWlzcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMucHJlX21pc3MtLTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZV9taXNzID09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBNaXNzXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtaXNzZWRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5taXNzX3RpbWUgPSB0aGlzLmFiaWxpdHkubWlzc190aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1pc3MpIHtcbiAgICAgICAgICAgIHRoaXMubWlzcyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wcmVfbWlzcyA9IHRoaXMuYWJpbGl0eS5wcmVfbWlzcztcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ib21iKSB7XG4gICAgICAgICAgICB0aGlzLmJvbWIgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMubWlzc190aW1lID0gdGhpcy5hYmlsaXR5LmJvbWJfdGltZTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZV9taXNzID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIGJvbWIgYWZ0ZXIgbWlzc1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYm9tYiBhZnRlciBtaXNzXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMucHJlX21pc3MgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1pc3NfdGltZSA+IDAgfHwgdGhpcy5wcmVfbWlzcyA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW52aW5jZV90aW1lKys7XG4gICAgICAgICAgICBpZiAoTWF0aC5mbG9vcih0aGlzLmludmluY2VfdGltZSAvIDYpICUgMiA9PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZWRfc3ByaXRlLnNwcml0ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoYXBlZF9zcHJpdGUuc3ByaXRlID0gc2VsZl9tYWNoaW5lLnNwcml0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW52aW5jZV90aW1lID0gMDtcbiAgICAgICAgICAgIHRoaXMuc2hhcGVkX3Nwcml0ZS5zcHJpdGUgPSBzZWxmX21hY2hpbmUuc3ByaXRlO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTZWxmTWFjaGluZS5wcm90b3R5cGUuYXR0YWNrID0gZnVuY3Rpb24gKF8sIHRhcmdldCkge1xuICAgIH07XG4gICAgU2VsZk1hY2hpbmUucHJvdG90eXBlLmRhbWFnZWQgPSBmdW5jdGlvbiAoXywgcykge1xuICAgICAgICBpZiAodGhpcy5wcmVfbWlzcyA9PSAwICYmIHRoaXMubWlzc190aW1lID09IDApXG4gICAgICAgICAgICB0aGlzLm1pc3MgPSB0cnVlO1xuICAgICAgICByZXR1cm4gcy5kYW1hZ2VkKHMsIHRoaXMpO1xuICAgIH07XG4gICAgU2VsZk1hY2hpbmUuSU5TVEFOQ0UgPSBudWxsO1xuICAgIFNlbGZNYWNoaW5lLmFjdGlvbiA9IG51bGw7XG4gICAgcmV0dXJuIFNlbGZNYWNoaW5lO1xufShTSVBvaW50KSk7XG5leHBvcnQgeyBTZWxmTWFjaGluZSB9O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBfX3NwcmVhZEFycmF5cyA9ICh0aGlzICYmIHRoaXMuX19zcHJlYWRBcnJheXMpIHx8IGZ1bmN0aW9uICgpIHtcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcbiAgICBmb3IgKHZhciByID0gQXJyYXkocyksIGsgPSAwLCBpID0gMDsgaSA8IGlsOyBpKyspXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxuICAgICAgICAgICAgcltrXSA9IGFbal07XG4gICAgcmV0dXJuIHI7XG59O1xuaW1wb3J0IHsgQ0dfR0hPU1QsIENNX0dIT1NULCBSTF9JTlZJU0lCTEUsIFN0YXRlIH0gZnJvbSBcIi4uL2VudGl0eS9FbnRpdHlcIjtcbmltcG9ydCB7IFNJTnVsbCB9IGZyb20gXCIuLi9zcHJpdGUvU2hhcGVcIjtcbmltcG9ydCB7IEVudGl0eVBvb2wgfSBmcm9tIFwiLi4vc3RhZ2UvRW50aXR5UG9vbFwiO1xudmFyIFNjaGVkdWxlRW50cnkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2NoZWR1bGVFbnRyeSgpIHtcbiAgICB9XG4gICAgcmV0dXJuIFNjaGVkdWxlRW50cnk7XG59KCkpO1xudmFyIFdhaXQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFdhaXQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gV2FpdChpbnB1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yZW1haW4gPSBpbnB1dDtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBXYWl0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAodGltZV9yYXRlKSB7XG4gICAgICAgIHRoaXMucmVtYWluIC09IHRpbWVfcmF0ZTtcbiAgICAgICAgaWYgKHRoaXMucmVtYWluIDwgMClcbiAgICAgICAgICAgIHJldHVybiAtdGhpcy5yZW1haW47XG4gICAgICAgIHJldHVybiAwO1xuICAgIH07XG4gICAgcmV0dXJuIFdhaXQ7XG59KFNjaGVkdWxlRW50cnkpKTtcbnZhciBBZGRlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQWRkZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQWRkZXIoaW5wdXQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMudG9kbyA9IGlucHV0O1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEFkZGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAodGltZV9yYXRlKSB7XG4gICAgICAgIHRoaXMudG9kbygpO1xuICAgICAgICByZXR1cm4gdGltZV9yYXRlO1xuICAgIH07XG4gICAgcmV0dXJuIEFkZGVyO1xufShTY2hlZHVsZUVudHJ5KSk7XG52YXIgU2NoZWR1bGVTdXBwbGllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTY2hlZHVsZVN1cHBsaWVyKCkge1xuICAgIH1cbiAgICByZXR1cm4gU2NoZWR1bGVTdXBwbGllcjtcbn0oKSk7XG5leHBvcnQgeyBTY2hlZHVsZVN1cHBsaWVyIH07XG5mdW5jdGlvbiBwYXJzZShpbnB1dCkge1xuICAgIHJldHVybiBpbnB1dC5tYXAoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBlID09IFwibnVtYmVyXCIgPyBuZXcgV2FpdChlKSA6XG4gICAgICAgICAgICB0eXBlb2YgZSA9PSBcImZ1bmN0aW9uXCIgPyBuZXcgQWRkZXIoZSkgOlxuICAgICAgICAgICAgICAgIGU7XG4gICAgfSk7XG59XG52YXIgUmVwZWF0U3VwcGxpZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlcGVhdFN1cHBsaWVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlcGVhdFN1cHBsaWVyKGlucHV0LCBuKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmluZGV4ID0gMDtcbiAgICAgICAgX3RoaXMudG9kbyA9IGlucHV0O1xuICAgICAgICBfdGhpcy50b3RhbCA9IG47XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUmVwZWF0U3VwcGxpZXIucHJvdG90eXBlLnN1cHBseSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaW5kZXggPj0gdGhpcy50b3RhbClcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgYW5zO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMudG9kbyA9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICBhbnMgPSB0aGlzLnRvZG8odGhpcy5pbmRleCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGFucyA9IHRoaXMudG9kbztcbiAgICAgICAgdGhpcy5pbmRleCsrO1xuICAgICAgICByZXR1cm4gcGFyc2UoYW5zKTtcbiAgICB9O1xuICAgIHJldHVybiBSZXBlYXRTdXBwbGllcjtcbn0oU2NoZWR1bGVTdXBwbGllcikpO1xuZXhwb3J0IHsgUmVwZWF0U3VwcGxpZXIgfTtcbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX3NjaGVkdWxlciA9IHtcbiAgICByZW5kZXJfbGF5ZXI6IFJMX0lOVklTSUJMRSxcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19HSE9TVCxcbiAgICBjb2xsaWRlX21hc2s6IENNX0dIT1NUXG59O1xudmFyIFNjaGVkdWxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2NoZWR1bGVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNjaGVkdWxlcihpbnB1dCkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5jb25maWcgPSB0ZW1wbGF0ZV9jb25maWdfc2NoZWR1bGVyO1xuICAgICAgICBfdGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWTtcbiAgICAgICAgX3RoaXMubGlzdCA9IHBhcnNlKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTY2hlZHVsZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFN0YXRlLlBSRV9FTlRSWSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgdmFyIHQgPSBFbnRpdHlQb29sLklOU1RBTkNFLnNwZWNpYWxfZWZmZWN0cy50aW1lX3JhdGU7XG4gICAgICAgIHdoaWxlICh0aGlzLmxpc3QubGVuZ3RoID4gMCAmJiB0KSB7XG4gICAgICAgICAgICB2YXIgc3NzID0gdGhpcy5saXN0WzBdO1xuICAgICAgICAgICAgaWYgKHNzcyBpbnN0YW5jZW9mIFNjaGVkdWxlU3VwcGxpZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGlzdCA9IHNzcy5zdXBwbHkoKTtcbiAgICAgICAgICAgICAgICBpZiAoIWxpc3QgfHwgIWxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdCA9IF9fc3ByZWFkQXJyYXlzKGxpc3QsIHRoaXMubGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ID0gc3NzLnVwZGF0ZSh0KTtcbiAgICAgICAgICAgICAgICBpZiAodCA+IDApXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdC5zaGlmdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxpc3QubGVuZ3RoID09IDApXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuTEVBVklORztcbiAgICB9O1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUucG9zdFVwZGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlID09IFN0YXRlLkxFQVZJTkcpXG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuREVBRDtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuYXR0YWNrID0gZnVuY3Rpb24gKF8pIHtcbiAgICB9O1xuICAgIFNjaGVkdWxlci5wcm90b3R5cGUuZGFtYWdlZCA9IGZ1bmN0aW9uIChfLCBzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBTY2hlZHVsZXI7XG59KFNJTnVsbCkpO1xuZXhwb3J0IHsgU2NoZWR1bGVyIH07XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgUkVOREVSX1RZUEUgfSBmcm9tIFwiLi9TcHJpdGVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTUFJJVEVTIH0gZnJvbSBcIi4vc3ByaXRlc1wiO1xudmFyIFNoYXBlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNoYXBlKCkge1xuICAgIH1cbiAgICByZXR1cm4gU2hhcGU7XG59KCkpO1xuZXhwb3J0IHsgU2hhcGUgfTtcbnZhciBTaGFwZVBvaW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaGFwZVBvaW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNoYXBlUG9pbnQoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgU2hhcGVQb2ludC5wcm90b3R5cGUuZGlzdGFuY2VUbyA9IGZ1bmN0aW9uIChzZWxmLCBweCwgcHkpIHtcbiAgICAgICAgcHggPSBweCAtIHNlbGYucHg7XG4gICAgICAgIHB5ID0gcHkgLSBzZWxmLnB5O1xuICAgICAgICB2YXIgc2QgPSBzZWxmLmRpcjtcbiAgICAgICAgdmFyIHN4ID0gcHggKiBNYXRoLmNvcygtc2QpIC0gcHkgKiBNYXRoLnNpbigtc2QpO1xuICAgICAgICB2YXIgc3kgPSBweSAqIE1hdGguY29zKC1zZCkgKyBweCAqIE1hdGguc2luKC1zZCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXN0YW5jZVRvKHN4LCBzeSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2hhcGVQb2ludDtcbn0oU2hhcGUpKTtcbmV4cG9ydCB7IFNoYXBlUG9pbnQgfTtcbnZhciBTaGFwZUNpcmNsZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2hhcGVDaXJjbGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVDaXJjbGUocikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5yYWRpdXMgPSByO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNoYXBlQ2lyY2xlLnByb3RvdHlwZS5leGl0U2NyZWVuID0gZnVuY3Rpb24gKHN4LCBzeSwgXywgcncsIHJoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyhzeCkgPiBydyArIHRoaXMucmFkaXVzIHx8IE1hdGguYWJzKHN5KSA+IHJoICsgdGhpcy5yYWRpdXM7XG4gICAgfTtcbiAgICBTaGFwZUNpcmNsZS5wcm90b3R5cGUuZGlzdGFuY2VUbyA9IGZ1bmN0aW9uIChzZWxmLCBweCwgcHkpIHtcbiAgICAgICAgcHggLT0gc2VsZi5weDtcbiAgICAgICAgcHkgLT0gc2VsZi5weTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChweCAqIHB4ICsgcHkgKiBweSkgLSB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIFNoYXBlQ2lyY2xlLnByb3RvdHlwZS5fZGlzdGFuY2VUbyA9IGZ1bmN0aW9uIChweCwgcHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChweCAqIHB4ICsgcHkgKiBweSkgLSB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZUNpcmNsZTtcbn0oU2hhcGVQb2ludCkpO1xuZXhwb3J0IHsgU2hhcGVDaXJjbGUgfTtcbnZhciBTaGFwZWRTcHJpdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGVkU3ByaXRlKCkge1xuICAgIH1cbiAgICByZXR1cm4gU2hhcGVkU3ByaXRlO1xufSgpKTtcbmV4cG9ydCB7IFNoYXBlZFNwcml0ZSB9O1xudmFyIFNTUG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNTUG9pbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU1NQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU1NQb2ludDtcbn0oU2hhcGVkU3ByaXRlKSk7XG5leHBvcnQgeyBTU1BvaW50IH07XG52YXIgU2hhcGVkSW5zdGFuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGVkSW5zdGFuY2UocnQsIHNzKSB7XG4gICAgICAgIHRoaXMucmVuZGVyVHlwZSA9IHJ0O1xuICAgICAgICB0aGlzLnNoYXBlZF9zcHJpdGUgPSBzcztcbiAgICB9XG4gICAgU2hhcGVkSW5zdGFuY2UucHJvdG90eXBlLmRpc3RhbmNlVG8gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFwZWRfc3ByaXRlLnNoYXBlLmRpc3RhbmNlVG8odGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2hhcGVkSW5zdGFuY2U7XG59KCkpO1xuZXhwb3J0IHsgU2hhcGVkSW5zdGFuY2UgfTtcbnZhciBTSVBvaW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTSVBvaW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNJUG9pbnQoc3MpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFJFTkRFUl9UWVBFLlJFQ1QsIHNzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTSVBvaW50LnByb3RvdHlwZS5yZWN0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG4gICAgU0lQb2ludC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHh5cndoLCBpKSB7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMF0gPSB0aGlzLnB4O1xuICAgICAgICB4eXJ3aFtpICogOSArIDFdID0gdGhpcy5weTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyAyXSA9IHRoaXMuZGlyO1xuICAgICAgICB4eXJ3aFtpICogOSArIDNdID0gdGhpcy5zaGFwZWRfc3ByaXRlLnc7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgNF0gPSB0aGlzLnNoYXBlZF9zcHJpdGUuaDtcbiAgICAgICAgdmFyIHNwcml0ZSA9IFNQUklURVNbdGhpcy5zaGFwZWRfc3ByaXRlLnNwcml0ZV07XG4gICAgICAgIHh5cndoW2kgKiA5ICsgNV0gPSBzcHJpdGUudHg7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgNl0gPSBzcHJpdGUudHk7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgN10gPSBzcHJpdGUudHc7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgOF0gPSBzcHJpdGUudGg7XG4gICAgfTtcbiAgICByZXR1cm4gU0lQb2ludDtcbn0oU2hhcGVkSW5zdGFuY2UpKTtcbmV4cG9ydCB7IFNJUG9pbnQgfTtcbnZhciBTSU51bGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNJTnVsbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTSU51bGwoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBudWxsLCBudWxsKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU0lOdWxsO1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lOdWxsIH07XG5leHBvcnQgZnVuY3Rpb24gY29sbGlkZShlMCwgZTEpIHtcbiAgICBpZiAoZTAgaW5zdGFuY2VvZiBTSVBvaW50ICYmIGUwLnNoYXBlZF9zcHJpdGUuc2hhcGUgaW5zdGFuY2VvZiBTaGFwZUNpcmNsZSlcbiAgICAgICAgcmV0dXJuIGUxLmRpc3RhbmNlVG8oZTAucHgsIGUwLnB5KSA8IGUwLnNoYXBlZF9zcHJpdGUuc2hhcGUucmFkaXVzO1xuICAgIGlmIChlMSBpbnN0YW5jZW9mIFNJUG9pbnQgJiYgZTEuc2hhcGVkX3Nwcml0ZS5zaGFwZSBpbnN0YW5jZW9mIFNoYXBlQ2lyY2xlKVxuICAgICAgICByZXR1cm4gY29sbGlkZShlMSwgZTApO1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vbi1jaXJjbGUgbm9uLWNpcmNsZSBjb2xsaXNpb24gbm90IGZvdW5kXCIpO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IGxvYWRUZXh0dXJlLCBsb2FkSW1hZ2UsIGRyYXdSZWN0cywgZHJhd1NuYWtlIH0gZnJvbSBcIi4vZ2xcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5leHBvcnQgdmFyIFJFTkRFUl9UWVBFO1xuKGZ1bmN0aW9uIChSRU5ERVJfVFlQRSkge1xuICAgIFJFTkRFUl9UWVBFW1JFTkRFUl9UWVBFW1wiUkVDVFwiXSA9IDBdID0gXCJSRUNUXCI7XG4gICAgUkVOREVSX1RZUEVbUkVOREVSX1RZUEVbXCJTVFJJUFwiXSA9IDFdID0gXCJTVFJJUFwiO1xufSkoUkVOREVSX1RZUEUgfHwgKFJFTkRFUl9UWVBFID0ge30pKTtcbjtcbnZhciBTcHJpdGVNYW5hZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwcml0ZU1hbmFnZXIodXJsKSB7XG4gICAgICAgIHRoaXMuaW1nID0gbnVsbDtcbiAgICAgICAgdGhpcy5wYXRoID0gdXJsO1xuICAgIH1cbiAgICBTcHJpdGVNYW5hZ2VyLnByb3RvdHlwZS5sb2FkZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmltZztcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWc7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGxvYWRJbWFnZSh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWcgPSBsb2FkVGV4dHVyZShpbWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIuZ2V0ID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICBpZiAoU3ByaXRlTWFuYWdlci5JTlNbdXJsXSlcbiAgICAgICAgICAgIHJldHVybiBTcHJpdGVNYW5hZ2VyLklOU1t1cmxdO1xuICAgICAgICByZXR1cm4gKFNwcml0ZU1hbmFnZXIuSU5TW3VybF0gPSBuZXcgU3ByaXRlTWFuYWdlcih1cmwpKTtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICB2YXIgcmVjdG4gPSBsaXN0LnJlZHVjZShmdW5jdGlvbiAobiwgZSkgeyByZXR1cm4gZS5yZW5kZXJUeXBlID09IFJFTkRFUl9UWVBFLlJFQ1QgPyBuICsgZS5yZWN0Q291bnQoKSA6IG47IH0sIDApO1xuICAgICAgICB2YXIgeHlyd2ggPSBuZXcgRmxvYXQzMkFycmF5KHJlY3RuICogOSk7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBsaXN0XzEgPSBsaXN0OyBfaSA8IGxpc3RfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBlID0gbGlzdF8xW19pXTtcbiAgICAgICAgICAgIGlmIChlLnJlbmRlclR5cGUgPT0gUkVOREVSX1RZUEUuUkVDVCkge1xuICAgICAgICAgICAgICAgIHZhciByID0gZTtcbiAgICAgICAgICAgICAgICByLnJlbmRlcih4eXJ3aCwgaSk7XG4gICAgICAgICAgICAgICAgaSArPSByLnJlY3RDb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRyYXdSZWN0cyh4eXJ3aCwgbGlzdC5sZW5ndGgsIHRoaXMuaW1nKTtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBsaXN0XzIgPSBsaXN0OyBfYSA8IGxpc3RfMi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBlID0gbGlzdF8yW19hXTtcbiAgICAgICAgICAgIGlmIChlLnJlbmRlclR5cGUgPT0gUkVOREVSX1RZUEUuU1RSSVApIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGU7XG4gICAgICAgICAgICAgICAgdmFyIHNzID0gcy5nZXRTcHJpdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3AgPSBTUFJJVEVTW3NzLnNwcml0ZV07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHMucmVuZGVyKCk7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICBkcmF3U25ha2UoYSwgc3MudywgYS5sZW5ndGggLyAyLCBzcC50eCwgc3AudHksIHNwLnR3LCBzcC50aCwgdGhpcy5pbWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5JTlMgPSB7fTtcbiAgICByZXR1cm4gU3ByaXRlTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBTcHJpdGVNYW5hZ2VyIH07XG4iLCJpbXBvcnQgeyBTaGFwZVJheSB9IGZyb20gXCIuLi9lbnRpdHkvUmF5TGFzZXJcIjtcbmltcG9ydCB7IFNoYXBlQ2lyY2xlIH0gZnJvbSBcIi4vU2hhcGVcIjtcbmltcG9ydCB7IFJFTkRFUl9UWVBFIH0gZnJvbSBcIi4vU3ByaXRlTWFuYWdlclwiO1xuZXhwb3J0IHZhciBzbWFsbF9yb3VuZF9yZWQgPSB7XG4gICAgcmVuZGVyVHlwZTogUkVOREVSX1RZUEUuUkVDVCxcbiAgICBzcHJpdGU6IFwicm91bmRfcmVkXCIsXG4gICAgc2hhcGU6IG5ldyBTaGFwZUNpcmNsZSgzKSxcbiAgICB3OiA0LFxuICAgIGg6IDRcbn07XG5leHBvcnQgdmFyIHNlbGZfbWFjaGluZSA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJyb3VuZF9ibHVlXCIsXG4gICAgc2hhcGU6IG5ldyBTaGFwZUNpcmNsZSgzKSxcbiAgICB3OiA0LFxuICAgIGg6IDRcbn07XG5leHBvcnQgdmFyIHJheV9sYXNlcl9yZWQgPSB7XG4gICAgcmVuZGVyVHlwZTogUkVOREVSX1RZUEUuUkVDVCxcbiAgICBzcHJpdGU6IFwiXCIsXG4gICAgc2hhcGU6IFNoYXBlUmF5LklOUyxcbiAgICB3OiAxLFxuICAgIGw6IDFcbn07XG4vL2Fic3RyYWN0XG5leHBvcnQgdmFyIGN1cnZlX2xhc2VyX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5TVFJJUCxcbiAgICBzcHJpdGU6IFwiXCIsXG4gICAgc2hhcGU6IG51bGwsXG4gICAgdzogMVxufTtcbiIsImV4cG9ydCB2YXIgU1BSSVRFUyA9IHtcbiAgICBcInJvdW5kX3JlZFwiOiB7XG4gICAgICAgIFwic3ByaXRlXCI6IFwiYXNzZXRzL21pc3NpbGVfcmVkLnBuZ1wiLFxuICAgICAgICBcInR4XCI6IDAsXG4gICAgICAgIFwidHlcIjogMCxcbiAgICAgICAgXCJ0d1wiOiAxLFxuICAgICAgICBcInRoXCI6IDFcbiAgICB9LFxuICAgIFwicm91bmRfYmx1ZVwiOiB7XG4gICAgICAgIFwic3ByaXRlXCI6IFwiYXNzZXRzL21pc3NpbGVfYmx1ZS5wbmdcIixcbiAgICAgICAgXCJ0eFwiOiAwLFxuICAgICAgICBcInR5XCI6IDAsXG4gICAgICAgIFwidHdcIjogMSxcbiAgICAgICAgXCJ0aFwiOiAxXG4gICAgfVxufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgKiBhcyBCQVNFIGZyb20gXCIuLi9lbnRpdHkvRW50aXR5XCI7XG5pbXBvcnQgeyBjb2xsaWRlIH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuaW1wb3J0IHsgU3ByaXRlTWFuYWdlciB9IGZyb20gXCIuLi9zcHJpdGUvU3ByaXRlTWFuYWdlclwiO1xuaW1wb3J0IHsgU1BSSVRFUyB9IGZyb20gXCIuLi9zcHJpdGUvc3ByaXRlc1wiO1xudmFyIFNwZWNpYWxFZmZlY3RzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwZWNpYWxFZmZlY3RzKCkge1xuICAgICAgICB0aGlzLnRpbWVfcmF0ZSA9IDE7XG4gICAgfVxuICAgIHJldHVybiBTcGVjaWFsRWZmZWN0cztcbn0oKSk7XG5leHBvcnQgeyBTcGVjaWFsRWZmZWN0cyB9O1xuO1xudmFyIFVwZGF0ZVN0YWdlO1xuKGZ1bmN0aW9uIChVcGRhdGVTdGFnZSkge1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiUFJFX0lOSVRcIl0gPSAwXSA9IFwiUFJFX0lOSVRcIjtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIlVQREFURVwiXSA9IDFdID0gXCJVUERBVEVcIjtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIlBPU1RfVVBEQVRFXCJdID0gMl0gPSBcIlBPU1RfVVBEQVRFXCI7XG4gICAgVXBkYXRlU3RhZ2VbVXBkYXRlU3RhZ2VbXCJBRERfQkFDS1wiXSA9IDNdID0gXCJBRERfQkFDS1wiO1xufSkoVXBkYXRlU3RhZ2UgfHwgKFVwZGF0ZVN0YWdlID0ge30pKTtcbnZhciBFbnRpdHlQb29sID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVudGl0eVBvb2woKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgICAgIHRoaXMucGVuZGluZyA9IFtdO1xuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlBSRV9JTklUO1xuICAgICAgICB0aGlzLnRpbWUgPSAwO1xuICAgICAgICB0aGlzLnNwZWNpYWxfZWZmZWN0cyA9IG5ldyBTcGVjaWFsRWZmZWN0cygpO1xuICAgICAgICBFbnRpdHlQb29sLklOU1RBTkNFID0gdGhpcztcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX1BMQVlFUiwgbWFzazogQkFTRS5DTV9QTEFZRVIsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfQk9TUywgbWFzazogQkFTRS5DTV9CT1NTLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0VORU1ZLCBtYXNrOiBCQVNFLkNNX0VORU1ZLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0JVTExFVCwgbWFzazogQkFTRS5DTV9CVUxMRVQsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfQk9NQiwgbWFzazogQkFTRS5DTV9CT01CLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0dIT1NULCBtYXNrOiBCQVNFLkNNX0dIT1NULCBsaXN0OiBbXSB9KTtcbiAgICB9XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUucmVnaXN0ZXJHcm91cCA9IGZ1bmN0aW9uIChtYXNrKSB7XG4gICAgICAgIHZhciByZXQgPSB0aGlzLmdyb3Vwcy5sZW5ndGg7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogcmV0LCBtYXNrOiBtYXNrLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIEVudGl0eVBvb2wucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZV9zdGFnZSAhPSBVcGRhdGVTdGFnZS5BRERfQkFDSyAmJiB0aGlzLnVwZGF0ZV9zdGFnZSAhPSBVcGRhdGVTdGFnZS5QUkVfSU5JVClcbiAgICAgICAgICAgIHRoaXMucGVuZGluZy5wdXNoKGUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tlLmNvbmZpZy5jb2xsaWRlX2dyb3VwXS5saXN0LnB1c2goZSk7XG4gICAgfTtcbiAgICBFbnRpdHlQb29sLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuVVBEQVRFO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS51cGRhdGUoZSk7IH0pOyB9KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3Vwc1tpXS5tYXNrICYgKDEgPDwgaikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXAgaSBjYW4gYXR0YWNrIGdyb3VwIGpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ3JvdXBzW2ldLmxpc3Q7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWkgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWkuc3RhdGUgIT0gQkFTRS5TdGF0ZS5BTElWRSB8fCAhZWkuc2hhcGVkX3Nwcml0ZSB8fCAhZWkuc2hhcGVkX3Nwcml0ZS5zaGFwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gMCwgX2MgPSB0aGlzLmdyb3Vwc1tqXS5saXN0OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlaiA9IF9jW19iXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWouc3RhdGUgIT0gQkFTRS5TdGF0ZS5BTElWRSB8fCAhZWouc2hhcGVkX3Nwcml0ZSB8fCAhZWouc2hhcGVkX3Nwcml0ZS5zaGFwZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbGxpZGUoZWksIGVqKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWkuYXR0YWNrKGVpLCBlaik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51cGRhdGVfc3RhZ2UgPSBVcGRhdGVTdGFnZS5QT1NUX1VQREFURTtcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAocG9vbCkgeyByZXR1cm4gcG9vbC5saXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucG9zdFVwZGF0ZShlKTsgfSk7IH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QgPSBwb29sLmxpc3QuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnN0YXRlICE9IEJBU0UuU3RhdGUuREVBRDsgfSk7IH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLkFERF9CQUNLO1xuICAgICAgICB0aGlzLnBlbmRpbmcuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gX3RoaXMuYWRkKGUpOyB9KTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gW107XG4gICAgICAgIHRoaXMudGltZSsrO1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFwLCBfaSwgX2EsIHBvb2wsIF9iLCBfYywgZW50aXR5LCBzdWJtYXAsIHJsaXN0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgX2EgPSB0aGlzLmdyb3VwczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChfYiA9IDAsIF9jID0gcG9vbC5saXN0OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5ID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllciB8fCAhZW50aXR5LnNoYXBlZF9zcHJpdGUgfHwgIWVudGl0eS5zaGFwZWRfc3ByaXRlLnNwcml0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWFwLmhhcyhlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldChlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllciwgbmV3IE1hcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcCA9IG1hcC5nZXQoZW50aXR5LmNvbmZpZy5yZW5kZXJfbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdWJtYXAuaGFzKGVudGl0eS5zaGFwZWRfc3ByaXRlLnNwcml0ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFwLnNldChlbnRpdHkuc2hhcGVkX3Nwcml0ZS5zcHJpdGUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcC5nZXQoZW50aXR5LnNoYXBlZF9zcHJpdGUuc3ByaXRlKS5wdXNoKGVudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodjAsIGswKSB7IHJldHVybiBybGlzdC5wdXNoKHsgcmw6IGswLCB2OiB2MCB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5ybCAtIGIucmw7IH0pO1xuICAgICAgICAgICAgICAgIHJsaXN0LmZvckVhY2goZnVuY3Rpb24gKHJsKSB7IHJldHVybiBybC52LmZvckVhY2goZnVuY3Rpb24gKHYxLCBrMSkgeyByZXR1cm4gU3ByaXRlTWFuYWdlci5nZXQoU1BSSVRFU1trMV0uc3ByaXRlKS5kcmF3KHYxKTsgfSk7IH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFbnRpdHlQb29sO1xufSgpKTtcbmV4cG9ydCB7IEVudGl0eVBvb2wgfTtcbiIsImV4cG9ydCB2YXIgU0NSX0hBTEZfV0lEVEggPSAyNTA7XG5leHBvcnQgdmFyIFNDUl9IQUxGX0hFSUdIVCA9IDI1MDtcbmV4cG9ydCB2YXIgU0NSX0hBTEZfV0lOX1dJRFRIID0gMjUwO1xuZXhwb3J0IHZhciBTQ1JfSEFMRl9XSU5fSEVJR0hUID0gMjUwO1xuZXhwb3J0IGZ1bmN0aW9uIHNjckNvb3JkX3RvX0dMQ29vcmRfeCh4KSB7XG4gICAgcmV0dXJuIHggLyBTQ1JfSEFMRl9XSU5fV0lEVEg7XG59XG5leHBvcnQgZnVuY3Rpb24gc2NyQ29vcmRfdG9fR0xDb29yZF95KHkpIHtcbiAgICByZXR1cm4geSAvIFNDUl9IQUxGX1dJTl9IRUlHSFQ7XG59XG4iLCJ2YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2dlbmVyYXRvciA9ICh0aGlzICYmIHRoaXMuX19nZW5lcmF0b3IpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBib2R5KSB7XG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgcmV0dXJuIGZ1bmN0aW9uICh2KSB7IHJldHVybiBzdGVwKFtuLCB2XSk7IH07IH1cbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcbiAgICAgICAgd2hpbGUgKF8pIHRyeSB7XG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XG4gICAgICAgICAgICBzd2l0Y2ggKG9wWzBdKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcbiAgICAgICAgICAgICAgICBjYXNlIDU6IF8ubGFiZWwrKzsgeSA9IG9wWzFdOyBvcCA9IFswXTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGlmICghKHQgPSBfLnRyeXMsIHQgPSB0Lmxlbmd0aCA+IDAgJiYgdFt0Lmxlbmd0aCAtIDFdKSAmJiAob3BbMF0gPT09IDYgfHwgb3BbMF0gPT09IDIpKSB7IF8gPSAwOyBjb250aW51ZTsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHQgJiYgXy5sYWJlbCA8IHRbMl0pIHsgXy5sYWJlbCA9IHRbMl07IF8ub3BzLnB1c2gob3ApOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxuICAgICAgICBpZiAob3BbMF0gJiA1KSB0aHJvdyBvcFsxXTsgcmV0dXJuIHsgdmFsdWU6IG9wWzBdID8gb3BbMV0gOiB2b2lkIDAsIGRvbmU6IHRydWUgfTtcbiAgICB9XG59O1xuaW1wb3J0IHsgQnVsbGV0LCB0ZW1wbGF0ZV9jb25maWdfYnVsbGV0IH0gZnJvbSBcIi4vZW50aXR5L0J1bGxldFwiO1xuaW1wb3J0IHsgU2VsZk1hY2hpbmUgfSBmcm9tIFwiLi9lbnRpdHkvU2VsZk1hY2hpbmVcIjtcbmltcG9ydCB7IFJlcGVhdFN1cHBsaWVyLCBTY2hlZHVsZXIgfSBmcm9tIFwiLi9zY2hlZHVsZS9TY2hldWxlclwiO1xuaW1wb3J0ICogYXMgc3ByaXRlIGZyb20gXCIuL3Nwcml0ZS9zaGFwZWRfc3ByaXRlc1wiO1xuaW1wb3J0IHsgU3ByaXRlTWFuYWdlciB9IGZyb20gXCIuL3Nwcml0ZS9TcHJpdGVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBTUFJJVEVTIH0gZnJvbSBcIi4vc3ByaXRlL3Nwcml0ZXNcIjtcbmltcG9ydCB7IEVudGl0eVBvb2wgfSBmcm9tIFwiLi9zdGFnZS9FbnRpdHlQb29sXCI7XG52YXIgc21fcHJvdG8gPSB7XG4gICAgdXBkYXRlU2hvb3Q6IGZ1bmN0aW9uIChzaG9vdCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICB1cGRhdGVCb21iOiBmdW5jdGlvbiAoYm9tYikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICB1cGRhdGVTcGVjaWFsOiBmdW5jdGlvbiAoc3BlY2lhbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbnZhciBzbV9hYmkgPSB7XG4gICAgcHJlX21pc3M6IDMwLFxuICAgIG1pc3NfdGltZTogNjAsXG4gICAgYm9tYl90aW1lOiA2MFxufTtcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvb2wsIHJlcGVhdCwgbjtcbiAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IG5ldyBFbnRpdHlQb29sKCk7XG4gICAgICAgICAgICAgICAgICAgIHBvb2wuYWRkKG5ldyBTZWxmTWFjaGluZShzbV9wcm90bywgc21fYWJpLCAwLCAwKSk7XG4gICAgICAgICAgICAgICAgICAgIGV2YWwoXCJ3aW5kb3cuZGVidWdfaW5mby5wb29sID0gcG9vbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVwZWF0ID0gZnVuY3Rpb24gKGl0ZW0sIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuID09PSB2b2lkIDApIHsgbiA9IEluZmluaXR5OyB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJlcGVhdFN1cHBsaWVyKGl0ZW0sIG4pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBTcHJpdGVNYW5hZ2VyLmdldChTUFJJVEVTW3Nwcml0ZS5zbWFsbF9yb3VuZF9yZWQuc3ByaXRlXS5zcHJpdGUpLmxvYWQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIFNwcml0ZU1hbmFnZXIuZ2V0KFNQUklURVNbc3ByaXRlLnNlbGZfbWFjaGluZS5zcHJpdGVdLnNwcml0ZSkubG9hZCgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgbiA9IDU7XG4gICAgICAgICAgICAgICAgICAgIHBvb2wuYWRkKG5ldyBTY2hlZHVsZXIoW1xuICAgICAgICAgICAgICAgICAgICAgICAgNjAsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQoZnVuY3Rpb24gKGkwKSB7IHJldHVybiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0KGZ1bmN0aW9uIChpMSkgeyByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBwb29sLmFkZChuZXcgQnVsbGV0KHNwcml0ZS5zbWFsbF9yb3VuZF9yZWQsIHRlbXBsYXRlX2NvbmZpZ19idWxsZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2ltcGxlSW5pdCgwLCAwLCAyLCAwLjAwMDggKiBpMCAqIGkwICsgTWF0aC5QSSAqIDIgLyBuICogaTEpKTsgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdOyB9LCBuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAyXG4gICAgICAgICAgICAgICAgICAgICAgICBdOyB9LCBJbmZpbml0eSlcbiAgICAgICAgICAgICAgICAgICAgXSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufVxuIiwiaW1wb3J0ICogYXMgc3RnIGZyb20gXCIuL3N0Zy90ZXN0XCJcbmltcG9ydCAqIGFzIHBmIGZyb20gXCIuL3BsYXRmb3JtL3BsYXRmb3JtX2luaXRcIlxuXG5hc3luYyBmdW5jdGlvbiBtYWluKCkge1xuICAgIHBmLnRlc3RfZnBzKCk7XG4gICAgcGYuc2V0dXBfY2FudmFzKCk7XG4gICAgYXdhaXQgc3RnLmluaXQoKTtcbiAgICBwZi5tYWlubG9vcF9zdGFydCgpO1xuICAgIHdpbmRvdy5kZWJ1Z19pbmZvLnN0ZyA9IHtcbiAgICAgICAgZnBzOiBwZi50ZXN0X2ZwcyxcbiAgICAgICAgaW5pdDogc3RnLmluaXQsXG4gICAgICAgIHN0YXJ0OiBwZi5tYWlubG9vcF9zdGFydCxcbiAgICAgICAgdGVybWluYXRlOiBwZi5tYWlubG9vcF90ZXJtaW5hdGUsXG4gICAgfTtcbiAgICB3aW5kb3cuZGVidWdfaW5mby5wbGF0Zm9ybSA9IHBmO1xufVxuXG53aW5kb3cub25sb2FkID0gbWFpbjsiLCIndXNlIHN0cmljdCdcblxuaW1wb3J0ICogYXMgZ2wgZnJvbSBcIi4uL3N0Zy9zcHJpdGUvZ2xcIjtcbmltcG9ydCB7IHBhZ2VfdXBkYXRlIH0gZnJvbSBcIi4vcGFnZVwiO1xuXG52YXIgdGVzdF9uID0gMjQwO1xudmFyIGZwc19zdGFydCA9IDA7XG52YXIgZnBzX3RvdGFsID0gMDtcbnZhciByZXNvbHZlciA9IG51bGw7XG5leHBvcnQgdmFyIGRldmljZVBpeGVsUmF0aW8gPSAxO1xuZXhwb3J0IHZhciBsYXN0X3VwZGF0ZV9yYXRlID0gMTtcbmV4cG9ydCB2YXIgY2FudmFzX3dpZHRoO1xuZXhwb3J0IHZhciBjYW52YXNfaGVpZ2h0O1xuXG5leHBvcnQgZnVuY3Rpb24gdGVzdF9mcHMoKSB7XG4gICAgZnBzX3N0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgZnBzX3RvdGFsID0gdGVzdF9uICsgMTtcbiAgICBmcHNfdXBkYXRlKCk7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgcmVzb2x2ZXIgPSByZXNvbHZlO1xuICAgIH0pXG59XG5cbmZ1bmN0aW9uIGZwc191cGRhdGUoKSB7XG4gICAgZnBzX3RvdGFsLS07XG4gICAgaWYgKGZwc190b3RhbCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnBzX3VwZGF0ZSk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJhdGUgPSAocGVyZm9ybWFuY2Uubm93KCkgLSBmcHNfc3RhcnQpIC8gdGVzdF9uO1xuICAgIGxhc3RfdXBkYXRlX3JhdGUgPSBNYXRoLnJvdW5kKHJhdGUgLyAoMTAwMC4wIC8gNjApKTtcbiAgICByZXNvbHZlcihsYXN0X3VwZGF0ZV9yYXRlKTtcbn1cblxuZXhwb3J0IHZhciBtb3VzZSA9IHsgeDogMCwgeTogMCB9O1xuZXhwb3J0IHZhciBrZXlzID0ge307XG5cbmZ1bmN0aW9uIHNldHVwX2xpc3RlbmVyKCkge1xuICAgIGRvY3VtZW50Lm9ubW91c2Vtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIG1vdXNlLnggPSBldmVudC5wYWdlWDtcbiAgICAgICAgbW91c2UueSA9IGV2ZW50LnBhZ2VZO1xuICAgIH1cblxuICAgIGRvY3VtZW50Lm9udG91Y2hzdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBrZXlzW1wiX3RvdWNoXCJdID0gMztcbiAgICAgICAgbW91c2UueCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICBtb3VzZS55ID0gZXZlbnQucGFnZVk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQub250b3VjaGVuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBrZXlzW1wiX3RvdWNoXCJdID0gMTtcbiAgICAgICAgbW91c2UueCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICBtb3VzZS55ID0gZXZlbnQucGFnZVk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQub250b3VjaG1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgbW91c2UueCA9IGV2ZW50LnBhZ2VYO1xuICAgICAgICBtb3VzZS55ID0gZXZlbnQucGFnZVk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQub25tb3VzZWRvd24gPSAoZXZlbnQpID0+IHtcbiAgICAgICAga2V5c1tcIl9wcmVzc1wiXSA9IDM7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQub25tb3VzZXVwID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGtleXNbXCJfcHJlc3NcIl0gPSAxO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdmFyIGtleSA9IGV2ZW50LmtleTtcbiAgICAgICAgaWYgKGtleS5sZW5ndGggPT0gMSlcbiAgICAgICAgICAgIGtleSA9IGtleS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBrZXlzW2tleV0gPSAzO1xuICAgIH0sIGZhbHNlKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIHZhciBrZXkgPSBldmVudC5rZXk7XG4gICAgICAgIGlmIChrZXkubGVuZ3RoID09IDEpXG4gICAgICAgICAgICBrZXkgPSBrZXkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAga2V5c1trZXldID0gMTtcbiAgICB9LCBmYWxzZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cF9jYW52YXMoKSB7XG4gICAgc2V0dXBfbGlzdGVuZXIoKTtcbiAgICB2YXIgd2ludyA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHZhciB3aW5oID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIHZhciB3aW5yID0gTWF0aC5taW4od2ludywgd2luaCkgKiAwLjg7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2xjYW52YXNcIik7XG4gICAgY2FudmFzX3dpZHRoID0gd2lucjtcbiAgICBjYW52YXNfaGVpZ2h0ID0gd2lucjtcbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aW5yICsgXCJweFwiO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSB3aW5yICsgXCJweFwiO1xuICAgIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuICAgIGNhbnZhcy53aWR0aCA9IHdpbnIgKiBkZXZpY2VQaXhlbFJhdGlvO1xuICAgIGNhbnZhcy5oZWlnaHQgPSB3aW5yICogZGV2aWNlUGl4ZWxSYXRpbztcbiAgICBjYW52YXMucmVxdWVzdFBvaW50ZXJMb2NrKCk7XG4gICAgZ2wuc2V0dXAoKTtcbn1cblxudmFyIHN0YXJ0ZWQgPSBmYWxzZTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW5sb29wX3N0YXJ0KCkge1xuICAgIGlmIChzdGFydGVkKVxuICAgICAgICByZXR1cm47XG4gICAgc3RhcnRlZCA9IHRydWU7XG4gICAgbWFpbmxvb3BfdXBkYXRlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWlubG9vcF90ZXJtaW5hdGUoKSB7XG4gICAgc3RhcnRlZCA9IGZhbHNlO1xufVxuXG5mdW5jdGlvbiBtYWlubG9vcF91cGRhdGUoKSB7XG4gICAgcGFnZV91cGRhdGUoKTtcbiAgICBrZXlzX3VwZGF0ZSgpO1xuICAgIGlmIChzdGFydGVkKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobWFpbmxvb3BfdXBkYXRlKTtcbn1cblxuZnVuY3Rpb24ga2V5c191cGRhdGUoKSB7XG4gICAgZm9yICh2YXIga2V5IGluIGtleXMpIHtcbiAgICAgICAgaWYgKGtleXNba2V5XSA9PSAzKVxuICAgICAgICAgICAga2V5c1trZXldID0gMjtcbiAgICAgICAgaWYgKGtleXNba2V5XSA9PSAxKVxuICAgICAgICAgICAga2V5c1trZXldID0gMDtcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBLRVlfUFJFU1MgPSAyO1xuZXhwb3J0IGNvbnN0IEtFWV9DTElDSyA9IDM7XG4iLCIndXNlIHN0cmljdCdcblxuaW1wb3J0IHsgc2NyQ29vcmRfdG9fR0xDb29yZF94LCBzY3JDb29yZF90b19HTENvb3JkX3kgfSBmcm9tIFwiLi4vc3RhZ2UvU2NyZWVuXCI7XG5cbmNvbnN0IHZlcnRleENvZGUgPSBgXG5hdHRyaWJ1dGUgdmVjMiBjb29yZDtcbmF0dHJpYnV0ZSB2ZWMyIHRleDtcbnZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4Q29vcmQ7XG52b2lkIG1haW4odm9pZCkge1xuICAgIGdsX1Bvc2l0aW9uID0gdmVjNChjb29yZCwgMC4wLCAxLjApO1xuICAgIHZUZXhDb29yZCA9IHRleDtcbn1cbmA7XG5cbmNvbnN0IGZyYWdtZW50Q29kZSA9IGBcbnZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4Q29vcmQ7XG51bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcbnZvaWQgbWFpbih2b2lkKSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4Q29vcmQpO1xufVxuYDtcblxuY29uc3QgZ2xvYmFsX2dsID0ge1xuICAgIGdsOiBudWxsLFxuICAgIHNoYWRlcjoge1xuICAgICAgICBwcm9ncmFtOiAwLFxuICAgICAgICBhdHRyaWJ1dGU6IHtcbiAgICAgICAgICAgIGNvb3JkOiAwLFxuICAgICAgICAgICAgdGV4OiAwLFxuICAgICAgICB9LFxuICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1U2FtcGxlcjogMCxcbiAgICAgICAgfSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dsY2FudmFzJyk7XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG4gICAgaWYgKGdsID09PSBudWxsKSB7XG4gICAgICAgIGFsZXJ0KFwiVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBvciBtYWNoaW5lIG1heSBub3Qgc3VwcG9ydCBpdC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBnbG9iYWxfZ2wuZ2wgPSBnbDtcbiAgICB2YXIgdmVydFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICB2YXIgZnJhZ1NoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0U2hhZGVyLCB2ZXJ0ZXhDb2RlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ1NoYWRlciwgZnJhZ21lbnRDb2RlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRTaGFkZXIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ1NoYWRlcik7XG4gICAgdmFyIHNoYWRlclByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCBmcmFnU2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgICBnbC51c2VQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xuICAgIGNvbnN0IHNoYWRlciA9IGdsb2JhbF9nbC5zaGFkZXI7XG4gICAgc2hhZGVyLnByb2dyYW0gPSBzaGFkZXJQcm9ncmFtO1xuICAgIHNoYWRlci5hdHRyaWJ1dGUuY29vcmQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnY29vcmQnKTtcbiAgICBzaGFkZXIuYXR0cmlidXRlLnRleCA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd0ZXgnKTtcbiAgICBzaGFkZXIudW5pZm9ybS51U2FtcGxlciA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVNhbXBsZXInKTtcblxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgZ2wuYmxlbmRFcXVhdGlvbihnbC5GVU5DX0FERCk7XG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpXG4gICAgICAgIGltZy5vbmVycm9yID0gcmVqZWN0XG4gICAgICAgIGltZy5zcmMgPSBzcmNcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhdyh2ZXJfYXJyLCB0ZXhfYXJyLCB0ZXh0dXJlLCBzaXplKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdmVyX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IGNvb3JkID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUuY29vcmQ7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcl9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYXJyLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihjb29yZCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb29yZCk7XG5cbiAgICBjb25zdCB0ZXhfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgdGV4ID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUudGV4O1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4LCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleCk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC51bmlmb3JtMWkoZ2xvYmFsX2dsLnNoYWRlci51bmlmb3JtLnVTYW1wbGVyLCAwKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCBzaXplKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTdHJpcCh2ZXJfYXJyLCB0ZXhfYXJyLCBpbmRfYXJyLCB0ZXh0dXJlLCBzaXplKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdmVyX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IGNvb3JkID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUuY29vcmQ7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcl9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYXJyLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihjb29yZCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb29yZCk7XG5cbiAgICBjb25zdCB0ZXhfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgdGV4ID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUudGV4O1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4LCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleCk7XG5cbiAgICBjb25zdCBpbmRfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kX2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVfU1RSSVAsIHNpemUsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlKGltYWdlKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX1NIT1JUXzRfNF80XzQsIGltYWdlKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgIHJldHVybiB0ZXh0dXJlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDEuMCwgMS4wKTtcbn1cblxuY29uc3QgdmVyYW5nID0gWzMsIC0zLCAtMSwgMywgMSwgLTFdO1xuY29uc3QgdGV4eCA9IFswLCAwLCAxLCAwLCAxLCAxXTtcbmNvbnN0IHRleHkgPSBbMCwgMSwgMSwgMCwgMCwgMV07XG5cbmZ1bmN0aW9uIHNjckNvb3JkX3RvX0dMQ29vcmQoZmEpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZhLmxlbmd0aCAvIDI7IGkrKykge1xuICAgICAgICBmYVtpICogMl0gPSBzY3JDb29yZF90b19HTENvb3JkX3goZmFbaSAqIDJdKTtcbiAgICAgICAgZmFbaSAqIDIgKyAxXSA9IHNjckNvb3JkX3RvX0dMQ29vcmRfeShmYVtpICogMiArIDFdKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UmVjdHMoeHlyd2gsIHNpemUsIHRleHR1cmUpIHtcbiAgICBjb25zdCB2ZXIgPSBuZXcgRmxvYXQzMkFycmF5KHNpemUgKiAxMik7XG4gICAgY29uc3QgdGV4ID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogMTIpO1xuICAgIGNvbnN0IHBpZDQgPSBNYXRoLlBJIC8gNDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDY7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYSA9IHh5cndoW2kgKiA5ICsgMl0gKyB2ZXJhbmdbal0gKiBwaWQ0O1xuICAgICAgICAgICAgdmVyW2kgKiAxMiArIGogKiAyICsgMF0gPSB4eXJ3aFtpICogOSArIDBdICsgeHlyd2hbaSAqIDkgKyAzXSAqIE1hdGguY29zKGEpIC0geHlyd2hbaSAqIDkgKyA0XSAqIE1hdGguc2luKGEpO1xuICAgICAgICAgICAgdmVyW2kgKiAxMiArIGogKiAyICsgMV0gPSB4eXJ3aFtpICogOSArIDFdICsgeHlyd2hbaSAqIDkgKyAzXSAqIE1hdGguc2luKGEpICsgeHlyd2hbaSAqIDkgKyA0XSAqIE1hdGguY29zKGEpO1xuICAgICAgICAgICAgdGV4W2kgKiAxMiArIGogKiAyICsgMF0gPSB4eXJ3aFtpICogOSArIDVdICsgdGV4eFtqXSAqIHh5cndoW2kgKiA5ICsgN107XG4gICAgICAgICAgICB0ZXhbaSAqIDEyICsgaiAqIDIgKyAxXSA9IHh5cndoW2kgKiA5ICsgNl0gKyB0ZXh5W2pdICogeHlyd2hbaSAqIDkgKyA4XTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIHNjckNvb3JkX3RvX0dMQ29vcmQodmVyKTtcbiAgICBkcmF3KHZlciwgdGV4LCB0ZXh0dXJlLCBzaXplICogNik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U25ha2UoeHksIHcsIHNpemUsIHR4LCB0eSwgdHcsIHRoLCB0ZXh0dXJlKSB7XG4gICAgY29uc3QgdmVyID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogNik7XG4gICAgY29uc3QgbGVuID0gbmV3IEZsb2F0MzJBcnJheShzaXplKTtcbiAgICBjb25zdCB0ZXggPSBuZXcgRmxvYXQzMkFycmF5KHNpemUgKiA2KTtcbiAgICBjb25zdCBpbmQgPSBuZXcgSW50MTZBcnJheSgoc2l6ZSAtIDEpICogMik7XG4gICAgdmFyIHRvdCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHB4ID0geHlbaSAqIDJdO1xuICAgICAgICBjb25zdCBweSA9IHh5W2kgKiAyICsgMV07XG4gICAgICAgIGNvbnN0IG54ID0geHlbaSAqIDIgKyAyXTtcbiAgICAgICAgY29uc3QgbnkgPSB4eVtpICogMiArIDNdO1xuICAgICAgICBjb25zdCBveCA9IChweCArIG54KSAvIDI7XG4gICAgICAgIGNvbnN0IG95ID0gKHB5ICsgbnkpIC8gMjtcblxuICAgICAgICBjb25zdCBsID0gTWF0aC5zcXJ0KChueCAtIHB4KSAqIChueCAtIHB4KSArIChueSAtIHB5KSAqIChueSAtIHB5KSk7XG4gICAgICAgIGxlbltpXSA9IGw7XG4gICAgICAgIHRvdCArPSBsO1xuXG4gICAgICAgIHZlcltpICogNiArIDBdID0gcHg7XG4gICAgICAgIHZlcltpICogNiArIDFdID0gcHk7XG4gICAgICAgIHZlcltpICogNiArIDJdID0gb3ggLSAob3kgLSBweSkgLyBsICogdztcbiAgICAgICAgdmVyW2kgKiA2ICsgM10gPSBveSArIChveCAtIHB4KSAvIGwgKiB3O1xuICAgICAgICB2ZXJbaSAqIDYgKyA0XSA9IG94ICsgKG95IC0gcHkpIC8gbCAqIHc7XG4gICAgICAgIHZlcltpICogNiArIDVdID0gb3kgLSAob3ggLSBweCkgLyBsICogdztcbiAgICB9XG4gICAgc2NyQ29vcmRfdG9fR0xDb29yZCh2ZXIpO1xuICAgIHRvdCAtPSBsZW5bMF0gLyAyICsgbGVuW3NpemUgLSAxXSAvIDI7XG5cbiAgICB2YXIgc3RhID0gLWxlblswXSAvIDI7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgdGV4W2kgKiA2ICsgMF0gPSB0eCArIHR3ICogc3RhIC8gdG90O1xuICAgICAgICB0ZXhbaSAqIDYgKyAxXSA9IHR5ICsgdGggLyAyO1xuICAgICAgICBzdGEgKz0gbGVuW2ldIC8gMjtcbiAgICAgICAgdGV4W2kgKiA2ICsgMl0gPSB0eCArIHR3ICogc3RhIC8gdG90O1xuICAgICAgICB0ZXhbaSAqIDYgKyAzXSA9IHR5O1xuICAgICAgICB0ZXhbaSAqIDYgKyA0XSA9IHR4ICsgdHcgKiBzdGEgLyB0b3Q7XG4gICAgICAgIHRleFtpICogNiArIDVdID0gdHkgKyB0aDtcbiAgICAgICAgc3RhICs9IGxlbltpXSAvIDI7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZSAtIDE7IGkrKykge1xuICAgICAgICBpbmRbaSAqIDIgKyAwXSA9IGkgKiAzICsgMTtcbiAgICAgICAgaW5kW2kgKiAyICsgMV0gPSBpICogMyArIDM7XG4gICAgfVxuICAgIGluZFtzaXplICogMiAtIDNdLS07XG5cbiAgICBjb25zdCBnbCA9IGdsb2JhbF9nbC5nbDtcbiAgICBjb25zdCB2ZXJfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgY29vcmQgPSBnbG9iYWxfZ2wuc2hhZGVyLmF0dHJpYnV0ZS5jb29yZDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHZlciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleGMgPSBnbG9iYWxfZ2wuc2hhZGVyLmF0dHJpYnV0ZS50ZXg7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRleF9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB0ZXgsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleGMsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkodGV4Yyk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC51bmlmb3JtMWkoZ2xvYmFsX2dsLnNoYWRlci51bmlmb3JtLnVTYW1wbGVyLCAwKTtcblxuICAgIGNvbnN0IGluZF9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmRfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmQsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRV9TVFJJUCwgc2l6ZSAqIDIgLSAyLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICAgICAgaW5kW2kgKiAyICsgMF0gPSBpICogMztcbiAgICAgICAgaW5kW2kgKiAyICsgMV0gPSBpICogMyArIDI7XG4gICAgfVxuICAgIGluZFswXSsrO1xuXG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kLCBnbC5TVEFUSUNfRFJBVyk7XG5cbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVfU1RSSVAsIHNpemUgKiAyIC0gMiwgZ2wuVU5TSUdORURfU0hPUlQsIDApO1xuXG59XG5cbndpbmRvdy5kZWJ1Z19pbmZvID0ge307XG53aW5kb3cuZGVidWdfaW5mby5nbG9iYWxfZ2wgPSBnbG9iYWxfZ2w7XG53aW5kb3cuZGVidWdfaW5mby5nbF9mdW5jID0ge1xuICAgIHNldHVwOiBzZXR1cCxcbiAgICBjbGVhcjogY2xlYXIsXG4gICAgZHJhdzogZHJhdyxcbiAgICBkcmF3U3RyaXA6IGRyYXdTdHJpcCxcbiAgICBkcmF3UmVjdHM6IGRyYXdSZWN0cyxcbiAgICBkcmF3U25ha2U6IGRyYXdTbmFrZVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZVxuX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnZXhwb3J0cycgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxuIl0sInNvdXJjZVJvb3QiOiIifQ==