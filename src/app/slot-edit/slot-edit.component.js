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
var util_service_1 = require("../util.service");
var session_service_1 = require("../session.service");
var types_1 = require("../../../types");
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
var moment = require("moment");
var slot_image_service_1 = require("../slot-image.service");
var SlotEditComponent = /** @class */ (function () {
    function SlotEditComponent(api, util, session, router, imageService) {
        this.api = api;
        this.util = util;
        this.session = session;
        this.router = router;
        this.imageService = imageService;
    }
    SlotEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.assureRole(types_1.Role.Provider);
        var accountId = this.session.account.id;
        this.loadSlots(accountId).subscribe(function (x) { return _this.slots = x; });
    };
    SlotEditComponent.prototype.loadSlots = function (accountId) {
        var p = this.api.slotApi.list({ providerId: accountId });
        return Observable_1.Observable.fromPromise(p);
    };
    SlotEditComponent.prototype.edit = function (slot) {
        this.router.navigate(['slots/edit', slot.id]);
        return false;
    };
    SlotEditComponent.prototype.delete = function (slot) {
        var _this = this;
        if (!confirm('Delete this one?')) {
            return false;
        }
        this.api.slotApi.delete(slot.id).then(function () {
            _this.slots = _this.slots.filter(function (x) { return x !== slot; });
        });
        return false;
    };
    SlotEditComponent.prototype.displayGender = function (gender) {
        return this.util.displayGender(gender);
    };
    SlotEditComponent.prototype.displayTime = function (slot) {
        var start = moment(slot.start);
        var end = moment(slot.end);
        var diff = end.diff(start, 'minutes') / 60;
        return diff + " hours";
    };
    SlotEditComponent.prototype.getImageUrl = function (slot) {
        if (slot.imageNames && slot.imageNames.length) {
            return this.imageService.getImageUrl(slot.imageNames[0]);
        }
        else {
            return "";
        }
    };
    SlotEditComponent = __decorate([
        core_1.Component({
            selector: 'amb-slot-edit',
            templateUrl: './slot-edit.component.html',
            styleUrls: ['./slot-edit.component.css']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            util_service_1.UtilService,
            session_service_1.SessionService,
            router_1.Router,
            slot_image_service_1.ImageService])
    ], SlotEditComponent);
    return SlotEditComponent;
}());
exports.SlotEditComponent = SlotEditComponent;
//# sourceMappingURL=slot-edit.component.js.map