import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { SessionService } from './session.service';
import { SearchQuery, ServiceSlot, Gender } from '../../types';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService, ApiServiceFactory } from './api.service';

@Injectable()
export class SlotSearchServiceService {

  private apiService: ApiService;

  constructor(private notificationService: NotificationService,
    private sessionService: SessionService,
    apiServiceFactory: ApiServiceFactory
  ) {
    this.apiService = apiServiceFactory.produce('slot');
  }

  public search(query: SearchQuery): Observable<ServiceSlot[]> {
    const consumerId = this.getConsumerId();
    const subject = new Subject<ServiceSlot[]>();
    const q = this.convertToMongoQuery(query);
    this.apiService.list(q)
    .then(
      x => subject.next(x)
    )
    .catch(e => {
      this.notificationService.error(e);
      subject.next();
    });
    return subject.asObservable();
  }

  private getConsumerId(): string {
    const account = this.sessionService.account;
    return account ? account.id : undefined;
  }

  private convertToMongoQuery(query: SearchQuery): any {
    const q: any = {};
    if(query.age) {
      q.ageFrom = {
        $lte: query.age
      };
      q.ageTo = {
        $gte: query.age
      };
    }
    if(query.start) {
      q.start = {
        $lte: new Date(query.start)
      };
    }
    if(query.end) {
      q.end = {
        $gte: new Date(query.end)
      };
    }
    if(query.gender !== undefined) {
      q.gender = {
        $eq: query.gender
      };
    }
    return {} || q; // Always return all slots for demo.
  }

}
