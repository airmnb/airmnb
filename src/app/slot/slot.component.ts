import { Component, OnInit } from '@angular/core';
import { ServiceSlot } from '../../../types';
import * as uuid from "uuid";
import { ApiServiceFactory, ApiService } from '../api.service';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import { ModalService } from '../modal.service';
import * as moment from "moment";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'amb-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
  private api: ApiService;

  model = {
    capping: 5,
    date: null,
    timeFrom: null,
    timeTo: null,
    ageFrom: null,
    ageTo: null,
    description: null,
    price: 50,
    title: "Fun party time"
  };

  private ConvertToSlot(): ServiceSlot {
    const producerId = this.sessionService.account.id;
    const slot: ServiceSlot = {
      id: uuid.v4(),
      providerId: producerId,
      ageFrom: this.model.ageFrom || 3,
      ageTo: this.model.ageTo || 6,
      start: this.getStartTime(),
      end: this.getEndTime(),
      gender: 2,
      otherCondition: this.model.description,
      price: this.model.price,
      title: this.model.title,
      text: this.model.description,
      capping: this.model.capping
    };
    return slot;
  }

  private getStartTime(): Date {
    try{
      return moment().year(this.model.date.year)
      .month(this.model.date.month)
      .day(this.model.date.day)
      .hour(this.model.timeFrom.hour)
      .minute(this.model.timeFrom.minute)
      .toDate();
    }catch(e){
      return new Date();
    }
  }

  private getEndTime(): Date {
    try{
      return moment().year(this.model.date.year)
        .month(this.model.date.month)
        .day(this.model.date.day)
        .hour(this.model.timeTo.hour)
        .minute(this.model.timeTo.minute)
        .toDate();
    }catch(e){
      return new Date();
    }
  }


  constructor(apiFactory: ApiServiceFactory,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private modalService: ModalService,
    public activeModal: NgbActiveModal) {
    this.api = apiFactory.produce('slot');
   }

  ngOnInit() {
  }

  onSubmit() {
    if(!this.sessionService.hasLoggedIn) {
      // this.notificationService.error('Please log in first');
      this.modalService.openLoginModal();
      return false;
    }
    const producerId = this.sessionService.account.id;
    const slot = this.ConvertToSlot();
    this.api.add(slot)
    .then(
      x => {this.notificationService.info(`Added slot ${x}`);
        this.activeModal.dismiss();
        window.location.reload();
      }
    )
    .catch(
      e => this.notificationService.error(e)
    );
  }
}
