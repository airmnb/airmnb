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
var apiFacade_1 = require("../apiFacade");
var booking_service_1 = require("../booking.service");
var router_1 = require("@angular/router");
var session_service_1 = require("../session.service");
var util_service_1 = require("../util.service");
var slot_image_service_1 = require("../slot-image.service");
var BookingCardComponent = /** @class */ (function () {
    function BookingCardComponent(api, bookingService, router, session, util, image) {
        this.api = api;
        this.bookingService = bookingService;
        this.router = router;
        this.session = session;
        this.util = util;
        this.image = image;
        this.cancelChange = new core_1.EventEmitter();
    }
    Object.defineProperty(BookingCardComponent.prototype, "booking", {
        set: function (b) {
            this.loadModel(b);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookingCardComponent.prototype, "canCancel", {
        get: function () {
            return this.session.isConsumer && this.model && !this.model.booking.cancelledAt && !this.model.booking.startedAt;
        },
        enumerable: true,
        configurable: true
    });
    BookingCardComponent.prototype.ngOnInit = function () {
    };
    BookingCardComponent.prototype.loadModel = function (booking) {
        return __awaiter(this, void 0, void 0, function () {
            var providerTask, consumerTask, slotTask, babyTask, ps;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        providerTask = this.api.accountProfileApi.get({ accountId: booking.providerId });
                        consumerTask = this.api.accountProfileApi.get({ accountId: booking.consumerId });
                        slotTask = this.api.slotApi.getOne(booking.slotId);
                        babyTask = this.api.babyProfileApi.getOne(booking.babyId);
                        return [4 /*yield*/, Promise.all([providerTask, consumerTask, slotTask, babyTask])];
                    case 1:
                        ps = _a.sent();
                        this.model = {
                            booking: booking,
                            provider: ps[0],
                            consumer: ps[1],
                            slot: ps[2],
                            baby: ps[3]
                        };
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingCardComponent.prototype.cancel = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm('Cancel this booking?')) {
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.bookingService.cancel(this.model.booking)];
                    case 1:
                        _a.sent();
                        this.cancelChange.emit();
                        console.log('cancel called');
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingCardComponent.prototype.checkIn = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.bookingService.checkIn(this.model.booking, imageName)];
                    case 1:
                        _a.sent();
                        this.router.navigate(['booking/tran', this.model.booking.id]);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingCardComponent.prototype.displayGender = function (gender) {
        return this.util.displayGender(gender);
    };
    BookingCardComponent.prototype.getImageUrl = function (slot) {
        if (slot.imageNames && slot.imageNames.length) {
            return this.image.getImageUrl(slot.imageNames[0]);
        }
        else {
            return "";
        }
    };
    BookingCardComponent.prototype.getBabyImageUrl = function (baby) {
        return baby.imageName ? this.image.getImageUrl(baby.imageName) : '';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BookingCardComponent.prototype, "booking", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], BookingCardComponent.prototype, "cancelChange", void 0);
    BookingCardComponent = __decorate([
        core_1.Component({
            selector: 'amb-booking-card',
            templateUrl: './booking-card.component.html',
            styleUrls: ['./booking-card.component.scss']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            booking_service_1.BookingService,
            router_1.Router,
            session_service_1.SessionService,
            util_service_1.UtilService,
            slot_image_service_1.ImageService])
    ], BookingCardComponent);
    return BookingCardComponent;
}());
exports.BookingCardComponent = BookingCardComponent;
//# sourceMappingURL=booking-card.component.js.map