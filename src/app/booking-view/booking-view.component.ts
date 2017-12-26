import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  Booking
} from '../../../types';
import {
  ApiFacade
} from '../apiFacade';
import {
  UtilService
} from '../util.service';
import { BookingService } from '../booking.service';

@Component({
  selector: 'amb-booking-view',
  templateUrl: './booking-view.component.html',
  styleUrls: ['./booking-view.component.css']
})
export class BookingViewComponent implements OnInit {

  booking: Booking;

  constructor(
    private activatedRouter: ActivatedRoute,
    private api: ApiFacade,
    private router: Router,
    private util: UtilService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    this.activatedRouter.params.subscribe(async p => {
      const bookingId = p.id;
      this.booking = await this.api.bookingApi.getOne(bookingId);
    });
  }

  private async convertToTran(imageName) {
    await this.bookingService.checkIn(this.booking, imageName);
    this.router.navigate(['booking/tran', this.booking.id]);
  }
}
