import { Component, OnInit } from '@angular/core';
import { Role, Booking } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { NotificationService } from '../notification.service';
import { SessionService } from '../session.service';
import { ImageService } from '../slot-image.service';
import * as _ from 'underscore';
import { BookingService } from '../booking.service';

@Component({
  selector: 'amb-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  ongoingItems: Booking[];
  doneItems: Booking[];

  constructor(
    private api: ApiFacade,
    private util: UtilService,
    private notification: NotificationService,
    public session: SessionService,
    private bookingService: BookingService,
    private imageService: ImageService
  ) { }

  async ngOnInit() {
    this.loadTransactionForConsumer().catch(this.notification.error);
  }

  private async loadTransactionForConsumer(): Promise<void> {
    if(!this.session.hasLoggedIn) {
      console.log('Not logged in');
      return;
    }
    let q: any;
    const accountId = this.session.account.id;
    if(this.session.isProvider) {
      q = {providerId: accountId};
    }else if(this.session.isConsumer) {
      q = {consumerId: accountId};
    }else {
      console.log('Invalid code block');
    }

    const allBookings = await this.api.bookingApi.list(q);
    // Add extra properties on items for view
    allBookings.forEach(async x => {
      const slot = await this.api.slotApi.getOne(x.slotId);
      x = Object.assign(x, {
        status: this.bookingService.getStatus(x).toString(),
        baby: await this.api.babyProfileApi.getOne(x.babyId),
        cost: await this.getCost(x),
        title: slot.title,
        provider: await this.api.accountProfileApi.get({accountId: x.providerId}),
        consumer: await this.api.accountProfileApi.get({accountId: x.consumerId})
      });
    });

    this.ongoingItems = allBookings.filter(x => !x.finishedAt && !x.terminatedAt);
    this.doneItems = allBookings.filter(x => x.finishedAt || x.terminatedAt);
  }

  getTransactionStatus(booking: Booking): string {
    const status = this.bookingService.getStatus(booking);
    return status.toString();
  }

  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrl(imageName);
  }

  getCost(booking: Booking): string{
    return this.bookingService.getCost(booking);
  }
}
