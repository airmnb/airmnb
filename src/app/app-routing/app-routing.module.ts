import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProviderDashboardComponent } from '../provider-dashboard/provider-dashboard.component';
import { ConsumerDashboardComponent } from '../consumer-dashboard/consumer-dashboard.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { AddSlotComponent } from '../add-slot/add-slot.component';
import { ProfileComponent } from '../profile/profile.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
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
