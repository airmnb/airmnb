import { Component, OnInit } from '@angular/core';
import { ServiceSlot, BabyProfile, MapLocation, SearchQuery } from '../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../session.service';
import { SlotService } from '../slot.service';
import { ApiFacade } from '../apiFacade';
import { ImageService } from '../slot-image.service';
import { ILabel } from 'ngx-amap/types/interface';
import { UtilService } from '../util.service';
@Component({
  selector: 'amb-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  public slots: ServiceSlot[];

  centerLongitude: number;
  centerLatitude: number;

  get hasLoggedIn(): boolean {
    return this.sessionService.hasLoggedIn;
  }

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
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private searchService: SlotService,
    private api: ApiFacade,
    private imageService: ImageService,
    private util: UtilService
  ) {
  }

  ngOnInit() {
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
   }
    this.route.queryParams.subscribe(params => {
      const queryJson = params['q'];
      const query = <SearchQuery>JSON.parse(queryJson);
      console.log('Search query', query);
      this.centerLongitude = query.location.location.coordinates[0];
      this.centerLatitude = query.location.location.coordinates[1];
      console.log('centerLongitude', this.centerLongitude);
      console.log('centerLatitude', this.centerLatitude);

      this.searchService.search(query).subscribe(x => this.slots = x);
    });
  }

  private setPosition(position){
    const coords = position.coords;
    this.centerLongitude = this.centerLongitude || coords.longitude;
    this.centerLatitude = this.centerLatitude || coords.latitude;
  }

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.imageService.getImageUrl(slot.imageNames[0]);
    } else {
      return "";
    }
  }

  book(slot: ServiceSlot) {
    if(!slot) {
      return;
    }
    this.router.navigate(['/bookings/add/', slot.id]);
  }

  getLabelForAmapMarker(index: number): ILabel {
    return {
      offset: {
        x: 0,
        y: 0
      },
      content: (index + 1).toString()
    };
  }
}
