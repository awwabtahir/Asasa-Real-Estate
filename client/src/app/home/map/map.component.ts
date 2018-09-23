/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: any;

  // initial position
  lat: number = 34.062059005117556;
  lng: number = 71.54871650000006;

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
    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(document.getElementById('Settings'));
    var bounds = {
      lat0: 34.03589373,
      lng0: 71.40848471,
      lat1: 34.08513423,
      lng1: 71.48481756
    };    
    this.mapService.addOverLay(map, bounds, "peshawar/dha");
  }

}
