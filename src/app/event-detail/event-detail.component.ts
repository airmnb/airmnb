import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot } from '../../../types';

@Component({
  selector: 'amb-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  @Input() slot: ServiceSlot;

  constructor() { }

  ngOnInit() {
  }

}
