import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  locationData;

  constructor() { }

  save(ad) {
    let property = $.extend({}, ad, this.locationData);
    console.log(property);
  }

  setLocation(data) {
    this.locationData = data;
  }
}
