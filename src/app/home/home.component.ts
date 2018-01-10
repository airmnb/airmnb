import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import * as moment from "moment";
import { LatLngLiteral } from '@agm/core';

import { SearchQuery, SelectOption, ServiceSlot, Gender } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { ApiService } from '../core/api.service';
import { MapServiceService } from '../core/map-service.service';
import { NotificationService } from '../core/notification.service';
import { SelectOptionService } from '../core/select-option.service';
import { SessionService } from '../core/session.service';
import { ImageService } from '../core/slot-image.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  get ageOptions(): SelectOption[] {
    return this.selectOptionService.ageFromOptions;
  }

  public mapSearch = true;
  public slots: ServiceSlot[];

  public submitted = false;
  public model = {
    location: {
      address: <string>null,
      lng: null,
      lat: null
    },
    distance: 1,
    age: -1,
    gender: -1,
    date: null,
    timeFrom: {
      hour: 0,
      minute: 0
    },
    timeTo: {
      hour: 0,
      minute: 0
    },
  };

  constructor(
    ngbTimerConfig: NgbTimepickerConfig,
    private session: SessionService,
    private router: Router,
    private mapService: MapServiceService,
    private notificationService: NotificationService,
    private selectOptionService: SelectOptionService,
    private api: ApiFacade,
    private imageService: ImageService,
    private util: UtilService
  ) {
    ngbTimerConfig.seconds = false;
    ngbTimerConfig.spinners = false;
  }

  ngOnInit(){
    console.log('isProvider', this.session.isProvider);
    if(this.session.isProvider) {
      this.router.navigate(['slots']);
      return;
    }
    // Get the current geolocation
    if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
    this.loadSlots();
  }

  private async loadSlots() {
    this.slots = await this.api.slotApi.list({$where: "this.bookingCount < this.capping"});
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.imageService.getImageUrl(slot.imageNames[0]);
    } else {
      return "";
    }
  }

  private setPosition(position){
    const coords = position.coords;
    this.mapService.getAddress(coords)
      .then(x => {
        this.model.location = x;
      })
      .catch(e => null);
  }

  book(slot: ServiceSlot) {
    if(!slot) {
      return;
    }
    this.router.navigate(['/bookings/add/', slot.id]);
  }

  get hasLoggedIn(): boolean{
    return !!this.session.account;
  }

  mapCenterChange(latLng: LatLngLiteral) {
    console.log(latLng);
  }

  async search() {
    this.submitted = true;
    try{
      const queryObj = this.composeQuery();
      const queryParams = {q: JSON.stringify(queryObj)};
      this.router.navigate(['/search'], {queryParams});
    }catch (e){
      this.notificationService.error(e);
      this.submitted = false;
    }
  }

  toggleMap() {
    this.mapSearch = !this.mapSearch;
  }

  private composeQuery(): SearchQuery {
    return {
      age: this.model.age >= 0 ? this.model.age : null,
      // start: this.getDate(this.model.date, this.model.timeFrom.hour, this.model.timeFrom.minute),
      // end: this.getDate(this.model.date, this.model.timeTo.hour, this.model.timeTo.minute),
      gender: this.model.gender >= 0 ? this.model.gender : null,
      distance: this.model.distance,
      mapCenter: {
        lng: this.model.location.lng,
        lat: this.model.location.lat
      }
    };
  }

  private getDate(date: {year: number, month: number, day: number}, hour: number, minute: number): number {
    try{
      const d = moment();
      d.year(date.year);
      d.month(date.month);
      d.day(date.day);
      d.hour(hour);
      d.minute(minute);
      d.second(0);
      return d.toDate().valueOf();
    }catch(e){
      return undefined;
    }
  }
}
