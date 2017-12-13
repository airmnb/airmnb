import { Injectable, Inject } from '@angular/core';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { Gender } from '../../types';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class UtilService {

  constructor(
    @Inject(DOCUMENT) private document
  ) { }

  newGuid() {
    return uuid.v4();
  }

  displayGender(gender: Gender): string {
    return gender === Gender.Boy ? 'Boy' :
      gender === Gender.Girl ? 'Girl' :
      'Either';
  }

  getHourAndMinute(date: Date): {hour: number, minute: number} {
    const m = moment(date);
    return {
      hour: m.hour(),
      minute: m.minute()
    };
  }

  getYearMonthDate(d: Date): {year: number, month: number, day: number} {
    const m = moment(d);
    return {
      year: m.year(),
      month: m.month() + 1,
      day: m.date()
    };
  }

  getDate(d: {year: number, month: number, day: number}, t?: {hour: number, minute: number}): Date {
    const m = moment();
    m.year(d.year).month(d.month - 1).date(d.day);
    if (t) {
      m.hour(t.hour).minute(t.minute);
    }
    const ret = m.toDate();
    return ret;
  }

  getBookingDeepLinkUrl(bookingId: string): string {
    let port = document.location.port;
    if(port && port === "80") {
      port = "";
    }else{
      port = ":" + port;
    }
    return `${document.location.protocol}//${document.location.hostname}${port}/bookings/${bookingId}`;
  }
}
