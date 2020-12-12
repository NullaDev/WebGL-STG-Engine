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
var RL_BG = 0;
var RL_BOSS = 100;
var RL_ENEMY = 200;
var RL_BULLET = 300;
var RL_BOMB = 400;
var RL_PLAYER = 500;
var RL_UI = 600;
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

/***/ "./src/stg/sprite/Shape.ts":
/*!*********************************!*\
  !*** ./src/stg/sprite/Shape.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Shape": () => /* binding */ Shape,
/* harmony export */   "ShapeCircle": () => /* binding */ ShapeCircle,
/* harmony export */   "ShapeLine": () => /* binding */ ShapeLine,
/* harmony export */   "collide": () => /* binding */ collide
/* harmony export */ });
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
    Shape.prototype.distanceTo = function (sx, sy, sd, px, py) {
        px = px - sx;
        py = py - sy;
        sx = px * Math.cos(-sd) - py * Math.sin(-sd);
        sy = py * Math.cos(-sd) + px * Math.sin(-sd);
        return this._distanceTo(sx, sy);
    };
    return Shape;
}());

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
}(Shape));

var ShapeLine = /** @class */ (function (_super) {
    __extends(ShapeLine, _super);
    function ShapeLine(w, l) {
        var _this = _super.call(this) || this;
        _this.rw = w / 2;
        _this.rl = l / 2;
        return _this;
    }
    ShapeLine.prototype._distanceTo = function (x, y) {
        x = Math.abs(x);
        if (x > this.rl)
            return Math.sqrt(y * y + (x - this.rl) * (x - this.rl)) - this.rw;
        return Math.abs(y) - this.rw;
    };
    ShapeLine.prototype.exitScreen = function (sx, sy, sd, rw, rh) {
        var x0 = Math.abs(sx) - this.rl * Math.cos(sd) - this.rw;
        var y0 = Math.abs(sy) - this.rl * Math.sin(sd) - this.rw;
        return x0 > rw || y0 > rh;
    };
    return ShapeLine;
}(Shape));

function collide(e0, e1) {
    if (e0.sprite.shape instanceof ShapeCircle)
        return e1.sprite.shape.distanceTo(e1.px, e1.py, e1.dir, e0.px, e0.py) < e0.sprite.shape.radius;
    if (e1.sprite.shape instanceof ShapeCircle)
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
/* harmony export */   "SpriteManager": () => /* binding */ SpriteManager
/* harmony export */ });
/* harmony import */ var _main_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../main/gl */ "./src/main/gl.js");
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
                    case 0: return [4 /*yield*/, (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.loadImage)(this.path)];
                    case 1:
                        img = _a.sent();
                        this.img = (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.loadTexture)(img);
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
    SpriteManager.prototype.drawRect = function (list) {
        var xyrwh = new Float32Array(list.length * 9);
        list.forEach(function (e, i) {
            xyrwh[i * 5 + 0] = e.px;
            xyrwh[i * 5 + 1] = e.py;
            xyrwh[i * 5 + 2] = e.dir;
            xyrwh[i * 5 + 3] = e.sprite.w;
            xyrwh[i * 5 + 4] = e.sprite.h;
            var sprite = _sprites__WEBPACK_IMPORTED_MODULE_1__.SPRITES[e.sprite.sprite];
            xyrwh[i * 5 + 5] = sprite.tx;
            xyrwh[i * 5 + 6] = sprite.ty;
            xyrwh[i * 5 + 7] = sprite.tw;
            xyrwh[i * 5 + 8] = sprite.th;
        });
        (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.drawRects)(xyrwh, list.length, this.img);
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
/* harmony export */   "SHAPES": () => /* binding */ SHAPES
/* harmony export */ });
/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Shape */ "./src/stg/sprite/Shape.ts");

var SPRITES = {
    "round_red": {
        "sprite": "assets/missile_red.png",
        "tx": 0,
        "ty": 0,
        "tw": 1,
        "th": 1
    }
};
var SHAPES = {
    "small_round_red": {
        "sprite": "round_red",
        "shape": new _Shape__WEBPACK_IMPORTED_MODULE_0__.ShapeCircle(1),
        "w": 1,
        "h": 1
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
                        if (ei.state != _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.ALIVE || !ei.sprite || !ei.sprite.shape)
                            continue;
                        for (var _b = 0, _c = this.groups[j].list; _b < _c.length; _b++) {
                            var ej = _c[_b];
                            if (ej.state != _entity_Entity__WEBPACK_IMPORTED_MODULE_0__.State.ALIVE || !ej.sprite || !ej.sprite.shape)
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
                        if (!map.has(entity.config.render_layer))
                            map.set(entity.config.render_layer, new Map());
                        submap = map.get(entity.config.render_layer);
                        if (!submap.has(entity.sprite.sprite))
                            submap.set(entity.sprite.sprite, []);
                        submap.get(entity.sprite.sprite).push(entity);
                    }
                }
                rlist = [];
                map.forEach(function (v0, k0) { return rlist.push({ rl: k0, v: v0 }); });
                rlist.sort(function (a, b) { return a.rl - b.rl; });
                rlist.forEach(function (rl) { return rl.v.forEach(function (v1, k1) { return _sprite_SpriteManager__WEBPACK_IMPORTED_MODULE_2__.SpriteManager.get(k1).drawRect(v1); }); });
                return [2 /*return*/];
            });
        });
    };
    return EntityPool;
}());



/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _main_gl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./main/gl */ "./src/main/gl.js");
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

    (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.setup)();
    await testCurve();

}

async function testCurve() {
    const image = await (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.loadImage)("assets/missile_green.png");
    const texture = (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.loadTexture)(image);
    (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.clear)();
    var size = 500;
    var xy = new Float32Array(size * 2);
    for (var i = 0; i < size; i++) {
        xy[i * 2 + 0] = Math.sin(i * 10 * Math.PI / size) * 0.1;
        xy[i * 2 + 1] = 1.8 * i / size - 0.9;
    }
    timer(() => (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.drawSnake)(xy, 0.03, size, 0, 0, 1, 1, texture));
}

async function testRect() {
    const image = await (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.loadImage)("assets/blend_test.png");
    const texture = (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.loadTexture)(image);
    (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.clear)();
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
    timer(() => (0,_main_gl__WEBPACK_IMPORTED_MODULE_0__.drawRects)(xyrwh, size, texture));
}

function timer(a) {
    var t0 = + new Date();
    a();
    var t1 = + new Date();
    console.log(t1 - t0);
}

window.onload = main;

/***/ }),

/***/ "./src/main/gl.js":
/*!************************!*\
  !*** ./src/main/gl.js ***!
  \************************/
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvZW50aXR5L0VudGl0eS50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL1NoYXBlLnRzIiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtLy4vc3JjL3N0Zy9zcHJpdGUvU3ByaXRlTWFuYWdlci50cyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS8uL3NyYy9zdGcvc3ByaXRlL3Nwcml0ZXMudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvc3RnL3N0YWdlL0VudGl0eVBvb2wudHMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vLi9zcmMvbWFpbi9nbC5qcyIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGVzdC13ZWJnbC13ZWJhc20vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90ZXN0LXdlYmdsLXdlYmFzbS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3Rlc3Qtd2ViZ2wtd2ViYXNtL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNB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Q0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7OztVQ05BO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJvdW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIENHX1BMQVlFUiA9IDA7XG5leHBvcnQgdmFyIENHX0JPU1MgPSAxO1xuZXhwb3J0IHZhciBDR19FTkVNWSA9IDI7XG5leHBvcnQgdmFyIENHX0JVTExFVCA9IDM7XG5leHBvcnQgdmFyIENHX0JPTUIgPSA0O1xuZXhwb3J0IHZhciBDR19HSE9TVCA9IDU7XG5leHBvcnQgdmFyIENNX1BMQVlFUiA9IDA7XG5leHBvcnQgdmFyIENNX0JPU1MgPSAxO1xuZXhwb3J0IHZhciBDTV9FTkVNWSA9IDE7XG5leHBvcnQgdmFyIENNX0JVTExFVCA9IDE7XG5leHBvcnQgdmFyIENNX0JPTUIgPSAxNDtcbmV4cG9ydCB2YXIgQ01fR0hPU1QgPSAwO1xuZXhwb3J0IHZhciBSTF9CRyA9IDA7XG5leHBvcnQgdmFyIFJMX0JPU1MgPSAxMDA7XG5leHBvcnQgdmFyIFJMX0VORU1ZID0gMjAwO1xuZXhwb3J0IHZhciBSTF9CVUxMRVQgPSAzMDA7XG5leHBvcnQgdmFyIFJMX0JPTUIgPSA0MDA7XG5leHBvcnQgdmFyIFJMX1BMQVlFUiA9IDUwMDtcbmV4cG9ydCB2YXIgUkxfVUkgPSA2MDA7XG5leHBvcnQgdmFyIFJMX01BWCA9IDEwMDA7XG5leHBvcnQgdmFyIFN0YXRlO1xuKGZ1bmN0aW9uIChTdGF0ZSkge1xuICAgIFN0YXRlW1N0YXRlW1wiUFJFX0VOVFJZXCJdID0gMF0gPSBcIlBSRV9FTlRSWVwiO1xuICAgIFN0YXRlW1N0YXRlW1wiQUxJVkVcIl0gPSAxXSA9IFwiQUxJVkVcIjtcbiAgICBTdGF0ZVtTdGF0ZVtcIkxFQVZJTkdcIl0gPSAyXSA9IFwiTEVBVklOR1wiO1xuICAgIFN0YXRlW1N0YXRlW1wiREVBRFwiXSA9IDNdID0gXCJERUFEXCI7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKHQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdCk7XG59XG5leHBvcnQgdmFyIHRlbXBsYXRlX2NvbmZpZ19wbGF5ZXIgPSB7XG4gICAgcmVuZGVyX2xheWVyOiBSTF9QTEFZRVIsXG4gICAgY29sbGlkZV9ncm91cDogQ0dfUExBWUVSLFxuICAgIGNvbGxpZGVfbWFzazogQ01fUExBWUVSXG59O1xuZXhwb3J0IHZhciB0ZW1wbGF0ZV9jb25maWdfYm9zcyA9IHtcbiAgICByZW5kZXJfbGF5ZXI6IFJMX0JPU1MsXG4gICAgY29sbGlkZV9ncm91cDogQ0dfQk9TUyxcbiAgICBjb2xsaWRlX21hc2s6IENNX0JPU1Ncbn07XG5leHBvcnQgdmFyIHRlbXBsYXRlX2NvbmZpZ19lbmVteSA9IHtcbiAgICByZW5kZXJfbGF5ZXI6IFJMX0VORU1ZLFxuICAgIGNvbGxpZGVfZ3JvdXA6IENHX0VORU1ZLFxuICAgIGNvbGxpZGVfbWFzazogQ01fRU5FTVlcbn07XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xudmFyIFNoYXBlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNoYXBlKCkge1xuICAgIH1cbiAgICBTaGFwZS5wcm90b3R5cGUuZGlzdGFuY2VUbyA9IGZ1bmN0aW9uIChzeCwgc3ksIHNkLCBweCwgcHkpIHtcbiAgICAgICAgcHggPSBweCAtIHN4O1xuICAgICAgICBweSA9IHB5IC0gc3k7XG4gICAgICAgIHN4ID0gcHggKiBNYXRoLmNvcygtc2QpIC0gcHkgKiBNYXRoLnNpbigtc2QpO1xuICAgICAgICBzeSA9IHB5ICogTWF0aC5jb3MoLXNkKSArIHB4ICogTWF0aC5zaW4oLXNkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpc3RhbmNlVG8oc3gsIHN5KTtcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZTtcbn0oKSk7XG5leHBvcnQgeyBTaGFwZSB9O1xudmFyIFNoYXBlQ2lyY2xlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaGFwZUNpcmNsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTaGFwZUNpcmNsZShyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnJhZGl1cyA9IHI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU2hhcGVDaXJjbGUucHJvdG90eXBlLmV4aXRTY3JlZW4gPSBmdW5jdGlvbiAoc3gsIHN5LCBfLCBydywgcmgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHN4KSA+IHJ3ICsgdGhpcy5yYWRpdXMgfHwgTWF0aC5hYnMoc3kpID4gcmggKyB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIFNoYXBlQ2lyY2xlLnByb3RvdHlwZS5fZGlzdGFuY2VUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSkgLSB0aGlzLnJhZGl1cztcbiAgICB9O1xuICAgIHJldHVybiBTaGFwZUNpcmNsZTtcbn0oU2hhcGUpKTtcbmV4cG9ydCB7IFNoYXBlQ2lyY2xlIH07XG52YXIgU2hhcGVMaW5lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTaGFwZUxpbmUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhcGVMaW5lKHcsIGwpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucncgPSB3IC8gMjtcbiAgICAgICAgX3RoaXMucmwgPSBsIC8gMjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTaGFwZUxpbmUucHJvdG90eXBlLl9kaXN0YW5jZVRvID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgeCA9IE1hdGguYWJzKHgpO1xuICAgICAgICBpZiAoeCA+IHRoaXMucmwpXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHkgKiB5ICsgKHggLSB0aGlzLnJsKSAqICh4IC0gdGhpcy5ybCkpIC0gdGhpcy5ydztcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKHkpIC0gdGhpcy5ydztcbiAgICB9O1xuICAgIFNoYXBlTGluZS5wcm90b3R5cGUuZXhpdFNjcmVlbiA9IGZ1bmN0aW9uIChzeCwgc3ksIHNkLCBydywgcmgpIHtcbiAgICAgICAgdmFyIHgwID0gTWF0aC5hYnMoc3gpIC0gdGhpcy5ybCAqIE1hdGguY29zKHNkKSAtIHRoaXMucnc7XG4gICAgICAgIHZhciB5MCA9IE1hdGguYWJzKHN5KSAtIHRoaXMucmwgKiBNYXRoLnNpbihzZCkgLSB0aGlzLnJ3O1xuICAgICAgICByZXR1cm4geDAgPiBydyB8fCB5MCA+IHJoO1xuICAgIH07XG4gICAgcmV0dXJuIFNoYXBlTGluZTtcbn0oU2hhcGUpKTtcbmV4cG9ydCB7IFNoYXBlTGluZSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGNvbGxpZGUoZTAsIGUxKSB7XG4gICAgaWYgKGUwLnNwcml0ZS5zaGFwZSBpbnN0YW5jZW9mIFNoYXBlQ2lyY2xlKVxuICAgICAgICByZXR1cm4gZTEuc3ByaXRlLnNoYXBlLmRpc3RhbmNlVG8oZTEucHgsIGUxLnB5LCBlMS5kaXIsIGUwLnB4LCBlMC5weSkgPCBlMC5zcHJpdGUuc2hhcGUucmFkaXVzO1xuICAgIGlmIChlMS5zcHJpdGUuc2hhcGUgaW5zdGFuY2VvZiBTaGFwZUNpcmNsZSlcbiAgICAgICAgcmV0dXJuIGNvbGxpZGUoZTEsIGUwKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJub24tY2lyY2xlIG5vbi1jaXJjbGUgY29sbGlzaW9uIG5vdCBmb3VuZFwiKTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgeyBsb2FkVGV4dHVyZSwgbG9hZEltYWdlLCBkcmF3UmVjdHMgfSBmcm9tIFwiLi4vLi4vbWFpbi9nbFwiO1xuaW1wb3J0IHsgU1BSSVRFUyB9IGZyb20gXCIuL3Nwcml0ZXNcIjtcbnZhciBTcHJpdGVNYW5hZ2VyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwcml0ZU1hbmFnZXIodXJsKSB7XG4gICAgICAgIHRoaXMuaW1nID0gLTE7XG4gICAgICAgIHRoaXMucGF0aCA9IHVybDtcbiAgICB9XG4gICAgU3ByaXRlTWFuYWdlci5wcm90b3R5cGUubG9hZGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWcgPj0gMDtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpbWc7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIGxvYWRJbWFnZSh0aGlzLnBhdGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaW1nID0gX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWcgPSBsb2FkVGV4dHVyZShpbWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIuZ2V0ID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICBpZiAoU3ByaXRlTWFuYWdlci5JTlNbdXJsXSlcbiAgICAgICAgICAgIHJldHVybiBTcHJpdGVNYW5hZ2VyLklOU1t1cmxdO1xuICAgICAgICByZXR1cm4gKFNwcml0ZU1hbmFnZXIuSU5TW3VybF0gPSBuZXcgU3ByaXRlTWFuYWdlcih1cmwpKTtcbiAgICB9O1xuICAgIFNwcml0ZU1hbmFnZXIucHJvdG90eXBlLmRyYXdSZWN0ID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgdmFyIHh5cndoID0gbmV3IEZsb2F0MzJBcnJheShsaXN0Lmxlbmd0aCAqIDkpO1xuICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGUsIGkpIHtcbiAgICAgICAgICAgIHh5cndoW2kgKiA1ICsgMF0gPSBlLnB4O1xuICAgICAgICAgICAgeHlyd2hbaSAqIDUgKyAxXSA9IGUucHk7XG4gICAgICAgICAgICB4eXJ3aFtpICogNSArIDJdID0gZS5kaXI7XG4gICAgICAgICAgICB4eXJ3aFtpICogNSArIDNdID0gZS5zcHJpdGUudztcbiAgICAgICAgICAgIHh5cndoW2kgKiA1ICsgNF0gPSBlLnNwcml0ZS5oO1xuICAgICAgICAgICAgdmFyIHNwcml0ZSA9IFNQUklURVNbZS5zcHJpdGUuc3ByaXRlXTtcbiAgICAgICAgICAgIHh5cndoW2kgKiA1ICsgNV0gPSBzcHJpdGUudHg7XG4gICAgICAgICAgICB4eXJ3aFtpICogNSArIDZdID0gc3ByaXRlLnR5O1xuICAgICAgICAgICAgeHlyd2hbaSAqIDUgKyA3XSA9IHNwcml0ZS50dztcbiAgICAgICAgICAgIHh5cndoW2kgKiA1ICsgOF0gPSBzcHJpdGUudGg7XG4gICAgICAgIH0pO1xuICAgICAgICBkcmF3UmVjdHMoeHlyd2gsIGxpc3QubGVuZ3RoLCB0aGlzLmltZyk7XG4gICAgfTtcbiAgICBTcHJpdGVNYW5hZ2VyLklOUyA9IHt9O1xuICAgIHJldHVybiBTcHJpdGVNYW5hZ2VyO1xufSgpKTtcbmV4cG9ydCB7IFNwcml0ZU1hbmFnZXIgfTtcbiIsImltcG9ydCB7IFNoYXBlQ2lyY2xlIH0gZnJvbSBcIi4vU2hhcGVcIjtcbmV4cG9ydCB2YXIgU1BSSVRFUyA9IHtcbiAgICBcInJvdW5kX3JlZFwiOiB7XG4gICAgICAgIFwic3ByaXRlXCI6IFwiYXNzZXRzL21pc3NpbGVfcmVkLnBuZ1wiLFxuICAgICAgICBcInR4XCI6IDAsXG4gICAgICAgIFwidHlcIjogMCxcbiAgICAgICAgXCJ0d1wiOiAxLFxuICAgICAgICBcInRoXCI6IDFcbiAgICB9XG59O1xuZXhwb3J0IHZhciBTSEFQRVMgPSB7XG4gICAgXCJzbWFsbF9yb3VuZF9yZWRcIjoge1xuICAgICAgICBcInNwcml0ZVwiOiBcInJvdW5kX3JlZFwiLFxuICAgICAgICBcInNoYXBlXCI6IG5ldyBTaGFwZUNpcmNsZSgxKSxcbiAgICAgICAgXCJ3XCI6IDEsXG4gICAgICAgIFwiaFwiOiAxXG4gICAgfVxufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5pbXBvcnQgKiBhcyBCQVNFIGZyb20gXCIuLi9lbnRpdHkvRW50aXR5XCI7XG5pbXBvcnQgeyBjb2xsaWRlIH0gZnJvbSBcIi4uL3Nwcml0ZS9TaGFwZVwiO1xuaW1wb3J0IHsgU3ByaXRlTWFuYWdlciB9IGZyb20gXCIuLi9zcHJpdGUvU3ByaXRlTWFuYWdlclwiO1xudmFyIFNwZWNpYWxFZmZlY3RzID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFNwZWNpYWxFZmZlY3RzKCkge1xuICAgICAgICB0aGlzLnRpbWVfcmF0ZSA9IDE7XG4gICAgfVxuICAgIHJldHVybiBTcGVjaWFsRWZmZWN0cztcbn0oKSk7XG5leHBvcnQgeyBTcGVjaWFsRWZmZWN0cyB9O1xuO1xudmFyIFVwZGF0ZVN0YWdlO1xuKGZ1bmN0aW9uIChVcGRhdGVTdGFnZSkge1xuICAgIFVwZGF0ZVN0YWdlW1VwZGF0ZVN0YWdlW1wiUFJFX0lOSVRcIl0gPSAwXSA9IFwiUFJFX0lOSVRcIjtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIlVQREFURVwiXSA9IDFdID0gXCJVUERBVEVcIjtcbiAgICBVcGRhdGVTdGFnZVtVcGRhdGVTdGFnZVtcIlBPU1RfVVBEQVRFXCJdID0gMl0gPSBcIlBPU1RfVVBEQVRFXCI7XG4gICAgVXBkYXRlU3RhZ2VbVXBkYXRlU3RhZ2VbXCJBRERfQkFDS1wiXSA9IDNdID0gXCJBRERfQkFDS1wiO1xufSkoVXBkYXRlU3RhZ2UgfHwgKFVwZGF0ZVN0YWdlID0ge30pKTtcbnZhciBFbnRpdHlQb29sID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVudGl0eVBvb2woKSB7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgICAgIHRoaXMucGVuZGluZyA9IFtdO1xuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlBSRV9JTklUO1xuICAgICAgICB0aGlzLnNwZWNpYWxfZWZmZWN0cyA9IG5ldyBTcGVjaWFsRWZmZWN0cygpO1xuICAgICAgICBFbnRpdHlQb29sLklOU1RBTkNFID0gdGhpcztcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX1BMQVlFUiwgbWFzazogQkFTRS5DTV9QTEFZRVIsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfQk9TUywgbWFzazogQkFTRS5DTV9CT1NTLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0VORU1ZLCBtYXNrOiBCQVNFLkNNX0VORU1ZLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0JVTExFVCwgbWFzazogQkFTRS5DTV9CVUxMRVQsIGxpc3Q6IFtdIH0pO1xuICAgICAgICB0aGlzLmdyb3Vwcy5wdXNoKHsgaWQ6IEJBU0UuQ0dfQk9NQiwgbWFzazogQkFTRS5DTV9CT01CLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgdGhpcy5ncm91cHMucHVzaCh7IGlkOiBCQVNFLkNHX0dIT1NULCBtYXNrOiBCQVNFLkNNX0dIT1NULCBsaXN0OiBbXSB9KTtcbiAgICB9XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUucmVnaXN0ZXJHcm91cCA9IGZ1bmN0aW9uIChtYXNrKSB7XG4gICAgICAgIHZhciByZXQgPSB0aGlzLmdyb3Vwcy5sZW5ndGg7XG4gICAgICAgIHRoaXMuZ3JvdXBzLnB1c2goeyBpZDogcmV0LCBtYXNrOiBtYXNrLCBsaXN0OiBbXSB9KTtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9O1xuICAgIEVudGl0eVBvb2wucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLnVwZGF0ZV9zdGFnZSAhPSBVcGRhdGVTdGFnZS5BRERfQkFDSylcbiAgICAgICAgICAgIHRoaXMucGVuZGluZy5wdXNoKGUpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmdyb3Vwc1tlLmNvbmZpZy5jb2xsaWRlX2dyb3VwXS5saXN0LnB1c2goZSk7XG4gICAgfTtcbiAgICBFbnRpdHlQb29sLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIEVudGl0eVBvb2wuSU5TVEFOQ0UgPSB0aGlzO1xuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlVQREFURTtcbiAgICAgICAgdGhpcy5ncm91cHMuZm9yRWFjaChmdW5jdGlvbiAocG9vbCkgeyByZXR1cm4gcG9vbC5saXN0LmZvckVhY2goZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUudXBkYXRlKGUpOyB9KTsgfSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5ncm91cHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ncm91cHNbaV0ubWFzayAmIGopIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZ3JvdXAgaSBjYW4gYXR0YWNrIGdyb3VwIGpcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMuZ3JvdXBzW2ldLmxpc3Q7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWkgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWkuc3RhdGUgIT0gQkFTRS5TdGF0ZS5BTElWRSB8fCAhZWkuc3ByaXRlIHx8ICFlaS5zcHJpdGUuc2hhcGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IDAsIF9jID0gdGhpcy5ncm91cHNbal0ubGlzdDsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWogPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVqLnN0YXRlICE9IEJBU0UuU3RhdGUuQUxJVkUgfHwgIWVqLnNwcml0ZSB8fCAhZWouc3ByaXRlLnNoYXBlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sbGlkZShlaSwgZWopKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlaS5hdHRhY2soZWksIGVqKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVwZGF0ZV9zdGFnZSA9IFVwZGF0ZVN0YWdlLlBPU1RfVVBEQVRFO1xuICAgICAgICB0aGlzLmdyb3Vwcy5mb3JFYWNoKGZ1bmN0aW9uIChwb29sKSB7IHJldHVybiBwb29sLmxpc3QuZm9yRWFjaChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5wb3N0VXBkYXRlKGUpOyB9KTsgfSk7XG4gICAgICAgIHRoaXMuZ3JvdXBzLmZvckVhY2goZnVuY3Rpb24gKHBvb2wpIHsgcmV0dXJuIHBvb2wubGlzdCA9IHBvb2wubGlzdC5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc3RhdGUgIT0gQkFTRS5TdGF0ZS5ERUFEOyB9KTsgfSk7XG4gICAgICAgIHRoaXMudXBkYXRlX3N0YWdlID0gVXBkYXRlU3RhZ2UuQUREX0JBQ0s7XG4gICAgICAgIHRoaXMucGVuZGluZy5mb3JFYWNoKHRoaXMuYWRkKTtcbiAgICAgICAgdGhpcy5wZW5kaW5nID0gW107XG4gICAgICAgIEVudGl0eVBvb2wuSU5TVEFOQ0UgPSBudWxsO1xuICAgIH07XG4gICAgRW50aXR5UG9vbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbWFwLCBfaSwgX2EsIHBvb2wsIF9iLCBfYywgZW50aXR5LCBzdWJtYXAsIHJsaXN0O1xuICAgICAgICAgICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfZCkge1xuICAgICAgICAgICAgICAgIG1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgX2EgPSB0aGlzLmdyb3VwczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChfYiA9IDAsIF9jID0gcG9vbC5saXN0OyBfYiA8IF9jLmxlbmd0aDsgX2IrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50aXR5ID0gX2NbX2JdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFtYXAuaGFzKGVudGl0eS5jb25maWcucmVuZGVyX2xheWVyKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuc2V0KGVudGl0eS5jb25maWcucmVuZGVyX2xheWVyLCBuZXcgTWFwKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibWFwID0gbWFwLmdldChlbnRpdHkuY29uZmlnLnJlbmRlcl9sYXllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN1Ym1hcC5oYXMoZW50aXR5LnNwcml0ZS5zcHJpdGUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcC5zZXQoZW50aXR5LnNwcml0ZS5zcHJpdGUsIFtdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym1hcC5nZXQoZW50aXR5LnNwcml0ZS5zcHJpdGUpLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBybGlzdCA9IFtdO1xuICAgICAgICAgICAgICAgIG1hcC5mb3JFYWNoKGZ1bmN0aW9uICh2MCwgazApIHsgcmV0dXJuIHJsaXN0LnB1c2goeyBybDogazAsIHY6IHYwIH0pOyB9KTtcbiAgICAgICAgICAgICAgICBybGlzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLnJsIC0gYi5ybDsgfSk7XG4gICAgICAgICAgICAgICAgcmxpc3QuZm9yRWFjaChmdW5jdGlvbiAocmwpIHsgcmV0dXJuIHJsLnYuZm9yRWFjaChmdW5jdGlvbiAodjEsIGsxKSB7IHJldHVybiBTcHJpdGVNYW5hZ2VyLmdldChrMSkuZHJhd1JlY3QodjEpOyB9KTsgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEVudGl0eVBvb2w7XG59KCkpO1xuZXhwb3J0IHsgRW50aXR5UG9vbCB9O1xuIiwiaW1wb3J0IHsgc2V0dXAsIGxvYWRJbWFnZSwgbG9hZFRleHR1cmUsIGNsZWFyLCBkcmF3U25ha2UsIGRyYXdSZWN0cyB9IGZyb20gXCIuL21haW4vZ2xcIjtcblxuaW1wb3J0IHsgRW50aXR5UG9vbCB9IGZyb20gXCIuL3N0Zy9zdGFnZS9FbnRpdHlQb29sXCJcblxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcblxuICAgIHZhciB3aW53ID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgdmFyIHdpbmggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgdmFyIHdpbnIgPSBNYXRoLm1pbih3aW53LCB3aW5oKSAqIDAuODtcblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImdsY2FudmFzXCIpO1xuXG4gICAgLy8gc2V0IHRoZSBkaXNwbGF5IHNpemUgb2YgdGhlIGNhbnZhcy5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aW5yICsgXCJweFwiO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSB3aW5yICsgXCJweFwiO1xuXG4gICAgLy8gc2V0IHRoZSBzaXplIG9mIHRoZSBkcmF3aW5nQnVmZmVyXG4gICAgdmFyIGRldmljZVBpeGVsUmF0aW8gPSB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgY2FudmFzLndpZHRoID0gd2luciAqIGRldmljZVBpeGVsUmF0aW87XG4gICAgY2FudmFzLmhlaWdodCA9IHdpbnIgKiBkZXZpY2VQaXhlbFJhdGlvO1xuXG4gICAgc2V0dXAoKTtcbiAgICBhd2FpdCB0ZXN0Q3VydmUoKTtcblxufVxuXG5hc3luYyBmdW5jdGlvbiB0ZXN0Q3VydmUoKSB7XG4gICAgY29uc3QgaW1hZ2UgPSBhd2FpdCBsb2FkSW1hZ2UoXCJhc3NldHMvbWlzc2lsZV9ncmVlbi5wbmdcIik7XG4gICAgY29uc3QgdGV4dHVyZSA9IGxvYWRUZXh0dXJlKGltYWdlKTtcbiAgICBjbGVhcigpO1xuICAgIHZhciBzaXplID0gNTAwO1xuICAgIHZhciB4eSA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHh5W2kgKiAyICsgMF0gPSBNYXRoLnNpbihpICogMTAgKiBNYXRoLlBJIC8gc2l6ZSkgKiAwLjE7XG4gICAgICAgIHh5W2kgKiAyICsgMV0gPSAxLjggKiBpIC8gc2l6ZSAtIDAuOTtcbiAgICB9XG4gICAgdGltZXIoKCkgPT4gZHJhd1NuYWtlKHh5LCAwLjAzLCBzaXplLCAwLCAwLCAxLCAxLCB0ZXh0dXJlKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHRlc3RSZWN0KCkge1xuICAgIGNvbnN0IGltYWdlID0gYXdhaXQgbG9hZEltYWdlKFwiYXNzZXRzL2JsZW5kX3Rlc3QucG5nXCIpO1xuICAgIGNvbnN0IHRleHR1cmUgPSBsb2FkVGV4dHVyZShpbWFnZSk7XG4gICAgY2xlYXIoKTtcbiAgICB2YXIgc2l6ZSA9IDEwMDAwO1xuICAgIHZhciB4eXJ3aCA9IG5ldyBGbG9hdDMyQXJyYXkoc2l6ZSAqIDkpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMF0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgMl0gPSBNYXRoLnJhbmRvbSgpICogMiAqIE1hdGguUEk7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgM10gPSAwLjAzO1xuICAgICAgICB4eXJ3aFtpICogOSArIDRdID0gMC4wMztcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA1XSA9IDA7XG4gICAgICAgIHh5cndoW2kgKiA5ICsgNl0gPSAwO1xuICAgICAgICB4eXJ3aFtpICogOSArIDddID0gMTtcbiAgICAgICAgeHlyd2hbaSAqIDkgKyA4XSA9IDE7XG4gICAgfVxuICAgIHRpbWVyKCgpID0+IGRyYXdSZWN0cyh4eXJ3aCwgc2l6ZSwgdGV4dHVyZSkpO1xufVxuXG5mdW5jdGlvbiB0aW1lcihhKSB7XG4gICAgdmFyIHQwID0gKyBuZXcgRGF0ZSgpO1xuICAgIGEoKTtcbiAgICB2YXIgdDEgPSArIG5ldyBEYXRlKCk7XG4gICAgY29uc29sZS5sb2codDEgLSB0MCk7XG59XG5cbndpbmRvdy5vbmxvYWQgPSBtYWluOyIsImNvbnN0IHZlcnRleENvZGUgPSBgXG5hdHRyaWJ1dGUgdmVjMiBjb29yZDtcbmF0dHJpYnV0ZSB2ZWMyIHRleDtcbnZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4Q29vcmQ7XG52b2lkIG1haW4odm9pZCkge1xuICAgIGdsX1Bvc2l0aW9uID0gdmVjNChjb29yZCwgMC4wLCAxLjApO1xuICAgIHZUZXhDb29yZCA9IHRleDtcbn1cbmA7XG5cbmNvbnN0IGZyYWdtZW50Q29kZSA9IGBcbnZhcnlpbmcgaGlnaHAgdmVjMiB2VGV4Q29vcmQ7XG51bmlmb3JtIHNhbXBsZXIyRCB1U2FtcGxlcjtcbnZvaWQgbWFpbih2b2lkKSB7XG4gICAgZ2xfRnJhZ0NvbG9yID0gdGV4dHVyZTJEKHVTYW1wbGVyLCB2VGV4Q29vcmQpO1xufVxuYDtcblxuY29uc3QgZ2xvYmFsX2dsID0ge1xuICAgIGdsOiBudWxsLFxuICAgIHNoYWRlcjoge1xuICAgICAgICBwcm9ncmFtOiAwLFxuICAgICAgICBhdHRyaWJ1dGU6IHtcbiAgICAgICAgICAgIGNvb3JkOiAwLFxuICAgICAgICAgICAgdGV4OiAwLFxuICAgICAgICB9LFxuICAgICAgICB1bmlmb3JtOiB7XG4gICAgICAgICAgICB1U2FtcGxlcjogMCxcbiAgICAgICAgfSxcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dsY2FudmFzJyk7XG4gICAgdmFyIGdsID0gY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJyk7XG4gICAgaWYgKGdsID09PSBudWxsKSB7XG4gICAgICAgIGFsZXJ0KFwiVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wuIFlvdXIgYnJvd3NlciBvciBtYWNoaW5lIG1heSBub3Qgc3VwcG9ydCBpdC5cIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBnbG9iYWxfZ2wuZ2wgPSBnbDtcbiAgICB2YXIgdmVydFNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5WRVJURVhfU0hBREVSKTtcbiAgICB2YXIgZnJhZ1NoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcihnbC5GUkFHTUVOVF9TSEFERVIpO1xuICAgIGdsLnNoYWRlclNvdXJjZSh2ZXJ0U2hhZGVyLCB2ZXJ0ZXhDb2RlKTtcbiAgICBnbC5zaGFkZXJTb3VyY2UoZnJhZ1NoYWRlciwgZnJhZ21lbnRDb2RlKTtcbiAgICBnbC5jb21waWxlU2hhZGVyKHZlcnRTaGFkZXIpO1xuICAgIGdsLmNvbXBpbGVTaGFkZXIoZnJhZ1NoYWRlcik7XG4gICAgdmFyIHNoYWRlclByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKCk7XG4gICAgZ2wuYXR0YWNoU2hhZGVyKHNoYWRlclByb2dyYW0sIHZlcnRTaGFkZXIpO1xuICAgIGdsLmF0dGFjaFNoYWRlcihzaGFkZXJQcm9ncmFtLCBmcmFnU2hhZGVyKTtcbiAgICBnbC5saW5rUHJvZ3JhbShzaGFkZXJQcm9ncmFtKTtcbiAgICBnbC51c2VQcm9ncmFtKHNoYWRlclByb2dyYW0pO1xuICAgIGNvbnN0IHNoYWRlciA9IGdsb2JhbF9nbC5zaGFkZXI7XG4gICAgc2hhZGVyLnByb2dyYW0gPSBzaGFkZXJQcm9ncmFtO1xuICAgIHNoYWRlci5hdHRyaWJ1dGUuY29vcmQgPSBnbC5nZXRBdHRyaWJMb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAnY29vcmQnKTtcbiAgICBzaGFkZXIuYXR0cmlidXRlLnRleCA9IGdsLmdldEF0dHJpYkxvY2F0aW9uKHNoYWRlclByb2dyYW0sICd0ZXgnKTtcbiAgICBzaGFkZXIudW5pZm9ybS51U2FtcGxlciA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihzaGFkZXJQcm9ncmFtLCAndVNhbXBsZXInKTtcblxuICAgIGdsLmVuYWJsZShnbC5CTEVORCk7XG4gICAgZ2wuYmxlbmRFcXVhdGlvbihnbC5GVU5DX0FERCk7XG4gICAgZ2wuYmxlbmRGdW5jKGdsLlNSQ19BTFBIQSwgZ2wuT05FX01JTlVTX1NSQ19BTFBIQSk7XG4gICAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKTtcbiAgICBnbC52aWV3cG9ydCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZEltYWdlKHNyYykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpXG4gICAgICAgIGltZy5vbmVycm9yID0gcmVqZWN0XG4gICAgICAgIGltZy5zcmMgPSBzcmNcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZHJhdyh2ZXJfYXJyLCB0ZXhfYXJyLCB0ZXh0dXJlLCBzaXplKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdmVyX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IGNvb3JkID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUuY29vcmQ7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcl9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYXJyLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihjb29yZCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb29yZCk7XG5cbiAgICBjb25zdCB0ZXhfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgdGV4ID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUudGV4O1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4LCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleCk7XG5cbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC51bmlmb3JtMWkoZ2xvYmFsX2dsLnNoYWRlci51bmlmb3JtLnVTYW1wbGVyLCAwKTtcblxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCBzaXplKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYXdTdHJpcCh2ZXJfYXJyLCB0ZXhfYXJyLCBpbmRfYXJyLCB0ZXh0dXJlLCBzaXplKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdmVyX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGNvbnN0IGNvb3JkID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUuY29vcmQ7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHZlcl9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYXJyLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihjb29yZCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb29yZCk7XG5cbiAgICBjb25zdCB0ZXhfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgdGV4ID0gZ2xvYmFsX2dsLnNoYWRlci5hdHRyaWJ1dGUudGV4O1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0ZXhfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4LCAyLCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApO1xuICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHRleCk7XG5cbiAgICBjb25zdCBpbmRfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kX2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgaW5kX2FyciwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCk7XG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgdGV4dHVyZSk7XG4gICAgZ2wudW5pZm9ybTFpKGdsb2JhbF9nbC5zaGFkZXIudW5pZm9ybS51U2FtcGxlciwgMCk7XG5cbiAgICBnbC5kcmF3RWxlbWVudHMoZ2wuVFJJQU5HTEVfU1RSSVAsIHNpemUsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRUZXh0dXJlKGltYWdlKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgY29uc3QgdGV4dHVyZSA9IGdsLmNyZWF0ZVRleHR1cmUoKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCB0ZXh0dXJlKTtcbiAgICBnbC50ZXhJbWFnZTJEKGdsLlRFWFRVUkVfMkQsIDAsIGdsLlJHQkEsIGdsLlJHQkEsIGdsLlVOU0lHTkVEX1NIT1JUXzRfNF80XzQsIGltYWdlKVxuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NSU5fRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIGdsLnRleFBhcmFtZXRlcmkoZ2wuVEVYVFVSRV8yRCwgZ2wuVEVYVFVSRV9NQUdfRklMVEVSLCBnbC5MSU5FQVIpO1xuICAgIGdsLmdlbmVyYXRlTWlwbWFwKGdsLlRFWFRVUkVfMkQpO1xuICAgIHJldHVybiB0ZXh0dXJlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgY29uc3QgZ2wgPSBnbG9iYWxfZ2wuZ2w7XG4gICAgZ2wuY2xlYXJDb2xvcigwLjAsIDAuMCwgMC4wLCAxLjApO1xuICAgIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQpO1xuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDEuMCwgMS4wKTtcbn1cblxuY29uc3QgdmVyYW5nID0gWzMsIC0zLCAtMSwgMywgMSwgLTFdO1xuY29uc3QgdGV4eCA9IFswLCAwLCAxLCAwLCAxLCAxXTtcbmNvbnN0IHRleHkgPSBbMCwgMSwgMSwgMCwgMCwgMV07XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3UmVjdHMoeHlyd2gsIHNpemUsIHRleHR1cmUpIHtcbiAgICBjb25zdCB2ZXIgPSBuZXcgRmxvYXQzMkFycmF5KHNpemUgKiAxMik7XG4gICAgY29uc3QgdGV4ID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogMTIpO1xuICAgIGNvbnN0IHBpZDQgPSBNYXRoLlBJIC8gNDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IDY7IGorKykge1xuICAgICAgICAgICAgY29uc3QgYSA9IHh5cndoW2kgKiA1ICsgMl0gKyB2ZXJhbmdbal0gKiBwaWQ0O1xuICAgICAgICAgICAgdmVyW2kgKiAxMiArIGogKiAyICsgMF0gPSB4eXJ3aFtpICogOSArIDBdICsgeHlyd2hbaSAqIDkgKyAzXSAqIE1hdGguY29zKGEpIC0geHlyd2hbaSAqIDkgKyA0XSAqIE1hdGguc2luKGEpO1xuICAgICAgICAgICAgdmVyW2kgKiAxMiArIGogKiAyICsgMV0gPSB4eXJ3aFtpICogOSArIDFdICsgeHlyd2hbaSAqIDkgKyAzXSAqIE1hdGguc2luKGEpICsgeHlyd2hbaSAqIDkgKyA0XSAqIE1hdGguY29zKGEpO1xuICAgICAgICAgICAgdGV4W2kgKiAxMiArIGogKiAyICsgMF0gPSB4eXJ3aFtpICogOSArIDVdICsgdGV4eFtqXSAqIHh5cndoW2kgKiA5ICsgN107XG4gICAgICAgICAgICB0ZXhbaSAqIDEyICsgaiAqIDIgKyAxXSA9IHh5cndoW2kgKiA5ICsgNl0gKyB0ZXh5W2pdICogeHlyd2hbaSAqIDkgKyA4XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkcmF3KHZlciwgdGV4LCB0ZXh0dXJlLCBzaXplICogNik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmF3U25ha2UoeHksIHcsIHNpemUsIHR4LCB0eSwgdHcsIHRoLCB0ZXh0dXJlKSB7XG4gICAgY29uc3QgdmVyID0gbmV3IEZsb2F0MzJBcnJheShzaXplICogNik7XG4gICAgY29uc3QgbGVuID0gbmV3IEZsb2F0MzJBcnJheShzaXplKTtcbiAgICBjb25zdCB0ZXggPSBuZXcgRmxvYXQzMkFycmF5KHNpemUgKiA2KTtcbiAgICBjb25zdCBpbmQgPSBuZXcgSW50MTZBcnJheSgoc2l6ZSAtIDEpICogMik7XG4gICAgdmFyIHRvdCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHB4ID0geHlbaSAqIDJdO1xuICAgICAgICBjb25zdCBweSA9IHh5W2kgKiAyICsgMV07XG4gICAgICAgIGNvbnN0IG54ID0geHlbaSAqIDIgKyAyXTtcbiAgICAgICAgY29uc3QgbnkgPSB4eVtpICogMiArIDNdO1xuICAgICAgICBjb25zdCBveCA9IChweCArIG54KSAvIDI7XG4gICAgICAgIGNvbnN0IG95ID0gKHB5ICsgbnkpIC8gMjtcblxuICAgICAgICBjb25zdCBsID0gTWF0aC5zcXJ0KChueCAtIHB4KSAqIChueCAtIHB4KSArIChueSAtIHB5KSAqIChueSAtIHB5KSk7XG4gICAgICAgIGxlbltpXSA9IGw7XG4gICAgICAgIHRvdCArPSBsO1xuXG4gICAgICAgIHZlcltpICogNiArIDBdID0gcHg7XG4gICAgICAgIHZlcltpICogNiArIDFdID0gcHk7XG4gICAgICAgIHZlcltpICogNiArIDJdID0gb3ggLSAob3kgLSBweSkgLyBsICogdztcbiAgICAgICAgdmVyW2kgKiA2ICsgM10gPSBveSArIChveCAtIHB4KSAvIGwgKiB3O1xuICAgICAgICB2ZXJbaSAqIDYgKyA0XSA9IG94ICsgKG95IC0gcHkpIC8gbCAqIHc7XG4gICAgICAgIHZlcltpICogNiArIDVdID0gb3kgLSAob3ggLSBweCkgLyBsICogdztcbiAgICB9XG4gICAgdG90IC09IGxlblswXSAvIDIgKyBsZW5bc2l6ZSAtIDFdIC8gMjtcblxuICAgIHZhciBzdGEgPSAtbGVuWzBdIC8gMjtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICB0ZXhbaSAqIDYgKyAwXSA9IHR4ICsgdHcgKiBzdGEgLyB0b3Q7XG4gICAgICAgIHRleFtpICogNiArIDFdID0gdHkgKyB0aCAvIDI7XG4gICAgICAgIHN0YSArPSBsZW5baV0gLyAyO1xuICAgICAgICB0ZXhbaSAqIDYgKyAyXSA9IHR4ICsgdHcgKiBzdGEgLyB0b3Q7XG4gICAgICAgIHRleFtpICogNiArIDNdID0gdHk7XG4gICAgICAgIHRleFtpICogNiArIDRdID0gdHggKyB0dyAqIHN0YSAvIHRvdDtcbiAgICAgICAgdGV4W2kgKiA2ICsgNV0gPSB0eSArIHRoO1xuICAgICAgICBzdGEgKz0gbGVuW2ldIC8gMjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplIC0gMTsgaSsrKSB7XG4gICAgICAgIGluZFtpICogMiArIDBdID0gaSAqIDMgKyAxO1xuICAgICAgICBpbmRbaSAqIDIgKyAxXSA9IGkgKiAzICsgMztcbiAgICB9XG4gICAgaW5kW3NpemUgKiAyIC0gM10tLTtcblxuICAgIGNvbnN0IGdsID0gZ2xvYmFsX2dsLmdsO1xuICAgIGNvbnN0IHZlcl9idWZmZXIgPSBnbC5jcmVhdGVCdWZmZXIoKTtcbiAgICBjb25zdCBjb29yZCA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLmNvb3JkO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJfYnVmZmVyKTtcbiAgICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgdmVyLCBnbC5TVEFUSUNfRFJBVyk7XG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihjb29yZCwgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShjb29yZCk7XG5cbiAgICBjb25zdCB0ZXhfYnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG4gICAgY29uc3QgdGV4YyA9IGdsb2JhbF9nbC5zaGFkZXIuYXR0cmlidXRlLnRleDtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdGV4X2J1ZmZlcik7XG4gICAgZ2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIHRleCwgZ2wuU1RBVElDX0RSQVcpO1xuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIodGV4YywgMiwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKTtcbiAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheSh0ZXhjKTtcblxuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApO1xuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIHRleHR1cmUpO1xuICAgIGdsLnVuaWZvcm0xaShnbG9iYWxfZ2wuc2hhZGVyLnVuaWZvcm0udVNhbXBsZXIsIDApO1xuXG4gICAgY29uc3QgaW5kX2J1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpO1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZF9idWZmZXIpO1xuICAgIGdsLmJ1ZmZlckRhdGEoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIGluZCwgZ2wuU1RBVElDX0RSQVcpO1xuXG4gICAgZ2wuZHJhd0VsZW1lbnRzKGdsLlRSSUFOR0xFX1NUUklQLCBzaXplICogMiAtIDIsIGdsLlVOU0lHTkVEX1NIT1JULCAwKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZSAtIDE7IGkrKykge1xuICAgICAgICBpbmRbaSAqIDIgKyAwXSA9IGkgKiAzO1xuICAgICAgICBpbmRbaSAqIDIgKyAxXSA9IGkgKiAzICsgMjtcbiAgICB9XG4gICAgaW5kWzBdKys7XG5cbiAgICBnbC5idWZmZXJEYXRhKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBpbmQsIGdsLlNUQVRJQ19EUkFXKTtcblxuICAgIGdsLmRyYXdFbGVtZW50cyhnbC5UUklBTkdMRV9TVFJJUCwgc2l6ZSAqIDIgLSAyLCBnbC5VTlNJR05FRF9TSE9SVCwgMCk7XG5cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHRpZihfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdKSB7XG5cdFx0cmV0dXJuIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0uZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGVcbl9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ2V4cG9ydHMnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbiJdLCJzb3VyY2VSb290IjoiIn0=