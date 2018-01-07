import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapServiceService } from '../map-service.service';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AgmMarker } from '@agm/core/directives/marker';
import { MapLocation, ServiceSlot, MapCoord } from '../../../types';
import { UtilService } from '../util.service';
import { LatLngLiteral } from '@agm/core';

@Component({
  selector: 'amb-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  address: string;
  @Input() slots: ServiceSlot[];
  @Output() centerChange = new EventEmitter<LatLngLiteral>();
  private latestCenter: MapCoord;

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
    private util: UtilService
  ) { }

  ngOnInit(){
    // Get the current geolocation
    if (navigator.geolocation){
       navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
    }
  }

  mapCenterChange(center: LatLngLiteral) {
    this.latestCenter = center;
  }

  fireIdle() {
    this.centerChange.emit(this.latestCenter);
  }

  private setPosition(position){
    const coords = position.coords;
    this.mapService.getAddress(coords)
      .then(x => {
        this.address = x.address;
        if(x.coord) {
          this.latestCenter = x.coord;
        }
      })
      .catch(e => null);
  }
}
