import { Injectable } from '@angular/core';
import { ApiFacade } from './apiFacade';
import { UtilService } from './util.service';
import { Transaction, TransactionStatus } from '../../types';

@Injectable()
export class TransactionService {

  constructor(
    private api: ApiFacade,
    private util: UtilService
  ) { }

  async getTransactionsConvertableFromBookings(consumerId: string): Promise<Transaction[]> {
    const bookings = await this.api.bookingApi.list({
      consumerId,
      open: true
    });
    const trans = bookings.map(b => {
      const t: Transaction = {
        id: this.util.newGuid(),
        bookingId: b.id,
        slotId: b.slotId,
        providerId: b.providerId,
        consumerId: consumerId,
        babyId: b.babyId,
        createdAt: new Date()
      };
      return t;
    });
    return trans;
  }

  getTransactionStatus(tran: Transaction): TransactionStatus {
    if(tran.terminatedAt) {
      return TransactionStatus.Terminated;
    }
    if(tran.finishedAt) {
      return TransactionStatus.Finished;
    }
    if(tran.providerCheckOutImageName) {
      return TransactionStatus.Ending;
    }
    if(tran.startedAt) {
      return TransactionStatus.Started;
    }
    if(tran.consumerCheckOutImageName) {
      return TransactionStatus.Launched;
    }
    if(tran.createdAt) {
      return TransactionStatus.ReadToLaunch;
    }
    throw new Error('Invalid status of this transaction');
  }

  async launch(tran: Transaction, startImageNameByConsumer: string): Promise<Transaction>{
    const booking = await this.api.bookingApi.getOne(tran.bookingId);

    if(booking.expiredAt && booking.expiredAt < new Date()) {
      throw new Error('Booking was expired.');
    }
    tran.consumerCheckOutImageName = startImageNameByConsumer;

    const tranId = await this.api.tranApi.add(tran);
    booking.open = false;
    await this.api.bookingApi.update(booking);
    return tran;
  }

  async start(tranId: string, startImageNameByProvider: string): Promise<Transaction> {
    const tran = await this.api.tranApi.getOne(tranId);
    tran.providerCheckInImageName = startImageNameByProvider;
    tran.startedAt = new Date();
    await this.api.tranApi.update(tran);
    return tran;
  }

  async ending(tranId: string, endImageNameByProvider: string): Promise<Transaction> {
    const tran = await this.api.tranApi.getOne(tranId);
    tran.providerCheckOutImageName = endImageNameByProvider;
    await this.api.tranApi.update(tran);
    return tran;
  }

  async finish(tranId: string, endImageNameByConsumer: string): Promise<Transaction> {
    const tran = await this.api.tranApi.getOne(tranId);
    tran.consumerCheckOutImageName = endImageNameByConsumer;
    tran.finishedAt = new Date();
    await this.api.tranApi.update(tran);
    return tran;
  }

  async getCost(tran: Transaction): Promise<number> {
    const slot = await this.api.slotApi.getOne(tran.slotId);
    return slot ? slot.price : 0;
  }

}
