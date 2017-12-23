import { Component, OnInit } from '@angular/core';
import { EventSite, Role } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { SessionService } from '../session.service';
import { Router } from '@angular/router';
import { ImageService } from '../slot-image.service';
import { Observable } from 'rxjs/Observable';

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
    private router: Router,
    private imageService: ImageService
  ) { }

  ngOnInit() {
    this.session.assureRole(Role.Provider);
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
    this.api.eventSiteApi.delete(site.id).then(() => {
      this.sites = this.sites.filter(x => x !== site);
    });
    return false;
  }

  getImageUrl(site: EventSite) : string {
    if(site.imageNames && site.imageNames.length) {
      return this.imageService.getImageUrl(site.imageNames[0]);
    } else {
      return "";
    }
  }
}
