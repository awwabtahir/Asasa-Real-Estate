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
  
}
