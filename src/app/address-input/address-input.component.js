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
var core_2 = require("@agm/core");
var AddressInputComponent = (function () {
    function AddressInputComponent(mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.addressChange = new core_1.EventEmitter();
    }
    AddressInputComponent.prototype.ngOnInit = function () {
        // // set google maps defaults
        // this.zoom = 4;
        // this.latitude = 39.8282;
        // this.longitude = -98.5795;
        var _this = this;
        // create search FormControl
        // this.searchControl = new FormControl(this.address);
        // set current position
        this.setCurrentPosition();
        // load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    // get the place result
                    var place = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    _this.address = {
                        address: place.formatted_address,
                        location: {
                            type: "Point",
                            coordinates: [place.geometry.location.lng(), place.geometry.location.lat()]
                        }
                    };
                    _this.addressChange.next(_this.address);
                    // // set latitude, longitude and zoom
                    // this.latitude = place.geometry.location.lat();
                    // this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    AddressInputComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.address = {
                    address: "",
                    location: {
                        type: "Point",
                        coordinates: [position.coords.longitude, position.coords.latitude]
                    }
                };
                _this.zoom = 12;
            });
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AddressInputComponent.prototype, "address", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AddressInputComponent.prototype, "showsMap", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddressInputComponent.prototype, "addressChange", void 0);
    __decorate([
        core_1.ViewChild("search"),
        __metadata("design:type", core_1.ElementRef)
    ], AddressInputComponent.prototype, "searchElementRef", void 0);
    AddressInputComponent = __decorate([
        core_1.Component({
            selector: 'amb-address-input',
            templateUrl: './address-input.component.html',
            styleUrls: ['./address-input.component.css']
        }),
        __metadata("design:paramtypes", [core_2.MapsAPILoader,
            core_1.NgZone])
    ], AddressInputComponent);
    return AddressInputComponent;
}());
exports.AddressInputComponent = AddressInputComponent;
//# sourceMappingURL=address-input.component.js.map