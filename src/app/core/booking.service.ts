import { Injectable } from '@angular/core';

import { Booking, BookingStatus } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { ApiService, ApiServiceFactory } from './api.service';
import { UtilService } from './util.service';
import { SessionService } from './session.service';

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
    };
    return await this.api.bookingApi.list(query);
  }

  async listBookingsForProvider(accountId: string): Promise<Booking[]>{
    const query = {
      providerId: accountId
    };
    return await this.api.bookingApi.list(query);
  }

  getStatus(booking: Booking): BookingStatus {
    if(booking.terminatedAt) return BookingStatus.Terminated;
    if(booking.finishedAt) return BookingStatus.Finished;
    if(booking.startedAt) return BookingStatus.Ongoing;
    if(booking.cancelledAt) return BookingStatus.Cancelled;
    return BookingStatus.Created;
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
    };
    await this.api.bookingApi.add(booking);
  }

  async delete(booking: Booking): Promise<void> {
    if(!confirm('Delete this one?')) {
      return;
    }
    await this.api.bookingApi.delete(booking.id);
    await this.api.slotApi.updateFunc(booking.slotId, x => {
      x.bookingCount--;
      return x;
    });
  }

  isClosed(booking: Booking): boolean {
    return !!(booking.cancelledAt || booking.terminatedAt || booking.finishedAt);
  }

  isActive(booking: Booking): boolean {
    return !this.isClosed(booking);
  }

  canCancel(booking: Booking): boolean {
    return this.isActive(booking) && !booking.startedAt;
  }

  async cancel(booking: Booking): Promise<void> {
    if(booking.startedAt) {
      throw new Error(`Booking ${booking.id} has started and cannot be cancelled.`);
    }
    await this.api.bookingApi.updateFunc(booking.id, b => {
      b.cancelledAt = new Date();
      return b;
    });
    await this.api.slotApi.updateFunc(booking.slotId, x => {
      x.bookingCount--;
      return x;
    });
  }

  canCheckIn(booking: Booking): boolean {
    return this.isActive(booking) && !booking.consumerCheckInAt;
  }

  async checkIn(booking: Booking, imageName: string) {
    if(!this.canCheckIn(booking)) {
      throw new Error(`Booking ${booking.id} has been requested for checked-in.`);
    }
    await this.api.bookingApi.updateFunc(booking.id, x => {
      x.consumerCheckInImageName = imageName;
      x.consumerCheckInAt = new Date();
      return x;
    });
  }

  canCheckInConfirm(booking: Booking): boolean {
    return this.isActive(booking) && !booking.providerCheckInAt;
  }

  async checkInConfirm(booking: Booking, imageName: string) {
    if(!this.canCheckInConfirm(booking)) {
      throw new Error(`Booking ${booking.id} has been confirmed for check-in.`);
    }
    await this.api.bookingApi.updateFunc(booking.id, x => {
      x.providerCheckInImageName = imageName;
      x.providerCheckInAt = new Date();
      x.startedAt = new Date();
      return x;
    });
  }

  async terminate(booking: Booking) {
    if(!booking.startedAt) {
      throw new Error(`Booking ${booking.id} has been started so cannot be terminated.`);
    }
    await this.api.bookingApi.updateFunc(booking.id, x => {
      const now = new Date();
      x.terminatedAt = now;
      x.finishedAt = now;
      return x;
    });
  }

  canCheckOut(booking: Booking): boolean {
    return this.isActive(booking) && !booking.consumerCheckOutAt;
  }

  async checkOut(booking: Booking, imageName: string) {
    if(!this.canCheckOut(booking)) {
      throw new Error(`Booking ${booking.id} has been requested for checked-out.`);
    }
    await this.api.bookingApi.updateFunc(booking.id, x => {
      x.consumerCheckOutImageName = imageName;
      x.consumerCheckOutAt = new Date();
      return x;
    });
  }

  canCheckOutConfirm(booking: Booking): boolean {
    return this.isActive(booking) && !booking.providerCheckOutAt;
  }

  async checkOutConfirm(booking: Booking, imageName: string) {
    if(!this.canCheckOutConfirm(booking)) {
      throw new Error(`Booking ${booking.id} has been confirmed for checked-out.`);
    }
    await this.api.bookingApi.updateFunc(booking.id, x => {
      x.providerCheckOutImageName = imageName;
      x.providerCheckOutAt = new Date();
      x.finishedAt = new Date();
      return x;
    });
  }

  getCost(booking: Booking): string {
    return "XXX";
  }
}
