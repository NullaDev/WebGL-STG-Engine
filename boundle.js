/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
        xyrwh[i * 5 + 0] = this.px;
        xyrwh[i * 5 + 1] = this.py;
        xyrwh[i * 5 + 2] = this.dir;
        xyrwh[i * 5 + 3] = this.shaped_sprite.w;
        xyrwh[i * 5 + 4] = this.shaped_sprite.h;
        var sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__.SPRITES[this.shaped_sprite.sprite];
        xyrwh[i * 5 + 5] = sprite.tx;
        xyrwh[i * 5 + 6] = sprite.ty;
        xyrwh[i * 5 + 7] = sprite.tw;
        xyrwh[i * 5 + 8] = sprite.th;
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
        this.img = -1;
        this.path = url;
    }
    SpriteManager.prototype.loaded = function () {
        return this.img >= 0;
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

/***/ "./src/stg/sprite/sprites.ts":
/*!***********************************!*\
  !*** ./src/stg/sprite/sprites.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SPRITES": () => /* binding */ SPRITES,
/* harmony export */   "small_round_red": () => /* binding */ small_round_red,
/* harmony export */   "ray_laser_red": () => /* binding */ ray_laser_red,
/* harmony export */   "curve_laser_red": () => /* binding */ curve_laser_red
/* harmony export */ });
/* harmony import */ var _entity_RayLaser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../entity/RayLaser */ "./src/stg/entity/RayLaser.ts");
/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Shape */ "./src/stg/sprite/Shape.ts");
/* harmony import */ var _SpriteManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteManager */ "./src/stg/sprite/SpriteManager.ts");



var SPRITES = {
    "round_red": {
        "sprite": "assets/missile_red.png",
        "tx": 0,
        "ty": 0,
        "tw": 1,
        "th": 1
    }
};
var small_round_red = {
    renderType: _SpriteManager__WEBPACK_IMPORTED_MODULE_2__.RENDER_TYPE.RECT,
    sprite: "round_red",
    shape: new _Shape__WEBPACK_IMPORTED_MODULE_1__.ShapeCircle(1),
    w: 1,
    h: 1
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
        if (this.update_stage != UpdateStage.ADD_BACK)
            this.pending.push(e);
        else
            this.groups[e.config.collide_group].list.push(e);
    };
    EntityPool.prototype.update = function () {
        EntityPool.INSTANCE = this;
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
        this.pending.forEach(this.add);
        this.pending = [];
        EntityPool.INSTANCE = null;
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
                rlist.forEach(function (rl) { return rl.v.forEach(function (v1, k1) { return _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_2__.SpriteManager.get(k1).draw(v1); }); });
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
/* harmony export */   "scrCoord_to_GLCoord_x": () => /* binding */ scrCoord_to_GLCoord_x,
/* harmony export */   "scrCoord_to_GLCoord_y": () => /* binding */ scrCoord_to_GLCoord_y
/* harmony export */ });
var SCR_HALF_WIDTH = 192;
var SCR_HALF_HEIGHT = 224;
function scrCoord_to_GLCoord_x(x) {
    return x / SCR_HALF_WIDTH;
}
function scrCoord_to_GLCoord_y(y) {
    return y / SCR_HALF_HEIGHT;
}


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stg/sprite/gl */ "./src/stg/sprite/gl.js");
/* harmony import */ var _stg_stage_EntityPool__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stg/stage/EntityPool */ "./src/stg/stage/EntityPool.ts");




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
    await testCurve();

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

async function testRect() {
    const image = await (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.loadImage)("assets/blend_test.png");
    const texture = (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.loadTexture)(image);
    (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.clear)();
    var size = 10000;
    var xyrwh = new Float32Array(size * 9);
    for (var i = 0; i < size; i++) {
        xyrwh[i * 9 + 0] = Math.random() * 2 - 1;
        xyrwh[i * 9 + 1] = Math.random() * 2 - 1;
        xyrwh[i * 9 + 2] = Math.random() * 2 * Math.PI;
        xyrwh[i * 9 + 3] = 0.03;
        xyrwh[i * 9 + 4] = 0.03;
        xyrwh[i * 9 + 5] = 0;
        xyrwh[i * 9 + 6] = 0;
        xyrwh[i * 9 + 7] = 1;
        xyrwh[i * 9 + 8] = 1;
    }
    timer(() => (0,_stg_sprite_gl__WEBPACK_IMPORTED_MODULE_0__.drawRects)(xyrwh, size, texture));
}

function timer(a) {
    var t0 = + new Date();
    a();
    var t1 = + new Date();
    console.log(t1 - t0);
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
            const a = xyrwh[i * 5 + 2] + verang[j] * pid4;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvZW50aXR5L0VudGl0eS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvZW50aXR5L1JheUxhc2VyLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvU2hhcGUudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3Nwcml0ZS9TcHJpdGVNYW5hZ2VyLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvc3ByaXRlcy50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3RhZ2UvRW50aXR5UG9vbC50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3RhZ2UvU2NyZWVuLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvZ2wuanMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FB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O1VBQ0EiLCJmaWxlIjoiYm91bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgQ0dfUExBWUVSID0gMDtcbmV4cG9ydCB2YXIgQ0dfQk9TUyA9IDE7XG5leHBvcnQgdmFyIENHX0VORU1ZID0gMjtcbmV4cG9ydCB2YXIgQ0dfQlVMTEVUID0gMztcbmV4cG9ydCB2YXIgQ0dfQk9NQiA9IDQ7XG5leHBvcnQgdmFyIENHX0dIT1NUID0gNTtcbmV4cG9ydCB2YXIgQ01fUExBWUVSID0gMDtcbmV4cG9ydCB2YXIgQ01fQk9TUyA9IDE7XG5leHBvcnQgdmFyIENNX0VORU1ZID0gMTtcbmV4cG9ydCB2YXIgQ01fQlVMTEVUID0gMTtcbmV4cG9ydCB2YXIgQ01fQk9NQiA9IDE0O1xuZXhwb3J0IHZhciBDTV9HSE9TVCA9IDA7XG5leHBvcnQgdmFyIFJMX0lOVklTSUJMRSA9IDA7XG5leHBvcnQgdmFyIFJMX0JHID0gMTAwO1xuZXhwb3J0IHZhciBSTF9CT1NTID0gMjAwO1xuZXhwb3J0IHZhciBSTF9FTkVNWSA9IDMwMDtcbmV4cG9ydCB2YXIgUkxfQlVMTEVUID0gNDAwO1xuZXhwb3J0IHZhciBSTF9CT01CID0gNTAwO1xuZXhwb3J0IHZhciBSTF9QTEFZRVIgPSA2MDA7XG5leHBvcnQgdmFyIFJMX1VJID0gNzAwO1xuZXhwb3J0IHZhciBSTF9NQVggPSAxMDAwO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZVtTdGF0ZVtcIlBSRV9FTlRSWVwiXSA9IDBdID0gXCJQUkVfRU5UUllcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkFMSVZFXCJdID0gMV0gPSBcIkFMSVZFXCI7XG4gICAgU3RhdGVbU3RhdGVbXCJMRUFWSU5HXCJdID0gMl0gPSBcIkxFQVZJTkdcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkRFQURcIl0gPSAzXSA9IFwiREVBRFwiO1xufSkoU3RhdGUgfHwgKFN0YXRlID0ge30pKTtcbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSh0KSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHQpO1xufVxuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfcGxheWVyID0ge1xuICAgIHJlbmRlcl9sYXllcjogUkxfUExBWUVSLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX1BMQVlFUixcbiAgICBjb2xsaWRlX21hc2s6IENNX1BMQVlFUlxufTtcbmV4cG9ydCB2YXIgdGVtcGxhdGVfY29uZmlnX2Jvc3MgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9CT1NTLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX0JPU1MsXG4gICAgY29sbGlkZV9tYXNrOiBDTV9CT1NTXG59O1xuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfZW5lbXkgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9FTkVNWSxcbiAgICBjb2xsaWRlX2dyb3VwOiBDR19FTkVNWSxcbiAgICBjb2xsaWRlX21hc2s6IENNX0VORU1ZXG59O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFNoYXBlLCBTaGFwZWRJbnN0YW5jZSwgU2hhcGVkU3ByaXRlIH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuaW1wb3J0IHsgUkVOREVSX1RZUEUgfSBmcm9tIFwiLi4vc3ByaXRlL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi4vc3ByaXRlL3Nwcml0ZXNcIjtcbmltcG9ydCB7IEVudGl0eVBvb2wgfSBmcm9tIFwiLi4vc3RhZ2UvRW50aXR5UG9vbFwiO1xuaW1wb3J0IHsgU3RhdGUgfSBmcm9tIFwiLi9FbnRpdHlcIjtcbnZhciBTaGFwZVJheSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU2hhcGVSYXksIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVSYXkoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIgIT09IG51bGwgJiYgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgdGhpcztcbiAgICB9XG4gICAgU2hhcGVSYXkucHJvdG90eXBlLmRpc3RhbmNlVG8gPSBmdW5jdGlvbiAoc2VsZiwgeCwgeSkge1xuICAgICAgICB2YXIgeDAgPSBzZWxmLnB4O1xuICAgICAgICB2YXIgeTAgPSBzZWxmLnB5O1xuICAgICAgICB2YXIgeDEgPSBzZWxmLnB4ICsgc2VsZi5sZW4gKiBNYXRoLmNvcyhzZWxmLmRpcik7XG4gICAgICAgIHZhciB5MSA9IHNlbGYucHkgKyBzZWxmLmxlbiAqIE1hdGguc2luKHNlbGYuZGlyKTtcbiAgICAgICAgdmFyIHJsID0gTWF0aC5zcXJ0KCh4MCAtIHgxKSAqICh4MCAtIHgxKSArICh5MCAtIHkxKSAqICh5MCAtIHkxKSk7XG4gICAgICAgIHZhciBkaXMgPSBNYXRoLmFicygoeDEgLSB4MCkgKiAoeTAgLSB5KSAtICh4MCAtIHgpICogKHkxIC0geTApKTtcbiAgICAgICAgdmFyIGQwID0gTWF0aC5zcXJ0KCh4MCAtIHgpICogKHgwIC0geCkgKyAoeTAgLSB5KSAqICh5MCAtIHkpKTtcbiAgICAgICAgdmFyIGQxID0gTWF0aC5zcXJ0KCh4MSAtIHgpICogKHgxIC0geCkgKyAoeTEgLSB5KSAqICh5MSAtIHkpKTtcbiAgICAgICAgcmV0dXJuIE1hdGgubWluKGRpcyAvIHJsLCBkMCwgZDEpIC0gc2VsZi5zaGFwZWRfc3ByaXRlLnc7XG4gICAgfTtcbiAgICBTaGFwZVJheS5JTlMgPSBuZXcgU2hhcGVSYXkoKTtcbiAgICByZXR1cm4gU2hhcGVSYXk7XG59KFNoYXBlKSk7XG5leHBvcnQgeyBTaGFwZVJheSB9O1xuZXhwb3J0IHZhciBSYXlMYXNlclN0YXRlO1xuKGZ1bmN0aW9uIChSYXlMYXNlclN0YXRlKSB7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiV0FSTklOR1wiXSA9IDBdID0gXCJXQVJOSU5HXCI7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiT1BFTklOR1wiXSA9IDFdID0gXCJPUEVOSU5HXCI7XG4gICAgUmF5TGFzZXJTdGF0ZVtSYXlMYXNlclN0YXRlW1wiT1BFTkVEXCJdID0gMl0gPSBcIk9QRU5FRFwiO1xuICAgIFJheUxhc2VyU3RhdGVbUmF5TGFzZXJTdGF0ZVtcIkNMT1NJTkdcIl0gPSAzXSA9IFwiQ0xPU0lOR1wiO1xufSkoUmF5TGFzZXJTdGF0ZSB8fCAoUmF5TGFzZXJTdGF0ZSA9IHt9KSk7XG52YXIgU1NSYXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNTUmF5LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNTUmF5KCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIHJldHVybiBTU1JheTtcbn0oU2hhcGVkU3ByaXRlKSk7XG5leHBvcnQgeyBTU1JheSB9O1xudmFyIFNJUmF5ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTSVJheSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTSVJheShzcykge1xuICAgICAgICByZXR1cm4gX3N1cGVyLmNhbGwodGhpcywgUkVOREVSX1RZUEUuUkVDVCwgc3MpIHx8IHRoaXM7XG4gICAgfVxuICAgIFNJUmF5LnByb3RvdHlwZS5yZWN0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG4gICAgU0lSYXkucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICh4eXJ3aCwgaSkge1xuICAgICAgICB2YXIgdyA9IHRoaXMuc2hhcGVkX3Nwcml0ZS53O1xuICAgICAgICB2YXIgbCA9IHRoaXMuc2hhcGVkX3Nwcml0ZS5sO1xuICAgICAgICB4eXJ3aFtpICogNSArIDBdID0gdGhpcy5weCArIGwgLyAyICogTWF0aC5jb3ModGhpcy5kaXIpO1xuICAgICAgICB4eXJ3aFtpICogNSArIDFdID0gdGhpcy5weSArIGwgLyAyICogTWF0aC5zaW4odGhpcy5kaXIpO1xuICAgICAgICA7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgMl0gPSB0aGlzLmRpcjtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyAzXSA9IHcgLyAyO1xuICAgICAgICB4eXJ3aFtpICogNSArIDRdID0gbCAvIDI7XG4gICAgICAgIHZhciBzcHJpdGUgPSBTUFJJVEVTW3RoaXMuc2hhcGVkX3Nwcml0ZS5zcHJpdGVdO1xuICAgICAgICB4eXJ3aFtpICogNSArIDVdID0gc3ByaXRlLnR4O1xuICAgICAgICB4eXJ3aFtpICogNSArIDZdID0gc3ByaXRlLnR5O1xuICAgICAgICB4eXJ3aFtpICogNSArIDddID0gc3ByaXRlLnR3O1xuICAgICAgICB4eXJ3aFtpICogNSArIDhdID0gc3ByaXRlLnRoO1xuICAgIH07XG4gICAgcmV0dXJuIFNJUmF5O1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lSYXkgfTtcbnZhciBSYXlMYXNlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmF5TGFzZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmF5TGFzZXIoc2hhcGVkX3NoYXBlLCBjZikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBzaGFwZWRfc2hhcGUpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnN0YXRlID0gU3RhdGUuUFJFX0VOVFJZO1xuICAgICAgICBfdGhpcy5yc3RhdGUgPSBSYXlMYXNlclN0YXRlLldBUk5JTkc7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IGNmO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJheUxhc2VyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9IFN0YXRlLlBSRV9FTlRSWSlcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBTdGF0ZS5BTElWRTtcbiAgICAgICAgdmFyIHJhdGUgPSBFbnRpdHlQb29sLklOU1RBTkNFLnNwZWNpYWxfZWZmZWN0cy50aW1lX3JhdGU7XG4gICAgICAgIHRoaXMudGltZSArPSByYXRlO1xuICAgICAgICBpZiAodGhpcy5yc3RhdGUgPT0gUmF5TGFzZXJTdGF0ZS5XQVJOSU5HICYmIHRoaXMudGltZSA+IHRoaXMuY29uZmlnLndhcm5pbmdfdGltZSkge1xuICAgICAgICAgICAgdGhpcy5yc3RhdGUgPSBSYXlMYXNlclN0YXRlLk9QRU5JTkc7XG4gICAgICAgICAgICB0aGlzLnRpbWUgLT0gdGhpcy5jb25maWcud2FybmluZ190aW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnJzdGF0ZSA9PSBSYXlMYXNlclN0YXRlLk9QRU5JTkcpIHtcbiAgICAgICAgfVxuICAgICAgICAvLyBFdmVudDogT25VcGRhdGUodGltZV9yYXRlKTtcbiAgICB9O1xuICAgIFJheUxhc2VyLnByb3RvdHlwZS5wb3N0VXBkYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgLy8gRXZlbnQ6IE9uUG9zdFVwZGF0ZVxuICAgICAgICBpZiAodGhpcy5zdGF0ZSA9PSBTdGF0ZS5MRUFWSU5HKSB7XG4gICAgICAgICAgICAvLyBFdmVudDogT25EZXN0cm95XG4gICAgICAgICAgICB0aGlzLnN0YXRlID0gU3RhdGUuREVBRDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmF5TGFzZXIucHJvdG90eXBlLmF0dGFjayA9IGZ1bmN0aW9uIChfLCBlKSB7XG4gICAgICAgIC8vIEV2ZW50OiBPbkF0dGFjayhlKVxuICAgIH07XG4gICAgcmV0dXJuIFJheUxhc2VyO1xufShTSVJheSkpO1xuZXhwb3J0IHsgUmF5TGFzZXIgfTtcbiIsInZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZXh0ZW5kU3RhdGljcyA9IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcbiAgICAgICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChiLCBwKSkgZFtwXSA9IGJbcF07IH07XG4gICAgICAgIHJldHVybiBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgIH07XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgICAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG4gICAgfTtcbn0pKCk7XG5pbXBvcnQgeyBSRU5ERVJfVFlQRSB9IGZyb20gXCIuL1Nwcml0ZU1hbmFnZXJcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG52YXIgU2hhcGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGUoKSB7XG4gICAgfVxuICAgIHJldHVybiBTaGFwZTtcbn0oKSk7XG5leHBvcnQgeyBTaGFwZSB9O1xudmFyIFNoYXBlUG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNoYXBlUG9pbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTaGFwZVBvaW50LnByb3RvdHlwZS5kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHNlbGYsIHB4LCBweSkge1xuICAgICAgICBweCA9IHB4IC0gc2VsZi5weDtcbiAgICAgICAgcHkgPSBweSAtIHNlbGYucHk7XG4gICAgICAgIHZhciBzZCA9IHNlbGYuZGlyO1xuICAgICAgICB2YXIgc3ggPSBweCAqIE1hdGguY29zKC1zZCkgLSBweSAqIE1hdGguc2luKC1zZCk7XG4gICAgICAgIHZhciBzeSA9IHB5ICogTWF0aC5jb3MoLXNkKSArIHB4ICogTWF0aC5zaW4oLXNkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3RhbmNlVG8oc3gsIHN5KTtcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZVBvaW50O1xufShTaGFwZSkpO1xuZXhwb3J0IHsgU2hhcGVQb2ludCB9O1xudmFyIFNoYXBlQ2lyY2xlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaGFwZUNpcmNsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaGFwZUNpcmNsZShyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJhZGl1cyA9IHI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2hhcGVDaXJjbGUucHJvdG90eXBlLmV4aXRTY3JlZW4gPSBmdW5jdGlvbiAoc3gsIHN5LCBfLCBydywgcmgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHN4KSA+IHJ3ICsgdGhpcy5yYWRpdXMgfHwgTWF0aC5hYnMoc3kpID4gcmggKyB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIFNoYXBlQ2lyY2xlLnByb3RvdHlwZS5fZGlzdGFuY2VUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkgLSB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZUNpcmNsZTtcbn0oU2hhcGVQb2ludCkpO1xuZXhwb3J0IHsgU2hhcGVDaXJjbGUgfTtcbnZhciBTaGFwZWRTcHJpdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGVkU3ByaXRlKCkge1xuICAgIH1cbiAgICByZXR1cm4gU2hhcGVkU3ByaXRlO1xufSgpKTtcbmV4cG9ydCB7IFNoYXBlZFNwcml0ZSB9O1xudmFyIFNTUG9pbnQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNTUG9pbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU1NQb2ludCgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU1NQb2ludDtcbn0oU2hhcGVkU3ByaXRlKSk7XG5leHBvcnQgeyBTU1BvaW50IH07XG52YXIgU2hhcGVkSW5zdGFuY2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU2hhcGVkSW5zdGFuY2UocnQsIHNzKSB7XG4gICAgICAgIHRoaXMucmVuZGVyVHlwZSA9IHJ0O1xuICAgICAgICB0aGlzLnNoYXBlZF9zcHJpdGUgPSBzcztcbiAgICB9XG4gICAgU2hhcGVkSW5zdGFuY2UucHJvdG90eXBlLmRpc3RhbmNlVG8gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zaGFwZWRfc3ByaXRlLnNoYXBlLmRpc3RhbmNlVG8odGhpcywgeCwgeSk7XG4gICAgfTtcbiAgICByZXR1cm4gU2hhcGVkSW5zdGFuY2U7XG59KCkpO1xuZXhwb3J0IHsgU2hhcGVkSW5zdGFuY2UgfTtcbnZhciBTSVBvaW50ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTSVBvaW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFNJUG9pbnQoc3MpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIFJFTkRFUl9UWVBFLlJFQ1QsIHNzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBTSVBvaW50LnByb3RvdHlwZS5yZWN0Q291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAxO1xuICAgIH07XG4gICAgU0lQb2ludC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKHh5cndoLCBpKSB7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgMF0gPSB0aGlzLnB4O1xuICAgICAgICB4eXJ3aFtpICogNSArIDFdID0gdGhpcy5weTtcbiAgICAgICAgeHlyd2hbaSAqIDUgKyAyXSA9IHRoaXMuZGlyO1xuICAgICAgICB4eXJ3aFtpICogNSArIDNdID0gdGhpcy5zaGFwZWRfc3ByaXRlLnc7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgNF0gPSB0aGlzLnNoYXBlZF9zcHJpdGUuaDtcbiAgICAgICAgdmFyIHNwcml0ZSA9IFNQUklURVNbdGhpcy5zaGFwZWRfc3ByaXRlLnNwcml0ZV07XG4gICAgICAgIHh5cndoW2kgKiA1ICsgNV0gPSBzcHJpdGUudHg7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgNl0gPSBzcHJpdGUudHk7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgN10gPSBzcHJpdGUudHc7XG4gICAgICAgIHh5cndoW2kgKiA1ICsgOF0gPSBzcHJpdGUudGg7XG4gICAgfTtcbiAgICByZXR1cm4gU0lQb2ludDtcbn0oU2hhcGVkSW5zdGFuY2UpKTtcbmV4cG9ydCB7IFNJUG9pbnQgfTtcbnZhciBTSU51bGwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNJTnVsbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTSU51bGwoKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBudWxsLCBudWxsKSB8fCB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gU0lOdWxsO1xufShTaGFwZWRJbnN0YW5jZSkpO1xuZXhwb3J0IHsgU0lOdWxsIH07XG5leHBvcnQgZnVuY3Rpb24gY29sbGlkZShlMCwgZTEpIHtcbiAgICBpZiAoZTAgaW5zdGFuY2VvZiBTSVBvaW50ICYmIGUwLnNoYXBlZF9zcHJpdGUuc2hhcGUgaW5zdGFuY2VvZiBTaGFwZUNpcmNsZSlcbiAgICAgICAgcmV0dXJuIGUxLmRpc3RhbmNlVG8oZTAucHgsIGUwLnB5KSA8IGUwLnNoYXBlZF9zcHJpdGUuc2hhcGUucmFkaXVzO1xuICAgIGlmIChlMSBpbnN0YW5jZW9mIFNJUG9pbnQgJiYgZTEuc2hhcGVkX3Nwcml0ZS5zaGFwZSBpbnN0YW5jZW9mIFNoYXBlQ2lyY2xlKVxuICAgICAgICByZXR1cm4gY29sbGlkZShlMSwgZTApO1xuICAgIHRocm93IG5ldyBFcnJvcihcIm5vbi1jaXJjbGUgbm9uLWNpcmNsZSBjb2xsaXNpb24gbm90IGZvdW5kXCIpO1xufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCB7IGxvYWRUZXh0dXJlLCBsb2FkSW1hZ2UsIGRyYXdSZWN0cywgZHJhd1NuYWtlIH0gZnJvbSBcIi4vZ2xcIjtcbmltcG9ydCB7IFNQUklURVMgfSBmcm9tIFwiLi9zcHJpdGVzXCI7XG5leHBvcnQgdmFyIFJFTkRFUl9UWVBFO1xuKGZ1bmN0aW9uIChSRU5ERVJfVFlQRSkge1xuICAgIFJFTkRFUl9UWVBFW1JFTkRFUl9UWVBFW1wiUkVDVFwiXSA9IDBdID0gXCJSRUNUXCI7XG4gICAgUkVOREVSX1RZUEVbUkVOREVSX1RZUEVbXCJTVFJJUFwiXSA9IDFdID0gXCJTVFJJUFwiO1xufSkoUkVOREVSX1RZUEUgfHwgKFJFTkRFUl9UWVBFID0ge30pKTtcbjtcbnZhciBTcHJpdGVNYW5hZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwcml0ZU1hbmFnZXIodXJsKSB7XG4gICAgICAgIHRoaXMuaW1nID0gLTE7XG4gICAgICAgIHRoaXMucGF0aCA9IHVybDtcbiAgICB9XG4gICAgU3ByaXRlTWFuYWdlci5wcm90b3R5cGUubG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWcgPj0gMDtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWc7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGxvYWRJbWFnZSh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWcgPSBsb2FkVGV4dHVyZShpbWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIuZ2V0ID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICBpZiAoU3ByaXRlTWFuYWdlci5JTlNbdXJsXSlcbiAgICAgICAgICAgIHJldHVybiBTcHJpdGVNYW5hZ2VyLklOU1t1cmxdO1xuICAgICAgICByZXR1cm4gKFNwcml0ZU1hbmFnZXIuSU5TW3VybF0gPSBuZXcgU3ByaXRlTWFuYWdlcih1cmwpKTtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICB2YXIgcmVjdG4gPSBsaXN0LnJlZHVjZShmdW5jdGlvbiAobiwgZSkgeyByZXR1cm4gZS5yZW5kZXJUeXBlID09IFJFTkRFUl9UWVBFLlJFQ1QgPyBuICsgZS5yZWN0Q291bnQoKSA6IG47IH0sIDApO1xuICAgICAgICB2YXIgeHlyd2ggPSBuZXcgRmxvYXQzMkFycmF5KHJlY3RuICogOSk7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBsaXN0XzEgPSBsaXN0OyBfaSA8IGxpc3RfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciBlID0gbGlzdF8xW19pXTtcbiAgICAgICAgICAgIGlmIChlLnJlbmRlclR5cGUgPT0gUkVOREVSX1RZUEUuUkVDVCkge1xuICAgICAgICAgICAgICAgIHZhciByID0gZTtcbiAgICAgICAgICAgICAgICByLnJlbmRlcih4eXJ3aCwgaSk7XG4gICAgICAgICAgICAgICAgaSArPSByLnJlY3RDb3VudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGRyYXdSZWN0cyh4eXJ3aCwgbGlzdC5sZW5ndGgsIHRoaXMuaW1nKTtcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBsaXN0XzIgPSBsaXN0OyBfYSA8IGxpc3RfMi5sZW5ndGg7IF9hKyspIHtcbiAgICAgICAgICAgIHZhciBlID0gbGlzdF8yW19hXTtcbiAgICAgICAgICAgIGlmIChlLnJlbmRlclR5cGUgPT0gUkVOREVSX1RZUEUuU1RSSVApIHtcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGU7XG4gICAgICAgICAgICAgICAgdmFyIHNzID0gcy5nZXRTcHJpdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgc3AgPSBTUFJJVEVTW3NzLnNwcml0ZV07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHMucmVuZGVyKCk7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICBkcmF3U25ha2UoYSwgc3MudywgYS5sZW5ndGggLyAyLCBzcC50eCwgc3AudHksIHNwLnR3LCBzcC50aCwgdGhpcy5pbWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU3ByaXRlTWFuYWdlci5JTlMgPSB7fTtcbiAgICByZXR1cm4gU3ByaXRlTWFuYWdlcjtcbn0oKSk7XG5leHBvcnQgeyBTcHJpdGVNYW5hZ2VyIH07XG4iLCJpbXBvcnQgeyBTaGFwZVJheSB9IGZyb20gXCIuLi9lbnRpdHkvUmF5TGFzZXJcIjtcbmltcG9ydCB7IFNoYXBlQ2lyY2xlIH0gZnJvbSBcIi4vU2hhcGVcIjtcbmltcG9ydCB7IFJFTkRFUl9UWVBFIH0gZnJvbSBcIi4vU3ByaXRlTWFuYWdlclwiO1xuZXhwb3J0IHZhciBTUFJJVEVTID0ge1xuICAgIFwicm91bmRfcmVkXCI6IHtcbiAgICAgICAgXCJzcHJpdGVcIjogXCJhc3NldHMvbWlzc2lsZV9yZWQucG5nXCIsXG4gICAgICAgIFwidHhcIjogMCxcbiAgICAgICAgXCJ0eVwiOiAwLFxuICAgICAgICBcInR3XCI6IDEsXG4gICAgICAgIFwidGhcIjogMVxuICAgIH1cbn07XG5leHBvcnQgdmFyIHNtYWxsX3JvdW5kX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJyb3VuZF9yZWRcIixcbiAgICBzaGFwZTogbmV3IFNoYXBlQ2lyY2xlKDEpLFxuICAgIHc6IDEsXG4gICAgaDogMVxufTtcbmV4cG9ydCB2YXIgcmF5X2xhc2VyX3JlZCA9IHtcbiAgICByZW5kZXJUeXBlOiBSRU5ERVJfVFlQRS5SRUNULFxuICAgIHNwcml0ZTogXCJcIixcbiAgICBzaGFwZTogU2hhcGVSYXkuSU5TLFxuICAgIHc6IDEsXG4gICAgbDogMVxufTtcbi8vYWJzdHJhY3RcbmV4cG9ydCB2YXIgY3VydmVfbGFzZXJfcmVkID0ge1xuICAgIHJlbmRlclR5cGU6IFJFTkRFUl9UWVBFLlNUUklQLFxuICAgIHNwcml0ZTogXCJcIixcbiAgICBzaGFwZTogbnVsbCxcbiAgICB3OiAxXG59O1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbmltcG9ydCAqIGFzIEJBU0UgZnJvbSBcIi4uL2VudGl0eS9FbnRpdHlcIjtcbmltcG9ydCB7IGNvbGxpZGUgfSBmcm9tIFwiLi4vc3ByaXRlL1NoYXBlXCI7XG5pbXBvcnQgeyBTcHJpdGVNYW5hZ2VyIH0gZnJvbSBcIi4uL3Nwcml0ZS9TcHJpdGVNYW5hZ2VyXCI7XG52YXIgU3BlY2lhbEVmZmVjdHMgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3BlY2lhbEVmZmVjdHMoKSB7XG4gICAgICAgIHRoaXMudGltZV9yYXRlID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIFNwZWNpYWxFZmZlY3RzO1xufSgpKTtcbmV4cG9ydCB7IFNwZWNpYWxFZmZlY3RzIH07XG47XG52YXIgVXBkYXRlU3RhZ2U7XG4oZnVuY3Rpb24gKFVwZGF0ZVN0YWdlKSB7XG4gICAgVXBkYXRlU3RhZ2VbVXBkYXRlU3RhZ2VbXCJQUkVfSU5JVFwiXSA9IDBdID0gXCJQUkVfSU5JVFwiO1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiVVBEQVRFXCJdID0gMV0gPSBcIlVQREFURVwiO1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiUE9TVF9VUERBVEVcIl0gPSAyXSA9IFwiUE9TVF9VUERBVEVcIjtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIkFERF9CQUNLXCJdID0gM10gPSBcIkFERF9CQUNLXCI7XG59KShVcGRhdGVTdGFnZSB8fCAoVXBkYXRlU3RhZ2UgPSB7fSkpO1xudmFyIEVudGl0eVBvb2wgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW50aXR5UG9vbCgpIHtcbiAgICAgICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gW107XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuUFJFX0lOSVQ7XG4gICAgICAgIHRoaXMuc3BlY2lhbF9lZmZlY3RzID0gbmV3IFNwZWNpYWxFZmZlY3RzKCk7XG4gICAgICAgIEVudGl0eVBvb2wuSU5TVEFOQ0UgPSB0aGlzO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfUExBWUVSLCBtYXNrOiBCQVNFLkNNX1BMQVlFUiwgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19CT1NTLCBtYXNrOiBCQVNFLkNNX0JPU1MsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfRU5FTVksIG1hc2s6IEJBU0UuQ01fRU5FTVksIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfQlVMTEVULCBtYXNrOiBCQVNFLkNNX0JVTExFVCwgbGlzdDogW10gfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogQkFTRS5DR19CT01CLCBtYXNrOiBCQVNFLkNNX0JPTUIsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfR0hPU1QsIG1hc2s6IEJBU0UuQ01fR0hPU1QsIGxpc3Q6IFtdIH0pO1xuICAgIH1cbiAgICBFbnRpdHlQb29sLnByb3RvdHlwZS5yZWdpc3Rlckdyb3VwID0gZnVuY3Rpb24gKG1hc2spIHtcbiAgICAgICAgdmFyIHJldCA9IHRoaXMuZ3JvdXBzLmxlbmd0aDtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiByZXQsIG1hc2s6IG1hc2ssIGxpc3Q6IFtdIH0pO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMudXBkYXRlX3N0YWdlICE9IFVwZGF0ZVN0YWdlLkFERF9CQUNLKVxuICAgICAgICAgICAgdGhpcy5wZW5kaW5nLnB1c2goZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZ3JvdXBzW2UuY29uZmlnLmNvbGxpZGVfZ3JvdXBdLmxpc3QucHVzaChlKTtcbiAgICB9O1xuICAgIEVudGl0eVBvb2wucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgRW50aXR5UG9vbC5JTlNUQU5DRSA9IHRoaXM7XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuVVBEQVRFO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS51cGRhdGUoZSk7IH0pOyB9KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmdyb3Vwcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdyb3Vwc1tpXS5tYXNrICYgaikge1xuICAgICAgICAgICAgICAgICAgICAvLyBncm91cCBpIGNhbiBhdHRhY2sgZ3JvdXAgalxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy5ncm91cHNbaV0ubGlzdDsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlaSA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlaS5zdGF0ZSAhPSBCQVNFLlN0YXRlLkFMSVZFIHx8ICFlaS5zaGFwZWRfc3ByaXRlIHx8ICFlaS5zaGFwZWRfc3ByaXRlLnNoYXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSAwLCBfYyA9IHRoaXMuZ3JvdXBzW2pdLmxpc3Q7IF9iIDwgX2MubGVuZ3RoOyBfYisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVqID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlai5zdGF0ZSAhPSBCQVNFLlN0YXRlLkFMSVZFIHx8ICFlai5zaGFwZWRfc3ByaXRlIHx8ICFlai5zaGFwZWRfc3ByaXRlLnNoYXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZShlaSwgZWopKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlaS5hdHRhY2soZWksIGVqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlBPU1RfVVBEQVRFO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5wb3N0VXBkYXRlKGUpOyB9KTsgfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKHBvb2wpIHsgcmV0dXJuIHBvb2wubGlzdCA9IHBvb2wubGlzdC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RhdGUgIT0gQkFTRS5TdGF0ZS5ERUFEOyB9KTsgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuQUREX0JBQ0s7XG4gICAgICAgIHRoaXMucGVuZGluZy5mb3JFYWNoKHRoaXMuYWRkKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gW107XG4gICAgICAgIEVudGl0eVBvb2wuSU5TVEFOQ0UgPSBudWxsO1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFwLCBfaSwgX2EsIHBvb2wsIF9iLCBfYywgZW50aXR5LCBzdWJtYXAsIHJsaXN0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgX2EgPSB0aGlzLmdyb3VwczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChfYiA9IDAsIF9jID0gcG9vbC5saXN0OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5ID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbWFwLmhhcyhlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnNldChlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllciwgbmV3IE1hcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcCA9IG1hcC5nZXQoZW50aXR5LmNvbmZpZy5yZW5kZXJfbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzdWJtYXAuaGFzKGVudGl0eS5zaGFwZWRfc3ByaXRlLnNwcml0ZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFwLnNldChlbnRpdHkuc2hhcGVkX3Nwcml0ZS5zcHJpdGUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcC5nZXQoZW50aXR5LnNoYXBlZF9zcHJpdGUuc3ByaXRlKS5wdXNoKGVudGl0eSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmxpc3QgPSBbXTtcbiAgICAgICAgICAgICAgICBtYXAuZm9yRWFjaChmdW5jdGlvbiAodjAsIGswKSB7IHJldHVybiBybGlzdC5wdXNoKHsgcmw6IGswLCB2OiB2MCB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmxpc3Quc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5ybCAtIGIucmw7IH0pO1xuICAgICAgICAgICAgICAgIHJsaXN0LmZvckVhY2goZnVuY3Rpb24gKHJsKSB7IHJldHVybiBybC52LmZvckVhY2goZnVuY3Rpb24gKHYxLCBrMSkgeyByZXR1cm4gU3ByaXRlTWFuYWdlci5nZXQoazEpLmRyYXcodjEpOyB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEVudGl0eVBvb2w7XG59KCkpO1xuZXhwb3J0IHsgRW50aXR5UG9vbCB9O1xuIiwiZXhwb3J0IHZhciBTQ1JfSEFMRl9XSURUSCA9IDE5MjtcbmV4cG9ydCB2YXIgU0NSX0hBTEZfSEVJR0hUID0gMjI0O1xuZXhwb3J0IGZ1bmN0aW9uIHNjckNvb3JkX3RvX0dMQ29vcmRfeCh4KSB7XG4gICAgcmV0dXJuIHggLyBTQ1JfSEFMRl9XSURUSDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzY3JDb29yZF90b19HTENvb3JkX3koeSkge1xuICAgIHJldHVybiB5IC8gU0NSX0hBTEZfSEVJR0hUO1xufVxuIiwiaW1wb3J0IHsgc2V0dXAsIGxvYWRJbWFnZSwgbG9hZFRleHR1cmUsIGNsZWFyLCBkcmF3U25ha2UsIGRyYXdSZWN0cyB9IGZyb20gXCIuL3N0Zy9zcHJpdGUvZ2xcIjtcblxuaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuL3N0Zy9zdGFnZS9FbnRpdHlQb29sXCJcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIHZhciB3aW53ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHdpbmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIHdpbnIgPSBNYXRoLm1pbih3aW53LCB3aW5oKSAqIDAuODtcblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsY2FudmFzXCIpO1xuXG4gICAgLy8gc2V0IHRoZSBkaXNwbGF5IHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aW5yICsgXCJweFwiO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSB3aW5yICsgXCJweFwiO1xuXG4gICAgLy8gc2V0IHRoZSBzaXplIG9mIHRoZSBkcmF3aW5nQnVmZmVyXG4gICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2luciAqIGRldmljZVBpeGVsUmF0aW87XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbnIgKiBkZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgc2V0dXAoKTtcbiAgICBhd2FpdCB0ZXN0Q3VydmUoKTtcblxufVxuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q3VydmUoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBsb2FkSW1hZ2UoXCJhc3NldHMvbWlzc2lsZV9ncmVlbi5wbmdcIik7XG4gICAgY29uc3QgdGV4dHVyZSA9IGxvYWRUZXh0dXJlKGltYWdlKTtcbiAgICBjbGVhcigpO1xuICAgIHZhciBzaXplID0gNTAwO1xuICAgIHZhciB4eSA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHh5W2kgKiAyICsgMF0gPSBNYXRoLnNpbihpICogMTAgKiBNYXRoLlBJIC8gc2l6ZSkgKiAwLjE7XG4gICAgICAgIHh5W2kgKiAyICsgMV0gPSAxLjggKiBpIC8gc2l6ZSAtIDAuOTtcbiAgICB9XG4gICAgdGltZXIoKCkgPT4gZHJhd1NuYWtlKHh5LCAwLjAzLCBzaXplLCAwLCAwLCAxLCAxLCB0ZXh0dXJlKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RSZWN0KCkge1xuICAgIGNvbnN0IGltYWdlID0gYXdhaXQgbG9hZEltYWdlKFwiYXNzZXRzL2JsZW5kX3Rlc3QucG5nXCIpO1xuICAgIGNvbnN0IHRleHR1cmUgPSBsb2FkVGV4dHVyZShpbWFnZSk7XG4gICAgY2xlYXIoKTtcbiAgICB2YXIgc2l6ZSA9IDEwMDAwO1xuICAgIHZhciB4eXJ3aCA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMF0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMl0gPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgM10gPSAwLjAzO1xuICAgICAgICB4eXJ3aFtpICogOSArIDRdID0gMC4wMztcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA1XSA9IDA7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgNl0gPSAwO1xuICAgICAgICB4eXJ3aFtpICogOSArIDddID0gMTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA4XSA9IDE7XG4gICAgfVxuICAgIHRpbWVyKCgpID0+IGRyYXdSZWN0cyh4eXJ3aCwgc2l6ZSwgdGV4dHVyZSkpO1xufVxuXG5mdW5jdGlvbiB0aW1lcihhKSB7XG4gICAgdmFyIHQwID0gKyBuZXcgRGF0ZSgpO1xuICAgIGEoKTtcbiAgICB2YXIgdDEgPSArIG5ldyBEYXRlKCk7XG4gICAgY29uc29sZS5sb2codDEgLSB0MCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluOyIsImltcG9ydCB7IHNjckNvb3JkX3RvX0dMQ29vcmRfeCwgc2NyQ29vcmRfdG9fR0xDb29yZF95IH0gZnJvbSBcIi4uL3N0YWdlL1NjcmVlblwiO1xuXG5jb25zdCB2ZXJ0ZXhDb2RlID0gYFxuYXR0cmlidXRlIHZlYzIgY29vcmQ7XG5hdHRyaWJ1dGUgdmVjMiB0ZXg7XG52YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleENvb3JkO1xudm9pZCBtYWluKHZvaWQpIHtcbiAgICBnbF9Qb3NpdGlvbiA9IHZlYzQoY29vcmQsIDAuMCwgMS4wKTtcbiAgICB2VGV4Q29vcmQgPSB0ZXg7XG59XG5gO1xuXG5jb25zdCBmcmFnbWVudENvZGUgPSBgXG52YXJ5aW5nIGhpZ2hwIHZlYzIgdlRleENvb3JkO1xudW5pZm9ybSBzYW1wbGVyMkQgdVNhbXBsZXI7XG52b2lkIG1haW4odm9pZCkge1xuICAgIGdsX0ZyYWdDb2xvciA9IHRleHR1cmUyRCh1U2FtcGxlciwgdlRleENvb3JkKTtcbn1cbmA7XG5cbmNvbnN0IGdsb2JhbF9nbCA9IHtcbiAgICBnbDogbnVsbCxcbiAgICBzaGFkZXI6IHtcbiAgICAgICAgcHJvZ3JhbTogMCxcbiAgICAgICAgYXR0cmlidXRlOiB7XG4gICAgICAgICAgICBjb29yZDogMCxcbiAgICAgICAgICAgIHRleDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgdW5pZm9ybToge1xuICAgICAgICAgICAgdVNhbXBsZXI6IDAsXG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnbGNhbnZhcycpO1xuICAgIHZhciBnbCA9IGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcpO1xuICAgIGlmIChnbCA9PT0gbnVsbCkge1xuICAgICAgICBhbGVydChcIlVuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMLiBZb3VyIGJyb3dzZXIgb3IgbWFjaGluZSBtYXkgbm90IHN1cHBvcnQgaXQuXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ2xvYmFsX2dsLmdsID0gZ2w7XG4gICAgdmFyIHZlcnRTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuVkVSVEVYX1NIQURFUik7XG4gICAgdmFyIGZyYWdTaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIoZ2wuRlJBR01FTlRfU0hBREVSKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UodmVydFNoYWRlciwgdmVydGV4Q29kZSk7XG4gICAgZ2wuc2hhZGVyU291cmNlKGZyYWdTaGFkZXIsIGZyYWdtZW50Q29kZSk7XG4gICAgZ2wuY29tcGlsZVNoYWRlcih2ZXJ0U2hhZGVyKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKGZyYWdTaGFkZXIpO1xuICAgIHZhciBzaGFkZXJQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCB2ZXJ0U2hhZGVyKTtcbiAgICBnbC5hdHRhY2hTaGFkZXIoc2hhZGVyUHJvZ3JhbSwgZnJhZ1NoYWRlcik7XG4gICAgZ2wubGlua1Byb2dyYW0oc2hhZGVyUHJvZ3JhbSk7XG4gICAgZ2wudXNlUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgICBjb25zdCBzaGFkZXIgPSBnbG9iYWxfZ2wuc2hhZGVyO1xuICAgIHNoYWRlci5wcm9ncmFtID0gc2hhZGVyUHJvZ3JhbTtcbiAgICBzaGFkZXIuYXR0cmlidXRlLmNvb3JkID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ2Nvb3JkJyk7XG4gICAgc2hhZGVyLmF0dHJpYnV0ZS50ZXggPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndGV4Jyk7XG4gICAgc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oc2hhZGVyUHJvZ3JhbSwgJ3VTYW1wbGVyJyk7XG5cbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpO1xuICAgIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpO1xuICAgIGdsLmJsZW5kRnVuYyhnbC5TUkNfQUxQSEEsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuICAgIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVCk7XG4gICAgZ2wudmlld3BvcnQoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRJbWFnZShzcmMpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHJlc29sdmUoaW1nKVxuICAgICAgICBpbWcub25lcnJvciA9IHJlamVjdFxuICAgICAgICBpbWcuc3JjID0gc3JjXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXcodmVyX2FyciwgdGV4X2FyciwgdGV4dHVyZSwgc2l6ZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXgpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgc2l6ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U3RyaXAodmVyX2FyciwgdGV4X2FyciwgaW5kX2FyciwgdGV4dHVyZSwgc2l6ZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoY29vcmQsIDIsIGdsLkZMT0FULCBmYWxzZSwgMCwgMCk7XG4gICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoY29vcmQpO1xuXG4gICAgY29uc3QgdGV4X2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IHRleCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKHRleCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXgpO1xuXG4gICAgY29uc3QgaW5kX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9hcnIsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShnbG9iYWxfZ2wuc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIsIDApO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkVGV4dHVyZShpbWFnZSkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHRleHR1cmUgPSBnbC5jcmVhdGVUZXh0dXJlKCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudGV4SW1hZ2UyRChnbC5URVhUVVJFXzJELCAwLCBnbC5SR0JBLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9TSE9SVF80XzRfNF80LCBpbWFnZSlcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUlOX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC50ZXhQYXJhbWV0ZXJpKGdsLlRFWFRVUkVfMkQsIGdsLlRFWFRVUkVfTUFHX0ZJTFRFUiwgZ2wuTElORUFSKTtcbiAgICBnbC5nZW5lcmF0ZU1pcG1hcChnbC5URVhUVVJFXzJEKTtcbiAgICByZXR1cm4gdGV4dHVyZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyKCkge1xuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKTtcbiAgICBnbC5jbGVhckNvbG9yKDAuMCwgMC4wLCAxLjAsIDEuMCk7XG59XG5cbmNvbnN0IHZlcmFuZyA9IFszLCAtMywgLTEsIDMsIDEsIC0xXTtcbmNvbnN0IHRleHggPSBbMCwgMCwgMSwgMCwgMSwgMV07XG5jb25zdCB0ZXh5ID0gWzAsIDEsIDEsIDAsIDAsIDFdO1xuXG5mdW5jdGlvbiBzY3JDb29yZF90b19HTENvb3JkKGZhKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmYS5sZW5ndGggLyAyOyBpKyspIHtcbiAgICAgICAgZmFbaSAqIDJdID0gc2NyQ29vcmRfdG9fR0xDb29yZF94KGZhW2kgKiAyXSk7XG4gICAgICAgIGZhW2kgKiAyICsgMV0gPSBzY3JDb29yZF90b19HTENvb3JkX3koZmFbaSAqIDIgKyAxXSk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhd1JlY3RzKHh5cndoLCBzaXplLCB0ZXh0dXJlKSB7XG4gICAgY29uc3QgdmVyID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogMTIpO1xuICAgIGNvbnN0IHRleCA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDEyKTtcbiAgICBjb25zdCBwaWQ0ID0gTWF0aC5QSSAvIDQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCA2OyBqKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGEgPSB4eXJ3aFtpICogNSArIDJdICsgdmVyYW5nW2pdICogcGlkNDtcbiAgICAgICAgICAgIHZlcltpICogMTIgKyBqICogMiArIDBdID0geHlyd2hbaSAqIDkgKyAwXSArIHh5cndoW2kgKiA5ICsgM10gKiBNYXRoLmNvcyhhKSAtIHh5cndoW2kgKiA5ICsgNF0gKiBNYXRoLnNpbihhKTtcbiAgICAgICAgICAgIHZlcltpICogMTIgKyBqICogMiArIDFdID0geHlyd2hbaSAqIDkgKyAxXSArIHh5cndoW2kgKiA5ICsgM10gKiBNYXRoLnNpbihhKSArIHh5cndoW2kgKiA5ICsgNF0gKiBNYXRoLmNvcyhhKTtcbiAgICAgICAgICAgIHRleFtpICogMTIgKyBqICogMiArIDBdID0geHlyd2hbaSAqIDkgKyA1XSArIHRleHhbal0gKiB4eXJ3aFtpICogOSArIDddO1xuICAgICAgICAgICAgdGV4W2kgKiAxMiArIGogKiAyICsgMV0gPSB4eXJ3aFtpICogOSArIDZdICsgdGV4eVtqXSAqIHh5cndoW2kgKiA5ICsgOF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2NyQ29vcmRfdG9fR0xDb29yZCh2ZXIpO1xuICAgIGRyYXcodmVyLCB0ZXgsIHRleHR1cmUsIHNpemUgKiA2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTbmFrZSh4eSwgdywgc2l6ZSwgdHgsIHR5LCB0dywgdGgsIHRleHR1cmUpIHtcbiAgICBjb25zdCB2ZXIgPSBuZXcgRmxvYXQzMkFycmF5KHNpemUgKiA2KTtcbiAgICBjb25zdCBsZW4gPSBuZXcgRmxvYXQzMkFycmF5KHNpemUpO1xuICAgIGNvbnN0IHRleCA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDYpO1xuICAgIGNvbnN0IGluZCA9IG5ldyBJbnQxNkFycmF5KChzaXplIC0gMSkgKiAyKTtcbiAgICB2YXIgdG90ID0gMDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemUgLSAxOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHggPSB4eVtpICogMl07XG4gICAgICAgIGNvbnN0IHB5ID0geHlbaSAqIDIgKyAxXTtcbiAgICAgICAgY29uc3QgbnggPSB4eVtpICogMiArIDJdO1xuICAgICAgICBjb25zdCBueSA9IHh5W2kgKiAyICsgM107XG4gICAgICAgIGNvbnN0IG94ID0gKHB4ICsgbngpIC8gMjtcbiAgICAgICAgY29uc3Qgb3kgPSAocHkgKyBueSkgLyAyO1xuXG4gICAgICAgIGNvbnN0IGwgPSBNYXRoLnNxcnQoKG54IC0gcHgpICogKG54IC0gcHgpICsgKG55IC0gcHkpICogKG55IC0gcHkpKTtcbiAgICAgICAgbGVuW2ldID0gbDtcbiAgICAgICAgdG90ICs9IGw7XG5cbiAgICAgICAgdmVyW2kgKiA2ICsgMF0gPSBweDtcbiAgICAgICAgdmVyW2kgKiA2ICsgMV0gPSBweTtcbiAgICAgICAgdmVyW2kgKiA2ICsgMl0gPSBveCAtIChveSAtIHB5KSAvIGwgKiB3O1xuICAgICAgICB2ZXJbaSAqIDYgKyAzXSA9IG95ICsgKG94IC0gcHgpIC8gbCAqIHc7XG4gICAgICAgIHZlcltpICogNiArIDRdID0gb3ggKyAob3kgLSBweSkgLyBsICogdztcbiAgICAgICAgdmVyW2kgKiA2ICsgNV0gPSBveSAtIChveCAtIHB4KSAvIGwgKiB3O1xuICAgIH1cbiAgICBzY3JDb29yZF90b19HTENvb3JkKHZlcik7XG4gICAgdG90IC09IGxlblswXSAvIDIgKyBsZW5bc2l6ZSAtIDFdIC8gMjtcblxuICAgIHZhciBzdGEgPSAtbGVuWzBdIC8gMjtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICB0ZXhbaSAqIDYgKyAwXSA9IHR4ICsgdHcgKiBzdGEgLyB0b3Q7XG4gICAgICAgIHRleFtpICogNiArIDFdID0gdHkgKyB0aCAvIDI7XG4gICAgICAgIHN0YSArPSBsZW5baV0gLyAyO1xuICAgICAgICB0ZXhbaSAqIDYgKyAyXSA9IHR4ICsgdHcgKiBzdGEgLyB0b3Q7XG4gICAgICAgIHRleFtpICogNiArIDNdID0gdHk7XG4gICAgICAgIHRleFtpICogNiArIDRdID0gdHggKyB0dyAqIHN0YSAvIHRvdDtcbiAgICAgICAgdGV4W2kgKiA2ICsgNV0gPSB0eSArIHRoO1xuICAgICAgICBzdGEgKz0gbGVuW2ldIC8gMjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgICAgIGluZFtpICogMiArIDBdID0gaSAqIDMgKyAxO1xuICAgICAgICBpbmRbaSAqIDIgKyAxXSA9IGkgKiAzICsgMztcbiAgICB9XG4gICAgaW5kW3NpemUgKiAyIC0gM10tLTtcblxuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihjb29yZCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb29yZCk7XG5cbiAgICBjb25zdCB0ZXhfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgdGV4YyA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleCwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4YywgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhjKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShnbG9iYWxfZ2wuc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIsIDApO1xuXG4gICAgY29uc3QgaW5kX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZCwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplICogMiAtIDIsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZSAtIDE7IGkrKykge1xuICAgICAgICBpbmRbaSAqIDIgKyAwXSA9IGkgKiAzO1xuICAgICAgICBpbmRbaSAqIDIgKyAxXSA9IGkgKiAzICsgMjtcbiAgICB9XG4gICAgaW5kWzBdKys7XG5cbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmQsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRV9TVFJJUCwgc2l6ZSAqIDIgLSAyLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=