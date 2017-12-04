import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ProviderDashboardComponent } from '../provider-dashboard/provider-dashboard.component';
import { ConsumerDashboardComponent } from '../consumer-dashboard/consumer-dashboard.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { AddSlotComponent } from '../add-slot/add-slot.component';
const routes: Routes = [
  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'provider',
    component: ProviderDashboardComponent
  },
  {
    path: 'provider/addslot',
    component: AddSlotComponent
  },
  {
    path: 'consumer',
    component: ConsumerDashboardComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
