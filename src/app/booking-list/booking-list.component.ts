import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { ServiceSlot, Booking, BabyProfile, Gender, Role } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { BookingService } from '../booking.service';
import { SlotService } from '../slot.service';
import { NotificationService } from '../notification.service';
import { BabyService } from '../baby.service';
import * as _ from 'underscore';
import { UtilService } from '../util.service';
import { ImageService } from '../slot-image.service';

@Component({
  selector: 'amb-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  items: Booking[];

  constructor(
    private activatedRouter: ActivatedRoute,
    private session: SessionService,
    private api: ApiFacade,
    private bookingService: BookingService,
    private slotService: SlotService,
    private notificationService: NotificationService,
    private babyService: BabyService,
    private util: UtilService,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(p => {
      const slotId = p.slotId;
      let task: Promise<void>;
      if(slotId) {
        // List for this slot
        task = this.loadForSlot(slotId);
      } else if(this.session.isProvider) {
        // List all for provider
        task = this.loadAllForProvider();
      } else if(this.session.isConsumer) {
        // List all for consumer
        task = this.loadAllForConsumer();
      } else {
        alert('Impossible code block');
        throw new Error('Impossible code block');
      }
      task.catch(this.notificationService.error);
    });
  }

  get isConsumer(): boolean {
    return this.session.isConsumer;
  }


  private async getUniqueBookingsBabies(bookings: Booking[]): Promise<BabyProfile[]> {
    const babyIds = _.unique(bookings.map(b => b.babyId));
    return await this.babyService.ListAllBabies(babyIds);
  }

  private async loadForSlot(slotId: string): Promise<void> {
    this.items = await this.api.bookingApi.list({slotId});
  }

  private async loadAllForProvider(): Promise<void> {
    const accountId = this.session.account.id;
    this.items = await this.bookingService.listBookingsForProvider(accountId);
  }

  private async loadAllForConsumer(): Promise<void> {
    const accountId = this.session.account.id;
    this.items = await this.bookingService.listAliveBookingsForConsumer(accountId);
  }
}
