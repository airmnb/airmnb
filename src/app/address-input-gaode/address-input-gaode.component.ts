import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { AmapAutocompleteService, AmapAutocompleteWrapper } from 'ngx-amap';

import { MapLocation } from '../../../types';

@Component({
  selector: 'amb-address-input-gaode',
  templateUrl: './address-input-gaode.component.html',
  styleUrls: ['./address-input-gaode.component.scss']
})
export class AddressInputGaodeComponent implements OnInit {
  @Input() useCurrentLocation: boolean;
  @Input() address: MapLocation;
  @Output() addressChange = new EventEmitter<MapLocation>();
  private autoCompleteSearch: Promise<AmapAutocompleteWrapper>;

  constructor(
    private AmapAutocomplete: AmapAutocompleteService
  ) { }

  ngOnInit() {
    if(this.useCurrentLocation) {
      this.setCurrentPosition();
    }

    this.autoCompleteSearch = this.AmapAutocomplete.of({
      input: 'address'
    });
  }

  onSelect(event) {
    console.log(event);
    if(!event.poi) return;
    this.address = {
      address: event.poi.name + " " + event.poi.address + " " + event.poi.district,
      lng: event.poi.location.lng,
      lat: event.poi.location.lat
    };
    this.addressChange.emit(this.address);
    console.log(this.address);
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if(this.address) {
          // Already input some thing
          return;
        }
        this.address = {
          address: "",
          lng: position.coords.longitude,
          lat: position.coords.latitude
        };
      });
    }
  }
}
