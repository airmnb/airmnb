import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceSlot, MapLocation } from '../../../types';
import * as uuid from "uuid";
import { SessionService } from '../session.service';
import * as moment from "moment";
import { ApiService, ApiServiceFactory } from '../api.service';
import { NotificationService } from '../notification.service';
import { ApiFacade } from '../apiFacade';

@Component({
  selector: 'amb-add-slot',
  templateUrl: './add-slot.component.html',
  styleUrls: ['./add-slot.component.css']
})
export class AddSlotComponent implements OnInit {

  public model: ServiceSlot;

  constructor(private router: Router,
    private session: SessionService,
    private api: ApiFacade,
    private notificationService: NotificationService) {

  }

  private createNewModel(): ServiceSlot {
    const now = moment();
    return {
      id: uuid.v4(),
      providerId: null,
      title: "",
      start: now.toDate(),
      end: now.toDate(),
      ageFrom: 3,
      ageTo: 6,
      gender: 2,
      otherCondition: null,
      capping: 5,
      bookingCount: 0,
      price: 50,
      eventPlaceId: null,
      siteId: null,
      location: <MapLocation>null
    };
  }

  ngOnInit() {
    this.model = this.createNewModel();
    this.session.getAccount().subscribe(account => this.model.providerId = account.id);

  }

  async create(navigateOut: boolean) {
    const api = this.api.slotApi;
    try{
      await api.add(this.model);
      if(navigateOut) {
        this.router.navigateByUrl('provider');
      }
      this.model = this.createNewModel();
      this.notificationService.info(`Successfully create a slot.`);
    }catch(e){
      this.notificationService.error(e);
    }
  }

  cancel() {
    this.router.navigateByUrl('provider');
    this.model = this.createNewModel();
  }
}
