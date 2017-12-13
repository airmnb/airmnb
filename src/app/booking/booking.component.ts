import { Component, OnInit } from '@angular/core';
import { ServiceSlot, BabyProfile } from '../../../types';
import { SessionService } from '../session.service';
import { ApiFacade } from '../apiFacade';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'amb-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {


  slot: ServiceSlot;
  babies: BabyProfile[];
  theBaby: BabyProfile;

  constructor(
    private session: SessionService,
    private api: ApiFacade,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.slot = this.session.databag.bookingSlot;
    this.api.babyProfileApi.list({consumerId: this.session.account.id})
    .then(babies => this.babies = babies)
    .catch(e => this.notificationService.error(e) );
  }

}
