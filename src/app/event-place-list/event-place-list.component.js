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
var apiFacade_1 = require("../apiFacade");
var EventPlaceListComponent = /** @class */ (function () {
    function EventPlaceListComponent(api) {
        this.api = api;
    }
    EventPlaceListComponent.prototype.ngOnInit = function () {
    };
    EventPlaceListComponent = __decorate([
        core_1.Component({
            selector: 'amb-event-place-list',
            templateUrl: './event-place-list.component.html',
            styleUrls: ['./event-place-list.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade])
    ], EventPlaceListComponent);
    return EventPlaceListComponent;
}());
exports.EventPlaceListComponent = EventPlaceListComponent;
//# sourceMappingURL=event-place-list.component.js.map