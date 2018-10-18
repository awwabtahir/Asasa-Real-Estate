/// <reference types="@types/googlemaps" />
declare var $: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyService } from '../../../services/property.service';
import { PropertyModalService } from '../../../services/property-modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {

  @Input() map: any;
  @Output() adEvent = new EventEmitter<object>();

  // marker icon
  houseIcon = {
    url: "assets/images/House.png",
    scaledSize: {
      width: 20,
      height: 26
    }
  };

  plotIcon = {
    url: "assets/images/Plot1.png",
    scaledSize: {
      width: 20,
      height: 26
    }
  };

  commercialIcon = {
    url: "assets/images/Commercial.png",
    scaledSize: {
      width: 20,
      height: 26
    }
  };

  ads = [];
  filteredAds = [];

  constructor(private propertyService: PropertyService,
    private propertyModalService: PropertyModalService,
    private router: Router) { }

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
    if (window.innerWidth < 800) return;
    this.propertyModalService.setAd(selectedMarkerData);
    this.router.navigate(['/property-details', selectedMarkerData._id]);
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
