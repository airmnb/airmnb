import { Injectable } from '@angular/core';

import { ApiService, ApiServiceFactory } from './api.service';
// import { NotificationService } from './notification.service';
// import { SessionService } from './session.service';
// import { SlotService } from './slot.service';

@Injectable()
export class ApiFacade {
  bookingApi: ApiService<Booking>;
  imageApi: ApiService<Image>;
  slotApi: ApiService<ServiceSlot>;
  placeApi: ApiService<EventPlace>;
  accountApi: ApiService<MnbAccount>;
  accountProfileApi: ApiService<AccountProfile>;
  babyProfileApi: ApiService<BabyProfile>;
  eventSiteApi: ApiService<EventSite>;

  reviewModel: {};

  constructor(
    apiFactory: ApiServiceFactory,
  ) {
    this.bookingApi = apiFactory.produce('booking');
    this.slotApi = apiFactory.produce('slot');
    this.placeApi = apiFactory.produce('place');
    this.accountApi = apiFactory.produce('account');
    this.accountProfileApi = apiFactory.produce('account_profile');
    this.babyProfileApi = apiFactory.produce('baby_profile');
    this.eventSiteApi = apiFactory.produce('event_site');
  }
}
