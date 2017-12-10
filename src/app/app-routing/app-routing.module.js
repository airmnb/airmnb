"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var home_component_1 = require("../home/home.component");
var provider_dashboard_component_1 = require("../provider-dashboard/provider-dashboard.component");
var consumer_dashboard_component_1 = require("../consumer-dashboard/consumer-dashboard.component");
var aboutus_component_1 = require("../aboutus/aboutus.component");
var add_slot_component_1 = require("../add-slot/add-slot.component");
var routes = [
    {
        path: '',
        component: home_component_1.HomeComponent
    },
    {
        path: 'provider',
        component: provider_dashboard_component_1.ProviderDashboardComponent
    },
    {
        path: 'provider/addslot',
        component: add_slot_component_1.AddSlotComponent
    },
    {
        path: 'consumer',
        component: consumer_dashboard_component_1.ConsumerDashboardComponent
    },
    {
        path: 'aboutus',
        component: aboutus_component_1.AboutusComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                router_1.RouterModule.forRoot(routes)
            ],
            exports: [
                router_1.RouterModule
            ],
            declarations: []
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map