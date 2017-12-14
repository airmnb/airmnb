import { Injectable } from '@angular/core';
import { ApiService, ApiServiceFactory } from './api.service';
import { ApiFacade } from './apiFacade';
import { UtilService } from './util.service';
import { Observable } from 'rxjs/Observable';
import { Booking } from "../../types";

@Injectable()
export class BookingService {

  reviewModel: {};

  constructor(
    private api: ApiFacade,
    private util: UtilService
  ) {
  }

  getReviewContent() {

  }

  async listAliveBookingsForConsumer(accountId: string): Promise<Booking[]>{
    const query = {
      consumerId: accountId,
      cancelledAt: null,
      expiredAt: {
        $gt: new Date
      },
      open: true
    };
    return await this.api.bookingApi.list(query);
  }

  async listBookingsForProvider(accountId: string): Promise<Booking[]>{
    const query = {
      providerId: accountId
    };
    return await this.api.bookingApi.list(query);
  }

  async create(slotId: string, providerId: string, consumerId: string, babyId: string): Promise<void> {
    const slot = await this.api.slotApi.getOne(slotId);
    if(slot.bookingCount === 0) {
      throw new Error("No more available space for this slot.");
    }
    await this.api.slotApi.updateFunc(slotId, x => {
      x.bookingCount++;
      return x;
    });
    const booking: Booking = {
      id: this.util.newGuid(),
      providerId,
      consumerId,
      slotId,
      babyId,
      createdAt: new Date(),
      cancelledAt: null,
      expiredAt: null,
      open: true
    };
    await this.api.bookingApi.add(booking);
  }

  async delete(booking: Booking): Promise<void> {
    await this.api.bookingApi.delete(booking.id);
    await this.api.slotApi.updateFunc(booking.slotId, x => {
      x.bookingCount--;
      return x;
    });
  }

  async cancel(booking: Booking): Promise<void> {
    await this.api.bookingApi.updateFunc(booking.id, b => {
      b.cancelledAt = new Date();
      b.open = false;
      return b;
    });
    await this.api.slotApi.updateFunc(booking.slotId, x => {
      x.bookingCount--;
      return x;
    });
  }
}
