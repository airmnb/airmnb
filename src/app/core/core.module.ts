import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { CookieService } from 'ngx-cookie-service';

import { ApiFacade }                      from './apiFacade';
import { ApiServiceFactory, LoginService} from './api.service';
import { BabyService }                    from './baby.service';
import { BookingService }                 from './booking.service';
import { MapServiceService }              from './map-service.service';
import { NotificationService }            from './notification.service';
import { SelectOptionService }            from './select-option.service';
import { SessionService }                 from './session.service';
import { SlotService }                    from './slot.service';
import { ImageService }                   from './slot-image.service';
import { UtilService }                    from './util.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CookieService,

    ApiFacade,
    ApiServiceFactory,
    LoginService,
    SessionService,
    MapServiceService,
    NotificationService,
    SlotService,
    ImageService,
    BookingService,
    UtilService,
    BabyService,
    SelectOptionService,
  ]
})
export class CoreModule { }
