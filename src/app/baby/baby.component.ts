import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BabyProfile } from '../../../types';
import { ApiFacade } from '../core/apiFacade';
import { NotificationService } from '../core/notification.service';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';
import { Location } from '@angular/common';

@Component({
  selector: 'amb-baby',
  templateUrl: './baby.component.html',
  styleUrls: ['./baby.component.scss']
})
export class BabyComponent implements OnInit {

  isNew: boolean;
  model: BabyProfile = {
    id: this.util.newGuid(),
    consumerId: null,
    nickName: null,
    dob: null,
    gender: null,
    hobby: null,
    info: null,
    images: []
  };

  errorMessage: string;

  constructor(
    private session: SessionService,
    private api: ApiFacade,
    private util: UtilService,
    private notification: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(p => {
      const slotId = p.id;
      this.isNew = !slotId;
      if(this.isNew) {
        this.model.consumerId = this.session.account.id;
      }else{
        // Edit mode
        this.api.babyProfileApi.getOne(slotId)
        .then(
          s => {
            this.model = s;
          }
        ).catch(this.notification.error);
      }
    });
  }

  async onSubmit() {
    try{
      if(this.isNew) {
        await this.api.babyProfileApi.add(this.model);
      } else {
        await this.api.babyProfileApi.update(this.model);
      }
      // this.router.navigate(['babies']);
      this.location.back();
    }catch(e){
      this.notification.error(e);
    }
    return false;
  }

  cancel() {
    this.location.back();
    return false;
  }

}
