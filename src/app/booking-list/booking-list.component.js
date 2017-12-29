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
var slot_image_service_1 = require("../slot-image.service");
var BookingListComponent = /** @class */ (function () {
    function BookingListComponent(activatedRouter, session, api, bookingService, slotService, notificationService, babyService, util, imageService, router) {
        this.activatedRouter = activatedRouter;
        this.session = session;
        this.api = api;
        this.bookingService = bookingService;
        this.slotService = slotService;
        this.notificationService = notificationService;
        this.babyService = babyService;
        this.util = util;
        this.imageService = imageService;
        this.router = router;
    }
    BookingListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRouter.params.subscribe(function (p) {
            var slotId = p.slotId;
            var task;
            if (slotId) {
                // List all bookings associated with this slot
                task = _this.loadForSlot(slotId);
            }
            else if (_this.session.isProvider) {
                // List all bookings from this provider
                task = _this.loadAllForProvider();
            }
            else if (_this.session.isConsumer) {
                // List all bookings by this consumer
                task = _this.loadAllForConsumer();
            }
            else {
                alert('Impossible code block');
                throw new Error('Impossible code block');
            }
            task.catch(_this.notificationService.error);
        });
    };
    BookingListComponent.prototype.cancel = function (booking) {
        if (!confirm('Cancel this booking?')) {
            return false;
        }
        this.bookingService.cancel(booking);
        this.activeItems = this.activeItems.filter(function (x) { return x !== booking; });
    };
    Object.defineProperty(BookingListComponent.prototype, "isConsumer", {
        get: function () {
            return this.session.isConsumer;
        },
        enumerable: true,
        configurable: true
    });
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
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.bookingApi.list({ slotId: slotId })];
                    case 1:
                        items = _a.sent();
                        this.setActiveAndCloseModels(items);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent.prototype.loadAllForProvider = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountId, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountId = this.session.account.id;
                        return [4 /*yield*/, this.bookingService.listBookingsForProvider(accountId)];
                    case 1:
                        items = _a.sent();
                        this.setActiveAndCloseModels(items);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent.prototype.loadAllForConsumer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var accountId, items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        accountId = this.session.account.id;
                        return [4 /*yield*/, this.bookingService.listAliveBookingsForConsumer(accountId)];
                    case 1:
                        items = _a.sent();
                        this.setActiveAndCloseModels(items);
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingListComponent.prototype.setActiveAndCloseModels = function (bookings) {
        var _this = this;
        this.activeItems = bookings.filter(function (x) { return _this.bookingService.isActive(x); });
        this.closedItems = bookings.filter(function (x) { return _this.bookingService.isClosed(x); });
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
            util_service_1.UtilService,
            slot_image_service_1.ImageService,
            router_1.Router])
    ], BookingListComponent);
    return BookingListComponent;
}());
exports.BookingListComponent = BookingListComponent;
//# sourceMappingURL=booking-list.component.js.map