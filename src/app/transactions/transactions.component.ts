import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { NotificationService } from '../notification.service';
import { SessionService } from '../session.service';
import { TransactionService } from '../transaction.service';
import { ImageService } from '../slot-image.service';
import * as _ from 'underscore';

@Component({
  selector: 'amb-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  items: Transaction[];

  constructor(
    private api: ApiFacade,
    private util: UtilService,
    private notification: NotificationService,
    private session: SessionService,
    private tranService: TransactionService,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.loadTransactionForConsumer().catch(this.notification.error);
  }

  private async loadTransactionForConsumer(): Promise<void> {
    if(!this.session.hasLoggedIn || this.session.role !== 'consumer') {
      return;
    }
    const consumerId = this.session.account.id;
    const potentialTrans = await this.tranService.getTransactionsConvertableFromBookings(consumerId);
    const ongoingTrans = await this.api.tranApi.list({
      consumerId
    });
    this.items = _.union(potentialTrans, ongoingTrans);
  }

  getTransactionStatus(tran: Transaction): string {
    const status = this.tranService.getTransactionStatus(tran);
    return status.toString();
  }

  async getBabyNickName(tran: Transaction): Promise<string> {
    const babyId = tran.babyId;
    const baby = await this.api.babyProfileApi.getOne(babyId);
    return baby.nickName;
  }

  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrl(imageName);
  }

  getCost(tran: Transaction): Promise<number>{
    return this.tranService.getCost(tran);
  }
}
