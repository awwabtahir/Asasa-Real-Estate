/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { ad } from '../../models/ad';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;
  modalAd: ad;

  // initial position
  lat: number = 34.06513423;
  lng: number = 71.44481756;

  gesture = "greedy";

  constructor(private mapService: MapService) { }

  ngOnInit() {}

  mapReady(map) {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;
    //     this.zoom = 15;
    //   });
    // }
    this.map = map;
    map.setZoom(13);
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('Settings'));
    var bounds = {
      lat0: 34.03589373,
      lng0: 71.40848471,
      lat1: 34.08513423,
      lng1: 71.48481756
    };    
    this.mapService.addOverLay(map, bounds, "peshawar/dha");
  }

  recieveModalAd(modalAd) {
    this.modalAd = modalAd;
  }

}
