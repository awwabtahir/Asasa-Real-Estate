import { Component, OnInit, Input } from "@angular/core";
import { PropertyService } from "shared/services/property.service";
import { LocationService } from "shared/services/location.service";
import { FilterService } from "shared/services/filter.service";
import { MapService } from "shared/services/map.service";
import { ActivatedRoute } from "@angular/router";

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
    private mapService: MapService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.getAds();
    await this.filter();
    let ads;
    this.propertyService.roomChange.subscribe(r => {
      if (this.filteredAds.length > 0) {
        ads = this.filteredAds;
      } else if (this.filteredAds.length == 0) {
        ads = this.properties;
      }
      ads = ads.filter(res => {
        return res.type != "plot" && parseInt(res.rooms.beds) >= r;
      });
      this.getList(ads);
    });
  }
  private priceConverter(value) {
    return this.filterService.priceFilter(value);
  }

  filterOpetations() {
    this.route.params.subscribe(params => {
      this.city = params["city"];

      this.location = params["location"];

      if (this.city) {
        this.filteredByCity(this.city);
        if (this.location) {
          this.filteredByLocation(this.location);
        }
      }
    });

    this.locationService.locChange.subscribe(val => {
      this.location = val;
      if (this.location) this.filteredByLocation(this.location.location);
    });
    this.locationService.cityChange.subscribe(val => {
      this.city = val;
      if (this.city) this.filteredByCity(this.city.city);
    });
    this.filterService.typeFilterChange.subscribe(r => {
      if (r) {
        let ads;
        if (this.filteredAds.length == 0) {
          ads = this.properties.filter(res => {
            return res.purpose == "buy";
          });
        } else if (this.filteredAds.length > 0) {
          ads = this.filteredAds.filter(res => {
            return res.purpose == "buy";
          });
        }
        if (this.city)
          ads = ads.filter(prop => prop.locationData.city == this.city);
        if (this.location)
          ads = ads.filter(prop => prop.locationData.location == location);

        this.getList(ads);
      } else if (!r) {
        let ads;
        if (this.filteredAds.length == 0) {
          ads = this.properties.filter(res => {
            return res.purpose == "rent";
          });
        } else if (this.filteredAds.length > 0) {
          ads = this.filteredAds.filter(res => {
            return res.purpose == "rent";
          });
        }

        if (this.city)
          ads = ads.filter(prop => prop.locationData.city == this.city);
        if (this.location)
          ads = ads.filter(prop => prop.locationData.location == location);

        this.getList(ads);
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
    let ads;
    await this.propertyService.getAds().subscribe(
      properties => {
        this.properties = properties;
        ads = properties;
        this.filterOpetations();
        if (this.filterService.buy) {
          ads = properties.filter(res => {
            return res.purpose == "buy";
          });
        } else if (!this.filterService.buy) {
          ads = properties.filter(res => {
            return res.purpose == "rent";
          });
        }

        this.propertiesAvailable = true;
        if (!this.list) {
          this.getList(ads);
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

  filteredByCity(city) {
    var byCityList = this.properties;
    const result = byCityList.filter(prop => prop.locationData.city == city);
    this.filteredViaLocation = result;
    this.getList(result);
  }

  filteredByLocation(location) {
    var byLocationList = this.properties;
    const result = byLocationList.filter(
      prop => prop.locationData.location == location
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
