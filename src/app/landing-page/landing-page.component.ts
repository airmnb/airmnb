import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFacade } from '../apiFacade';
import { SlotService } from '../slot.service';
import { UtilService } from '../util.service';
import { SearchQuery, ServiceSlot, MapCoord, Gender, SelectOption } from '../../../types';
import { ImageService } from '../slot-image.service';
import { SelectOptionService } from '../select-option.service';

@Component({
  selector: 'amb-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  get ageOptions(): SelectOption[] {
    return this.selectOptionService.ageFromOptions;
  }

  slots: ServiceSlot[];
  mapCenter: MapCoord;
  showsAdvancedSearch = false;
  isRecommended: boolean;
  private query: SearchQuery;
  public searchModel = {
    location: {
      address: <string>null,
      location: {
        type: "Point",
        coordinates: <number[]>[]
      }
    },
    distance: 1,
    age: -1,
    gender: -1,
    date: null,
    timeFrom: null,
    timeTo: null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiFacade,
    private searchService: SlotService,
    private util: UtilService,
    private selectOptionService: SelectOptionService,
    private image: ImageService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const queryJson = params['q'];
      this.isRecommended = !queryJson;

      this.query = {};
      if (queryJson) {
        this.query = <SearchQuery>JSON.parse(queryJson);
      }
      this.getMapCenter(this.query);
      this.search();
    });

    this.searchRecommended();
  }

  private async searchRecommended() {
    const recommendedQuery = {}; // Fake query.
    this.slots = await this.searchService.search(recommendedQuery);
  }

  private getMapCenter(query: SearchQuery) {
    try {
      this.mapCenter = query.mapCenter;
      if(this.mapCenter.lng === undefined || this.mapCenter.lat === undefined) {
        throw new Error('Both longitude and latitude have to be there.');
      }
    } catch(e) {
      console.log('Failed to get map center to the query. Trying to use the map center from browser.');
      if (navigator.geolocation){
        // Try get the current location from browser
        navigator.geolocation.getCurrentPosition(this.setGeolocation.bind(this));
      }
    }
  }

  private setGeolocation(position){
    const coords = position.coords;
    this.mapCenter = Object.assign(this.mapCenter || {}, {
      lng: coords.longitude,
      lat: coords.latitude
    });
  }

  private updateQueryWithModel() {
    const delta: SearchQuery = {
      age: this.searchModel.age >= 0 ? this.searchModel.age : undefined,
      start: this.util.parseInputDateTime(this.searchModel.date, this.searchModel.timeFrom),
      end: this.util.parseInputDateTime(this.searchModel.date, this.searchModel.timeTo),
      gender: this.searchModel.gender >= 0 ? this.searchModel.gender : undefined,
      distance: this.searchModel.distance,
      mapCenter: {
        lng: this.searchModel.location.location.coordinates[0],
        lat: this.searchModel.location.location.coordinates[1]
      }
    };

    this.query = Object.assign(this.query, delta);
  }

  async search() {
    this.updateQueryWithModel();
    this.searchService.search(this.query).then(x => this.slots = x);
  }

  mapCenterChange(center: MapCoord) {
    this.query.mapCenter = center;
    this.searchService.search(this.query).then(x => this.slots = x);
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.image.getImageUrl(slot.imageNames[0]);
    } else {
      return "";
    }
  }
}
