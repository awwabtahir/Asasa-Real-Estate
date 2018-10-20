import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  latlng;

  constructor() { }

  setLatLng(latlng) {
    this.latlng = latlng;
  }

  getLatLng() {
    return this.latlng;
  }

  cityObj;

  setCityObj(cityObj) {
    this.cityObj = cityObj;
  }

  getCity() {
    return this.cityObj;
  }

  locObj;

  setLocObj(locObj) {
    this.locObj = locObj;
  }

  getLoc() {
    return this.locObj;
  }
  
}
