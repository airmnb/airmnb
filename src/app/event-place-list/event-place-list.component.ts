import { Component, OnInit } from '@angular/core';

import { EventPlaceComponent } from '../event-place/event-place.component';
import { EventPlace } from '../../../types';
import { ApiFacade } from '../core/apiFacade';

@Component({
  selector: 'amb-event-place-list',
  templateUrl: './event-place-list.component.html',
  styleUrls: ['./event-place-list.component.css']
})
export class EventPlaceListComponent implements OnInit {

  items: EventPlace[];

  constructor(
    private api: ApiFacade
  ) { }

  ngOnInit() {
  }

}
