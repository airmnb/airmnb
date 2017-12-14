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

  getTransactionStatus(tran: Transaction): TransactionStatus {
    if(tran.terminatedAt) {
      return TransactionStatus.Terminated;
    }
    if(tran.finishedAt) {
      return TransactionStatus.Finished;
    }
    if(tran.doneImageIdByProvider) {
      return TransactionStatus.Ending;
    }
    if(tran.startedAt) {
      return TransactionStatus.Started;
    }
    if(tran.doneImageIdByConsumer) {
      return TransactionStatus.Launched;
    }
    throw new Error('Invalid status of this transaction');
  }

  async launch(bookingId: string, startImageNameByConsumer: string): Promise<Transaction>{
    const booking = await this.api.bookingApi.getOne(bookingId);
    if(booking.expiredAt && booking.expiredAt < new Date()) {
      throw new Error('Booking was expired.');
    }

    const tran: Transaction = {
      id: this.util.newGuid(),
      bookingId: bookingId,
      createdAt: new Date(),
      startedImageIdByConsumer: startImageNameByConsumer
    };
    const tranId = await this.api.tranApi.add(tran);
    booking.open = false;
    await this.api.bookingApi.update(booking);
    return tran;
  }

  async start(tranId: string, startImageNameByProvider: string): Promise<Transaction> {
    const tran = await this.api.tranApi.getOne(tranId);
    tran.startedImageIdByProvider = startImageNameByProvider;
    tran.startedAt = new Date();
    await this.api.tranApi.update(tran);
    return tran;
  }

  async ending(tranId: string, endImageNameByProvider: string): Promise<Transaction> {
    const tran = await this.api.tranApi.getOne(tranId);
    tran.doneImageIdByProvider = endImageNameByProvider;
    await this.api.tranApi.update(tran);
    return tran;
  }

  async finish(tranId: string, endImageNameByConsumer: string): Promise<Transaction> {
    const tran = await this.api.tranApi.getOne(tranId);
    tran.doneImageIdByConsumer = endImageNameByConsumer;
    tran.finishedAt = new Date();
    await this.api.tranApi.update(tran);
    return tran;
  }

}
