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
var slot_image_service_1 = require("../slot-image.service");
require("rxjs/add/observable/fromPromise");
var session_service_1 = require("../session.service");
var router_1 = require("@angular/router");
var util_service_1 = require("../util.service");
var SlotListComponent = /** @class */ (function () {
    function SlotListComponent(slotImageService, session, router, util, imageService) {
        this.slotImageService = slotImageService;
        this.session = session;
        this.router = router;
        this.util = util;
        this.imageService = imageService;
    }
    Object.defineProperty(SlotListComponent.prototype, "slots", {
        get: function () {
            return this._slots;
        },
        set: function (slots) {
            var _this = this;
            this._slots = slots;
            if (this._slots) {
                this._slots.forEach(function (s) {
                    Object.assign(s, {
                        stars: Array(_this.getSlotRate(s)).fill(null)
                    });
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    SlotListComponent.prototype.ngOnInit = function () {
    };
    SlotListComponent.prototype.ngOnChanges = function (changes) {
    };
    SlotListComponent.prototype.ngDoCheck = function () {
    };
    SlotListComponent.prototype.displayGender = function (gender) {
        return gender === types_1.Gender.Boy ? 'Boy' :
            gender === types_1.Gender.Girl ? 'Girl' :
                'Both';
    };
    SlotListComponent.prototype.getImageUrl = function (imageName) {
        return this.imageService.getImageUrl(imageName);
    };
    SlotListComponent.prototype.getSlotRate = function (slot) {
        return Math.floor(Math.random() * 3) + 3; // 3,4,5
    };
    SlotListComponent.prototype.book = function (slot) {
        this.router.navigate(['bookings/add', slot.id]);
        return false;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SlotListComponent.prototype, "slots", null);
    SlotListComponent = __decorate([
        core_1.Component({
            selector: 'amb-slot-list',
            templateUrl: './slot-list.component.html',
            styleUrls: ['./slot-list.component.css']
        }),
        __metadata("design:paramtypes", [slot_image_service_1.ImageService,
            session_service_1.SessionService,
            router_1.Router,
            util_service_1.UtilService,
            slot_image_service_1.ImageService])
    ], SlotListComponent);
    return SlotListComponent;
}());
exports.SlotListComponent = SlotListComponent;
//# sourceMappingURL=slot-list.component.js.map