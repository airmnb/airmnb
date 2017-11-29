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
var router_1 = require("@angular/router");
var api_service_1 = require("../api.service");
var session_service_1 = require("../session.service");
var ProviderDashboardComponent = (function () {
    function ProviderDashboardComponent(apiServiceFactory, sessionService, router) {
        this.sessionService = sessionService;
        this.router = router;
        this.viewDate = new Date();
        this.events = [];
        this.slotApi = apiServiceFactory.produce("slot");
    }
    ProviderDashboardComponent.prototype.ngOnInit = function () {
    };
    ProviderDashboardComponent = __decorate([
        core_1.Component({
            selector: 'amb-provider-dashboard',
            templateUrl: './provider-dashboard.component.html',
            styleUrls: ['./provider-dashboard.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css']
        }),
        __metadata("design:paramtypes", [api_service_1.ApiServiceFactory, session_service_1.SessionService, router_1.Router])
    ], ProviderDashboardComponent);
    return ProviderDashboardComponent;
}());
exports.ProviderDashboardComponent = ProviderDashboardComponent;
//# sourceMappingURL=provider-dashboard.component.js.map