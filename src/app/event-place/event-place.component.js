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
var slot_image_service_1 = require("../slot-image.service");
var router_1 = require("@angular/router");
var types_1 = require("../../../types");
var notification_service_1 = require("../notification.service");
var util_service_1 = require("../util.service");
var session_service_1 = require("../session.service");
var EventPlaceComponent = /** @class */ (function () {
    function EventPlaceComponent(api, imageService, activatedRoute, notification, router, util, session) {
        this.api = api;
        this.imageService = imageService;
        this.activatedRoute = activatedRoute;
        this.notification = notification;
        this.router = router;
        this.util = util;
        this.session = session;
        this.model = {
            id: this.util.newGuid(),
            providerId: null,
            name: null,
            description: null,
            location: null,
            imageNames: []
        };
    }
    EventPlaceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.assureRole(types_1.Role.Provider);
        this.activatedRoute.params.subscribe(function (p) {
            var placeId = p.id;
            _this.isNew = !placeId;
            if (!_this.isNew) {
                // Edit mode
                _this.api.placeApi.getOne(placeId)
                    .then(function (s) {
                    _this.model = s;
                }).catch(function (e) { return _this.notification.error(e); });
            }
            _this.model.providerId = _this.session.account.id;
        });
    };
    EventPlaceComponent.prototype.onSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!this.isNew) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.api.placeApi.add(this.model)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.api.placeApi.update(this.model)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_1 = _a.sent();
                        this.notification.error(e_1);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    EventPlaceComponent = __decorate([
        core_1.Component({
            selector: 'amb-event-place',
            templateUrl: './event-place.component.html',
            styleUrls: ['./event-place.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            slot_image_service_1.ImageService,
            router_1.ActivatedRoute,
            notification_service_1.NotificationService,
            router_1.Router,
            util_service_1.UtilService,
            session_service_1.SessionService])
    ], EventPlaceComponent);
    return EventPlaceComponent;
}());
exports.EventPlaceComponent = EventPlaceComponent;
//# sourceMappingURL=event-place.component.js.map