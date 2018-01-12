import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchQuery, ServiceSlot, MapCoord, Gender, SelectOption } from '../../../types';
import { ApiFacade } from '../core/apiFacade';
import { SlotService } from '../core/slot.service';
import { SelectOptionService } from '../core/select-option.service';
import { SessionService } from '../core/session.service';
import { UtilService } from '../core/util.service';

@Component({
  selector: 'amb-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  get ageOptions(): SelectOption[] {
    return this.selectOptionService.ageFromOptions;
  }

  searchResultSlots: ServiceSlot[];
  recommendedSlots: ServiceSlot[];
  mapCenter: MapCoord;
  showsAdvancedSearch = false;
  hasSearchQuery: boolean;
  private query: SearchQuery;
  public searchModel = {
    location: {
      address: null,
      lng: null,
      lat: null
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
    private session: SessionService
  ) { }

  async ngOnInit() {
    if(this.session.isProvider) {
      this.router.navigate(['slots']);
      return;
    }

    this.getRecommended();

    this.route.queryParams.subscribe(async params => {
      const queryJson = params['q'];
      this.analyzeQuery(queryJson);
      this.setMapCenter();
      this.executeQuery();
    });
  }

  private analyzeQuery(queryJson: string) {
    this.hasSearchQuery = !!queryJson;
    this.query = this.hasSearchQuery ? <SearchQuery>JSON.parse(queryJson) : {};
  }

  private async getRecommended() {
    const recommendedQuery = {}; // Fake query.
    this.recommendedSlots = await this.searchService.search(recommendedQuery, 10);
  }

  private async executeQuery() {
    this.searchResultSlots = await this.searchService.search(this.query, 10);
  }

  private setMapCenter() {
    try {
      this.mapCenter = this.query.mapCenter;
      if(this.util.isNullOrUndefined(this.mapCenter.lng) || this.util.isNullOrUndefined(this.mapCenter.lat)) {
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

  private updateQueryWithModel(center: MapCoord) {
    const delta: SearchQuery = {
      age: this.searchModel.age >= 0 ? this.searchModel.age : undefined,
      start: this.util.parseInputDateTime(this.searchModel.date, this.searchModel.timeFrom),
      end: this.util.parseInputDateTime(this.searchModel.date, this.searchModel.timeTo),
      gender: this.searchModel.gender >= 0 ? this.searchModel.gender : undefined,
      distance: this.searchModel.distance,
      mapCenter: center
    };

    console.log('Query string', JSON.stringify(delta));

    this.query = Object.assign(this.query, delta);
  }

  private redirectWithQueryString() {
    const queryParams = {q: JSON.stringify(this.query)};
    this.router.navigate(['/'], {queryParams});
  }

  async search() {
    this.updateQueryWithModel(this.searchModel.location);
    // this.searchService.search(this.query).then(x => this.slots = x);
    this.redirectWithQueryString();
  }

  mapCenterChange(center: MapCoord) {
    // this.mapCenter = center;
    console.log('map center', center);
    this.updateQueryWithModel(center);
    this.redirectWithQueryString();
    // this.searchService.search(this.query).then(x => this.slots = x);
  }

  displayGender(gender: Gender): string {
    return this.util.displayGender(gender);
  }

  book(slot: ServiceSlot) {
    if(!slot) {
      return;
    }
    this.router.navigate(['/bookings/add/', slot.id]);
  }
}
