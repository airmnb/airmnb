import { Component, OnInit } from '@angular/core';
import { ServiceSlot, BabyProfile, Gender, Booking } from '../../../types';
import { SessionService } from '../session.service';
import { ApiFacade } from '../apiFacade';
import { NotificationService } from '../notification.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'amb-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {


  slot: ServiceSlot;
  babies: BabyProfile[];
  theBaby: BabyProfile;
  isCompleted: boolean;
  bookingLink: string;

  constructor(
    private session: SessionService,
    private api: ApiFacade,
    private notificationService: NotificationService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.slot = this.session.databag.bookingSlot;
    this.api.babyProfileApi.list({consumerId: this.session.account.id})
    .then(babies => this.babies = babies)
    .catch(e => this.notificationService.error(e) );
  }

  displayGender(gender: Gender){
    return this.util.displayGender(gender);
  }

  onChooseBabyNext(event){
  }

  onPaymentNext(event) {
  }

  onComplete(event){
    this.createBooking().then(bookingId => {
        this.bookingLink = this.util.getBookingDeepLinkUrl(bookingId);
        this.isCompleted = true;
      }
    )
    .catch(e => this.notificationService.error(e));
    console.log(event);
  }

  private getBookingDeepLink(bookingId: string): string {
    return "/bookings/" + bookingId;
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
      open: true,
      createdAt: new Date(),
      providerId: this.slot.providerId,
      cancelledAt: null,
      expiredAt: null,
    };
    return b;
  }
}
