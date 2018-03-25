import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UtilService } from '../core/util.service';
import { Router } from '@angular/router';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'amb-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  slot: ServiceSlot;
  carouselOne: NgxCarousel = {
    grid: {xs: 1, sm: 1, md: 1, lg: 1, all: 0},
    slide: 1,
    speed: 400,
    point: {
      visible: true,
      pointStyles: `
          .ngxcarouselPoint {
            list-style-type: none;
            text-align: center;
            padding: 12px;
            margin: 0;
            white-space: nowrap;
            overflow: auto;
            position: absolute;
            width: 100%;
            bottom: 20px;
            left: 0;
            box-sizing: border-box;
          }
          .ngxcarouselPoint li {
            display: inline-block;
            border: 1px solid rgba(0, 0, 0, 0.55);
            border-radius: 999px;
            background: rgba(255, 255, 255, 0.55);
            padding: 5px;
            margin: 0 3px;
            transition: .4s ease all;
          }
          .ngxcarouselPoint li.active {
              background: white;
              transform: scale(1.2);
          }
        `
    },
    load: 2,
    touch: true,
    loop: true,
    custom: 'banner'
  };

  constructor(
    public dialogRef: MatDialogRef<EventDetailComponent>,
    private util: UtilService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  displayTime(date: string, time: string): Date {
    return this.util.parseInputDateTime(date, time);
  }

  book() {
    this.dialogRef.close();
    this.router.navigate(['/bookings/add/', this.slot.id]);
  }
}
