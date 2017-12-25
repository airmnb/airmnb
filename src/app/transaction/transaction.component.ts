import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { ImageService } from '../slot-image.service';
import { Booking, Transaction } from '../../../types';
import { MatStepper } from '@angular/material';
import * as moment from 'moment';
import { SessionService } from '../session.service';

@Component({
  selector: 'amb-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  isNew: boolean;
  tran: Transaction;
  @ViewChild("stepper") stepper: MatStepper;

  get isComplete() {
    return this.tran && (this.tran.finishedAt || this.tran.terminatedAt);
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private api: ApiFacade,
    private util: UtilService,
    private image: ImageService,
    public session: SessionService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(async p => {
      const bookingId = p.bookingId;

      this.tran = await this.api.tranApi.get({bookingId});
      if(!this.tran) {
        // To start the transaction from the booking
        const booking = await this.api.bookingApi.getOne(bookingId);
        this.tran = {
          id: this.util.newGuid(),
          bookingId: bookingId,
          babyId: booking.babyId,
          consumerId: booking.consumerId,
          providerId: booking.providerId,
          slotId: booking.slotId,
          createdAt: new Date()
        };
      }
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
    this.tran.consumerCheckInImageName = imageName;
    this.tran.consumerCheckInAt = new Date();
    // Add a new transaction
    await this.api.tranApi.add(this.tran);
    // await this.api.tranApi.update(this.tran);

    // Update the booking to be un-open
    await this.api.bookingApi.updateFunc(this.tran.bookingId, b => {
      b.open = false;
      return b;
    });
    this.goNext();
  }

  async providerCheckIn(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }
    this.tran.providerCheckInImageName = imageName;
    this.tran.providerCheckInAt = new Date();
    this.tran.startedAt = new Date();
    await this.api.tranApi.update(this.tran);
    this.goNext();
  }

  async consumerCheckOut(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }
    this.tran.consumerCheckOutImageName = imageName;
    this.tran.consumerCheckOutAt = new Date();
    await this.api.tranApi.update(this.tran);
    this.goNext();
  }

  async providerCheckOut(imageName: string) {
    if(!imageName) {
      console.log('The uploaded process returns a null imageName');
      return;
    }
    this.tran.providerCheckOutImageName = imageName;
    this.tran.providerCheckOutAt = new Date();
    this.tran.finishedAt = new Date();
    await this.api.tranApi.update(this.tran);
  }

  getTransactionTimeString(): string {
    const end = moment(this.tran.finishedAt);
    const start = moment(this.tran.startedAt);
    const span = end.diff(start, 'hours', true);
    const h = Math.floor(span);
    const m = Math.ceil((span - h) * 60);
    return h ? `${h} hours ` : '' + `${m} minutes`;
  }
}
