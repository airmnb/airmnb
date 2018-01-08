import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiFacade } from '../apiFacade';
import { SlotService } from '../slot.service';
import { UtilService } from '../util.service';
import { SearchQuery, ServiceSlot, MapCoord, Gender, SelectOption } from '../../../types';
import { ImageService } from '../slot-image.service';
import { SelectOptionService } from '../select-option.service';
import { SessionService } from '../session.service';

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
    private image: ImageService,
    private session: SessionService
  ) { }

  ngOnInit() {
    if(this.session.isProvider) {
      this.router.navigate(['slots']);
      return;
    }

    this.route.queryParams.subscribe(params => {
      const queryJson = params['q'];
      this.isRecommended = !queryJson;

      this.query = {};
      if (queryJson) {
        this.query = <SearchQuery>JSON.parse(queryJson);
      }
      this.getMapCenter(this.query);
      this.searchSlots(this.query);
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

  private searchSlots(query: SearchQuery) {
    this.searchService.search(query).then(x => this.slots = x);
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

  getImageUrl(slot: ServiceSlot) : string {
    if(slot.imageNames && slot.imageNames.length) {
      return this.image.getImageUrl(slot.imageNames[0]);
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
}
