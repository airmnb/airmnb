import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
// i18n
import localeEnUs from '@angular/common/locales/en-US-POSIX';
import localeEnUsExtra from '@angular/common/locales/extra/en-US-POSIX';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localeZhHansExtra from '@angular/common/locales/extra/zh-Hans';
// i18n
import localeJa from '@angular/common/locales/ja';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { NgbModule, NgbDatepickerModule,  NgbTimepickerModule, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { NotificationComponent } from './notification/notification.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AddressInputComponent } from './address-input/address-input.component';
import { environment } from '../environments/environment';
import { SlotListComponent } from './slot-list/slot-list.component';
import { ImageUploadModule } from "angular2-image-upload";
import { LoginContentComponent } from './login-content/login-content.component';
import { SignupContentComponent } from './signup-content/signup-content.component';
import { SlotComponent } from './slot/slot.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SlotEditComponent } from './slot-edit/slot-edit.component';
import { BookingComponent } from './booking/booking.component';
import { SlotDisplayComponent } from './slot-display/slot-display.component';
import { BookingListComponent } from './booking-list/booking-list.component';
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
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AgepickerComponent } from './agepicker/agepicker.component';
import { BabiesComponent } from './babies/babies.component';
import { BabyComponent } from './baby/baby.component';
import { SitesComponent } from './sites/sites.component';
import { SiteComponent } from './site/site.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { TransactionComponent } from './transaction/transaction.component';
import { BabyAvatarComponent } from './baby-avatar/baby-avatar.component';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { LoadingComponent } from './loading/loading.component';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { NgxAmapModule } from 'ngx-amap';
import { AddressInputGaodeComponent } from './address-input-gaode/address-input-gaode.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from "angular4-social-login";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddressInputGoogleComponent } from './address-input-google/address-input-google.component';

const sso_config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(environment.googleClientId)
  }
]);

export function getSsoConfig() {
  return sso_config;
}

@NgModule({
  declarations: [
    AppComponent,
    AboutusComponent,
    DateTimePickerComponent,
    NotificationComponent,
    AddressInputGoogleComponent,
    SlotListComponent,
    LoginContentComponent,
    SignupContentComponent,
    SlotComponent,
    ProfileContentComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    SlotEditComponent,
    BookingComponent,
    SlotDisplayComponent,
    BookingListComponent,
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
    TakePhotoComponent,
    TransactionComponent,
    BabyAvatarComponent,
    BookingCardComponent,
    LoadingComponent,
    AddressInputGaodeComponent,
    LandingPageComponent,
    AddressInputComponent
  ],
  imports: [
    CoreModule,

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
    NgxAmapModule.forRoot(
      {
        apiKey: environment.gaodeApiKey,
        urlPath: "https://webapi.amap.com/maps"
      }
    ),
    ImageUploadModule.forRoot(),
    Ng2SmartTableModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    NgbTimepickerConfig,
    GoogleMapsAPIWrapper,
    MarkerManager,
    HttpClient,
    {
      provide: AuthServiceConfig,
      useFactory: getSsoConfig
    }
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

