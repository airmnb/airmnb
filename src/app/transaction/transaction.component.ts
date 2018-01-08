import { Component, OnInit, ViewChild, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { ImageService } from '../slot-image.service';
import { Booking, BookingStatus } from '../../../types';
import { MatStepper } from '@angular/material';
import * as moment from 'moment';
import { SessionService } from '../session.service';
import { BookingService } from '../booking.service';
import { imageFilter } from '../../../server/routes/utils';
import { Subject } from 'rxjs/Subject';
import { Location } from '@angular/common';
import { setInterval, clearInterval } from 'timers';

@Component({
  selector: 'amb-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  isNew: boolean;
  booking: Booking;
  bookingSubject = new Subject();
  private _stepper: MatStepper;
  @ViewChild("stepper") set stepper(stepper: MatStepper){
    if(!stepper) return;
    this._stepper = stepper;
    setTimeout(this.setStepper.bind(this), 0, stepper);
  }
  private _pollingTimer: NodeJS.Timer;

  get isComplete() {
    return this.booking && (this.booking.finishedAt || this.booking.terminatedAt);
  }

  constructor(
    private activatedRouter: ActivatedRoute,
    private api: ApiFacade,
    private util: UtilService,
    private image: ImageService,
    public session: SessionService,
    private bookingService: BookingService,
    private location: Location
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(async p => {
      const bookingId = p.id;
      this.booking = await this.api.bookingApi.getOne(bookingId);
      this.bookingSubject.next();
    });
  }

  ngAfterViewInit() {
    // this.stepper.selectedIndex = 1;
    this.pollBooking();

  }

  ngAfterViewChecked(){
  }

  ngOnDestroy(){
    if(this._pollingTimer) {
      clearInterval(this._pollingTimer);
    }
  }

  private setStepper(stepper: MatStepper){
    if(!stepper) return;

    const status = this.bookingService.getStatus(this.booking);
    let stepperIndex = 0;
    if(!this.booking.providerCheckOutAt) {
      stepperIndex = 3;
    }
    if(!this.booking.consumerCheckOutAt) {
      stepperIndex = 2;
    }
    if(!this.booking.providerCheckInAt) {
      stepperIndex = 1;
    }
    if(!this.booking.consumerCheckInAt) {
      stepperIndex = 0;
    }
    stepper.selectedIndex = stepperIndex;
  }

  getImageUrl(imageName: string): string {
    return imageName ? this.image.getImageUrl(imageName) : null;
  }

  goNext(){
    this._stepper.next();
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

  pollBooking(closeTimer: boolean = false) {
    if(this._pollingTimer) return;
    this._pollingTimer = setInterval(async () => {
      const latestBooking = await this.api.bookingApi.getOne(this.booking.id);
      if(!this.util.deepEquals(this.booking, latestBooking)) {
        console.log('Got new booking');
        this.booking = latestBooking;
        if(closeTimer) {
          clearInterval(this._pollingTimer);
        }
      }
    }, 5000);
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
