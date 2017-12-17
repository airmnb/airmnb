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
var MapSearchComponent = (function () {
    function MapSearchComponent(mapService, markerManager) {
        this.mapService = mapService;
        this.markerManager = markerManager;
    }
    MapSearchComponent.prototype.ngOnInit = function () {
        // Get the current geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
        }
    };
    MapSearchComponent.prototype.setPosition = function (position) {
        var _this = this;
        var coords = position.coords;
        this.mapService.getAddress(coords)
            .then(function (x) {
            _this.address = x.address;
            if (x.location) {
                _this.lat = x.location.coordinates[1];
                _this.lng = x.location.coordinates[0];
            }
            _this.addMarkers(x);
        })
            .catch(function (e) { return null; });
    };
    MapSearchComponent.prototype.addMarkers = function (center) {
        this.markers = [];
        for (var i = 0; i < 10; i++) {
            this.markers.push({
                longitude: center.location.coordinates[0] - i * 0.001,
                latitude: center.location.coordinates[1] - i * 0.001
            });
        }
    };
    MapSearchComponent = __decorate([
        core_1.Component({
            selector: 'amb-map-search',
            templateUrl: './map-search.component.html',
            styleUrls: ['./map-search.component.css']
        }),
        __metadata("design:paramtypes", [map_service_service_1.MapServiceService,
            marker_manager_1.MarkerManager])
    ], MapSearchComponent);
    return MapSearchComponent;
}());
exports.MapSearchComponent = MapSearchComponent;
//# sourceMappingURL=map-search.component.js.map