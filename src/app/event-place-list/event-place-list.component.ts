import { Component, OnInit } from '@angular/core';
import { ApiFacade } from '../apiFacade';
import { EventPlaceComponent } from '../event-place/event-place.component';
import { EventPlace } from '../../../types';

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
