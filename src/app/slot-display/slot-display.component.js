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
var types_1 = require("../../../types");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var slot_image_service_1 = require("../slot-image.service");
var SlotDisplayComponent = /** @class */ (function () {
    function SlotDisplayComponent(config, imageService) {
        this.imageService = imageService;
        config.interval = 10000;
        config.wrap = false;
        config.keyboard = false;
    }
    SlotDisplayComponent.prototype.ngOnInit = function () {
    };
    SlotDisplayComponent.prototype.displayGender = function (gender) {
        return gender === types_1.Gender.Boy ? 'Boy' :
            gender === types_1.Gender.Girl ? 'Girl' :
                'Both';
    };
    SlotDisplayComponent.prototype.getImageUrl = function (imageName) {
        return this.imageService.getImageUrls([imageName])[0];
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], SlotDisplayComponent.prototype, "slot", void 0);
    SlotDisplayComponent = __decorate([
        core_1.Component({
            selector: 'amb-slot-display',
            templateUrl: './slot-display.component.html',
            styleUrls: ['./slot-display.component.css'],
            providers: [ng_bootstrap_1.NgbCarouselConfig]
        }),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbCarouselConfig,
            slot_image_service_1.ImageService])
    ], SlotDisplayComponent);
    return SlotDisplayComponent;
}());
exports.SlotDisplayComponent = SlotDisplayComponent;
//# sourceMappingURL=slot-display.component.js.map