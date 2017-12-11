import { Component, OnInit, Input } from '@angular/core';
import { ApiServiceFactory, ApiService } from '../api.service';
import { Profile, ServiceSlot } from '../../../types';
import * as uuid from 'uuid';
import { SessionService } from '../session.service';
import { NotificationService } from '../notification.service';
import { SlotImageService } from '../slot-image.service';

@Component({
  selector: 'amb-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.css']
})
export class ProfileContentComponent implements OnInit {

  private api: ApiService;
  public uploadApiUrl = "/api/image/";
  public images: string[];
  @Input() profileRole: string;

  model = {
    firstName: null,
    lastName: null,
    dob: null,
    gender: null,

  };
  constructor(apiFactory: ApiServiceFactory,
  private sessionService: SessionService,
  private notificationService: NotificationService,
  private slotImageService: SlotImageService
) {
    this.api = apiFactory.produce('profile');
  }

  ngOnInit() {
    this.getUploadedImages()
    .then(images => this.images = images)
    .catch(e => this.notificationService.error(e));
  }

  onSubmit() {
    const profile: Profile = {
      id: uuid.v4(),
      accountId: this.sessionService.account.id,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      dob: this.model.dob,
      gender: this.model.gender
    };
    this.api.add(profile);
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
