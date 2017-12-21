import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session.service';
import { ServiceSlot, Booking, BabyProfile, Gender, Role } from '../../../types';
import { ApiFacade } from '../apiFacade';
import { BookingService } from '../booking.service';
import { SlotService } from '../slot.service';
import { NotificationService } from '../notification.service';
import { BabyService } from '../baby.service';
import * as _ from 'underscore';
import { UtilService } from '../util.service';

@Component({
  selector: 'amb-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {
  items: {slot: ServiceSlot, booking: Booking, baby: BabyProfile}[] = [];

  constructor(
    private activatedRouter: ActivatedRoute,
    private session: SessionService,
    private api: ApiFacade,
    private bookingService: BookingService,
    private slotService: SlotService,
    private notificationService: NotificationService,
    private babyService: BabyService,
    private util: UtilService
  ) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(p => {
      const slotId = p.slotId;
      let task: Promise<void>;
      if(slotId) {
        // List for this slot
        task = this.loadForSlot(slotId);
      } else if(this.session.role === Role.Provider) {
        // List all for provider
        task = this.loadAllForProvider();
      } else if(this.session.role === Role.Consumer) {
        // List all for provider
        task = this.loadAllForConsumer();
      } else {
        throw new Error('Impossible code block');
      }
      task.catch(this.notificationService.error);
    });
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  private setModel(slots: ServiceSlot[], bookings: Booking[], babies: BabyProfile[]) {
    const slotDic = new Map<string, ServiceSlot>();
    const babyDic = new Map<string, BabyProfile>();
    slots.forEach(s => slotDic.set(s.id, s));
    babies.forEach(b => babyDic.set(b.id, b));
    this.items = bookings.map(booking => {
      return {
        slot: slotDic.get(booking.slotId),
        booking,
        baby: babyDic.get(booking.babyId)
      };
    });
  }

  private async getUniqueBookingsBabies(bookings: Booking[]): Promise<BabyProfile[]> {
    const babyIds = _.unique(bookings.map(b => b.babyId));
    return await this.babyService.ListAllBabies(babyIds);
  }

  private async loadForSlot(slotId: string): Promise<void> {
    const slotTask = this.api.slotApi.getOne(slotId);
    const bookingsTask = this.api.bookingApi.list({slotId});
    const result = await Promise.all([slotTask, bookingsTask]);
    const slot = result[0];
    const bookings = result[1];
    const babies = await this.getUniqueBookingsBabies(bookings);
    this.setModel([slot], bookings, babies);
  }

  private async loadAllForProvider(): Promise<void> {
    if(this.session.role !== Role.Provider) {
      throw new Error("Not a provider");
    }
    const accountId = this.session.account.id;
    const bookings = await this.bookingService.listBookingsForProvider(accountId);
    const slotIds = bookings.map(b => b.slotId);
    const slots = await this.slotService.listSlots(slotIds);
    const babies = await this.getUniqueBookingsBabies(bookings);
    this.setModel(slots, bookings, babies);
  }

  private async loadAllForConsumer(): Promise<void> {
    if(this.session.role !== Role.Consumer) {
      throw new Error("Not a consumer");
    }
    const accountId = this.session.account.id;
    const bookings = await this.bookingService.listAliveBookingsForConsumer(accountId);
    const slotIds = bookings.map(b => b.slotId);
    const slots = await this.slotService.listSlots(slotIds);
    const babies = await this.getUniqueBookingsBabies(bookings);
    this.setModel(slots, bookings, babies);
  }

  cancel(booking: Booking) {
    this.cancelImpl(booking).catch(this.notificationService.error);
    return false;
  }

  private async cancelImpl(booking: Booking): Promise<void> {
    await this.api.bookingApi.delete(booking.id);
    await this.api.slotApi.updateFunc(booking.slotId, s => {
      s.bookingCount--;
      return s;
    });
    this.items = this.items.filter(x => x.booking !== booking);
  }
}
