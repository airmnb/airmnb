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
var apiFacade_1 = require("./apiFacade");
var util_service_1 = require("./util.service");
var types_1 = require("../../types");
var BookingService = /** @class */ (function () {
    function BookingService(api, util) {
        this.api = api;
        this.util = util;
    }
    BookingService.prototype.getReviewContent = function () {
    };
    BookingService.prototype.listAliveBookingsForConsumer = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            consumerId: accountId,
                            cancelledAt: null,
                        };
                        return [4 /*yield*/, this.api.bookingApi.list(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BookingService.prototype.listBookingsForProvider = function (accountId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = {
                            providerId: accountId
                        };
                        return [4 /*yield*/, this.api.bookingApi.list(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BookingService.prototype.getStatus = function (booking) {
        if (booking.terminatedAt)
            return types_1.BookingStatus.Terminated;
        if (booking.finishedAt)
            return types_1.BookingStatus.Finished;
        if (booking.startedAt)
            return types_1.BookingStatus.Ongoing;
        if (booking.cancelledAt)
            return types_1.BookingStatus.Cancelled;
        return types_1.BookingStatus.Created;
    };
    BookingService.prototype.create = function (slotId, providerId, consumerId, babyId) {
        return __awaiter(this, void 0, void 0, function () {
            var slot, booking;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.slotApi.getOne(slotId)];
                    case 1:
                        slot = _a.sent();
                        if (slot.bookingCount === 0) {
                            throw new Error("No more available space for this slot.");
                        }
                        return [4 /*yield*/, this.api.slotApi.updateFunc(slotId, function (x) {
                                x.bookingCount++;
                                return x;
                            })];
                    case 2:
                        _a.sent();
                        booking = {
                            id: this.util.newGuid(),
                            providerId: providerId,
                            consumerId: consumerId,
                            slotId: slotId,
                            babyId: babyId,
                            createdAt: new Date(),
                        };
                        return [4 /*yield*/, this.api.bookingApi.add(booking)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.delete = function (booking) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm('Delete this one?')) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.api.bookingApi.delete(booking.id)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.api.slotApi.updateFunc(booking.slotId, function (x) {
                                x.bookingCount--;
                                return x;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.isClosed = function (booking) {
        return !!(booking.cancelledAt || booking.terminatedAt || booking.finishedAt);
    };
    BookingService.prototype.isActive = function (booking) {
        return !this.isClosed(booking);
    };
    BookingService.prototype.canCancel = function (booking) {
        return this.isActive(booking) && !booking.startedAt;
    };
    BookingService.prototype.cancel = function (booking) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (booking.startedAt) {
                            throw new Error("Booking " + booking.id + " has started and cannot be cancelled.");
                        }
                        return [4 /*yield*/, this.api.bookingApi.updateFunc(booking.id, function (b) {
                                b.cancelledAt = new Date();
                                return b;
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.api.slotApi.updateFunc(booking.slotId, function (x) {
                                x.bookingCount--;
                                return x;
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.canCheckIn = function (booking) {
        return this.isActive(booking) && !booking.consumerCheckInAt;
    };
    BookingService.prototype.checkIn = function (booking, imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canCheckIn(booking)) {
                            throw new Error("Booking " + booking.id + " has been requested for checked-in.");
                        }
                        return [4 /*yield*/, this.api.bookingApi.updateFunc(booking.id, function (x) {
                                x.consumerCheckInImageName = imageName;
                                x.consumerCheckInAt = new Date();
                                return x;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.canCheckInConfirm = function (booking) {
        return this.isActive(booking) && !booking.providerCheckInAt;
    };
    BookingService.prototype.checkInConfirm = function (booking, imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canCheckInConfirm(booking)) {
                            throw new Error("Booking " + booking.id + " has been confirmed for check-in.");
                        }
                        return [4 /*yield*/, this.api.bookingApi.updateFunc(booking.id, function (x) {
                                x.providerCheckInImageName = imageName;
                                x.providerCheckInAt = new Date();
                                x.startedAt = new Date();
                                return x;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.terminate = function (booking) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!booking.startedAt) {
                            throw new Error("Booking " + booking.id + " has been started so cannot be terminated.");
                        }
                        return [4 /*yield*/, this.api.bookingApi.updateFunc(booking.id, function (x) {
                                var now = new Date();
                                x.terminatedAt = now;
                                x.finishedAt = now;
                                return x;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.canCheckOut = function (booking) {
        return this.isActive(booking) && !booking.consumerCheckOutAt;
    };
    BookingService.prototype.checkOut = function (booking, imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canCheckOut(booking)) {
                            throw new Error("Booking " + booking.id + " has been requested for checked-out.");
                        }
                        return [4 /*yield*/, this.api.bookingApi.updateFunc(booking.id, function (x) {
                                x.consumerCheckOutImageName = imageName;
                                x.consumerCheckOutAt = new Date();
                                return x;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.canCheckOutConfirm = function (booking) {
        return this.isActive(booking) && !booking.providerCheckOutAt;
    };
    BookingService.prototype.checkOutConfirm = function (booking, imageName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.canCheckOutConfirm(booking)) {
                            throw new Error("Booking " + booking.id + " has been confirmed for checked-out.");
                        }
                        return [4 /*yield*/, this.api.bookingApi.updateFunc(booking.id, function (x) {
                                x.providerCheckOutImageName = imageName;
                                x.providerCheckOutAt = new Date();
                                x.finishedAt = new Date();
                                return x;
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.getCost = function (booking) {
        return "XXX";
    };
    BookingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            util_service_1.UtilService])
    ], BookingService);
    return BookingService;
}());
exports.BookingService = BookingService;
//# sourceMappingURL=booking.service.js.map