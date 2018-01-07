import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { MapLocation } from '../../../types';
import { UtilService } from '../util.service';

@Component({
  selector: 'amb-address-input',
  templateUrl: './address-input.component.html',
  styleUrls: ['./address-input.component.css']
})
export class AddressInputComponent implements OnInit {
  private  _address: MapLocation;
  @Input() set address(value: MapLocation) {
    this._address = value;
    this.addressChange.emit(value);
  }
  get address(): MapLocation {
    return this._address;
  }
  @Output() addressChange = new EventEmitter<MapLocation>();

  get shouldUseGoogle(): boolean {
    return this.util.shouldUseGoogleMap;
  }

  get shouldUseGaode(): boolean {
    return this.util.shouldUseGaodeMap;
  }

  constructor(
    private util: UtilService
  ) {}

  ngOnInit() {
  }
}
