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
var notification_service_1 = require("./notification.service");
var session_service_1 = require("./session.service");
var apiFacade_1 = require("./apiFacade");
var SlotService = /** @class */ (function () {
    function SlotService(notificationService, sessionService, api) {
        this.notificationService = notificationService;
        this.sessionService = sessionService;
        this.api = api;
    }
    SlotService.prototype.listSlots = function (slotIds) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = slotIds && slotIds.length ? { id: {
                                $in: slotIds
                            } } : null;
                        return [4 /*yield*/, this.api.slotApi.list(query)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SlotService.prototype.search = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var q;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        q = this.convertToMongoQuery(query);
                        console.log('Search slots query:', query, q);
                        return [4 /*yield*/, this.api.slotApi.list(q)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    SlotService.prototype.getConsumerId = function () {
        var account = this.sessionService.account;
        return account ? account.id : undefined;
    };
    SlotService.prototype.convertToMongoQuery = function (query) {
        var q = {};
        if (query.age) {
            q.ageFrom = {
                $lte: query.age
            };
            q.ageTo = {
                $gte: query.age
            };
        }
        if (query.start) {
            q.start = {
                $lte: query.start
            };
        }
        if (query.end) {
            q.end = {
                $gte: query.end
            };
        }
        if (query.gender !== undefined) {
            q.gender = {
                $eq: query.gender
            };
        }
        if (query.mapCenter) {
            q.locationMongoGeo = {
                $near: {
                    $geometry: { type: "Point", coordinates: [query.mapCenter.lng, query.mapCenter.lat] },
                    $maxDistance: (query.distance || 1) * 1000
                }
            };
        }
        return q;
    };
    SlotService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [notification_service_1.NotificationService,
            session_service_1.SessionService,
            apiFacade_1.ApiFacade])
    ], SlotService);
    return SlotService;
}());
exports.SlotService = SlotService;
//# sourceMappingURL=slot.service.js.map