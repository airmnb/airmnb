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
var api_service_1 = require("./api.service");
var ApiFacade = (function () {
    function ApiFacade(apiFactory) {
        this.tranApi = apiFactory.produce('transaction');
        this.bookingApi = apiFactory.produce('booking');
        this.slotApi = apiFactory.produce('slot');
        this.accountApi = apiFactory.produce('account');
        this.providerProfileApi = apiFactory.produce('provider_profile');
        this.consumerProfileApi = apiFactory.produce('consumer_profile');
        this.babyProfileApi = apiFactory.produce('baby_profile');
    }
    ApiFacade.prototype.getReviewContent = function () {
    };
    ApiFacade = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiServiceFactory])
    ], ApiFacade);
    return ApiFacade;
}());
exports.ApiFacade = ApiFacade;
//# sourceMappingURL=apiFacade.js.map