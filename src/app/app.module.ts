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
import { ProfileComponent } from './profile/profile.component';
import { AgmCoreModule } from '@agm/core';
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
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { BookingComponent } from './booking/booking.component';
import { FormWizardModule } from 'angular2-wizard';
import { SlotDisplayComponent } from './slot-display/slot-display.component';
import { BookingViewComponent } from './booking-view/booking-view.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { BabyService } from './baby.service';
import { TransactionsComponent } from './transactions/transactions.component';

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
    ProfileComponent,
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
    ImageUploadComponent,
    BookingComponent,
    SlotDisplayComponent,
    BookingViewComponent,
    BookingListComponent,
    TransactionsComponent
  ],
  imports: [
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
    BabyService
  ],
  entryComponents: [
    RegisterModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
