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
var map_service_service_1 = require("./map-service.service");
var aboutus_component_1 = require("./aboutus/aboutus.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var angular_font_awesome_1 = require("angular-font-awesome");
var date_time_picker_component_1 = require("./date-time-picker/date-time-picker.component");
var add_slot_component_1 = require("./add-slot/add-slot.component");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var notification_service_1 = require("./notification.service");
var notification_component_1 = require("./notification/notification.component");
var core_2 = require("@agm/core");
var address_input_component_1 = require("./address-input/address-input.component");
var environment_1 = require("../environments/environment");
var slot_list_component_1 = require("./slot-list/slot-list.component");
var slot_service_1 = require("./slot.service");
var angular2_image_upload_1 = require("angular2-image-upload");
var slot_image_service_1 = require("./slot-image.service");
var login_content_component_1 = require("./login-content/login-content.component");
var signup_content_component_1 = require("./signup-content/signup-content.component");
var register_modal_component_1 = require("./register-modal/register-modal.component");
var provider_profile_component_1 = require("./provider-profile/provider-profile.component");
var slot_component_1 = require("./slot/slot.component");
var profile_content_component_1 = require("./profile-content/profile-content.component");
var baby_content_component_1 = require("./baby-content/baby-content.component");
var booking_service_1 = require("./booking.service");
var apiFacade_1 = require("./apiFacade");
var header_component_1 = require("./header/header.component");
var login_component_1 = require("./login/login.component");
var signup_component_1 = require("./signup/signup.component");
var account_profile_component_1 = require("./account-profile/account-profile.component");
var util_service_1 = require("./util.service");
var slot_edit_component_1 = require("./slot-edit/slot-edit.component");
var booking_component_1 = require("./booking/booking.component");
var angular2_wizard_1 = require("angular2-wizard");
var slot_display_component_1 = require("./slot-display/slot-display.component");
var booking_list_component_1 = require("./booking-list/booking-list.component");
var baby_service_1 = require("./baby.service");
var transactions_component_1 = require("./transactions/transactions.component");
var map_search_component_1 = require("./map-search/map-search.component");
var marker_manager_1 = require("@agm/core/services/managers/marker-manager");
var animations_2 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var form_field_1 = require("@angular/material/form-field");
var material_moment_adapter_1 = require("@angular/material-moment-adapter");
var timepicker_component_1 = require("./timepicker/timepicker.component");
var image_uploader_component_1 = require("./image-uploader/image-uploader.component");
var event_place_component_1 = require("./event-place/event-place.component");
var event_place_list_component_1 = require("./event-place-list/event-place-list.component");
var select_component_1 = require("./select/select.component");
var select_option_service_1 = require("./select-option.service");
var datepicker_component_1 = require("./datepicker/datepicker.component");
var agepicker_component_1 = require("./agepicker/agepicker.component");
var babies_component_1 = require("./babies/babies.component");
var baby_component_1 = require("./baby/baby.component");
var sites_component_1 = require("./sites/sites.component");
var site_component_1 = require("./site/site.component");
var search_result_component_1 = require("./search-result/search-result.component");
var take_photo_component_1 = require("./take-photo/take-photo.component");
var transaction_component_1 = require("./transaction/transaction.component");
var baby_avatar_component_1 = require("./baby-avatar/baby-avatar.component");
var booking_card_component_1 = require("./booking-card/booking-card.component");
var loading_component_1 = require("./loading/loading.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                home_component_1.HomeComponent,
                aboutus_component_1.AboutusComponent,
                date_time_picker_component_1.DateTimePickerComponent,
                add_slot_component_1.AddSlotComponent,
                notification_component_1.NotificationComponent,
                address_input_component_1.AddressInputComponent,
                slot_list_component_1.SlotListComponent,
                login_content_component_1.LoginContentComponent,
                signup_content_component_1.SignupContentComponent,
                register_modal_component_1.RegisterModalComponent,
                provider_profile_component_1.ProviderProfileComponent,
                slot_component_1.SlotComponent,
                profile_content_component_1.ProfileContentComponent,
                baby_content_component_1.BabyContentComponent,
                header_component_1.HeaderComponent,
                login_component_1.LoginComponent,
                signup_component_1.SignupComponent,
                account_profile_component_1.AccountProfileComponent,
                slot_edit_component_1.SlotEditComponent,
                booking_component_1.BookingComponent,
                slot_display_component_1.SlotDisplayComponent,
                booking_list_component_1.BookingListComponent,
                transactions_component_1.TransactionsComponent,
                map_search_component_1.MapSearchComponent,
                timepicker_component_1.TimepickerComponent,
                image_uploader_component_1.ImageUploaderComponent,
                event_place_component_1.EventPlaceComponent,
                event_place_list_component_1.EventPlaceListComponent,
                select_component_1.SelectComponent,
                datepicker_component_1.DatepickerComponent,
                agepicker_component_1.AgepickerComponent,
                babies_component_1.BabiesComponent,
                baby_component_1.BabyComponent,
                sites_component_1.SitesComponent,
                site_component_1.SiteComponent,
                search_result_component_1.SearchResultComponent,
                take_photo_component_1.TakePhotoComponent,
                transaction_component_1.TransactionComponent,
                baby_avatar_component_1.BabyAvatarComponent,
                booking_card_component_1.BookingCardComponent,
                loading_component_1.LoadingComponent
            ],
            imports: [
                material_moment_adapter_1.MatMomentDateModule,
                form_field_1.MatFormFieldModule,
                material_1.MatAutocompleteModule,
                material_1.MatButtonModule,
                material_1.MatButtonToggleModule,
                material_1.MatCardModule,
                material_1.MatCheckboxModule,
                material_1.MatChipsModule,
                material_1.MatDatepickerModule,
                material_1.MatDialogModule,
                material_1.MatExpansionModule,
                material_1.MatGridListModule,
                material_1.MatIconModule,
                material_1.MatInputModule,
                material_1.MatListModule,
                material_1.MatMenuModule,
                material_1.MatNativeDateModule,
                material_1.MatPaginatorModule,
                material_1.MatProgressBarModule,
                material_1.MatProgressSpinnerModule,
                material_1.MatRadioModule,
                material_1.MatRippleModule,
                material_1.MatSelectModule,
                material_1.MatSidenavModule,
                material_1.MatSliderModule,
                material_1.MatSlideToggleModule,
                material_1.MatSnackBarModule,
                material_1.MatSortModule,
                material_1.MatTableModule,
                material_1.MatTabsModule,
                material_1.MatToolbarModule,
                material_1.MatTooltipModule,
                material_1.MatStepperModule,
                animations_2.NoopAnimationsModule,
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
                ng2_smart_table_1.Ng2SmartTableModule,
                angular2_wizard_1.FormWizardModule
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
                slot_service_1.SlotService,
                slot_image_service_1.ImageService,
                booking_service_1.BookingService,
                apiFacade_1.ApiFacade,
                util_service_1.UtilService,
                baby_service_1.BabyService,
                core_2.GoogleMapsAPIWrapper,
                marker_manager_1.MarkerManager,
                select_option_service_1.SelectOptionService
            ],
            entryComponents: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map