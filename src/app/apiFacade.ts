import { Injectable } from '@angular/core';
import { ApiService, ApiServiceFactory } from './api.service';
import { ServiceSlot, Account, BabyProfile, Transaction, Booking, Image, AccountProfile, EventPlace, EventSite } from '../../types';
import { SessionService } from './session.service';
import { NotificationService } from './notification.service';
import { ImageService } from './slot-image.service';
import { SlotService } from './slot.service';

@Injectable()
export class ApiFacade {
  tranApi: ApiService<Transaction>;
  bookingApi: ApiService<Booking>;
  imageApi: ApiService<Image>;
  slotApi: ApiService<ServiceSlot>;
  placeApi: ApiService<EventPlace>;
  accountApi: ApiService<Account>;
  accountProfileApi: ApiService<AccountProfile>;
  babyProfileApi: ApiService<BabyProfile>;
  eventSiteApi: ApiService<EventSite>;

  reviewModel: {};

  constructor(
    apiFactory: ApiServiceFactory,
  ) {
    this.tranApi = apiFactory.produce('transaction');
    this.bookingApi = apiFactory.produce('booking');
    this.slotApi = apiFactory.produce('slot');
    this.placeApi = apiFactory.produce('place');
    this.accountApi = apiFactory.produce('account');
    this.accountProfileApi = apiFactory.produce('account_profile');
    this.babyProfileApi = apiFactory.produce('baby_profile');
    this.eventSiteApi = apiFactory.produce('event_site');
  }

  getReviewContent() {

  }

}
