import { Component, OnInit } from '@angular/core';
import { ServiceSlot } from '../../../types';
import * as uuid from "uuid";
import { ApiServiceFactory, ApiService } from '../api.service';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'amb-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
  private api: ApiService;

  model: ServiceSlot = {
    id: null,
    providerId: null,
    ageFrom: 3,
    ageTo: 6,
    start: new Date(),
    end: new Date(),
    gender: 2,
    otherCondition: "",
    price: 50,
    title: "New title",
    text: ""
  };

  constructor(apiFactory: ApiServiceFactory,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private modalService: ModalService) {
    this.api = apiFactory.produce('slot');
   }

  ngOnInit() {
  }

  private isNewSlot(): boolean {
    return !this.model.id;
  }

  save() {
    if(!this.sessionService.hasLoggedIn) {
      // this.notificationService.error('Please log in first');
      this.modalService.openLoginModal();
      return false;
    }
    const producerId = this.sessionService.account.id;
    if(this.isNewSlot()) {
      this.model.id = uuid.v4();
    }
    this.api.add(this.model)
    .then(
      x => this.notificationService.info(`Added slot ${x}`)
    )
    .catch(
      e => this.notificationService.error(e)
    );
  }
}
