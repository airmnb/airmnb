import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot, Gender } from '../../../types';
import { MatDialogRef } from '@angular/material';
import { UtilService } from '../core/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'amb-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  slot: ServiceSlot;

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
