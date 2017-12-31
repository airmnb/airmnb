import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { MapLocation } from '../../types';

@Injectable()
export class MapServiceService {

  constructor(private http: Http) { }

  public async getAddress(coordinate: {latitude: number, longitude: number}): Promise<MapLocation> {
    // Google map API
    // http://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinate.latitude},${coordinate.longitude}
    const googleMapApi = 'https://maps.googleapis.com/maps/api/geocode/json';
    const queryString = {
      latlng: coordinate.latitude + ',' + coordinate.longitude
    };
    const resp = await this.http.get(googleMapApi, {params: queryString}).toPromise();
    if (resp.status === 200) {
      const obj = resp.json();
      const firstAddress = obj.results[0];
      return {
        address: firstAddress.formatted_address,
        location: {
          type: "Point",
          coordinates: [firstAddress.geometry.location.lng, firstAddress.geometry.location.lat]
        }
      };
    }
    return null;
  }
}
