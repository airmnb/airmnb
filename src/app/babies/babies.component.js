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
var apiFacade_1 = require("../apiFacade");
var util_service_1 = require("../util.service");
var session_service_1 = require("../session.service");
var router_1 = require("@angular/router");
var slot_image_service_1 = require("../slot-image.service");
var Observable_1 = require("rxjs/Observable");
var BabiesComponent = /** @class */ (function () {
    function BabiesComponent(api, util, session, router, imageService) {
        this.api = api;
        this.util = util;
        this.session = session;
        this.router = router;
        this.imageService = imageService;
    }
    BabiesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.assureRole(types_1.Role.Consumer);
        var accountId = this.session.account.id;
        this.loadBabies(accountId).subscribe(function (x) { return _this.babies = x; });
    };
    BabiesComponent.prototype.loadBabies = function (accountId) {
        var p = this.api.babyProfileApi.list({ consumerId: accountId });
        return Observable_1.Observable.fromPromise(p);
    };
    BabiesComponent.prototype.edit = function (baby) {
        this.router.navigate(['babies', baby.id]);
        return false;
    };
    BabiesComponent.prototype.delete = function (baby) {
        var _this = this;
        if (!confirm('Delete this one?')) {
            return false;
        }
        this.api.babyProfileApi.delete(baby.id).then(function () {
            _this.babies = _this.babies.filter(function (x) { return x !== baby; });
        });
        return false;
    };
    BabiesComponent.prototype.displayGender = function (baby) {
        return this.util.displayGender(baby.gender);
    };
    BabiesComponent.prototype.getImageUrl = function (baby) {
        if (baby.imageName) {
            return this.imageService.getImageUrl(baby.imageName);
        }
        else {
            return "";
        }
    };
    BabiesComponent = __decorate([
        core_1.Component({
            selector: 'amb-babies',
            templateUrl: './babies.component.html',
            styleUrls: ['./babies.component.scss']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            util_service_1.UtilService,
            session_service_1.SessionService,
            router_1.Router,
            slot_image_service_1.ImageService])
    ], BabiesComponent);
    return BabiesComponent;
}());
exports.BabiesComponent = BabiesComponent;
//# sourceMappingURL=babies.component.js.map