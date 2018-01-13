import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatTabsModule,
  MatToolbarModule,
  MatStepperModule,
} from '@angular/material';

// i18n
// i18n
import localeEnUs from '@angular/common/locales/en-US-POSIX';
import localeEnUsExtra from '@angular/common/locales/extra/en-US-POSIX';
import localeJa from '@angular/common/locales/ja';
import localeZhHans from '@angular/common/locales/zh-Hans';
import localeZhHansExtra from '@angular/common/locales/extra/zh-Hans';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import { CalendarModule } from 'angular-calendar';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgbModule, NgbDatepickerModule,  NgbTimepickerModule, NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { NgxAmapModule } from 'ngx-amap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { environment } from '../environments/environment';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddressInputComponent } from './address-input/address-input.component';
import { AddressInputGaodeComponent } from './address-input-gaode/address-input-gaode.component';
import { AddressInputGoogleComponent } from './address-input-google/address-input-google.component';
import { AgepickerComponent } from './agepicker/agepicker.component';
import { BabiesComponent } from './babies/babies.component';
import { BabyComponent } from './baby/baby.component';
import { BabyAvatarComponent } from './baby-avatar/baby-avatar.component';
import { BookingCardComponent } from './booking-card/booking-card.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BookingComponent } from './booking/booking.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { DateTimePickerComponent } from './date-time-picker/date-time-picker.component';
import { EventPlaceComponent } from './event-place/event-place.component';
import { EventPlaceListComponent } from './event-place-list/event-place-list.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { LoginContentComponent } from './login-content/login-content.component';
import { MapSearchComponent } from './map-search/map-search.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { SelectComponent } from './select/select.component';
import { SignupContentComponent } from './signup-content/signup-content.component';
import { SignupComponent } from './signup/signup.component';
import { SitesComponent } from './sites/sites.component';
import { SiteComponent } from './site/site.component';
import { SlotDisplayComponent } from './slot-display/slot-display.component';
import { SlotEditComponent } from './slot-edit/slot-edit.component';
import { SlotListComponent } from './slot-list/slot-list.component';
import { SlotComponent } from './slot/slot.component';
import { TakePhotoComponent } from './take-photo/take-photo.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ImageToDataUrlModule } from "ngx-image2dataurl";
import { ImgUploaderComponent } from './img-uploader/img-uploader.component';

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
    AddressInputComponent,
    ImgUploaderComponent
  ],
  imports: [
    CoreModule,

    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,

    LayoutModule,

    NoopAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    // NgbDatepickerModule.forRoot(),
    // NgbTimepickerModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    // CalendarModule.forRoot(),
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
    // Ng2SmartTableModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    HttpClientModule,
    ImageToDataUrlModule
  ],
  providers: [
    // NgbTimepickerConfig,
    GoogleMapsAPIWrapper,
    MarkerManager,
    HttpClient
  ],
  entryComponents: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "/assets/i18n/", ".json");
}

