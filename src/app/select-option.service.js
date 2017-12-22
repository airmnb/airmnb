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
var SelectOptionService = /** @class */ (function () {
    function SelectOptionService() {
        this.ageFromOptions = [
            { label: "--", value: -1, disabled: true },
            { label: "2 years old", value: 2 },
            { label: "3 years old", value: 3 },
            { label: "4 years old", value: 4 },
            { label: "5 years old", value: 5 },
            { label: "6 years old", value: 6 },
        ];
    }
    SelectOptionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], SelectOptionService);
    return SelectOptionService;
}());
exports.SelectOptionService = SelectOptionService;
//# sourceMappingURL=select-option.service.js.map