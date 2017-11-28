import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { ProviderDashboardComponent } from '../provider-dashboard/provider-dashboard.component';
import { ConsumerDashboardComponent } from '../consumer-dashboard/consumer-dashboard.component';
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
    path: 'consumer',
    component: ConsumerDashboardComponent
  },
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
