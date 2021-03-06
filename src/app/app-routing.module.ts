import {NgModule}                from '@angular/core';
import {RouterModule, Routes}    from '@angular/router';

import {AboutusComponent}        from './aboutus/aboutus.component';
import {BabiesComponent}         from './babies/babies.component';
import {BabyComponent}           from './baby/baby.component';
import {BookingComponent}        from './booking/booking.component';
import {BookingListComponent}    from './booking-list/booking-list.component';
import {EventPlaceComponent}     from './event-place/event-place.component';
import {LandingPageComponent}    from './landing-page/landing-page.component';
import {LoginComponent}          from './login/login.component';
import {LoginContentComponent}   from './login-content/login-content.component';
import {SlotComponent}           from './slot/slot.component';
import {SlotEditComponent}       from './slot-edit/slot-edit.component';
import {SlotListComponent}       from './slot-list/slot-list.component';
import {SignupComponent}         from './signup/signup.component';
import {ProfileContentComponent} from './profile-content/profile-content.component';
import {SignupContentComponent}  from './signup-content/signup-content.component';
import {SitesComponent}          from './sites/sites.component';
import {SiteComponent}           from './site/site.component';
import {TransactionComponent}    from './transaction/transaction.component';

const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'login', component: LoginContentComponent},
  {path: 'signup', component: SignupContentComponent},
  {path: 'profile', component: ProfileContentComponent},
  {path: 'profile/:id', component: ProfileContentComponent},
  {path: 'place', component: EventPlaceComponent},
  {path: 'place/:id', component: EventPlaceComponent},
  {path: 'sites', component: SitesComponent},
  {path: 'sites/add', component: SiteComponent},
  {path: 'sites/:id', component: SiteComponent},
  {path: 'slots', component: SlotEditComponent},
  {path: 'slots/bookings', /* For provider*/ component: BookingListComponent},
  {path: 'slots/bookings/:slotId', /* For provider*/ component: BookingListComponent},
  {path: 'slots/add', component: SlotComponent},
  {path: 'slots/edit/:id', component: SlotComponent},
  {path: 'bookings/add/:slotId', component: BookingComponent},
  {path: 'bookings', component: BookingListComponent},
  {path: 'booking/:id', component: TransactionComponent},
  {path: 'aboutus', component: AboutusComponent},
  {path: 'booking/tran/:id', component: TransactionComponent},
  {path: 'babies', component: BabiesComponent},
  {path: 'babies/add', component: BabyComponent},
  {path: 'babies/:id', component: BabyComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
