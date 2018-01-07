import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { SessionService } from './session.service';
import { SearchQuery, ServiceSlot, Gender } from '../../types';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { ApiService, ApiServiceFactory } from './api.service';
import { ApiFacade } from './apiFacade';

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

  public async search(query: SearchQuery): Promise<ServiceSlot[]> {
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
      q.location = {
        $near: {
          $geometry: {type: "Point", coordinates: [query.mapCenter.lng, query.mapCenter.lat]},
          $maxDistance: (query.distance || 1) * 1000
        }
      };
    }
    return {} || q; // Always return all slots for demo.
  }

}
