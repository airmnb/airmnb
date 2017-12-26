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
var apiFacade_1 = require("../apiFacade");
var util_service_1 = require("../util.service");
var slot_image_service_1 = require("../slot-image.service");
var material_1 = require("@angular/material");
var moment = require("moment");
var session_service_1 = require("../session.service");
var booking_service_1 = require("../booking.service");
var TransactionComponent = /** @class */ (function () {
    function TransactionComponent(activatedRouter, api, util, image, session, bookingService) {
        this.activatedRouter = activatedRouter;
        this.api = api;
        this.util = util;
        this.image = image;
        this.session = session;
        this.bookingService = bookingService;
    }
    Object.defineProperty(TransactionComponent.prototype, "isComplete", {
        get: function () {
            return this.booking && (this.booking.finishedAt || this.booking.terminatedAt);
        },
        enumerable: true,
        configurable: true
    });
    TransactionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRouter.params.subscribe(function (p) { return __awaiter(_this, void 0, void 0, function () {
            var bookingId, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bookingId = p.id;
                        _a = this;
                        return [4 /*yield*/, this.api.bookingApi.getOne(bookingId)];
                    case 1:
                        _a.booking = _b.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    TransactionComponent.prototype.getImageUrl = function (imageName) {
        return imageName ? this.image.getImageUrl(imageName) : null;
    };
    TransactionComponent.prototype.goNext = function () {
        this.stepper.next();
    };
    TransactionComponent.prototype.consumerCheckIn = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageName) {
                            console.log('The uploaded process returns a null imageName');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookingService.checkIn(this.booking, imageName)];
                    case 1:
                        _a.sent();
                        this.goNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionComponent.prototype.providerCheckIn = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageName) {
                            console.log('The uploaded process returns a null imageName');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookingService.checkInConfirm(this.booking, imageName)];
                    case 1:
                        _a.sent();
                        this.goNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionComponent.prototype.consumerCheckOut = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageName) {
                            console.log('The uploaded process returns a null imageName');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookingService.checkOut(this.booking, imageName)];
                    case 1:
                        _a.sent();
                        this.goNext();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionComponent.prototype.providerCheckOut = function (imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!imageName) {
                            console.log('The uploaded process returns a null imageName');
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.bookingService.checkOutConfirm(this.booking, imageName)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    TransactionComponent.prototype.getTransactionTimeString = function () {
        var end = moment(this.booking.finishedAt);
        var start = moment(this.booking.startedAt);
        var span = end.diff(start, 'hours', true);
        var h = Math.floor(span);
        var m = Math.ceil((span - h) * 60);
        return h ? h + " hours " : '' + (m + " minutes");
    };
    __decorate([
        core_1.ViewChild("stepper"),
        __metadata("design:type", material_1.MatStepper)
    ], TransactionComponent.prototype, "stepper", void 0);
    TransactionComponent = __decorate([
        core_1.Component({
            selector: 'amb-transaction',
            templateUrl: './transaction.component.html',
            styleUrls: ['./transaction.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            apiFacade_1.ApiFacade,
            util_service_1.UtilService,
            slot_image_service_1.ImageService,
            session_service_1.SessionService,
            booking_service_1.BookingService])
    ], TransactionComponent);
    return TransactionComponent;
}());
exports.TransactionComponent = TransactionComponent;
//# sourceMappingURL=transaction.component.js.map