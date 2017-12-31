import { Injectable, Inject } from '@angular/core';
import * as uuid from 'uuid';
import * as moment from 'moment';
import { Gender } from '../../types';
import {DOCUMENT} from '@angular/platform-browser';
import * as _ from 'underscore';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class UtilService {

  constructor(
    @Inject(DOCUMENT) private document,
    private translate: TranslateService
  ) { }

  newGuid() {
    return uuid.v4();
  }

  displayGender(gender: Gender): string {
    // tslint:disable-next-line:triple-equals
    return gender == Gender.Boy ? 'Boy' :
      // tslint:disable-next-line:triple-equals
      gender == Gender.Girl ? 'Girl' :
      'Either';
  }

  getHour(date: Date): number {
    const m = moment(date);
    return m.hour();
  }

  getYearMonthDate(d: Date): Date {
    const m = moment(d);
    m.hour(0).minute(0).second(0);
    return m.toDate();
  }

  getDate(date: Date): Date {
    const m = moment(date);
    m.hour(0).minute(0).second(0).millisecond(0);
    return m.toDate();
  }

  getBookingDeepLinkUrl(bookingId: string): string {
    let port = document.location.port;
    if(port && port === "80") {
      port = "";
    }else{
      port = ":" + port;
    }
    return `${document.location.protocol}//${document.location.hostname}${port}/booking/${bookingId}`;
  }

  deepEquals(x: any, y: any): boolean {
    return _.isEqual(x, y);
  }
}
