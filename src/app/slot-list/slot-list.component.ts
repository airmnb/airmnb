import { Component, OnInit, Input } from '@angular/core';
import { ServiceSlot } from '../../../types';

@Component({
  selector: 'amb-slot-list',
  templateUrl: './slot-list.component.html',
  styleUrls: ['./slot-list.component.css']
})
export class SlotListComponent implements OnInit {

  @Input() public slots: ServiceSlot[];

  constructor() { }

  ngOnInit() {
  }

}
