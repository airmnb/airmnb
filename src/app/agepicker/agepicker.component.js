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
var AgepickerComponent = /** @class */ (function () {
    function AgepickerComponent() {
        this.valueChange = new core_1.EventEmitter();
        this.options = [];
    }
    Object.defineProperty(AgepickerComponent.prototype, "min", {
        set: function (value) {
            this._min = value;
            this.setOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgepickerComponent.prototype, "max", {
        set: function (value) {
            this._max = value;
            this.setOptions();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AgepickerComponent.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
            this.valueChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    AgepickerComponent.prototype.setOptions = function () {
        this.options = [];
        for (var i = this._min; i <= this._max; i++) {
            this.options.push(i);
        }
    };
    AgepickerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AgepickerComponent.prototype, "min", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AgepickerComponent.prototype, "max", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AgepickerComponent.prototype, "placeholder", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AgepickerComponent.prototype, "value", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AgepickerComponent.prototype, "valueChange", void 0);
    AgepickerComponent = __decorate([
        core_1.Component({
            selector: 'amb-agepicker',
            templateUrl: './agepicker.component.html',
            styleUrls: ['./agepicker.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], AgepickerComponent);
    return AgepickerComponent;
}());
exports.AgepickerComponent = AgepickerComponent;
//# sourceMappingURL=agepicker.component.js.map