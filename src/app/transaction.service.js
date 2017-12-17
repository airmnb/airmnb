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
var TransactionService = (function () {
    function TransactionService(api, util) {
        this.api = api;
        this.util = util;
    }
    TransactionService.prototype.getTransactionsConvertableFromBookings = function (consumerId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var bookings, trans;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.bookingApi.list({
                            consumerId: consumerId,
                            open: true
                        })];
                    case 1:
                        bookings = _a.sent();
                        trans = bookings.map(function (b) {
                            var t = {
                                id: _this.util.newGuid(),
                                bookingId: b.id,
                                slotId: b.slotId,
                                providerId: b.providerId,
                                consumerId: consumerId,
                                babyId: b.babyId,
                                createdAt: new Date()
                            };
                            return t;
                        });
                        return [2 /*return*/, trans];
                }
            });
        });
    };
    TransactionService.prototype.getTransactionStatus = function (tran) {
        if (tran.terminatedAt) {
            return types_1.TransactionStatus.Terminated;
        }
        if (tran.finishedAt) {
            return types_1.TransactionStatus.Finished;
        }
        if (tran.doneImageNameByProvider) {
            return types_1.TransactionStatus.Ending;
        }
        if (tran.startedAt) {
            return types_1.TransactionStatus.Started;
        }
        if (tran.doneImageNameByConsumer) {
            return types_1.TransactionStatus.Launched;
        }
        if (tran.createdAt) {
            return types_1.TransactionStatus.ReadToLaunch;
        }
        throw new Error('Invalid status of this transaction');
    };
    TransactionService.prototype.launch = function (tran, startImageNameByConsumer) {
        return __awaiter(this, void 0, void 0, function () {
            var booking, tranId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.bookingApi.getOne(tran.bookingId)];
                    case 1:
                        booking = _a.sent();
                        if (booking.expiredAt && booking.expiredAt < new Date()) {
                            throw new Error('Booking was expired.');
                        }
                        tran.doneImageNameByConsumer = startImageNameByConsumer;
                        return [4 /*yield*/, this.api.tranApi.add(tran)];
                    case 2:
                        tranId = _a.sent();
                        booking.open = false;
                        return [4 /*yield*/, this.api.bookingApi.update(booking)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, tran];
                }
            });
        });
    };
    TransactionService.prototype.start = function (tranId, startImageNameByProvider) {
        return __awaiter(this, void 0, void 0, function () {
            var tran;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.tranApi.getOne(tranId)];
                    case 1:
                        tran = _a.sent();
                        tran.startedImageNameByProvider = startImageNameByProvider;
                        tran.startedAt = new Date();
                        return [4 /*yield*/, this.api.tranApi.update(tran)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tran];
                }
            });
        });
    };
    TransactionService.prototype.ending = function (tranId, endImageNameByProvider) {
        return __awaiter(this, void 0, void 0, function () {
            var tran;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.tranApi.getOne(tranId)];
                    case 1:
                        tran = _a.sent();
                        tran.doneImageNameByProvider = endImageNameByProvider;
                        return [4 /*yield*/, this.api.tranApi.update(tran)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tran];
                }
            });
        });
    };
    TransactionService.prototype.finish = function (tranId, endImageNameByConsumer) {
        return __awaiter(this, void 0, void 0, function () {
            var tran;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.tranApi.getOne(tranId)];
                    case 1:
                        tran = _a.sent();
                        tran.doneImageNameByConsumer = endImageNameByConsumer;
                        tran.finishedAt = new Date();
                        return [4 /*yield*/, this.api.tranApi.update(tran)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, tran];
                }
            });
        });
    };
    TransactionService.prototype.getCost = function (tran) {
        return __awaiter(this, void 0, void 0, function () {
            var slot;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.api.slotApi.getOne(tran.slotId)];
                    case 1:
                        slot = _a.sent();
                        return [2 /*return*/, slot ? slot.price : 0];
                }
            });
        });
    };
    TransactionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            util_service_1.UtilService])
    ], TransactionService);
    return TransactionService;
}());
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map