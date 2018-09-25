import { Injectable } from '@angular/core';
import { PropertyService } from './property.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyModalService {

  constructor(private propertyService: PropertyService) { }

  updateBasic(ad, basic) {
    basic = (({ type, subtype, propNumber, demand, area, areaType }) =>
      ({ type, subtype, propNumber, demand, area, areaType }))(ad);
    let newKeys = { subtype: "Type", propNumber: basic.type + " #" };
    basic = this.renameKeys(basic, newKeys);
    basic.area = basic.area + " " + basic.areaType;
    basic.demand = "Rs. " + this.propertyService.localeString(basic.demand);
    delete basic.type;
    delete basic.areaType;
    return basic;
  }

  updateLocation(locData, location) {
    location = (({ location, city }) =>
      ({ location, city }))(locData);

    return location;
  }

  private renameKeys(obj, newKeys) {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Object.assign({}, ...keyValues);
  }

  ad;
  setAd(ad) {
    this.ad = ad;
  }

  getAd() {
    return this.ad;
  }

}
