import { Component, OnInit, Input } from '@angular/core';
import { NotificationService } from '../notification.service';
import { SessionService } from '../session.service';
import { ImageService } from '../slot-image.service';
import { ApiFacade } from '../apiFacade';

@Component({
  selector: 'amb-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Input() slotId: string;
  @Input() accountId: string;
  public uploadApiUrl = "/api/image/";
  public images: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private sessionService: SessionService,
    private imageService: ImageService,
    private api: ApiFacade
  ) { }

  ngOnInit() {
  }

  public async onUploadFinished(event): Promise<void> {
    const resp = event.serverResponse;
    const filename = resp.text();
    if(resp.status === 200) {
      if (this.slotId) {
        await this.tieImageToSlot(filename);
      } else if(this.accountId) {
        await this.tieImageToProvider(filename);
      }
    } else {
      this.notificationService.error(resp);
    }
  }

  private async tieImageToSlot(imageName: string) {
    await this.api.slotApi.updateFunc(this.slotId, s => {
      const images = s.imageNames || [];
      images.push(imageName);
      s.imageNames = images;
      return s;
    });
  }

  private async tieImageToProvider(imageName: string) {
    const accountId = this.sessionService.account.id;
    await this.imageService.saveImageNameForProvider(imageName, accountId);
  }
}
