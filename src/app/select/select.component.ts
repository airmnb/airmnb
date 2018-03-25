import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';
import {  } from '@angular/core/src/event_emitter';

@Component({
  selector: 'amb-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  @Input() options: SelectOption[];
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit() {
  }

}
