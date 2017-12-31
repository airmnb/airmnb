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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var session_service_1 = require("../session.service");
var slot_service_1 = require("../slot.service");
var apiFacade_1 = require("../apiFacade");
var slot_image_service_1 = require("../slot-image.service");
var util_service_1 = require("../util.service");
var SearchResultComponent = /** @class */ (function () {
    function SearchResultComponent(route, router, sessionService, searchService, api, imageService, util) {
        this.route = route;
        this.router = router;
        this.sessionService = sessionService;
        this.searchService = searchService;
        this.api = api;
        this.imageService = imageService;
        this.util = util;
    }
    Object.defineProperty(SearchResultComponent.prototype, "hasLoggedIn", {
        get: function () {
            return this.sessionService.hasLoggedIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultComponent.prototype, "isMapReady", {
        get: function () {
            return this.centerLongitude !== undefined && this.centerLatitude !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultComponent.prototype, "isGoogleMapReady", {
        get: function () {
            return this.util.shouldUseGoogleMap && this.isMapReady;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchResultComponent.prototype, "isGaodeMapReady", {
        get: function () {
            return this.util.shouldUseGaodeMap && this.isMapReady;
        },
        enumerable: true,
        configurable: true
    });
    SearchResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
        this.route.queryParams.subscribe(function (params) {
            var queryJson = params['q'];
            var query = JSON.parse(queryJson);
            console.log('Search query', query);
            _this.centerLongitude = query.location.location.coordinates[0];
            _this.centerLatitude = query.location.location.coordinates[1];
            console.log('centerLongitude', _this.centerLongitude);
            console.log('centerLatitude', _this.centerLatitude);
            _this.searchService.search(query).subscribe(function (x) { return _this.slots = x; });
        });
    };
    SearchResultComponent.prototype.setPosition = function (position) {
        var coords = position.coords;
        this.centerLongitude = this.centerLongitude || coords.longitude;
        this.centerLatitude = this.centerLatitude || coords.latitude;
    };
    SearchResultComponent.prototype.getImageUrl = function (slot) {
        if (slot.imageNames && slot.imageNames.length) {
            return this.imageService.getImageUrl(slot.imageNames[0]);
        }
        else {
            return "";
        }
    };
    SearchResultComponent.prototype.book = function (slot) {
        if (!slot) {
            return;
        }
        this.router.navigate(['/bookings/add/', slot.id]);
    };
    SearchResultComponent.prototype.getLabelForAmapMarker = function (index) {
        return {
            offset: {
                x: 0,
                y: 0
            },
            content: (index + 1).toString()
        };
    };
    SearchResultComponent = __decorate([
        core_1.Component({
            selector: 'amb-search-result',
            templateUrl: './search-result.component.html',
            styleUrls: ['./search-result.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            router_1.Router,
            session_service_1.SessionService,
            slot_service_1.SlotService,
            apiFacade_1.ApiFacade,
            slot_image_service_1.ImageService,
            util_service_1.UtilService])
    ], SearchResultComponent);
    return SearchResultComponent;
}());
exports.SearchResultComponent = SearchResultComponent;
//# sourceMappingURL=search-result.component.js.map