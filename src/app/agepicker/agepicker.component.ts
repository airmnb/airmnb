import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'amb-agepicker',
  templateUrl: './agepicker.component.html',
  styleUrls: ['./agepicker.component.scss']
})
export class AgepickerComponent implements OnInit {

  private _min: number;
  private _max: number;
  @Input() set min(value: number){
    this._min = value;
    this.setOptions();
  }
  @Input() set max(value: number){
    this._max = value;
    this.setOptions();
  }

  @Input() placeholder: string;

  private _value: number;
  @Input() set value(value: number) {
    this._value = value;
    this.valueChange.emit(value);
  }
  get value(): number {
    return this._value;
  }

  @Output() valueChange = new EventEmitter<number>();

  options: number[] = [];

  constructor() { }

  private setOptions() {
    this.options = [];
    for(let i = this._min; i <= this._max; i++) {
      this.options.push(i);
    }
  }

  ngOnInit() {
  }


}
