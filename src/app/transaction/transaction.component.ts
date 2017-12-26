import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { ImageService } from '../slot-image.service';
import { Booking } from '../../../types';
import { MatStepper } from '@angular/material';
import * as moment from 'moment';
import { SessionService } from '../session.service';
import { BookingService } from '../booking.service';
import { imageFilter } from '../../../server/routes/utils';

@Component({
  selector: 'amb-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  isNew: boolean;
  booking: Booking;
  @ViewChild("stepper") stepper: MatStepper;

  get isComplete() {
    return this.booking && (this.booking.finishedAt || this.booking.terminatedAt);
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private api: ApiFacade,
    private util: UtilService,
    private image: ImageService,
    public session: SessionService,
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(async p => {
      const bookingId = p.id;
      this.booking = await this.api.bookingApi.getOne(bookingId);
    });
  }

  getImageUrl(imageName: string): string {
    return imageName ? this.image.getImageUrl(imageName) : null;
  }

  goNext(){
    this.stepper.next();
  }

  async consumerCheckIn(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }

    await this.bookingService.checkIn(this.booking, imageName);

    this.goNext();
  }

  async providerCheckIn(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }

    await this.bookingService.checkInConfirm(this.booking, imageName);

    this.goNext();
  }

  async consumerCheckOut(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }
    await this.bookingService.checkOut(this.booking, imageName);

    this.goNext();
  }

  async providerCheckOut(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }
    await this.bookingService.checkOutConfirm(this.booking, imageName);
  }

  getTransactionTimeString(): string {
    const end = moment(this.booking.finishedAt);
    const start = moment(this.booking.startedAt);
    const span = end.diff(start, 'hours', true);
    const h = Math.floor(span);
    const m = Math.ceil((span - h) * 60);
    return h ? `${h} hours ` : '' + `${m} minutes`;
  }
}
