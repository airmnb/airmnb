import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot, Gender } from '../../../types';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() slot: ServiceSlot;

  constructor(
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  displayTime(date: string, time: string): Date {
    return this.util.parseInputDateTime(date, time);
  }
}
