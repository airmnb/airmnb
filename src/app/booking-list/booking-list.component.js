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
var router_1 = require("@angular/router");
var session_service_1 = require("../session.service");
var apiFacade_1 = require("../apiFacade");
var booking_service_1 = require("../booking.service");
var slot_service_1 = require("../slot.service");
var notification_service_1 = require("../notification.service");
var baby_service_1 = require("../baby.service");
var _ = require("underscore");
var util_service_1 = require("../util.service");
var BookingListComponent = (function () {
    function BookingListComponent(activatedRouter, session, api, bookingService, slotSevice, notificationService, babyService, util) {
        this.activatedRouter = activatedRouter;
        this.session = session;
        this.api = api;
        this.bookingService = bookingService;
        this.slotSevice = slotSevice;
        this.notificationService = notificationService;
        this.babyService = babyService;
        this.util = util;
        this.items = [];
    }
    BookingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRouter.params.subscribe(function (p) {
            var slotId = p.slotId;
            var task;
            if (slotId) {
                // List for this slot
                task = _this.loadForSlot(slotId);
            }
            else if (_this.session.role === 'provider') {
                // List all for provider
                task = _this.loadAllForProvider();
            }
            else if (_this.session.role === 'consumer') {
                // List all for provider
                task = _this.loadAllForConsumer();
            }
            else {
                throw new Error('Impossible code block');
            }
            task.catch(_this.notificationService.error);
        });
    };
    BookingListComponent.prototype.displayGender = function (gender) {
        return this.util.displayGender(gender);
    };
    BookingListComponent.prototype.setModel = function (slots, bookings, babies) {
        var slotDic = new Map();
        var babyDic = new Map();
        slots.forEach(function (s) { return slotDic.set(s.id, s); });
        babies.forEach(function (b) { return babyDic.set(b.id, b); });
        this.items = bookings.map(function (booking) {
            return {
                slot: slotDic.get(booking.slotId),
                booking: booking,
                baby: babyDic.get(booking.babyId)
            };
        });
    };
    BookingListComponent.prototype.getUniqueBookingsBabies = function (bookings) {
        return __awaiter(this, void 0, void 0, function () {
            var babyIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        babyIds = _.unique(bookings.map(function (b) { return b.babyId; }));
                        return [4 /*yield*/, this.babyService.ListAllBabies(babyIds)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BookingListComponent.prototype.loadForSlot = function (slotId) {
        return __awaiter(this, void 0, void 0, function () {
            var slotTask, bookingsTask, result, slot, bookings, babies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        slotTask = this.api.slotApi.getOne(slotId);
                        bookingsTask = this.api.bookingApi.list({ slotId: slotId });
                        return [4 /*yield*/, Promise.all([slotTask, bookingsTask])];
                    case 1:
                        result = _a.sent();
                        slot = result[0];
                        bookings = result[1];
                        return [4 /*yield*/, this.getUniqueBookingsBabies(bookings)];
                    case 2:
                        babies = _a.sent();
                        this.setModel([slot], bookings, babies);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent.prototype.loadAllForProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountId, bookings, slotIds, slots, babies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.session.role !== 'provider') {
                            throw new Error("Not a provider");
                        }
                        accountId = this.session.account.id;
                        return [4 /*yield*/, this.bookingService.listBookingsForProvider(accountId)];
                    case 1:
                        bookings = _a.sent();
                        slotIds = bookings.map(function (b) { return b.slotId; });
                        return [4 /*yield*/, this.slotSevice.listSlots(slotIds)];
                    case 2:
                        slots = _a.sent();
                        return [4 /*yield*/, this.getUniqueBookingsBabies(bookings)];
                    case 3:
                        babies = _a.sent();
                        this.setModel(slots, bookings, babies);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent.prototype.loadAllForConsumer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountId, bookings, slotIds, slots, babies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.session.role !== 'consumer') {
                            throw new Error("Not a consumer");
                        }
                        accountId = this.session.account.id;
                        return [4 /*yield*/, this.bookingService.listAliveBookingsForConsumer(accountId)];
                    case 1:
                        bookings = _a.sent();
                        slotIds = bookings.map(function (b) { return b.slotId; });
                        return [4 /*yield*/, this.slotSevice.listSlots(slotIds)];
                    case 2:
                        slots = _a.sent();
                        return [4 /*yield*/, this.getUniqueBookingsBabies(bookings)];
                    case 3:
                        babies = _a.sent();
                        this.setModel(slots, bookings, babies);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent.prototype.cancel = function (booking) {
        this.cancelImpl(booking).catch(this.notificationService.error);
        return false;
    };
    BookingListComponent.prototype.cancelImpl = function (booking) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.bookingApi.delete(booking.id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.api.slotApi.updateFunc(booking.slotId, function (s) {
                                s.bookingCount--;
                                return s;
                            })];
                    case 2:
                        _a.sent();
                        this.items = this.items.filter(function (x) { return x.booking !== booking; });
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent = __decorate([
        core_1.Component({
            selector: 'amb-booking-list',
            templateUrl: './booking-list.component.html',
            styleUrls: ['./booking-list.component.css']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            session_service_1.SessionService,
            apiFacade_1.ApiFacade,
            booking_service_1.BookingService,
            slot_service_1.SlotService,
            notification_service_1.NotificationService,
            baby_service_1.BabyService,
            util_service_1.UtilService])
    ], BookingListComponent);
    return BookingListComponent;
}());
exports.BookingListComponent = BookingListComponent;
//# sourceMappingURL=booking-list.component.js.map