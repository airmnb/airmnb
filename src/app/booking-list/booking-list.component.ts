import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as _ from 'underscore';

import { ServiceSlot, Booking, BabyProfile, Gender, Role } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { BabyService } from '../core/baby.service';
import { BookingService } from '../core/booking.service';
import { NotificationService } from '../core/notification.service';
import { SessionService } from '../core/session.service';
import { SlotService } from '../core/slot.service';
import { ImageService } from '../core/slot-image.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  activeItems: Booking[];
  closedItems: Booking[];

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
        // List all bookings associated with this slot
        task = this.loadForSlot(slotId);
      } else if(this.session.isProvider) {
        // List all bookings from this provider
        task = this.loadAllForProvider();
      } else if(this.session.isConsumer) {
        // List all bookings by this consumer
        task = this.loadAllForConsumer();
      } else {
        alert('Impossible code block');
        throw new Error('Impossible code block');
      }
      task.catch(this.notificationService.error);
    });
  }

  cancel(booking: Booking) {
    if(!confirm('Cancel this booking?')) {
      return false;
    }
    this.bookingService.cancel(booking);
    this.activeItems = this.activeItems.filter(x => x !== booking);
  }

  get isConsumer(): boolean {
    return this.session.isConsumer;
  }

  private async getUniqueBookingsBabies(bookings: Booking[]): Promise<BabyProfile[]> {
    const babyIds = _.unique(bookings.map(b => b.babyId));
    return await this.babyService.ListAllBabies(babyIds);
  }

  private async loadForSlot(slotId: string): Promise<void> {
    const items = await this.api.bookingApi.list({slotId});
    this.setActiveAndCloseModels(items);
  }

  private async loadAllForProvider(): Promise<void> {
    const accountId = this.session.account.id;
    const items = await this.bookingService.listBookingsForProvider(accountId);
    this.setActiveAndCloseModels(items);
  }

  private async loadAllForConsumer(): Promise<void> {
    const accountId = this.session.account.id;
    const items = await this.bookingService.listAliveBookingsForConsumer(accountId);
    this.setActiveAndCloseModels(items);
  }

  private setActiveAndCloseModels(bookings: Booking[]) {
    this.activeItems = bookings.filter(x => this.bookingService.isActive(x));
    this.closedItems = bookings.filter(x => this.bookingService.isClosed(x));
  }
}
