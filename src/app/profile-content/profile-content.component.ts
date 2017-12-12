import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceFactory, ApiService } from '../api.service';
import { AccountProfile, ServiceSlot } from '../../../types';
import * as uuid from 'uuid';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import { ImageService } from '../slot-image.service';
import { ApiFacade } from '../apiFacade';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'amb-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  public uploadApiUrl = "/api/image/";
  public images: string[];
  @Input() profileRole: string;

  model = {
    firstName: null,
    lastName: null,
    dob: null,
    gender: null,
    address: null,
    images: [],
    description: null,
    language: {
      english: null,
      chinese: null,
      japanese: null
    }
  };
  constructor(private api: ApiFacade,
  private sessionService: SessionService,
  private notificationService: NotificationService,
  private slotImageService: ImageService,
  private util: UtilService,
  private router: Router
) {
  }

  ngOnInit() {
    this.getUploadedImages()
    .then(images => this.images = images)
    .catch(e => this.notificationService.error(e));
  }

  onSubmit() {
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
      id: this.util.newGuid(),
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      dob: this.util.getDate(this.model.dob),
      address: this.model.address,
      accountId: this.sessionService.account.id,
      gender: this.model.gender
    };
    this.api.accountProfileApi.add(p)
    .then(x => {
      this.router.navigate([]);
    })
    .catch(e => this.notificationService.error(e));
  }

  public async onUploadFinished(event): Promise<void> {
    const resp = event.serverResponse;
    const filename = resp.text();
    if(resp.status === 200) {
      await this.tieImageToProvider(filename);
    } else {
      this.notificationService.error(resp);
    }
  }

  private async tieImageToProvider(imageName: string) {
    const providerId = this.sessionService.account.id;
    await this.slotImageService.saveImageNameForProvider(imageName, providerId);
  }

  async getUploadedImages(): Promise<string[]> {
    const providerId = this.sessionService.account.id;
    const names = await this.slotImageService.getImageNamesForProvider(providerId);
    return names.map(x => "/image/" + x);
  }


}
