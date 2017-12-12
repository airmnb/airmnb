import { Injectable } from '@angular/core';
import { ApiService, ApiServiceFactory } from './api.service';
import { ServiceSlot, Account, BabyProfile, Transaction, Booking, Image, AccountProfile } from '../../types';
import { SessionService } from './session.service';
import { NotificationService } from './notification.service';
import { ImageService } from './slot-image.service';
import { SlotSearchServiceService } from './slot-search-service.service';

@Injectable()
export class ApiFacade {
  tranApi: ApiService<Transaction>;
  bookingApi: ApiService<Booking>;
  imageApi: ApiService<Image>;
  slotApi: ApiService<ServiceSlot>;
  accountApi: ApiService<Account>;
  accountProfileApi: ApiService<AccountProfile>;
  babyProfileApi: ApiService<BabyProfile>;

  reviewModel: {};

  constructor(
    apiFactory: ApiServiceFactory,
  ) {
    this.tranApi = apiFactory.produce('transaction');
    this.bookingApi = apiFactory.produce('booking');
    this.slotApi = apiFactory.produce('slot');
    this.accountApi = apiFactory.produce('account');
    this.accountProfileApi = apiFactory.produce('account_profile');
    this.babyProfileApi = apiFactory.produce('baby_profile');
  }

  getReviewContent() {

  }

}
