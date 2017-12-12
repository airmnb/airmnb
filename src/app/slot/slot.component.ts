import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot, Gender } from '../../../types';
import * as uuid from "uuid";
import { ApiServiceFactory, ApiService } from '../api.service';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import { ModalService } from '../modal.service';
import * as moment from "moment";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'amb-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
  isNew: boolean;

  @Input() set slot(value: ServiceSlot) {
    if(value) {
      this.theSlot = value;
      this.isNew = false;
    }
  }

  model = {
    title: null,
    date: null,
    timeFrom: null,
    timeTo: null,
    ageFrom: null,
    ageTo: null,
    description: null,
    capping: null,
    vacancy: null,
    price: null
  };

  theSlot: ServiceSlot = {
    id: this.util.newGuid(),
    capping: 5,
    bookingCount: 0,
    gender: Gender.Either,
    otherCondition: null,
    price: 8,
    providerId: this.sessionService.account.id,
    text: null,
    title: null,
    ageFrom: 2,
    ageTo: 6,
    start: new Date(),
    end: null
  };

  constructor(
    private api: ApiFacade,
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private modalService: ModalService,
    public activeModal: NgbActiveModal,
    private util: UtilService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
   }

  ngOnInit() {
    this.activatedRoute.data.subscribe(x => {
      this.isNew = x.isNew;
      if(!this.isNew) {
        this.theSlot = this.sessionService.databag.editingSlot;
        this.model = this.slotToModel(this.theSlot);
      }
    });
  }

  private slotToModel(slot: ServiceSlot) {
    const m = {
      title: slot.title,
      date: this.util.getYearMonthDate(slot.start),
      timeFrom: this.util.getHourAndMinute(slot.start),
      timeTo: this.util.getHourAndMinute(slot.end),
      ageFrom: slot.ageFrom,
      ageTo: slot.ageTo,
      description: slot.otherCondition,
      capping: slot.capping,
      vacancy: slot.capping - slot.bookingCount,
      price: slot.price
    };
    return m;
  }

  private modelToSlot(): ServiceSlot {
    this.theSlot = Object.assign(this.theSlot, {
      title: this.model.title,
      start: this.util.getDate(this.model.date, this.model.timeFrom),
      end: this.util.getDate(this.model.date, this.model.timeTo),
      capping: this.model.capping,
      ageFrom: this.model.ageFrom,
      ageTo: this.model.ageTo,
      price: this.model.price,
      otherCondition: this.model.description
    });
    return this.theSlot;
  }

  onSubmit() {
    const slot = this.modelToSlot();
    const p = this.isNew ? this.add(slot) : this.update(slot);
    p
    .then(
      () => {
        this.router.navigate(['/slots']);
      }
    )
    .catch(e => this.notificationService.error(e));
  }

  private async add(slot: ServiceSlot): Promise<void>{
    await this.api.slotApi.add(slot);
  }

  private async update(slot: ServiceSlot): Promise<void>{
    await this.api.slotApi.update(slot);
  }


  // onSubmit() {
  //   if(!this.sessionService.hasLoggedIn) {
  //     // this.notificationService.error('Please log in first');
  //     this.modalService.openLoginModal();
  //     return false;
  //   }
  //   const producerId = this.sessionService.account.id;
  //   const slot = this.ConvertToSlot();
  //   this.api.slotApi.add(slot)
  //   .then(
  //     x => {this.notificationService.info(`Added slot ${x}`);
  //       this.activeModal.dismiss();
  //       window.location.reload();
  //     }
  //   )
  //   .catch(
  //     e => this.notificationService.error(e)
  //   );
  // }
}
