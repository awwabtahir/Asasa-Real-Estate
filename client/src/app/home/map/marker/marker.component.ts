/// <reference types="@types/googlemaps" />
declare var $ :any;
import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from '../../../services/property.service';

@Component({
  selector: 'marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  @Input() map: any;

  // marker image
  icon = {
    url: "assets/images/blue_circle.svg",
    scaledSize: {
      width: 12,
      height: 12
    }
  };

  ads = [];

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getAds();
  }

  onMouseOver(infoWindow, map) {
    if (map.lastOpen && map.lastOpen.isOpen) {
      map.lastOpen.close();
    }
    map.lastOpen = infoWindow;
    this.map = map;
    infoWindow.open();
  }

  onMouseOut() {
    if (this.map.lastOpen !== null) {
      this.map.lastOpen.close();
    }
  }

  onMarkerClick() {
    $('#markerModal').modal('show');
  }

  getAds() {
    this.propertyService.getAds().subscribe(ads => {
      this.ads = ads;
    }, (err) => {
      console.error(err);
    });
  }

  getDemand(demand) {
    return this.propertyService.localeString(demand);
  }

}
