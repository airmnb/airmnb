import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'amb-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  @Input() required: boolean;
  @Input() placeholder: string;
  @Input() disabled: boolean;
  private _value: any;
  get value()
  {
    return this._value;
  }
  @Input() set value(value: any) {
    this._value = value;
    this.valueChange.emit(this._value);
  }
  @Output() valueChange = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

}
