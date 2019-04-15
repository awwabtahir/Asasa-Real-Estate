/// <reference types="@types/googlemaps" />
declare var $: any;
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';
import { PropertyModalService } from 'shared/services/property-modal.service';
import { Router } from '@angular/router';
import { FilterService } from 'shared/services/filter.service';
import { MapService } from 'shared/services/map.service';

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
    url: "assets/images/Plot.png",
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

  filterOpts;

  ads = [];
  filteredAds = [];
  type;
  

  constructor(
    private propertyService: PropertyService,
    private propertyModalService: PropertyModalService,
    private mapService: MapService,
    private router: Router,
    private filterService: FilterService
  ) { }

  ngOnInit() {
    this.getAds();
    this.filterOpts = this.filterService.getFilterOpts().subscribe(filterOpts => {
      this.applyFilter(filterOpts);
    });
    this.type = this.mapService.getType().subscribe(type => {
      this.filteredAds = this.ads;
      this.filteredAds = this.filteredAds.filter(function (ad) {
        return ad.subtype.toLowerCase() == type.toLowerCase();
      });
    });
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

  applyFilter(filterOpts) {
    if(filterOpts.reset) {
      this.filteredAds = this.ads;
      return;
    }
    this.filteredAds = this.ads;
    this.filteredAds = this.filterService.applyFilter(this.filteredAds, filterOpts);     
  }

}
