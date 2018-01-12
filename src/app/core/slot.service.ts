import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SearchQuery, ServiceSlot, Gender } from '../../../types';
import { ApiFacade } from './apiFacade';
import { ApiService, ApiServiceFactory } from './api.service';
import { NotificationService } from './notification.service';
import { SessionService } from './session.service';

@Injectable()
export class SlotService {
  constructor(private notificationService: NotificationService,
    private sessionService: SessionService,
    private api: ApiFacade
  ) {
  }

  public async listSlots(slotIds?: string[]): Promise<ServiceSlot[]> {
    const query = slotIds && slotIds.length ? {id: {
      $in: slotIds
    }} : null;
    return await this.api.slotApi.list(query);
  }

  public async search(query: SearchQuery, limit: number = 10): Promise<ServiceSlot[]> {
    const q = this.convertToMongoQuery(query);
    console.log('Search slots query:', query, q);
    return await this.api.slotApi.list(q);
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
        $lte: query.start
      };
    }
    if(query.end) {
      q.end = {
        $gte: query.end
      };
    }
    if(query.gender !== undefined) {
      q.gender = {
        $eq: query.gender
      };
    }
    if(query.mapCenter) {
      q.locationMongoGeo = {
        $near: {
          $geometry: {type: "Point", coordinates: [query.mapCenter.lng, query.mapCenter.lat]},
          $maxDistance: (query.distance || 1) * 1000
        }
      };
    }
    return q;
  }

}
