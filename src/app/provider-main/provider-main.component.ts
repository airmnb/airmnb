import { Component, OnInit } from '@angular/core';
import { ServiceSlot } from '../../../types';
import { SessionService } from '../session.service';
import { ApiServiceFactory, ApiService } from '../api.service';
import { ImageService } from '../slot-image.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalService } from '../modal.service';
import { NotificationService } from '../notification.service';
import * as uuid from 'uuid';
import { ApiFacade } from '../apiFacade';

@Component({
  selector: 'amb-provider-main',
  templateUrl: './provider-main.component.html',
  styleUrls: ['./provider-main.component.css']
})
export class ProviderMainComponent implements OnInit {
  public uploadApiUrl = "/api/image/";
  public images: string[] = [];
  private slots: ServiceSlot[];
  slotsSettings = {
    edit: {
      confirmSave: true,
    },
    add: {
      confirmCreate: true,
      addButtonContent: 'Add service slot'
    },
    delete: {
      confirmDelete: true
    },
    columns: {
      date: {
        title: 'Date',
        filter: false,
        // type: 'custom'
        // renderComponent:
      },
      timeStart: {
        title: 'Start',
        filter: false
      },
      timeEnd: {
        title: 'End',
        filter: false
      },
      hours: {
        title: 'Hours',
        filter: false
      },
      capping: {
        title: 'Capping',
        filter: false,
        editor: {
          type: 'list',
          config: {
            list: [
              {value: 2, title: '2'},
              {value: 3, title: '3'},
              {value: 4, title: '4'},
              {value: 5, title: '5'}
            ]
          }
        }
      },
      price: {
        title: 'Price',
        filter: false
      },
      info: {
        title: 'Additional information',
        filter: false,
        editor: {
          type: 'textarea'
        }
      }
    }
  };
  constructor(
    private api: ApiFacade,
    private slotImageService: ImageService,
    private modal: NgbModal,
    private sessionService: SessionService,
    private router: Router,
    private modalservice: ModalService,
    private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loadAllSlots();

    this.getUploadedImages()
    .then(images => this.images = images)
    .catch(e => this.notificationService.error(e));
  }
 private async loadAllSlots(): Promise<void> {
    const list: ServiceSlot[] = await this.api.slotApi.list({providerId: this.sessionService.account.id});
    this.slots = list;
  }
  public async delete(slot: ServiceSlot) {
    try{
      await this.api.slotApi.delete(slot.id);
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
    const accountId = this.sessionService.account.id;
    await this.slotImageService.saveImageNameForProvider(imageName, accountId);
  }

  async getUploadedImages(): Promise<string[]> {
    const providerId = this.sessionService.account.id;
    const names = await this.slotImageService.getImageNamesForProvider(providerId);
    return names.map(x => "/image/" + x);

  }

  /** For slots */
  onCreate(event){
    const data = event.newData;
    // const babyProfile: ServiceSlot = {
    //   nickName: data.nickName,
    //   age: data.age,
    //   consumerId: this.sessionService.account.id,
    //   gender: data.gender,
    //   id: uuid.v4(),
    //   hobby: data.hobby,
    //   info: data.info
    // };
    // this.slotApi.add(babyProfile)
    //   .then(x => event.confirm.resolve(data))
    //   .catch(e => event.confirm.reject(e));
  }
  onEdit(event){
    const data = event.newData;
    // const babyProfile: ServiceSlot = {
    //   nickName: data.nickName,
    //   age: data.age,
    //   id: data.id,
    //   consumerId: this.sessionService.account.id,
    //   gender: data.gender,
    //   hobby: data.hobby,
    //   info: data.info
    // };
    // this.slotApi.update(babyProfile, data.id)
    //   .then(x => event.confirm.resolve(data))
    //   .catch(e => event.confirm.reject(e));
  }
  onDelete(event){
    const id = event.data.id;
    if(id){
      this.api.slotApi.delete(id)
      .then(x => event.confirm.resolve(null))
      .catch(e => event.confirm.reject(e));
    }
  }

}
