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
    date: new Date(),
    timeFrom: 9,
    timeTo: 12,
    ageFrom: 2,
    ageTo: 6,
    description: null,
    capping: null,
    vacancy: null,
    price: null,
    imageNames: [],
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
    end: null,
    imageNames: null,
    eventPlaceId: null
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
    this.activatedRoute.params.subscribe(p => {
      const slotId = p.id;
      this.isNew = !slotId;
      if(!this.isNew) {
        // Edit mode
        this.api.slotApi.getOne(slotId)
        .then(
          s => {
            this.theSlot = s;
            this.model = this.slotToModel(this.theSlot);
          }
        ).catch(
          e => this.notificationService.error(e)
        );
      }
    });
  }

  private slotToModel(slot: ServiceSlot) {
    const m = {
      title: slot.title,
      date: this.util.getYearMonthDate(slot.start),
      timeFrom: this.util.getHour(slot.start),
      timeTo: this.util.getHour(slot.end),
      ageFrom: slot.ageFrom,
      ageTo: slot.ageTo,
      description: slot.otherCondition,
      capping: slot.capping,
      vacancy: slot.capping - slot.bookingCount,
      price: slot.price,
      imageNames: slot.imageNames
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
      otherCondition: this.model.description,
      imageNames: this.model.imageNames
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

  public onUploadFinished(error) {
  }
}
