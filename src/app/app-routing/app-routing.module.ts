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
import { EventPlaceComponent } from '../event-place/event-place.component';
import { LoginContentComponent } from '../login-content/login-content.component';
import { SignupContentComponent } from '../signup-content/signup-content.component';
import { ProfileContentComponent } from '../profile-content/profile-content.component';
import { BabiesComponent } from '../babies/babies.component';
import { BabyComponent } from '../baby/baby.component';
import { SitesComponent } from '../sites/sites.component';
import { SiteComponent } from '../site/site.component';
import { SearchResultComponent } from '../search-result/search-result.component';
import { TransactionComponent } from '../transaction/transaction.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginContentComponent
  },
  {
    path: 'signup',
    component: SignupContentComponent
  },
  {
    path: 'profile',
    component: ProfileContentComponent
  },
  {
    path: 'profile/:id',
    component: ProfileContentComponent
  },
  {
    path: 'place',
    component: EventPlaceComponent
  },
  {
    path: 'place/:id',
    component: EventPlaceComponent
  },
  // {
  //   path: 'slotlist',
  //   component: SlotListComponent
  // },
  {
    path: 'sites',
    component: SitesComponent
  },
  {
    path: 'sites/add',
    component: SiteComponent
  },
  {
    path: 'sites/:id',
    component: SiteComponent
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
    path: 'tran/start/:bookingId',
    component: TransactionComponent
  },
  {
    path: 'booking/:id',
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
    path: 'search',
    component: SearchResultComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  },
  {
    path: 'babies',
    component: BabiesComponent
  },
  {
    path: 'babies/add',
    component: BabyComponent
  },
  {
    path: 'babies/:id',
    component: BabyComponent
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
