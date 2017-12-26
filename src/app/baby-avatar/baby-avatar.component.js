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
var slot_image_service_1 = require("../slot-image.service");
var BabyAvatarComponent = /** @class */ (function () {
    function BabyAvatarComponent(image) {
        this.image = image;
    }
    Object.defineProperty(BabyAvatarComponent.prototype, "baby", {
        set: function (baby) {
            if (baby && baby.imageName) {
                this.imageUrl = this.image.getImageUrl(baby.imageName);
            }
        },
        enumerable: true,
        configurable: true
    });
    BabyAvatarComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BabyAvatarComponent.prototype, "baby", null);
    BabyAvatarComponent = __decorate([
        core_1.Component({
            selector: 'amb-baby-avatar',
            templateUrl: './baby-avatar.component.html',
            styleUrls: ['./baby-avatar.component.scss']
        }),
        __metadata("design:paramtypes", [slot_image_service_1.ImageService])
    ], BabyAvatarComponent);
    return BabyAvatarComponent;
}());
exports.BabyAvatarComponent = BabyAvatarComponent;
//# sourceMappingURL=baby-avatar.component.js.map