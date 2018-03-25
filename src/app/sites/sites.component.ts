import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { ApiFacade } from '../core/apiFacade';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  sites: EventSite[];

  constructor(
    private api: ApiFacade,
    private util: UtilService,
    private session: SessionService,
    private router: Router
  ) { }

  ngOnInit() {
    this.session.assureRole(MnbRole.Provider);
    const accountId = this.session.account.id;
    this.loadEventSites(accountId).subscribe(x => this.sites = x);
  }

  private loadEventSites(providerId: string): Observable<EventSite[]> {
    const p = this.api.eventSiteApi.list({providerId: providerId});
    return Observable.fromPromise(p);
  }

  edit(site: EventSite) {
    this.router.navigate(['sites', site.id]);
    return false;
  }

  delete(site: EventSite) {
    if(!confirm('Delete this one?')) {
      return false;
    }
    this.api.eventSiteApi.delete(site.id).then(() => {
      this.sites = this.sites.filter(x => x !== site);
    });
    return false;
  }
}
