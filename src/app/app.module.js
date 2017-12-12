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
var ng2_smart_table_1 = require("ng2-smart-table");
var app_component_1 = require("./app.component");
var home_component_1 = require("./home/home.component");
var api_service_1 = require("./api.service");
var session_service_1 = require("./session.service");
var provider_dashboard_component_1 = require("./provider-dashboard/provider-dashboard.component");
var consumer_dashboard_component_1 = require("./consumer-dashboard/consumer-dashboard.component");
var map_service_service_1 = require("./map-service.service");
var aboutus_component_1 = require("./aboutus/aboutus.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_font_awesome_1 = require("angular-font-awesome");
var date_time_picker_component_1 = require("./date-time-picker/date-time-picker.component");
var add_slot_component_1 = require("./add-slot/add-slot.component");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var notification_service_1 = require("./notification.service");
var notification_component_1 = require("./notification/notification.component");
var profile_component_1 = require("./profile/profile.component");
var core_2 = require("@agm/core");
var address_input_component_1 = require("./address-input/address-input.component");
var environment_1 = require("../environments/environment");
var slot_list_component_1 = require("./slot-list/slot-list.component");
var slot_search_service_service_1 = require("./slot-search-service.service");
var angular2_image_upload_1 = require("angular2-image-upload");
var slot_image_service_1 = require("./slot-image.service");
var login_content_component_1 = require("./login-content/login-content.component");
var signup_content_component_1 = require("./signup-content/signup-content.component");
var register_modal_component_1 = require("./register-modal/register-modal.component");
var modal_service_1 = require("./modal.service");
var provider_profile_component_1 = require("./provider-profile/provider-profile.component");
var slot_component_1 = require("./slot/slot.component");
var profile_content_component_1 = require("./profile-content/profile-content.component");
var provider_main_component_1 = require("./provider-main/provider-main.component");
var baby_content_component_1 = require("./baby-content/baby-content.component");
var booking_service_1 = require("./booking.service");
var apiFacade_1 = require("./apiFacade");
var header_component_1 = require("./header/header.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var account_profile_component_1 = require("./account-profile/account-profile.component");
var util_service_1 = require("./util.service");
var slot_edit_component_1 = require("./slot-edit/slot-edit.component");
var transaction_service_1 = require("./transaction.service");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                provider_dashboard_component_1.ProviderDashboardComponent,
                consumer_dashboard_component_1.ConsumerDashboardComponent,
                aboutus_component_1.AboutusComponent,
                date_time_picker_component_1.DateTimePickerComponent,
                add_slot_component_1.AddSlotComponent,
                notification_component_1.NotificationComponent,
                profile_component_1.ProfileComponent,
                address_input_component_1.AddressInputComponent,
                slot_list_component_1.SlotListComponent,
                login_content_component_1.LoginContentComponent,
                signup_content_component_1.SignupContentComponent,
                register_modal_component_1.RegisterModalComponent,
                provider_profile_component_1.ProviderProfileComponent,
                slot_component_1.SlotComponent,
                profile_content_component_1.ProfileContentComponent,
                provider_main_component_1.ProviderMainComponent,
                baby_content_component_1.BabyContentComponent,
                header_component_1.HeaderComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                account_profile_component_1.AccountProfileComponent,
                slot_edit_component_1.SlotEditComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                ng_bootstrap_1.NgbDatepickerModule.forRoot(),
                ng_bootstrap_1.NgbTimepickerModule.forRoot(),
                angular_font_awesome_1.AngularFontAwesomeModule,
                animations_1.BrowserAnimationsModule,
                angular_calendar_1.CalendarModule.forRoot(),
                app_routing_module_1.AppRoutingModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: environment_1.environment.googleApiKey,
                    libraries: ["places"]
                }),
                angular2_image_upload_1.ImageUploadModule.forRoot(),
                ng2_smart_table_1.Ng2SmartTableModule
            ],
            providers: [
                api_service_1.ApiService,
                api_service_1.ApiServiceFactory,
                api_service_1.LoginService,
                session_service_1.SessionService,
                map_service_service_1.MapServiceService,
                ngx_cookie_service_1.CookieService,
                ng_bootstrap_1.NgbTimepickerConfig,
                notification_service_1.NotificationService,
                slot_search_service_service_1.SlotSearchServiceService,
                slot_image_service_1.ImageService,
                modal_service_1.ModalService,
                ng_bootstrap_1.NgbActiveModal,
                booking_service_1.BookingService,
                apiFacade_1.ApiFacade,
                util_service_1.UtilService,
                transaction_service_1.TransactionService
            ],
            entryComponents: [
                register_modal_component_1.RegisterModalComponent
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map