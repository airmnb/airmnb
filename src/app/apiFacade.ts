import { Injectable } from '@angular/core';
import { ApiService, ApiServiceFactory } from './api.service';
import { ServiceSlot, Account, ProviderProfile, ConsumerProfile, BabyProfile, Transaction, Booking, Image } from '../../types';
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
  providerProfileApi: ApiService<ProviderProfile>;
  consumerProfileApi: ApiService<ConsumerProfile>;
  babyProfileApi: ApiService<BabyProfile>;

  reviewModel: {};

  constructor(
    apiFactory: ApiServiceFactory,
  ) {
    this.tranApi = apiFactory.produce('transaction');
    this.bookingApi = apiFactory.produce('booking');
    this.slotApi = apiFactory.produce('slot');
    this.accountApi = apiFactory.produce('account');
    this.providerProfileApi = apiFactory.produce('provider_profile');
    this.consumerProfileApi = apiFactory.produce('consumer_profile');
    this.babyProfileApi = apiFactory.produce('baby_profile');
  }

  getReviewContent() {

  }

}
