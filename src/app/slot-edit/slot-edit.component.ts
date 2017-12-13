import { Component, OnInit } from '@angular/core';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { SessionService } from '../session.service';
import { ServiceSlot, Gender } from '../../../types';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as moment from 'moment';

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
    this.api.slotApi.delete(slot.id).then(() => {
      this.slots = this.slots.filter(x => x !== slot);
    });
    return false;
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  displayTime(slot: ServiceSlot): string {
    const start = moment(slot.start);
    const end = moment(slot.end);
    const diff = end.diff(start, 'minutes') / 60;
    return `${diff} hours`;
  }
}
