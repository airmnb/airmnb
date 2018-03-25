import { Component, ElementRef, NgModule, NgZone, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'amb-address-input-google',
  templateUrl: './address-input-google.component.html',
  styleUrls: ['./address-input-google.component.scss']
})
export class AddressInputGoogleComponent implements OnInit {
  public latitude: number;
  public longitude: number;
  // public searchControl: FormControl;
  public zoom: number;
  @Input() address: MapLocation;
  @Input() showsMap: boolean;
  @Input() useCurrentLocation: boolean;
  @Output() addressChange = new EventEmitter<MapLocation>();

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    // // set google maps defaults
    // this.zoom = 4;
    // this.latitude = 39.8282;
    // this.longitude = -98.5795;

    // create search FormControl
    // this.searchControl = new FormControl(this.address);

    // set current position
    if(this.useCurrentLocation) {
      this.setCurrentPosition();
    }

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.address = {
            address: place.formatted_address,
            lng: place.geometry.location.lng(),
            lat: place.geometry.location.lat()
          };

          this.addressChange.emit(this.address);

          // // set latitude, longitude and zoom
          // this.latitude = place.geometry.location.lat();
          // this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if(this.address) {
          // Already input some thing
          return;
        }
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.address = {
          address: "",
          lng: position.coords.longitude,
          lat: position.coords.latitude
        };
        this.zoom = 12;
      });
    }
  }
}
