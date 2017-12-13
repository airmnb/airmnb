"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var types_1 = require("../../../types");
var slot_image_service_1 = require("../slot-image.service");
require("rxjs/add/observable/fromPromise");
var session_service_1 = require("../session.service");
var router_1 = require("@angular/router");
var SlotListComponent = (function () {
    function SlotListComponent(slotImageService, session, router) {
        this.slotImageService = slotImageService;
        this.session = session;
        this.router = router;
    }
    Object.defineProperty(SlotListComponent.prototype, "slots", {
        get: function () {
            return this._slots;
        },
        set: function (slots) {
            var _this = this;
            this._slots = slots;
            if (this._slots) {
                this._slots.forEach(function (s) {
                    Object.assign(s, {
                        avatarUrl: _this.getSlotAvatar(s),
                        stars: Array(_this.getSlotRate(s)).fill(null)
                    });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SlotListComponent.prototype.ngOnInit = function () {
    };
    SlotListComponent.prototype.ngOnChanges = function (changes) {
    };
    SlotListComponent.prototype.ngDoCheck = function () {
    };
    SlotListComponent.prototype.displayGender = function (gender) {
        return gender === types_1.Gender.Boy ? 'Boy' :
            gender === types_1.Gender.Girl ? 'Girl' :
                'Both';
    };
    SlotListComponent.prototype.getSlotAvatar = function (slot) {
        return __awaiter(this, void 0, void 0, function () {
            var providerId, imageNames, index;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerId = slot.providerId;
                        return [4 /*yield*/, this.slotImageService.getImageNamesForProvider(providerId)];
                    case 1:
                        imageNames = _a.sent();
                        if (imageNames.length) {
                            index = Math.floor(Math.random() * imageNames.length);
                            return [2 /*return*/, '/image/' + imageNames[index]];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    SlotListComponent.prototype.getSlotRate = function (slot) {
        return Math.floor(Math.random() * 3) + 3; // 3,4,5
    };
    SlotListComponent.prototype.book = function (slot) {
        this.router.navigate(['bookings/add', slot.id]);
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SlotListComponent.prototype, "slots", null);
    SlotListComponent = __decorate([
        core_1.Component({
            selector: 'amb-slot-list',
            templateUrl: './slot-list.component.html',
            styleUrls: ['./slot-list.component.css']
        }),
        __metadata("design:paramtypes", [slot_image_service_1.ImageService,
            session_service_1.SessionService,
            router_1.Router])
    ], SlotListComponent);
    return SlotListComponent;
}());
exports.SlotListComponent = SlotListComponent;
//# sourceMappingURL=slot-list.component.js.map