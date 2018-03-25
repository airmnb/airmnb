import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { ApiFacade } from '../core/apiFacade';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';

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
    private router: Router
  ) { }

  ngOnInit() {
    this.session.assureRole(MnbRole.Provider);
    const accountId = this.session.account.id;
    this.loadSlots(accountId);
  }

  private async loadSlots(accountId: string) {
    this.slots = await this.api.slotApi.list({providerId: accountId});
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
}
