import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  locations = [];
  latlng;
  type: any;
  cityChange: Subject<any> = new Subject<any>();
  locationsChange: Subject<any> = new Subject<any>();
  locChange: Subject<any> = new Subject<any>();

  constructor() {}

  setLatLng(latlng) {
    this.latlng = latlng;
  }

  getLatLng() {
    return this.latlng;
  }

  cityObj;

  setCityObj(cityObj) {
    this.cityObj = cityObj;
    this.cityChange.next(this.cityObj);
    // this.locationsChange.next(this.locations);
  }

  getCity() {
    return this.cityObj;
  }

  locObj;

  setLocObj(locObj) {
    this.locObj = locObj;
    this.locChange.next(this.locObj);
  }

  getLoc() {
    return this.locObj;
  }

  ga;

  setGa(ga) {
    this.ga = ga;
  }

  getGa() {
    return this.ga;
  }
}
