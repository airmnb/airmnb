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
var Rx_1 = require("rxjs/Rx");
var SitesComponent = /** @class */ (function () {
    function SitesComponent(api, util, session, router, imageService) {
        this.api = api;
        this.util = util;
        this.session = session;
        this.router = router;
        this.imageService = imageService;
    }
    SitesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.session.assureRole(types_1.Role.Provider);
        var accountId = this.session.account.id;
        this.loadEventSites(accountId).subscribe(function (x) { return _this.sites = x; });
    };
    SitesComponent.prototype.loadEventSites = function (providerId) {
        var p = this.api.eventSiteApi.list({ providerId: providerId });
        return Rx_1.Observable.fromPromise(p);
    };
    SitesComponent.prototype.edit = function (site) {
        this.router.navigate(['sites', site.id]);
        return false;
    };
    SitesComponent.prototype.delete = function (site) {
        var _this = this;
        if (!confirm('Delete this one?')) {
            return false;
        }
        this.api.eventSiteApi.delete(site.id).then(function () {
            _this.sites = _this.sites.filter(function (x) { return x !== site; });
        });
        return false;
    };
    SitesComponent.prototype.getImageUrl = function (site) {
        if (site.imageNames && site.imageNames.length) {
            return this.imageService.getImageUrl(site.imageNames[0]);
        }
        else {
            return "";
        }
    };
    SitesComponent = __decorate([
        core_1.Component({
            selector: 'amb-sites',
            templateUrl: './sites.component.html',
            styleUrls: ['./sites.component.scss']
        }),
        __metadata("design:paramtypes", [apiFacade_1.ApiFacade,
            util_service_1.UtilService,
            session_service_1.SessionService,
            router_1.Router,
            slot_image_service_1.ImageService])
    ], SitesComponent);
    return SitesComponent;
}());
exports.SitesComponent = SitesComponent;
//# sourceMappingURL=sites.component.js.map