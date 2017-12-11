import { Injectable } from '@angular/core';
import { ApiService, ApiServiceFactory } from './api.service';
import { ApiFacade } from './apiFacade';

@Injectable()
export class BookingService {

  reviewModel: {};

  constructor(
    private api: ApiFacade
  ) {
  }

  getReviewContent() {

  }

}
