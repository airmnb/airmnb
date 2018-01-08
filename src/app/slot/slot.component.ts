import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot, Gender, EventSite, SelectOption, MapLocation } from '../../../types';
import * as uuid from "uuid";
import { ApiServiceFactory, ApiService } from '../api.service';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import * as moment from "moment";
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
      this.model = value;
      this.isNew = false;
    }
  }

  private _siteId: string;
  get siteId(): string {
    return this._siteId;
  }
  set siteId(siteId: string) {
    this._siteId = siteId;
    this.model.siteId = siteId;
    const site = this.sites.find(x => x.id === siteId);
    if(site) {
      this.model.location = site.location;
    } else {
      this.model.location = null;
    }
  }

  model: ServiceSlot = {
    id: this.util.newGuid(),
    capping: 5,
    bookingCount: 0,
    gender: Gender.Either,
    description: null,
    price: 8,
    providerId: this.session.account.id,
    text: null,
    title: null,
    ageFrom: 2,
    ageTo: 6,
    date: new Date(),
    timeFrom: null,
    timeTo: null,
    imageNames: null,
    eventPlaceId: null,
    siteId: null,
    location: <MapLocation>null,
    locationMongoGeo: null
  };

  sites: EventSite[];
  siteOptions: SelectOption[];

  constructor(
    private api: ApiFacade,
    private session: SessionService,
    private notificationService: NotificationService,
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
            this.model = s;
            this._siteId = s.siteId;
          }
        ).catch(
          e => this.notificationService.error(e)
        );
      }
    });
    this.loadSiteOptions();
  }

  private async loadSiteOptions() {
    const providerId = this.session.account.id;
    const sites = await this.api.eventSiteApi.list({providerId});
    this.sites = sites;
    this.siteOptions = sites.map(s => ({
      label: `${s.name} - ${s.location.address}`,
      value: s.location
    }));
  }

  // private slotToModel(slot: ServiceSlot) {
  //   const m = {
  //     title: slot.title,
  //     date: this.util.getYearMonthDate(slot.start),
  //     timeFrom: this.util.getHour(slot.start),
  //     timeTo: this.util.getHour(slot.end),
  //     ageFrom: slot.ageFrom,
  //     ageTo: slot.ageTo,
  //     description: slot.otherCondition,
  //     capping: slot.capping,
  //     vacancy: slot.capping - slot.bookingCount,
  //     price: slot.price,
  //     imageNames: slot.imageNames
  //   };
  //   return m;
  // }

  // private modelToSlot(): ServiceSlot {
  //   this.theSlot = Object.assign(this.theSlot, {
  //     title: this.model.title,
  //     start: this.util.getDate(this.model.date, this.model.timeFrom),
  //     end: this.util.getDate(this.model.date, this.model.timeTo),
  //     capping: this.model.capping,
  //     ageFrom: this.model.ageFrom,
  //     ageTo: this.model.ageTo,
  //     price: this.model.price,
  //     otherCondition: this.model.description,
  //     imageNames: this.model.imageNames
  //   });
  //   return this.theSlot;
  // }

  async onSubmit() {
    try {
      if(this.isNew) {
        await this.add(this.model);
      }else {
        await this.update(this.model);
      }
      this.router.navigate(['/slots']);

    }catch(e) {
      this.notificationService.error(e);
    }
  }

  private async add(slot: ServiceSlot): Promise<void>{
    slot.locationMongoGeo = {
      type: "Point",
      coordinates: [slot.location.lng, slot.location.lat]
    };
    await this.api.slotApi.add(slot);
  }

  private async update(slot: ServiceSlot): Promise<void>{
    slot.locationMongoGeo = {
      type: "Point",
      coordinates: [slot.location.lng, slot.location.lat]
    };
    await this.api.slotApi.update(slot);
  }

  public onUploadFinished(error) {
  }
}
