import { Component, OnInit, Input } from "@angular/core";
import { PropertyService } from "shared/services/property.service";
import { LocationService } from "shared/services/location.service";

@Component({
  selector: "listview",
  templateUrl: "./listview.component.html",
  styleUrls: ["./listview.component.css"]
})
export class ListviewComponent implements OnInit {
  @Input() list;
  propertiesAvailable = false;
  properties;
  location: any;
  city: any;
  p: number = 1;

  constructor(
    private propertyService: PropertyService,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.getAds();
    // console.log(this.locationService.cityObj, this.locationService.locObj);
    this.locationService.locChange.subscribe(val => {
      this.location = val;
      this.filteredByLocation();
    });
    this.locationService.cityChange.subscribe(val => {
      this.city = val;
      this.filteredByCity();
    });
  }

  getAd(id) {
    let ad = this.properties.filter(function(p) {
      return p._id == id;
    });
    let ctx = { ad: ad[0] };
    return ctx;
  }

  getAds() {
    this.propertyService.getAds().subscribe(
      properties => {
        this.properties = properties;

        this.propertiesAvailable = true;
        if (!this.list) {
          this.getList();
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  getList() {
    let result = this.properties.map(a => a._id);

    this.list = result;
  }

  filteredByCity() {
    var byCityList = this.properties;
    const result = byCityList.filter(
      prop => prop.locationData.city == this.city.city
    );
    let filtered = result.map(a => a._id);
    this.list = filtered;
    if (this.list.length == 0) {
      this.propertiesAvailable = false;
    }
  }

  filteredByLocation() {
    var byLocationList = this.properties;
    const result = byLocationList.filter(
      prop => prop.locationData.location == this.location.location
    );
    let filtered = result.map(a => a._id);
    this.list = filtered;
    if (this.list.length == 0) {
      this.propertiesAvailable = false;
    }
  }
}
