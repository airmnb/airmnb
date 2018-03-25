import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

import { ApiFacade } from '../core/apiFacade';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-babies',
  templateUrl: './babies.component.html',
  styleUrls: ['./babies.component.scss']
})
export class BabiesComponent implements OnInit {
  babies: BabyProfile[];

  constructor(
    private api: ApiFacade,
    private util: UtilService,
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.session.assureRole(MnbRole.Consumer);
    const accountId = this.session.account.id;
    this.loadBabies(accountId).subscribe(x => this.babies = x);
  }

  private loadBabies(accountId: string): Observable<BabyProfile[]> {
    const p = this.api.babyProfileApi.list({consumerId: accountId});
    return Observable.fromPromise(p);
  }

  edit(baby: BabyProfile) {
    this.router.navigate(['babies', baby.id]);
    return false;
  }

  delete(baby: BabyProfile) {
    if(!confirm('Delete this one?')) {
      return false;
    }
    this.api.babyProfileApi.delete(baby.id).then(() => {
      this.babies = this.babies.filter(x => x !== baby);
    });
    return false;
  }

  displayGender(baby: BabyProfile): string {
    return this.util.displayGender(baby.gender);
  }
}
