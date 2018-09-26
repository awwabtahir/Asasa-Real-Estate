/// <reference types="@types/googlemaps" />
import { Component, OnInit, OnChanges } from '@angular/core';
import { MapService } from '../../services/map.service';
import { ad } from '../../models/ad';
import { city } from '../../models/city';
import { location } from '../../models/location';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  modalAd: ad;
  city: city;
  location: location;

  // initial position
  lat: number = 33.6;
  lng: number = 73.01;

  gesture = "greedy";

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.city = this.mapService.getCity().subscribe(city => {
      this.city = city;
      this.lat = this.city.lat;
      this.lng = this.city.lng;
    });
    this.location = this.mapService.getLocation().subscribe(location => {
      this.location = location;
      this.lat = this.location.lat;
      this.lng = this.location.lng;
      this.updateOverlay(this.map, this.location);
    });
  }

  mapReady(map) {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    }
    this.map = map;
    map.setZoom(14);
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('Settings'));
  }

  updateOverlay(map, location) {
    if (location.overlayData.imgLoc) {
      var bounds = {
        lat0: location.overlayData.lat0,
        lng0: location.overlayData.lng0,
        lat1: location.overlayData.lat1,
        lng1: location.overlayData.lng1
      };
      this.mapService.addOverLay(map, bounds, location.overlayData.imgLoc);
    }
  }

  recieveModalAd(modalAd) {
    this.modalAd = modalAd;
  }

}
