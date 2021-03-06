import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { ApiFacade } from '../core/apiFacade';
import { BookingService } from '../core/booking.service';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-booking-card',
  templateUrl: './booking-card.component.html',
  styleUrls: ['./booking-card.component.scss']
})
export class BookingCardComponent implements OnInit {

  model: {
    booking: Booking;
    provider: AccountProfile;
    consumer: AccountProfile;
    slot: ServiceSlot;
    baby: BabyProfile;
  };

  @Input() set booking(b: Booking) {
    this.loadModel(b);
  }
  @Output() cancelChange = new EventEmitter<any>();

  get canCancel(): boolean {
    return this.session.isConsumer && this.model && !this.model.booking.cancelledAt && !this.model.booking.startedAt;
  }

  constructor(
    private api: ApiFacade,
    public bookingService: BookingService,
    private router: Router,
    public session: SessionService,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  private async loadModel(booking: Booking) {
    const providerTask = this.api.accountProfileApi.get({accountId: booking.providerId});
    const consumerTask = this.api.accountProfileApi.get({accountId: booking.consumerId});
    const slotTask = this.api.slotApi.getOne(booking.slotId);
    const babyTask = this.api.babyProfileApi.getOne(booking.babyId);
    const ps = await Promise.all([providerTask, consumerTask, slotTask, babyTask]);
    this.model = {
      booking,
      provider: ps[0],
      consumer: ps[1],
      slot: ps[2],
      baby: ps[3]
    };
  }

  async cancel() {
    if(!confirm('Cancel this booking?')) {
      return false;
    }
    await this.bookingService.cancel(this.model.booking);
    this.cancelChange.emit();
    console.log('cancel called');
  }

  async checkIn(imageData: string) {
    await this.bookingService.checkIn(this.model.booking, imageData);
    this.router.navigate(['booking/tran', this.model.booking.id]);
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }
}
