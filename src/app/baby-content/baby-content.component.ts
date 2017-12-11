import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { BabyProfile } from '../../../types';
import * as uuid from "uuid";
import { ApiServiceFactory, ApiService } from '../api.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'amb-baby-content',
  templateUrl: './baby-content.component.html',
  styleUrls: ['./baby-content.component.css']
})
export class BabyContentComponent implements OnInit {

  model = {
    nickName: null,
    age: null,
    gender: null,
    hobby: null,
    info: null
  };

  errorMessage: string;

  private api: ApiService;

  constructor(private sessionService: SessionService,
    apiFactory: ApiServiceFactory,
    public activeModal: NgbActiveModal
  ) {
    this.api = apiFactory.produce('baby_profile');
  }

  ngOnInit() {
  }

  async onSubmit() {
    const consumerId = this.sessionService.account.id;
    const babyProfile: BabyProfile = {
      id: uuid.v4(),
      consumerId: consumerId,
      age: this.model.age,
      gender: this.model.gender,
      hobby: this.model.hobby,
      info: this.model.info
    };

    try{
      await this.api.add(babyProfile);
      this.activeModal.dismiss();
      window.location.reload();
    }catch(e){
      this.errorMessage = e.message;
    }
  }

}
