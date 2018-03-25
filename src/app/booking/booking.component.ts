import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';

import { ApiFacade } from '../core/apiFacade';
import { NotificationService } from '../core/notification.service';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {


  slot: ServiceSlot;
  babies: BabyProfile[];
  theBaby: BabyProfile;
  isComplete: boolean;
  bookingLink: string;

  constructor(
    private session: SessionService,
    private api: ApiFacade,
    private notificationService: NotificationService,
    private util: UtilService,
    private activatedRouter: ActivatedRoute
  ) { }

  get isFreeEvent(): boolean {
    return this.slot && !this.slot.price;
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(p => {
      this.loadData(p.slotId).catch(e => this.notificationService.error(e));
    });
  }

  goBack(stepper: MatStepper){
    stepper.previous();
  }

  goForward(stepper: MatStepper){
    stepper.next();
  }

  private async loadData(slotId: string): Promise<void> {
    this.slot = await this.api.slotApi.getOne(slotId);
    this.babies = await this.api.babyProfileApi.list({consumerId: this.session.account.id});
  }

  displayGender(gender: Gender){
    return this.util.displayGender(gender);
  }

  onChooseBabyNext(event){
  }

  onPaymentNext(event) {
  }

  async onSubmit(event){
    try {
      const bookingId = await this.createBooking();
      this.bookingLink = this.util.getBookingDeepLinkUrl(bookingId);
      this.isComplete = true;
    } catch(e) {
      this.notificationService.error(e);
    }
  }

  private async createBooking(): Promise<string> {
    const booking = this.generateBooking();
    const bookingId = await this.api.bookingApi.add(booking);
    await this.api.slotApi.updateFunc(this.slot.id, s => {
      s.bookingCount += 1;
      return s;
    });
    return bookingId;
  }

  private generateBooking(): Booking {
    const b: Booking = {
      id: this.util.newGuid(),
      babyId: this.theBaby.id,
      consumerId: this.theBaby.consumerId,
      slotId: this.slot.id,
      providerId: this.slot.providerId,
      createdAt: new Date()
    };
    return b;
  }
}
