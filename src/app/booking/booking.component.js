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
var session_service_1 = require("../session.service");
var apiFacade_1 = require("../apiFacade");
var notification_service_1 = require("../notification.service");
var util_service_1 = require("../util.service");
var router_state_1 = require("@angular/router/src/router_state");
var BookingComponent = (function () {
    function BookingComponent(session, api, notificationService, util, activatedRouter) {
        this.session = session;
        this.api = api;
        this.notificationService = notificationService;
        this.util = util;
        this.activatedRouter = activatedRouter;
    }
    BookingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRouter.params.subscribe(function (p) {
            _this.loadData(p.slotId).catch(function (e) { return _this.notificationService.error(e); });
        });
    };
    BookingComponent.prototype.loadData = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.slotApi.getOne(slotId)];
                    case 1:
                        _a.slot = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.api.babyProfileApi.list({ consumerId: this.session.account.id })];
                    case 2:
                        _b.babies = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingComponent.prototype.displayGender = function (gender) {
        return this.util.displayGender(gender);
    };
    BookingComponent.prototype.onChooseBabyNext = function (event) {
    };
    BookingComponent.prototype.onPaymentNext = function (event) {
    };
    BookingComponent.prototype.onComplete = function (event) {
        var _this = this;
        this.createBooking().then(function (bookingId) {
            _this.bookingLink = _this.util.getBookingDeepLinkUrl(bookingId);
            _this.isCompleted = true;
        })
            .catch(function (e) { return _this.notificationService.error(e); });
        console.log(event);
    };
    BookingComponent.prototype.createBooking = function () {
        return __awaiter(this, void 0, void 0, function () {
            var booking, bookingId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        booking = this.generateBooking();
                        return [4 /*yield*/, this.api.bookingApi.add(booking)];
                    case 1:
                        bookingId = _a.sent();
                        return [4 /*yield*/, this.api.slotApi.updateFunc(this.slot.id, function (s) {
                                s.bookingCount += 1;
                                return s;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, bookingId];
                }
            });
        });
    };
    BookingComponent.prototype.generateBooking = function () {
        var b = {
            id: this.util.newGuid(),
            babyId: this.theBaby.id,
            consumerId: this.theBaby.consumerId,
            slotId: this.slot.id,
            open: true,
            createdAt: new Date(),
            providerId: this.slot.providerId,
            cancelledAt: null,
            expiredAt: null,
        };
        return b;
    };
    BookingComponent = __decorate([
        core_1.Component({
            selector: 'amb-booking',
            templateUrl: './booking.component.html',
            styleUrls: ['./booking.component.css']
        }),
        __metadata("design:paramtypes", [session_service_1.SessionService,
            apiFacade_1.ApiFacade,
            notification_service_1.NotificationService,
            util_service_1.UtilService,
            router_state_1.ActivatedRoute])
    ], BookingComponent);
    return BookingComponent;
}());
exports.BookingComponent = BookingComponent;
//# sourceMappingURL=booking.component.js.map