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
var DatepickerComponent = /** @class */ (function () {
    function DatepickerComponent() {
        this.valueChange = new core_1.EventEmitter();
    }
    Object.defineProperty(DatepickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.valueChange.emit(this._value);
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DatepickerComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DatepickerComponent.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], DatepickerComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], DatepickerComponent.prototype, "valueChange", void 0);
    DatepickerComponent = __decorate([
        core_1.Component({
            selector: 'amb-datepicker',
            templateUrl: './datepicker.component.html',
            styleUrls: ['./datepicker.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], DatepickerComponent);
    return DatepickerComponent;
}());
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map