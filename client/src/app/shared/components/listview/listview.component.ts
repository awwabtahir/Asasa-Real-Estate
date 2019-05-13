import { Component, OnInit, Input } from "@angular/core";
import { PropertyService } from "shared/services/property.service";
import { LocationService } from "shared/services/location.service";
import { FilterService } from "shared/services/filter.service";
import { MapService } from "shared/services/map.service";

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
  filteredViaLocation: any;

  filterOpts;
  filteredAds = [];
  type;

  constructor(
    private propertyService: PropertyService,
    private locationService: LocationService,
    private filterService: FilterService,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.getAds();
    this.filter();

    this.locationService.locChange.subscribe(val => {
      this.location = val;
      this.filteredByLocation();
    });
    this.locationService.cityChange.subscribe(val => {
      this.city = val;
      this.filteredByCity();
    });
    this.filterService.typeFilterChange.subscribe(r => {
      if (r) {
        if (this.filteredAds.length == 0) {
          let ads = this.properties.filter(res => {
            return res.purpose == "buy";
          });
          this.getList(ads);
        } else if (this.filteredAds.length > 0) {
          let ads = this.filteredAds.filter(res => {
            return res.purpose == "buy";
          });
          this.getList(ads);
        }
      } else if (!r) {
        if (this.filteredAds.length == 0) {
          let ads = this.properties.filter(res => {
            return res.purpose == "rent";
          });
          this.getList(ads);
        } else if (this.filteredAds.length > 0) {
          let ads = this.filteredAds.filter(res => {
            return res.purpose == "rent";
          });
          this.getList(ads);
        }
      }
    });
  }

  getAd(id) {
    let ad = this.properties.filter(function(p) {
      return p._id == id;
    });
    let ctx = { ad: ad[0] };
    return ctx;
  }

  async getAds() {
    await this.propertyService.getAds().subscribe(
      properties => {
        this.properties = properties;
        if (this.filterService.buy) {
          this.properties = properties.filter(res => {
            return res.purpose == "buy";
          });
        } else if (!this.filterService.buy) {
          this.properties = properties.filter(res => {
            return res.purpose == "rent";
          });
        }

        this.propertiesAvailable = true;
        if (!this.list) {
          this.getList(this.properties);
        }
      },
      err => {
        console.error(err);
      }
    );
  }

  filter() {
    this.filterOpts = this.filterService
      .getFilterOpts()
      .subscribe(filterOpts => {
        this.applyFilter(filterOpts);
      });
    this.type = this.mapService.getType().subscribe(type => {
      if (this.filteredViaLocation) {
        this.filteredAds = this.filteredViaLocation;
      } else this.filteredAds = this.properties;
      this.filteredAds = this.filteredAds.filter(function(ad) {
        return ad.subtype.toLowerCase() == type.toLowerCase();
      });
      this.getList(this.filteredAds);
    });
  }

  getList(properties) {
    let result = properties.map(a => a._id);

    this.list = result;
    if (this.list.length == 0) {
      this.propertiesAvailable = false;
    } else this.propertiesAvailable = true;
  }

  filteredByCity() {
    var byCityList = this.properties;
    const result = byCityList.filter(
      prop => prop.locationData.city == this.city.city
    );
    this.filteredViaLocation = result;
    this.getList(result);
  }

  filteredByLocation() {
    var byLocationList = this.properties;
    const result = byLocationList.filter(
      prop => prop.locationData.location == this.location.location
    );
    this.filteredViaLocation = result;
    this.getList(result);
  }

  applyFilter(filterOpts) {
    if (filterOpts.reset) {
      this.filteredAds = this.properties;
      return;
    }
    if (this.filteredViaLocation) {
      this.filteredAds = this.filteredViaLocation;
    } else this.filteredAds = this.properties;

    this.filteredAds = this.filterService.applyFilter(
      this.filteredAds,
      filterOpts
    );
    this.getList(this.filteredAds);
  }
}
