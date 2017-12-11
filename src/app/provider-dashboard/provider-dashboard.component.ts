import {
  Component,
  OnInit
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  ApiServiceFactory,
  ApiService
} from '../api.service';
import {
  SessionService
} from '../session.service';
import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  Subject
} from 'rxjs/Subject';
import {
  NgbModal
} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { ServiceSlot, ProviderImage } from '../../../types';
import * as uuid from "uuid";
import { NotificationService } from '../notification.service';
import { ImageService } from '../slot-image.service';
import { ModalService } from '../modal.service';
import { ApiFacade } from '../apiFacade';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'amb-provider-dashboard',
  templateUrl: './provider-dashboard.component.html',
  styleUrls: ['./provider-dashboard.component.css', '../../../node_modules/angular-calendar/css/angular-calendar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderDashboardComponent implements OnInit {
  public uploadApiUrl = "/api/image/";
  public images: string[] = [];


  constructor(
    private api: ApiFacade,
    private slotImageService: ImageService,
    private modal: NgbModal,
    private sessionService: SessionService,
    private router: Router,
    private modalservice: ModalService,
  private notificationService: NotificationService) {
  }

  @ViewChild('modalContent') modalContent: TemplateRef < any > ;

  view = 'month';

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent<ServiceSlot>;
  };

  actions: CalendarEventAction[] = [{
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({
        event
      }: {
        event: CalendarEvent<ServiceSlot>
      }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({
        event
      }: {
        event: CalendarEvent<ServiceSlot>
      }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject < any > = new Subject();

  events: CalendarEvent<ServiceSlot>[] = [];

  activeDayIsOpen = true;

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: CalendarEvent<ServiceSlot>[]
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent<ServiceSlot>): void {
    this.modalData = {
      event,
      action
    };
    this.modal.open(this.modalContent, {
      size: 'lg'
    });
  }

  // public addEvent(): void {
  //   const slot: ServiceSlot = {
  //     title: 'New event',
  //     start: startOfDay(new Date()),
  //     end: endOfDay(new Date()),
  //     ageFrom: 2,
  //     ageTo: 6,
  //     gender: 2,
  //     otherCondition: '',
  //     providerId: this.sessionService.account.id,
  //     id: uuid.v4(),
  //     price: 50
  //   };
  //   const newEvent: CalendarEvent<ServiceSlot> = {
  //     title: slot.title,
  //     start: slot.start,
  //     end: slot.end,
  //     color: colors.red,
  //     draggable: true,
  //     resizable: {
  //       beforeStart: true,
  //       afterEnd: true
  //     },
  //     meta: slot
  //   };
  //   this.events.push(newEvent);
  //   this.refresh.next();
  //   this.slotApi.add(slot)
  //   .then(x => this.notificationService.info(`Added a service slot '${slot.id}'`))
  //   .catch(e => this.notificationService.error(e));
  // }

  public async delete(event: CalendarEvent<ServiceSlot>) {
    const id = event.meta.id;
    try{
      await this.api.slotApi.delete(id);
      this.notificationService.info(`Deleted the service slot '${id}'`);
      this.events = this.events.filter(x => x !== event);
      this.refresh.next();
    }catch(e){
      this.notificationService.error(e);
    }
  }

  ngOnInit() {
    this.loadAllSlots();
    this.getUploadedImages()
    .then(images => this.images = images)
    .catch(e => this.notificationService.error(e));

  }

  // ngAfterViewChecked(){
  //   //this.modalservice.openProviderProfileModal();
  // }

  addSlot(): void {
    // this.router.navigateByUrl("provider/addslot");
    this.modalservice.openAddSlotModal();
  }

  private async loadAllSlots(): Promise<void> {
    const list: ServiceSlot[] = await this.api.slotApi.list({providerId: this.sessionService.account.id});
    list.forEach(slot => {
      this.events.push({
          title: slot.title,
          start: slot.start,
          end: slot.end,
          color: colors.red,
          actions: this.actions,
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true
          },
          meta: slot
      });
    });
    this.refresh.next();
  }
  private convertToDto(event: CalendarEvent<ServiceSlot>): ServiceSlot {
    const dto: ServiceSlot = event.meta;
    dto.start = event.start;
    dto.end = event.end;
    dto.title = event.title;
    return dto;
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
