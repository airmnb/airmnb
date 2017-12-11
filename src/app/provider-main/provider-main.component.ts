import { Component, OnInit } from '@angular/core';
import { ServiceSlot } from '../../../types';
import { SessionService } from '../session.service';
import { ApiServiceFactory, ApiService } from '../api.service';
import { SlotImageService } from '../slot-image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'amb-provider-main',
  templateUrl: './provider-main.component.html',
  styleUrls: ['./provider-main.component.css']
})
export class ProviderMainComponent implements OnInit {
  private slotApi: ApiService;
  public uploadApiUrl = "/api/image/";
  public images: string[] = [];
  private slots: ServiceSlot[];

  constructor(apiServiceFactory: ApiServiceFactory,
    private slotImageService: SlotImageService,
    private modal: NgbModal,
    private sessionService: SessionService,
    private router: Router,
    private modalservice: ModalService,
    private notificationService: NotificationService) {
    this.slotApi = apiServiceFactory.produce("slot");
  }

  ngOnInit() {
    this.loadAllSlots();

    this.getUploadedImages()
    .then(images => this.images = images)
    .catch(e => this.notificationService.error(e));
  }
 private async loadAllSlots(): Promise<void> {
    const list: ServiceSlot[] = await this.slotApi.list({providerId: this.sessionService.account.id});
    this.slots = list;
  }
  public async delete(slot: ServiceSlot) {
    try{
      await this.slotApi.delete(slot.id);
      this.slots = this.slots.filter(x => x !== slot);
    }catch(e){
      this.notificationService.error(e);
    }
  }

  public edit(slot: ServiceSlot) {
  }

  addSlot(): void {
    // this.router.navigateByUrl("provider/addslot");
    this.modalservice.openAddSlotModal();
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
