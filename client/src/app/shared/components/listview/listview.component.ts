import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';
import { MapService } from 'shared/services/map.service';

@Component({
  selector: 'listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  @Input() list;
  propertiesAvailable = false;
  properties;

  p: number = 1;

  constructor(
    private propertyService: PropertyService,
    private mapService: MapService
  ) { }

  ngOnInit() {
    this.getAds();

    this.getCurrentCity();
  }

  getAd(id) {
    let ad = this.properties.filter(function (p) {
      return p._id == id;
    });
    let ctx = {ad: ad[0]};
    return ctx;
  }

  getAds() {
    this.propertyService.getAds().subscribe(properties => {
      this.properties = properties;
      this.propertiesAvailable = true;
      if(!this.list) {
        this.getList(this.properties);
      }
    }, (err) => {
      console.error(err);
    });
  }

  getList(props) {
    let result = props.map(a => a._id);
    this.list = result;
  }

  getCurrentCity() {
    this.mapService.getCity().subscribe(city => {
      this.cityChange(city.city);
    });
  }

  cityChange(city) {
    let result = this.properties.filter(function (p) {
      return p.locationData.city == city;
    });
    this.getList(result);
  }

}
