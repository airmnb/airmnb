import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Booking,
  Transaction
} from '../../../types';
import {
  ApiFacade
} from '../apiFacade';
import {
  UtilService
} from '../util.service';

@Component({
  selector: 'amb-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {

  booking: Booking;
  tran: Transaction;


  constructor(
    private activatedRouter: ActivatedRoute,
    private api: ApiFacade,
    private router: Router,
    private util: UtilService
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe(async p => {
      const bookingId = p.id;
      this.booking = await this.api.bookingApi.getOne(bookingId);
      if(!this.booking.open) {
        this.tran = await this.api.tranApi.get({bookingId});
      }
    });
  }

  private async convertToTran(imageName: string) {
    const tran: Transaction = {
      id: this.util.newGuid(),
      bookingId: this.booking.id,
      babyId: this.booking.babyId,
      consumerId: this.booking.consumerId,
      providerId: this.booking.providerId,
      slotId: this.booking.slotId,
      createdAt: new Date()
    };

    console.log('Callback', imageName, this.booking);
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
  }
}
