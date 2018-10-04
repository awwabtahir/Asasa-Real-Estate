/// <reference types="@types/googlemaps" />
declare var $ :any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { PropertyModalService } from '../../../services/property-modal.service';

@Component({
  selector: 'marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  @Input() map: any;
  @Output() adEvent = new EventEmitter<object>();

  // marker image
  icon = {
    url: "assets/images/blue_circle.svg",
    scaledSize: {
      width: 12,
      height: 12
    }
  };

  ads = [];
  filteredAds = [];

  constructor(private propertyService: PropertyService,
    private propertyModalService: PropertyModalService) { }

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

  onMarkerClick(selectedMarkerData) {
    this.adEvent.emit(selectedMarkerData);
    if (window.innerWidth < 800) return;
    $('#markerModal').modal('show');
  }

  getAds() {
    this.propertyService.getAds().subscribe(ads => {
      this.ads = ads;
      this.filteredAds = ads;
    }, (err) => {
      console.error(err);
    });
  }

  getDemand(demand) {
    return this.propertyService.localeString(demand);
  }

  onPropClick(ad) {
    this.propertyModalService.setAd(ad);
  }

}
