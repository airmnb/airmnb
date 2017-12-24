import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiService, ApiServiceFactory, LoginService} from "./api.service";
import { SessionService } from './session.service';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';
import { MapServiceService } from './map-service.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgbModule, NgbDatepickerModule,  NgbTimepickerModule, NgbTimepickerConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { AddSlotComponent } from './add-slot/add-slot.component';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './notification.service';
import { NotificationComponent } from './notification/notification.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AddressInputComponent } from './address-input/address-input.component';
import { environment } from '../environments/environment';
import { SlotListComponent } from './slot-list/slot-list.component';
import { SlotService } from './slot.service';
import { ImageUploadModule } from "angular2-image-upload";
import { ImageService } from './slot-image.service';
import { LoginContentComponent } from './login-content/login-content.component';
import { SignupContentComponent } from './signup-content/signup-content.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ModalService } from './modal.service';
import { ProviderProfileComponent } from './provider-profile/provider-profile.component';
import { SlotComponent } from './slot/slot.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProviderMainComponent } from './provider-main/provider-main.component';
import { BabyContentComponent } from './baby-content/baby-content.component';
import { BookingService } from './booking.service';
import { ApiFacade } from "./apiFacade";
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { UtilService } from './util.service';
import { SlotEditComponent } from './slot-edit/slot-edit.component';
import { TransactionService } from './transaction.service';
import { BookingComponent } from './booking/booking.component';
import { FormWizardModule } from 'angular2-wizard';
import { SlotDisplayComponent } from './slot-display/slot-display.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BabyService } from './baby.service';
import { TransactionsComponent } from './transactions/transactions.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {  MatMomentDateModule} from "@angular/material-moment-adapter";
import { TimepickerComponent } from './timepicker/timepicker.component';
import { ImageUploaderComponent } from './image-uploader/image-uploader.component';
import { EventPlaceComponent } from './event-place/event-place.component';
import { EventPlaceListComponent } from './event-place-list/event-place-list.component';
import { SelectComponent } from './select/select.component';
import { SelectOptionService } from './select-option.service';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AgepickerComponent } from './agepicker/agepicker.component';
import { BabiesComponent } from './babies/babies.component';
import { BabyComponent } from './baby/baby.component';
import { SitesComponent } from './sites/sites.component';
import { SiteComponent } from './site/site.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProviderDashboardComponent,
    ConsumerDashboardComponent,
    AboutusComponent,
    DateTimePickerComponent,
    AddSlotComponent,
    NotificationComponent,
    AddressInputComponent,
    SlotListComponent,
    LoginContentComponent,
    SignupContentComponent,
    RegisterModalComponent,
    ProviderProfileComponent,
    SlotComponent,
    ProfileContentComponent,
    ProviderMainComponent,
    BabyContentComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    AccountProfileComponent,
    SlotEditComponent,
    BookingComponent,
    SlotDisplayComponent,
    BookingViewComponent,
    BookingListComponent,
    TransactionsComponent,
    MapSearchComponent,
    TimepickerComponent,
    ImageUploaderComponent,
    EventPlaceComponent,
    EventPlaceListComponent,
    SelectComponent,
    DatepickerComponent,
    AgepickerComponent,
    BabiesComponent,
    BabyComponent,
    SitesComponent,
    SiteComponent,
    SearchResultComponent
  ],
  imports: [
    MatMomentDateModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    NgbDatepickerModule.forRoot(),
    NgbTimepickerModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey,
      libraries: ["places"]
    }),
    ImageUploadModule.forRoot(),
    Ng2SmartTableModule,
    FormWizardModule
  ],
  providers: [
    ApiService,
    ApiServiceFactory,
    LoginService,
    SessionService,
    MapServiceService,
    CookieService,
    NgbTimepickerConfig,
    NotificationService,
    SlotService,
    ImageService,
    ModalService,
    NgbActiveModal,
    BookingService,
    ApiFacade,
    UtilService,
    TransactionService,
    BabyService,
    GoogleMapsAPIWrapper,
    MarkerManager,
    SelectOptionService
  ],
  entryComponents: [
    RegisterModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
