import { Component, OnInit } from '@angular/core';
import { ApiServiceFactory, ApiService } from '../api.service';
import { AccountProfile, MapLocation } from '../../../types';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import { ApiFacade } from '../apiFacade';

@Component({
  selector: 'amb-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  model = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    address: <MapLocation>null,
    gender: null,
    age: {
      a23: false,
      a34: false,
      a45: false,
      a56: false
    },
    language: {
      english: true,
      chinese: true,
      japanese: false
    }
  };

  constructor(
    private api: ApiFacade,
    private sessionService: SessionService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    const accountId = this.sessionService.account.id;

    this.api.accountProfileApi.get({accountId})
      .then(p => this.setModel(p))
      .catch(e => this.notificationService.error(e));
  }

  private setModel(p: AccountProfile){
    if(!p){
      return;
    }
    this.model.id = p.id,
    this.model.firstName = p.firstName;
    this.model.lastName = p.lastName;
    this.model.address = p.address;
    this.model.age.a23 = p.ageFrom <= 2 && 3 < p.ageTo;
    this.model.age.a34 = p.ageFrom <= 3 && 4 < p.ageTo;
    this.model.age.a45 = p.ageFrom <= 4 && 5 < p.ageTo;
    this.model.age.a56 = p.ageFrom <= 5 && 6 <= p.ageTo;
    this.model.language.english = p.languages.includes('en');
    this.model.language.chinese = p.languages.includes('ch');
    this.model.language.japanese = p.languages.includes('jp');
  }

  onSubmit(){
    const p: AccountProfile = {
      id: this.model.id,
      dob: null,
      gender: null,
      accountId: this.sessionService.account.id,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      address: this.model.address,
    };

    if(p.id){
      this.api.accountProfileApi.update(p, p.id);
    }else{
      this.api.accountProfileApi.add(p);
    }
  }


}
