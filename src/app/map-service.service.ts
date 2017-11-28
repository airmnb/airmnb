import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MapServiceService {

  constructor(private http: Http) { }

  public async getAddress(coordinate: {latitude: number, longitude: number}): Promise<string> {
    // Google map API
    // http://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}
    const googleMapApi = 'http://maps.googleapis.com/maps/api/geocode/json';
    const queryString = {
      latlng: coordinate.latitude + ',' + coordinate.longitude
    };
    const resp = await this.http.get(googleMapApi, {params: queryString}).toPromise();
    if (resp.status === 200) {
      const obj = resp.json();
      return obj.results[0].formatted_address;
    }
    return null;
  }
}
