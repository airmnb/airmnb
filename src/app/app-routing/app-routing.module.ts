import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProviderDashboardComponent } from '../provider-dashboard/provider-dashboard.component';
import { ConsumerDashboardComponent } from '../consumer-dashboard/consumer-dashboard.component';
import { AboutusComponent } from '../aboutus/aboutus.component';
import { AddSlotComponent } from '../add-slot/add-slot.component';
import { ProviderMainComponent } from '../provider-main/provider-main.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { AccountProfileComponent } from '../account-profile/account-profile.component';
import { SlotListComponent } from '../slot-list/slot-list.component';
import { SlotEditComponent } from '../slot-edit/slot-edit.component';
import { SlotComponent } from '../slot/slot.component';
import { BookingComponent } from '../booking/booking.component';
import { BookingViewComponent } from '../booking-view/booking-view.component';
import { BookingListComponent } from '../booking-list/booking-list.component';
import { TransactionsComponent } from '../transactions/transactions.component';
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
    path: 'profile',
    component: AccountProfileComponent
  },
  {
    path: 'profile/:id',
    component: AccountProfileComponent
  },
  {
    path: 'slotlist',
    component: SlotListComponent
  },
  {
    path: 'slots',
    component: SlotEditComponent,
  },
  {
    path: 'slots/bookings', // For provider
    component: BookingListComponent,
  },
  {
    path: 'slots/bookings/:slotId', // For provider
    component: BookingListComponent,
  },
  {
    path: 'slots/add',
    component: SlotComponent

  },
  {
    path: 'slots/edit/:id',
    component: SlotComponent
  },
  {
    path: 'bookings/add/:slotId',
    component: BookingComponent
  },
  {
    path: 'bookings',
    component: BookingListComponent
  },
  {
    path: 'bookings/:id',
    component: BookingViewComponent
  },
  {
    path: 'provider',
    component: ProviderMainComponent
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
  },
  {
    path: 'transactions',
    component: TransactionsComponent
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
