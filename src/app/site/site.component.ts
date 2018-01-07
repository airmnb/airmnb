import { Component, OnInit } from '@angular/core';
import { EventSite } from '../../../types';
import { SessionService } from '../session.service';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { NotificationService } from '../notification.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'amb-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  isNew: boolean;
  imageNames: string[] = [];
  model: EventSite = {
    id: this.util.newGuid(),
    providerId: null,
    name: null,
    location: {
      address: null,
      coord: null
    },
    info: null,
    imageNames: []
  };

  errorMessage: string;

  constructor(
    private session: SessionService,
    private api: ApiFacade,
    private util: UtilService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      const slotId = p.id;
      this.isNew = !slotId;
      if(this.isNew) {
        this.model.providerId = this.session.account.id;
      }else{
        // Edit mode
        this.api.eventSiteApi.getOne(slotId)
        .then(
          s => {
            if(s) {
              this.model = s;
            }
          }
        ).catch(this.notification.error);
      }
    });
  }

  async onSubmit() {
    try{
      if(this.isNew) {
        await this.api.eventSiteApi.add(this.model);
      } else {
        await this.api.eventSiteApi.update(this.model);
      }
      this.router.navigate(['sites']);
    }catch(e){
      this.notification.error(e);
    }
  }

}
