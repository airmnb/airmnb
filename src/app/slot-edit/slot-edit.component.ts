import { Component, OnInit } from '@angular/core';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { SessionService } from '../session.service';
import { ServiceSlot, Gender, Role } from '../../../types';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ImageService } from '../slot-image.service';

@Component({
  selector: 'amb-slot-edit',
  templateUrl: './slot-edit.component.html',
  styleUrls: ['./slot-edit.component.css']
})
export class SlotEditComponent implements OnInit {
  slots: ServiceSlot[];

  constructor(
    private api: ApiFacade,
    private util: UtilService,
    private session: SessionService,
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.session.assureRole(Role.Provider);
    const accountId = this.session.account.id;
    this.loadSlots(accountId).subscribe(x => this.slots = x);
  }

  private loadSlots(accountId: string): Observable<ServiceSlot[]> {
    const p = this.api.slotApi.list({providerId: accountId});
    return Observable.fromPromise(p);
  }

  edit(slot: ServiceSlot) {
    this.router.navigate(['slots/edit', slot.id]);
    return false;
  }

  delete(slot: ServiceSlot) {
    if(!confirm('Delete this one?')) {
      return false;
    }
    this.api.slotApi.delete(slot.id).then(() => {
      this.slots = this.slots.filter(x => x !== slot);
    });
    return false;
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  displayTime(slot: ServiceSlot): string {
    const start = moment(slot.timeFrom);
    const end = moment(slot.timeTo);
    const diff = end.diff(start, 'minutes') / 60;
    return `${diff} hours`;
  }

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.imageService.getImageUrl(slot.imageNames[0]);
    } else {
      return "";
    }
  }
}
