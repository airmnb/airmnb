import { Component, OnInit } from '@angular/core';
import { MapServiceService } from '../map-service.service';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AgmMarker } from '@agm/core/directives/marker';
import { MapLocation } from '../../../types';

@Component({
  selector: 'amb-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.css']
})
export class MapSearchComponent implements OnInit {

  address: string;
  lat: number;
  lng: number;
  markers: {longitude: number, latitude: number}[];

  constructor(
    private mapService: MapServiceService,
    private markerManager: MarkerManager
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
        this.lat = x.latitude;
        this.lng = x.longitude;

        this.addMarkers(x);
      })
      .catch(e => null);
  }

  private addMarkers(center: MapLocation){
    this.markers = [];
    for(let i = 0; i < 10; i++) {
      this.markers.push({
        longitude: center.longitude - i * 0.001,
        latitude: center.latitude - i * 0.001
      });
    }

  }
}
