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
var util_service_1 = require("../util.service");
var AddressInputComponent = /** @class */ (function () {
    function AddressInputComponent(util) {
        this.util = util;
        this.addressChange = new core_1.EventEmitter();
    }
    Object.defineProperty(AddressInputComponent.prototype, "address", {
        get: function () {
            return this._address;
        },
        set: function (value) {
            this._address = value;
            this.addressChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressInputComponent.prototype, "shouldUseGoogle", {
        get: function () {
            return this.util.shouldUseGoogleMap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressInputComponent.prototype, "shouldUseGaode", {
        get: function () {
            return this.util.shouldUseGaodeMap;
        },
        enumerable: true,
        configurable: true
    });
    AddressInputComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AddressInputComponent.prototype, "address", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AddressInputComponent.prototype, "addressChange", void 0);
    AddressInputComponent = __decorate([
        core_1.Component({
            selector: 'amb-address-input',
            templateUrl: './address-input.component.html',
            styleUrls: ['./address-input.component.css']
        }),
        __metadata("design:paramtypes", [util_service_1.UtilService])
    ], AddressInputComponent);
    return AddressInputComponent;
}());
exports.AddressInputComponent = AddressInputComponent;
//# sourceMappingURL=address-input.component.js.map