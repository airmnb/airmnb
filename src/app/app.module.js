"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing/app-routing.module");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var angular_calendar_1 = require("angular-calendar");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var api_service_1 = require("./api.service");
var session_service_1 = require("./session.service");
var provider_dashboard_component_1 = require("./provider-dashboard/provider-dashboard.component");
var consumer_dashboard_component_1 = require("./consumer-dashboard/consumer-dashboard.component");
var map_service_service_1 = require("./map-service.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                provider_dashboard_component_1.ProviderDashboardComponent,
                consumer_dashboard_component_1.ConsumerDashboardComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                animations_1.BrowserAnimationsModule,
                angular_calendar_1.CalendarModule.forRoot(),
                app_routing_module_1.AppRoutingModule
            ],
            providers: [api_service_1.ApiService, api_service_1.ApiServiceFactory, api_service_1.LoginService, session_service_1.SessionService, map_service_service_1.MapServiceService],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map