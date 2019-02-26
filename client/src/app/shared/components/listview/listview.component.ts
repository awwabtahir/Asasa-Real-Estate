import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';

@Component({
  selector: 'listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  @Input() list;
  propertiesAvailable = false;
  properties;

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
    this.getAds();
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
    }, (err) => {
      console.error(err);
    });
  }

}
