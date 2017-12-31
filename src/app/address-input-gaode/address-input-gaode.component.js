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
var ngx_amap_1 = require("ngx-amap");
var AddressInputGaodeComponent = /** @class */ (function () {
    function AddressInputGaodeComponent(AmapAutocomplete) {
        this.AmapAutocomplete = AmapAutocomplete;
        this.addressChange = new core_1.EventEmitter();
    }
    AddressInputGaodeComponent.prototype.ngOnInit = function () {
        if (this.useCurrentLocation) {
            this.setCurrentPosition();
        }
        this.autoCompleteSearch = this.AmapAutocomplete.of({
            input: 'address'
        });
    };
    AddressInputGaodeComponent.prototype.onSelect = function (event) {
        console.log(event);
        if (!event.poi)
            return;
        this.address = {
            address: event.poi.name + " " + event.poi.address + " " + event.poi.district,
            location: {
                type: "Point",
                coordinates: [event.poi.location.lng, event.poi.location.lat]
            }
        };
        this.addressChange.emit(this.address);
        console.log(this.address);
    };
    AddressInputGaodeComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                if (_this.address) {
                    // Already input some thing
                    return;
                }
                _this.address = {
                    address: "",
                    location: {
                        type: "Point",
                        coordinates: [position.coords.longitude, position.coords.latitude]
                    }
                };
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressInputGaodeComponent.prototype, "useCurrentLocation", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddressInputGaodeComponent.prototype, "address", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddressInputGaodeComponent.prototype, "addressChange", void 0);
    AddressInputGaodeComponent = __decorate([
        core_1.Component({
            selector: 'amb-address-input-gaode',
            templateUrl: './address-input-gaode.component.html',
            styleUrls: ['./address-input-gaode.component.scss']
        }),
        __metadata("design:paramtypes", [ngx_amap_1.AmapAutocompleteService])
    ], AddressInputGaodeComponent);
    return AddressInputGaodeComponent;
}());
exports.AddressInputGaodeComponent = AddressInputGaodeComponent;
//# sourceMappingURL=address-input-gaode.component.js.map