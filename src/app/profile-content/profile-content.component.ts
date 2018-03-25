import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as uuid from 'uuid';
import { ApiFacade } from '../core/apiFacade';
import { ApiServiceFactory, ApiService } from '../core/api.service';
import { SessionService } from '../core/session.service';
import { NotificationService } from '../core/notification.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  public uploadApiUrl = "/api/image/";
  @Input() profileRole: MnbRole;

  model = {
    id: null,
    firstName: null,
    lastName: null,
    dob: null,
    gender: null,
    preferredMap: "google",
    location: {
      address: null,
      lng: null,
      lat: null
    },
    images: [],
    description: null,
    language: {
      english: null,
      chinese: null,
      japanese: null
    }
  };

  get isProvider(): boolean {
    return this.session.isProvider;
  }

  constructor(private api: ApiFacade,
  private session: SessionService,
  private notificationService: NotificationService,
  private util: UtilService,
  private router: Router
  ) {
    }

  ngOnInit() {
    // this.getUploadedImages()
    // .then(images => this.images = images)
    // .catch(e => this.notificationService.error(e));
    const accountId = this.session.account.id;
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
    this.model.location = Object.assign(this.model.location, p.location);
    this.model.dob = p.dob;
    this.model.gender = p.gender;
    this.model.images = p.images;
    this.model.description = p.description;
    this.model.preferredMap = p.preferredMap;
    // this.model.age.a23 = p.ageFrom <= 2 && 3 < p.ageTo;
    // this.model.age.a34 = p.ageFrom <= 3 && 4 < p.ageTo;
    // this.model.age.a45 = p.ageFrom <= 4 && 5 < p.ageTo;
    // this.model.age.a56 = p.ageFrom <= 5 && 6 <= p.ageTo;
    // this.model.language.english = p.languages.includes('en');
    // this.model.language.chinese = p.languages.includes('ch');
    // this.model.language.japanese = p.languages.includes('jp');
  }

  async onSubmit() {
    // const profile: Profile = {
    //   id: uuid.v4(),
    //   accountId: this.sessionService.account.id,
    //   firstName: this.model.firstName,
    //   lastName: this.model.lastName,
    //   dob: this.model.dob,
    //   gender: this.model.gender
    // };
    // this.api.providerProfileApi.add(profile);
    const p: AccountProfile = {
      id: this.model.id || this.util.newGuid(),
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      dob: this.model.dob,
      location: this.model.location,
      accountId: this.session.account.id,
      gender: this.model.gender,
      images: this.model.images,
      description: this.model.description,
      preferredMap: this.model.preferredMap
    };

    try{
      await this.api.accountProfileApi.add(p);
      await this.session.refreshProfile();
      this.router.navigate(['']);
    } catch(e) {
      this.notificationService.error(e);
    }
  }
}
