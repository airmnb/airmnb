import { Injectable, Inject } from '@angular/core';
import {DOCUMENT} from '@angular/platform-browser';

import * as uuid from 'uuid';
import * as moment from 'moment';
import * as _ from 'underscore';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Location }   from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class UtilService {

  private _isInTheGreatWall: boolean;

  constructor(
    @Inject(DOCUMENT) private document,
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    route: ActivatedRoute
  ) {
    this._isInTheGreatWall = /\bairmnb.com\b/i.test(document.location.hostname);
  }

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

  isNullOrUndefined(value) {
    return value === null || value === undefined;
  }

  parseInputDateTime(date: string, time: string): Date {
    const input = `${date} ${time}`; // YYYY-MM-dd HH:mm
    return moment(input).toDate();
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

  get isInTheGreatWall(): boolean {
    return this._isInTheGreatWall;
  }
}
