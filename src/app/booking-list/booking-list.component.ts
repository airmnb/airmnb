import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { ServiceSlot, Booking, BabyProfile, Gender, Role, Transaction } from '../../../types';
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
  items: {slot: ServiceSlot, booking: Booking, baby: BabyProfile}[] = [];

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

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.imageService.getImageUrl(slot.imageNames[0]);
    } else {
      return "";
    }
  }

  getBabyImageUrl(baby: BabyProfile): string {
    return baby.imageName ? this.imageService.getImageUrl(baby.imageName) : '';
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
        baby: babyDic.get(booking.babyId),
        convertToTran: this.createConvertToTranCallback(booking)
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
    const accountId = this.session.account.id;
    const bookings = await this.bookingService.listBookingsForProvider(accountId);
    const slotIds = bookings.map(b => b.slotId);
    const slots = await this.slotService.listSlots(slotIds);
    const babies = await this.getUniqueBookingsBabies(bookings);
    this.setModel(slots, bookings, babies);
  }

  private async loadAllForConsumer(): Promise<void> {
    const accountId = this.session.account.id;
    const bookings = await this.bookingService.listAliveBookingsForConsumer(accountId);
    const slotIds = bookings.map(b => b.slotId);
    const slots = await this.slotService.listSlots(slotIds);
    const babies = await this.getUniqueBookingsBabies(bookings);
    this.setModel(slots, bookings, babies);
  }

  cancel(booking: Booking) {
    if(!confirm('Delete this one?')) {
      return false;
    }
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

  onPhotoTaken(event) {
    console.log('Photo taken', event);
  }

  async convertToTran(imageName: string) {
    // console.log('callback', imageName, booking);

    // return async (imageName) => {
    //   tran.consumerCheckInImageName = imageName;
    //   tran.consumerCheckInAt = new Date();
    //   // Add a new transaction
    //   const tranId = await this.api.tranApi.add(tran);
    //   // await this.api.tranApi.update(this.tran);

    //   // Update the booking to be un-open
    //   await this.api.bookingApi.updateFunc(tran.bookingId, b => {
    //     b.open = false;
    //     return b;
    //   });

    //   this.router.navigate(['tran', tranId]);
    // };
  }

  private createConvertToTranCallback(booking: Booking) {
    const tran: Transaction = {
      id: this.util.newGuid(),
      bookingId: booking.id,
      babyId: booking.babyId,
      consumerId: booking.consumerId,
      providerId: booking.providerId,
      slotId: booking.slotId,
      createdAt: new Date()
    };

    return async (imageName) => {
      console.log('Callback', imageName, booking);
      tran.consumerCheckInImageName = imageName;
      tran.consumerCheckInAt = new Date();
      // Add a new transaction
      const tranId = await this.api.tranApi.add(tran);
      // await this.api.tranApi.update(this.tran);

      // Update the booking to be un-open
      await this.api.bookingApi.updateFunc(tran.bookingId, b => {
        b.open = false;
        return b;
      });

      this.router.navigate(['tran', tranId]);
    };
  }


}
