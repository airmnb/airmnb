import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { MapServiceService } from '../map-service.service';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { SearchQuery } from '../../../types';
import * as moment from "moment";
import { ModalService } from '../modal.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'amb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public submitted = false;
  public model = {
    location: '',
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
    private modalService: ModalService,
    ngbTimerConfig: NgbTimepickerConfig,
    private sessionService: SessionService,
    private router: Router,
    private mapService: MapServiceService,
    private notificationService: NotificationService
  ) {
    ngbTimerConfig.seconds = false;
    ngbTimerConfig.spinners = false;
  }

  ngOnInit(){
    // Get the current geolocation
    if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  private setPosition(position){
    const coords = position.coords;
    this.mapService.getAddress(coords)
      .then(x => this.model.location = this.model.location || x)
      .catch(e => null);
  }

  signup() {
    this.modalService.openSignupModal();
    return false;
  }

  login() {
    if(!this.hasLoggedIn) {
      this.modalService.openLoginModal();
    }
    return false;
  }

  get hasLoggedIn(): boolean{
    return !!this.sessionService.account;
  }

  async search() {
    this.submitted = true;
    try{
      const queryParams = this.composeQuery();
      this.router.navigate(['/consumer'], {queryParams});
    }catch (e){
      this.notificationService.error(e);
      this.submitted = false;
    }
  }

  private composeQuery(): SearchQuery {
    return {
      age: this.model.age >= 0 ? this.model.age : null,
      start: this.getDate(this.model.date, this.model.timeFrom.hour, this.model.timeFrom.minute),
      end: this.getDate(this.model.date, this.model.timeTo.hour, this.model.timeTo.minute),
      gender: this.model.gender >= 0 ? this.model.gender : null
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
