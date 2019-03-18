/// <reference types="@types/googlemaps" />
declare var klokantech: any;
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { city } from 'shared/models/city';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  @Output() cityFire: EventEmitter<any> = new EventEmitter();
  @Output() locFire: EventEmitter<any> = new EventEmitter();
  @Output() typeFire: EventEmitter<any> = new EventEmitter();

  mapBounds: any;
  mapMinZoom: any;
  mapMaxZoom: any;
  overlay: any;
  opacitycontrol: any;

  constructor() { 
    this.loadScripts();
  }

  addOverLay(map, bounds, imgLoc, markerModal?) {
    this.mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(bounds.lat0, bounds.lng0),
      new google.maps.LatLng(bounds.lat1, bounds.lng1));
    this.mapMinZoom = 10;
    this.mapMaxZoom = 22;
    
    map.overlayMapTypes.clear();
    this.overlay = new klokantech.MapTilerMapType(map, function (x, y, z) {
      return "https://d34jj9muce0qbt.cloudfront.net/map/" + imgLoc + "/{z}/{x}/{y}.png".replace('{z}', z).replace('{x}', x).replace('{y}', y);
    },
    this.mapBounds, this.mapMinZoom, this.mapMaxZoom);

    if(this.opacitycontrol) {
      $(".goog-slider-horizontal").remove();
    }
    this.opacitycontrol = new klokantech.OpacityControl(map, this.overlay);
    if(!markerModal) map.fitBounds(this.mapBounds);   
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);

    if(markerModal) map.setZoom(16); 
    else map.setZoom(14); 
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

  typeChange(type) {
    this.typeFire.emit(type);
  }

  getType() {
    return this.typeFire;
  }

  private loadScripts() {
    const dynamicScripts = [
     'assets/js/klokantech.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }


}
