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
var map_service_service_1 = require("../map-service.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var moment = require("moment");
var notification_service_1 = require("../notification.service");
var select_option_service_1 = require("../select-option.service");
var apiFacade_1 = require("../apiFacade");
var slot_image_service_1 = require("../slot-image.service");
var util_service_1 = require("../util.service");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(ngbTimerConfig, session, router, mapService, notificationService, selectOptionService, api, imageService, util) {
        this.session = session;
        this.router = router;
        this.mapService = mapService;
        this.notificationService = notificationService;
        this.selectOptionService = selectOptionService;
        this.api = api;
        this.imageService = imageService;
        this.util = util;
        this.submitted = false;
        this.model = {
            location: {
                address: null,
                location: {
                    type: "Point",
                    coordinates: []
                }
            },
            distance: 1,
            age: -1,
            gender: -1,
            date: null,
            timeFrom: {
                hour: 0,
                minute: 0
            },
            timeTo: {
                hour: 0,
                minute: 0
            },
        };
        ngbTimerConfig.seconds = false;
        ngbTimerConfig.spinners = false;
    }
    Object.defineProperty(HomeComponent.prototype, "ageOptions", {
        get: function () {
            return this.selectOptionService.ageFromOptions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "shouldUseGoogle", {
        get: function () {
            return this.util.shouldUseGoogleMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "shouldUseGaode", {
        get: function () {
            return this.util.shouldUseGaodeMap;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.ngOnInit = function () {
        console.log('isProvider', this.session.isProvider);
        if (this.session.isProvider) {
            this.router.navigate(['slots']);
            return;
        }
        // Get the current geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
        this.loadSlots();
    };
    HomeComponent.prototype.loadSlots = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.api.slotApi.list({ $where: "this.bookingCount < this.capping" })];
                    case 1:
                        _a.slots = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomeComponent.prototype.displayGender = function (gender) {
        return this.util.displayGender(gender);
    };
    HomeComponent.prototype.getImageUrl = function (slot) {
        if (slot.imageNames && slot.imageNames.length) {
            return this.imageService.getImageUrl(slot.imageNames[0]);
        }
        else {
            return "";
        }
    };
    HomeComponent.prototype.setPosition = function (position) {
        var _this = this;
        var coords = position.coords;
        this.mapService.getAddress(coords)
            .then(function (x) {
            _this.model.location = x;
        })
            .catch(function (e) { return null; });
    };
    HomeComponent.prototype.book = function (slot) {
        if (!slot) {
            return;
        }
        this.router.navigate(['/bookings/add/', slot.id]);
    };
    Object.defineProperty(HomeComponent.prototype, "hasLoggedIn", {
        get: function () {
            return !!this.session.account;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            var queryObj, queryParams;
            return __generator(this, function (_a) {
                this.submitted = true;
                try {
                    queryObj = this.composeQuery();
                    queryParams = { q: JSON.stringify(queryObj) };
                    this.router.navigate(['/search'], { queryParams: queryParams });
                }
                catch (e) {
                    this.notificationService.error(e);
                    this.submitted = false;
                }
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.composeQuery = function () {
        return {
            age: this.model.age >= 0 ? this.model.age : null,
            start: this.getDate(this.model.date, this.model.timeFrom.hour, this.model.timeFrom.minute),
            end: this.getDate(this.model.date, this.model.timeTo.hour, this.model.timeTo.minute),
            gender: this.model.gender >= 0 ? this.model.gender : null,
            distance: this.model.distance,
            location: {
                address: this.model.location.address,
                location: {
                    type: "Point",
                    coordinates: this.model.location.location.coordinates
                }
            }
        };
    };
    HomeComponent.prototype.getDate = function (date, hour, minute) {
        try {
            var d = moment();
            d.year(date.year);
            d.month(date.month);
            d.day(date.day);
            d.hour(hour);
            d.minute(minute);
            d.second(0);
            return d.toDate().valueOf();
        }
        catch (e) {
            return undefined;
        }
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'amb-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbTimepickerConfig,
            session_service_1.SessionService,
            router_1.Router,
            map_service_service_1.MapServiceService,
            notification_service_1.NotificationService,
            select_option_service_1.SelectOptionService,
            apiFacade_1.ApiFacade,
            slot_image_service_1.ImageService,
            util_service_1.UtilService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map