import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapLocation } from '../../../types';
import { AmapAutocompleteService, AmapAutocompleteWrapper } from 'ngx-amap';

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
      location: {
        type: "Point",
        coordinates: [event.poi.location.lng, event.poi.location.lat]
      }
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
          location: {
            type: "Point",
            coordinates: [position.coords.longitude, position.coords.latitude]
          }
        };
      });
    }
  }
}
