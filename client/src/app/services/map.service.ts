/// <reference types="@types/googlemaps" />
declare var klokantech: any;
import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @Output() cityFire: EventEmitter<any> = new EventEmitter();
  @Output() locFire: EventEmitter<any> = new EventEmitter();

  constructor() { }

  addOverLay(map, bounds, imgLoc) {
    var mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.lat0, bounds.lng0),
      new google.maps.LatLng(bounds.lat1, bounds.lng1));
    var mapMinZoom = 12;
    var mapMaxZoom = 17;
    var overlay = new klokantech.MapTilerMapType(map, function (x, y, z) {
      return "assets/map/" + imgLoc + "/{z}/{x}/{y}.png".replace('{z}', z).replace('{x}', x).replace('{y}', y);
    },
      mapBounds, mapMinZoom, mapMaxZoom);

    var opacitycontrol = new klokantech.OpacityControl(map, overlay);
    var geoloccontrol = new klokantech.GeolocationControl(map, mapMaxZoom);
  }

  cityChange(city) {
    this.cityFire.emit(city);
  }

  getCity() {
    return this.cityFire;
  }

  locationChange(location) {
    this.locFire.emit(location);
  }

  getLocation() {
    return this.locFire;
  }

}
