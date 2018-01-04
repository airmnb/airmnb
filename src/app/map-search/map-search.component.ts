import { Component, OnInit, Input } from '@angular/core';
import { MapServiceService } from '../map-service.service';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AgmMarker } from '@agm/core/directives/marker';
import { MapLocation, ServiceSlot } from '../../../types';
import { UtilService } from '../util.service';

@Component({
  selector: 'amb-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  address: string;
  centerLatitude: number;
  centerLongitude: number;
  @Input() slots: ServiceSlot[];

  get isMapReady(): boolean {
    return this.centerLongitude !== undefined && this.centerLatitude !== undefined;
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
    private util: UtilService
  ) { }

  ngOnInit(){
    // Get the current geolocation
    if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  private setPosition(position){
    const coords = position.coords;
    this.mapService.getAddress(coords)
      .then(x => {
        this.address = x.address;
        if(x.location) {
          this.centerLatitude = x.location.coordinates[1];
          this.centerLongitude = x.location.coordinates[0];
        }
      })
      .catch(e => null);
  }
}
