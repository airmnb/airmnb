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
var session_service_1 = require("./session.service");
var notification_service_1 = require("./notification.service");
var slot_image_service_1 = require("./slot-image.service");
var slot_search_service_service_1 = require("./slot-search-service.service");
var ServiceFacade = (function () {
    function ServiceFacade(apiFactory, sessionService, notificationService, imageService, slotSearchService) {
        this.sessionService = sessionService;
        this.notificationService = notificationService;
        this.imageService = imageService;
        this.slotSearchService = slotSearchService;
        this.tranApi = apiFactory.produce('transaction');
        this.bookingApi = apiFactory.produce('booking');
        this.slotApi = apiFactory.produce('slot');
        this.accountApi = apiFactory.produce('account');
        this.providerProfileApi = apiFactory.produce('provider_profile');
        this.consumerProfileApi = apiFactory.produce('consumer_profile');
        this.babyProfileApi = apiFactory.produce('baby_profile');
    }
    ServiceFacade.prototype.getReviewContent = function () {
    };
    ServiceFacade = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiServiceFactory,
            session_service_1.SessionService,
            notification_service_1.NotificationService,
            slot_image_service_1.ImageService,
            slot_search_service_service_1.SlotSearchServiceService])
    ], ServiceFacade);
    return ServiceFacade;
}());
exports.ServiceFacade = ServiceFacade;
//# sourceMappingURL=serviceFacade.js.map