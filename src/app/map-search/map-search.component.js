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
var map_service_service_1 = require("../map-service.service");
var marker_manager_1 = require("@agm/core/services/managers/marker-manager");
var util_service_1 = require("../util.service");
var MapSearchComponent = /** @class */ (function () {
    function MapSearchComponent(mapService, markerManager, util) {
        this.mapService = mapService;
        this.markerManager = markerManager;
        this.util = util;
        this.centerChange = new core_1.EventEmitter();
    }
    Object.defineProperty(MapSearchComponent.prototype, "isMapReady", {
        get: function () {
            return !!this.latestCenter;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSearchComponent.prototype, "isGoogleMapReady", {
        get: function () {
            return this.util.shouldUseGoogleMap && this.isMapReady;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MapSearchComponent.prototype, "isGaodeMapReady", {
        get: function () {
            return this.util.shouldUseGaodeMap && this.isMapReady;
        },
        enumerable: true,
        configurable: true
    });
    MapSearchComponent.prototype.ngOnInit = function () {
        // Get the current geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
    };
    MapSearchComponent.prototype.mapCenterChange = function (center) {
        this.latestCenter = center;
    };
    MapSearchComponent.prototype.fireIdle = function () {
        this.centerChange.emit(this.latestCenter);
    };
    MapSearchComponent.prototype.setPosition = function (position) {
        var _this = this;
        var coords = position.coords;
        this.mapService.getAddress(coords)
            .then(function (x) {
            _this.address = x.address;
            if (x.coord) {
                _this.latestCenter = x.coord;
            }
        })
            .catch(function (e) { return null; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], MapSearchComponent.prototype, "slots", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], MapSearchComponent.prototype, "centerChange", void 0);
    MapSearchComponent = __decorate([
        core_1.Component({
            selector: 'amb-map-search',
            templateUrl: './map-search.component.html',
            styleUrls: ['./map-search.component.css']
        }),
        __metadata("design:paramtypes", [map_service_service_1.MapServiceService,
            marker_manager_1.MarkerManager,
            util_service_1.UtilService])
    ], MapSearchComponent);
    return MapSearchComponent;
}());
exports.MapSearchComponent = MapSearchComponent;
//# sourceMappingURL=map-search.component.js.map