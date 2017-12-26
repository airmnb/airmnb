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
var util_service_1 = require("../util.service");
var notification_service_1 = require("../notification.service");
var session_service_1 = require("../session.service");
var slot_image_service_1 = require("../slot-image.service");
var booking_service_1 = require("../booking.service");
var TransactionsComponent = /** @class */ (function () {
    function TransactionsComponent(api, util, notification, session, bookingService, imageService) {
        this.api = api;
        this.util = util;
        this.notification = notification;
        this.session = session;
        this.bookingService = bookingService;
        this.imageService = imageService;
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.loadTransactionForConsumer().catch(this.notification.error);
                return [2 /*return*/];
            });
        });
    };
    TransactionsComponent.prototype.loadTransactionForConsumer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var q, accountId, allBookings;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.session.hasLoggedIn) {
                            console.log('Not logged in');
                            return [2 /*return*/];
                        }
                        accountId = this.session.account.id;
                        if (this.session.isProvider) {
                            q = { providerId: accountId };
                        }
                        else if (this.session.isConsumer) {
                            q = { consumerId: accountId };
                        }
                        else {
                            console.log('Invalid code block');
                        }
                        return [4 /*yield*/, this.api.bookingApi.list(q)];
                    case 1:
                        allBookings = _a.sent();
                        // Add extra properties on items for view
                        allBookings.forEach(function (x) { return __awaiter(_this, void 0, void 0, function () {
                            var slot, _a, _b, _c, _d;
                            return __generator(this, function (_e) {
                                switch (_e.label) {
                                    case 0: return [4 /*yield*/, this.api.slotApi.getOne(x.slotId)];
                                    case 1:
                                        slot = _e.sent();
                                        _b = (_a = Object).assign;
                                        _c = [x];
                                        _d = {
                                            status: this.bookingService.getStatus(x).toString()
                                        };
                                        return [4 /*yield*/, this.api.babyProfileApi.getOne(x.babyId)];
                                    case 2:
                                        _d.baby = _e.sent();
                                        return [4 /*yield*/, this.getCost(x)];
                                    case 3:
                                        _d.cost = _e.sent(),
                                            _d.title = slot.title;
                                        return [4 /*yield*/, this.api.accountProfileApi.get({ accountId: x.providerId })];
                                    case 4:
                                        _d.provider = _e.sent();
                                        return [4 /*yield*/, this.api.accountProfileApi.get({ accountId: x.consumerId })];
                                    case 5:
                                        x = _b.apply(_a, _c.concat([(_d.consumer = _e.sent(),
                                                _d)]));
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        this.ongoingItems = allBookings.filter(function (x) { return !x.finishedAt && !x.terminatedAt; });
                        this.doneItems = allBookings.filter(function (x) { return x.finishedAt || x.terminatedAt; });
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionsComponent.prototype.getTransactionStatus = function (booking) {
        var status = this.bookingService.getStatus(booking);
        return status.toString();
    };
    TransactionsComponent.prototype.getImageUrl = function (imageName) {
        return this.imageService.getImageUrl(imageName);
    };
    TransactionsComponent.prototype.getCost = function (booking) {
        return this.bookingService.getCost(booking);
    };
    TransactionsComponent = __decorate([
        core_1.Component({
            selector: 'amb-transactions',
            templateUrl: './transactions.component.html',
            styleUrls: ['./transactions.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            util_service_1.UtilService,
            notification_service_1.NotificationService,
            session_service_1.SessionService,
            booking_service_1.BookingService,
            slot_image_service_1.ImageService])
    ], TransactionsComponent);
    return TransactionsComponent;
}());
exports.TransactionsComponent = TransactionsComponent;
//# sourceMappingURL=transactions.component.js.map