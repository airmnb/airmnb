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
var slot_service_1 = require("../slot.service");
var util_service_1 = require("../util.service");
var slot_image_service_1 = require("../slot-image.service");
var select_option_service_1 = require("../select-option.service");
var LandingPageComponent = /** @class */ (function () {
    function LandingPageComponent(route, router, api, searchService, util, selectOptionService, image) {
        this.route = route;
        this.router = router;
        this.api = api;
        this.searchService = searchService;
        this.util = util;
        this.selectOptionService = selectOptionService;
        this.image = image;
        this.showsAdvancedSearch = false;
        this.searchModel = {
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
            timeFrom: null,
            timeTo: null,
        };
    }
    Object.defineProperty(LandingPageComponent.prototype, "ageOptions", {
        get: function () {
            return this.selectOptionService.ageFromOptions;
        },
        enumerable: true,
        configurable: true
    });
    LandingPageComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            var queryJson = params['q'];
            _this.isRecommended = !queryJson;
            _this.query = {};
            if (queryJson) {
                _this.query = JSON.parse(queryJson);
            }
            _this.getMapCenter(_this.query);
            _this.search();
        });
        this.searchRecommended();
    };
    LandingPageComponent.prototype.searchRecommended = function () {
        return __awaiter(this, void 0, void 0, function () {
            var recommendedQuery, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        recommendedQuery = {};
                        _a = this;
                        return [4 /*yield*/, this.searchService.search(recommendedQuery)];
                    case 1:
                        _a.slots = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LandingPageComponent.prototype.getMapCenter = function (query) {
        try {
            this.mapCenter = query.mapCenter;
            if (this.mapCenter.lng === undefined || this.mapCenter.lat === undefined) {
                throw new Error('Both longitude and latitude have to be there.');
            }
        }
        catch (e) {
            console.log('Failed to get map center to the query. Trying to use the map center from browser.');
            if (navigator.geolocation) {
                // Try get the current location from browser
                navigator.geolocation.getCurrentPosition(this.setGeolocation.bind(this));
            }
        }
    };
    LandingPageComponent.prototype.setGeolocation = function (position) {
        var coords = position.coords;
        this.mapCenter = Object.assign(this.mapCenter || {}, {
            lng: coords.longitude,
            lat: coords.latitude
        });
    };
    LandingPageComponent.prototype.updateQueryWithModel = function () {
        var delta = {
            age: this.searchModel.age >= 0 ? this.searchModel.age : undefined,
            start: this.util.parseInputDateTime(this.searchModel.date, this.searchModel.timeFrom),
            end: this.util.parseInputDateTime(this.searchModel.date, this.searchModel.timeTo),
            gender: this.searchModel.gender >= 0 ? this.searchModel.gender : undefined,
            distance: this.searchModel.distance,
            mapCenter: {
                lng: this.searchModel.location.location.coordinates[0],
                lat: this.searchModel.location.location.coordinates[1]
            }
        };
        this.query = Object.assign(this.query, delta);
    };
    LandingPageComponent.prototype.search = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.updateQueryWithModel();
                this.searchService.search(this.query).then(function (x) { return _this.slots = x; });
                return [2 /*return*/];
            });
        });
    };
    LandingPageComponent.prototype.mapCenterChange = function (center) {
        var _this = this;
        this.query.mapCenter = center;
        this.searchService.search(this.query).then(function (x) { return _this.slots = x; });
    };
    LandingPageComponent.prototype.displayGender = function (gender) {
        return this.util.displayGender(gender);
    };
    LandingPageComponent.prototype.getImageUrl = function (slot) {
        if (slot.imageNames && slot.imageNames.length) {
            return this.image.getImageUrl(slot.imageNames[0]);
        }
        else {
            return "";
        }
    };
    LandingPageComponent = __decorate([
        core_1.Component({
            selector: 'amb-landing-page',
            templateUrl: './landing-page.component.html',
            styleUrls: ['./landing-page.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            apiFacade_1.ApiFacade,
            slot_service_1.SlotService,
            util_service_1.UtilService,
            select_option_service_1.SelectOptionService,
            slot_image_service_1.ImageService])
    ], LandingPageComponent);
    return LandingPageComponent;
}());
exports.LandingPageComponent = LandingPageComponent;
//# sourceMappingURL=landing-page.component.js.map