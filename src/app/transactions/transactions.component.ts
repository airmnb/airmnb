import { Component, OnInit } from '@angular/core';
import { Transaction, Role } from '../../../types';
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

  ongoingItems: Transaction[];
  doneItems: Transaction[];

  constructor(
    private api: ApiFacade,
    private util: UtilService,
    private notification: NotificationService,
    public session: SessionService,
    private tranService: TransactionService,
    private imageService: ImageService
  ) { }

  async ngOnInit() {
    this.loadTransactionForConsumer().catch(this.notification.error);
  }

  private async loadTransactionForConsumer(): Promise<void> {
    if(!this.session.hasLoggedIn) {
      console.log('Not logged in');
      return;
    }
    let q: any;
    const accountId = this.session.account.id;
    if(this.session.isProvider) {
      q = {providerId: accountId};
    }else if(this.session.isConsumer) {
      q = {consumerId: accountId};
    }else {
      console.log('Invalid code block');
    }

    const allTrans = await this.api.tranApi.list(q);
    // Add extra properties on items for view
    allTrans.forEach(async x => {
      const slot = await this.api.slotApi.getOne(x.slotId);
      x = Object.assign(x, {
        status: this.tranService.getTransactionStatus(x).toString(),
        baby: await this.api.babyProfileApi.getOne(x.babyId),
        cost: await this.getCost(x),
        title: slot.title,
        provider: await this.api.accountProfileApi.get({accountId: x.providerId}),
        consumer: await this.api.accountProfileApi.get({accountId: x.consumerId})
      });
    });

    this.ongoingItems = allTrans.filter(x => !x.finishedAt && !x.terminatedAt);
    this.doneItems = allTrans.filter(x => x.finishedAt || x.terminatedAt);
  }

  getTransactionStatus(tran: Transaction): string {
    const status = this.tranService.getTransactionStatus(tran);
    return status.toString();
  }

  getImageUrl(imageName: string): string {
    return this.imageService.getImageUrl(imageName);
  }

  async getCost(tran: Transaction): Promise<number>{
    return await this.tranService.getCost(tran);
  }
}
