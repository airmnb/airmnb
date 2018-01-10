import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AgmMarker } from '@agm/core/directives/marker';
import { LatLngLiteral } from '@agm/core';

import { MapLocation, ServiceSlot, MapCoord } from '../../../types';
import { MapServiceService } from '../core/map-service.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  address: string;
  @Input() set center(value: MapCoord) {
    this.latestCenter = value;
  }
  @Input() slots: ServiceSlot[];
  @Output() centerChange = new EventEmitter<LatLngLiteral>();
  latestCenter: MapCoord;

  get isMapReady(): boolean {
    return !!this.latestCenter;
  }

  get isGoogleMapReady(): boolean {
    return this.util.shouldUseGoogleMap && this.isMapReady;
  }

  get isGaodeMapReady(): boolean {
    return this.util.shouldUseGaodeMap && this.isMapReady;
  }

  constructor(
    private mapService: MapServiceService,
    private markerManager: MarkerManager,
    private util: UtilService,
    private router: Router
  ) { }

  ngOnInit(){
    // Get the current geolocation
    // if (navigator.geolocation){
    //    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    // }
  }

  mapCenterChange(center: LatLngLiteral) {
    this.latestCenter = center;
  }

  fireIdle() {
    this.centerChange.emit(this.latestCenter);
  }

  book(slot: ServiceSlot) {
    if(!slot) {
      return;
    }
    this.router.navigate(['/bookings/add/', slot.id]);
  }

  private setPosition(position){
    const coords = position.coords;
    this.mapService.getAddress(coords)
      .then(x => {
        this.address = x.address;
        if(x.address) {
          this.latestCenter = {
            lng: x.lng,
            lat: x.lat
          };
        }
      })
      .catch(e => null);
  }
}
