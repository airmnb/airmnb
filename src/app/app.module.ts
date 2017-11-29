import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ApiService, ApiServiceFactory, LoginService} from "./api.service";
import { SessionService } from './session.service';
import { ProviderDashboardComponent } from './provider-dashboard/provider-dashboard.component';
import { ConsumerDashboardComponent } from './consumer-dashboard/consumer-dashboard.component';
import { MapServiceService } from './map-service.service';
import { AboutusComponent } from './aboutus/aboutus.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ProviderDashboardComponent,
    ConsumerDashboardComponent,
    AboutusComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    AppRoutingModule
  ],
  providers: [ApiService, ApiServiceFactory, LoginService, SessionService, MapServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
