import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FilterService } from "shared/services/filter.service";
import { LocationService } from "shared/services/location.service";
import { MapService } from "shared/services/map.service";
import { PropertyService } from "shared/services/property.service";

@Injectable({
  providedIn: "root"
})
export class AdsService {
  totalAds: any;
  filteredAds: any;
  cityObject: any;
  type: any;
  locationObject: any;
  filterOpt: any;
  filteredAdsChange: Subject<any> = new Subject<any>();
  roomCount: any;
  roomChange: Subject<any> = new Subject<any>();

  constructor(
    private filterService: FilterService,
    private locationService: LocationService,
    private mapService: MapService,
    private propertyService: PropertyService
  ) {}

  Init() {
    this.checkAllFilters(this.totalAds);
    // this.buyOrRentFilter(this.totalAds);
    // this.checkCityAndLocation();
    this.mapService.typeEmit.subscribe(type => {
      this.type = type;
      this.checkAllFilters(this.totalAds);
    });

    this.filterService.typeFilterChange.subscribe(r => {
      this.checkAllFilters(this.totalAds);
    });
    this.locationService.cityChange.subscribe(city => {
      this.cityObject = city;
      this.locationObject = undefined;
      this.checkAllFilters(this.totalAds);
    });
    this.locationService.locChange.subscribe(location => {
      this.locationObject = location;
      this.checkAllFilters(this.totalAds);
    });

    this.filteredAdsChange.subscribe(r => {
      // console.log("Filtered Ads from service", r);
    });

    this.roomChange.subscribe(r => {
      this.filteredAds = this.totalAds.filter(res => {
        return res.type != "plot" && parseInt(res.rooms.beds) >= r;
      });

      this.checkAllFilters(this.filteredAds);
    });
    // setTimeout(() => {
    //   console.log(this.filteredAds);
    // }, 5000);

    // let adsWithRoomFilter: any;
    // this.roomChange.subscribe(r => {
    //   if (this.filteredAds.length > 0) {
    //     adsWithRoomFilter = this.filteredAds;
    //   } else if (this.filteredAds.length == 0) {
    //     adsWithRoomFilter = this.totalAds;
    //   }
    //   adsWithRoomFilter = adsWithRoomFilter.filter(res => {
    //     return res.type != "plot" && parseInt(res.rooms.beds) >= r;
    //   });
    //   this.filteredAdsChange.next(adsWithRoomFilter);
    // });
  }

  buyOrRentFilter(totalAds) {
    var ads = totalAds;

    if (this.filterService.buy) {
      this.filteredAds = ads.filter(res => {
        return res.purpose == "buy";
      });
    } else if (!this.filterService.buy) {
      this.filteredAds = ads.filter(res => {
        return res.purpose == "rent";
      });
    }
  }

  // async checkCityAndLocation() {
  //   await this.locationService.cityChange.subscribe(city => {
  //     this.cityObject = city;
  //     this.locationObject = undefined;
  //     this.filteredAds = this.totalAds.filter(
  //       prop => prop.locationData.city == city.city
  //     );

  //     this.filteredAdsChange.next(this.filteredAds);
  //   });
  //   await this.locationService.locChange.subscribe(location => {
  //     this.locationObject = location;
  //     this.filteredAds = this.totalAds.filter(
  //       prop => prop.locationData.location == location.location
  //     );

  //     this.filteredAdsChange.next(this.filteredAds);
  //   });
  // }

  cityAndLocationFilter(ads) {
    if (this.cityObject) {
      this.filteredAds = ads.filter(
        prop => prop.locationData.city == this.cityObject.city
      );
    }
    if (this.locationObject) {
      this.filteredAds = ads.filter(
        prop => prop.locationData.location == this.locationObject.location
      );
    }
  }

  filterPrice(filterOpt) {
    this.filterOpt = filterOpt;
    // console.log(this.filterOpt, "filterOpt");
    if (filterOpt.highPrice && filterOpt.lowPrice) {
      let ads = this.totalAds.filter(ad => {
        return (
          ad.demand <= filterOpt.highPrice && ad.demand >= filterOpt.lowPrice
        );
      });

      if (filterOpt.highArea != null || filterOpt.lowArea != null) {
        this.convertArea(ads, filterOpt);
      }
      this.checkAllFilters(ads);
    }
    if (filterOpt.highPrice && !filterOpt.lowPrice) {
      let ads = this.totalAds.filter(ad => {
        return ad.demand <= filterOpt.highPrice;
      });

      if (filterOpt.highArea != null || filterOpt.lowArea != null) {
        this.convertArea(ads, filterOpt);
      }
      this.checkAllFilters(ads);
    }
    if (filterOpt.lowPrice && !filterOpt.highPrice) {
      let ads = this.totalAds.filter(ad => {
        return ad.demand >= filterOpt.lowPrice;
      });

      if (filterOpt.highArea != null || filterOpt.lowArea != null) {
        this.convertArea(ads, filterOpt);
      }
      this.checkAllFilters(ads);
    }
    if (!filterOpt.highPrice && !filterOpt.lowPrice) {
      if (filterOpt.highArea != null || filterOpt.lowArea != null) {
        this.convertArea(this.totalAds, filterOpt);
      }
    }
    if (
      filterOpt.highPrice == null &&
      filterOpt.lowPrice == null &&
      filterOpt.highArea == null &&
      filterOpt.lowArea == null
    ) {
      this.checkAllFilters(this.checkAllFilters(this.totalAds));
    }
  }

  filterArea(filterOpt, ads) {
    if (filterOpt.highArea && filterOpt.lowArea) {
      let adsAreaFiltered = ads.filter(ad => {
        return ad.area <= filterOpt.highArea && ad.area >= filterOpt.lowArea;
      });
      this.checkAllFilters(adsAreaFiltered);
    }
    if (filterOpt.highArea && !filterOpt.lowArea) {
      let adsAreaFiltered = ads.filter(ad => {
        return ad.area <= filterOpt.highArea;
      });
      this.checkAllFilters(adsAreaFiltered);
    }
    if (filterOpt.lowArea && !filterOpt.highArea) {
      let adsAreaFiltered = ads.filter(ad => {
        return ad.area >= filterOpt.lowArea;
      });
      this.checkAllFilters(adsAreaFiltered);
    }
  }

  private convertArea(ads, filterOpt) {
    let filteredAds = $.extend(true, [], ads);
    if (filterOpt.areaUnit == "sqft") {
      for (var i = 0; i < filteredAds.length; i++) {
        if (filteredAds[i].areaType == filterOpt.areaUnit) continue;
        if (filteredAds[i].areaType == "marla")
          filteredAds[i].area = filteredAds[i].area * 272;
        if (filteredAds[i].areaType == "kanal")
          filteredAds[i].area = filteredAds[i].area * 5445;
        if (filteredAds[i].areaType == "sqyd")
          filteredAds[i].area = filteredAds[i].area * 9;
        filteredAds[i].areaType = "sqft";
      }
    }

    if (filterOpt.areaUnit == "marla") {
      for (var i = 0; i < filteredAds.length; i++) {
        if (filteredAds[i].areaType == filterOpt.areaUnit) continue;
        if (filteredAds[i].areaType == "sqft")
          filteredAds[i].area = filteredAds[i].area / 272;
        if (filteredAds[i].areaType == "kanal")
          filteredAds[i].area = filteredAds[i].area * 20;
        if (filteredAds[i].areaType == "sqyd")
          filteredAds[i].area = filteredAds[i].area / 30.25;
        filteredAds[i].areaType = "marla";
      }
    }

    if (filterOpt.areaUnit == "kanal") {
      for (var i = 0; i < filteredAds.length; i++) {
        if (filteredAds[i].areaType == filterOpt.areaUnit) continue;
        if (filteredAds[i].areaType == "sqft")
          filteredAds[i].area = filteredAds[i].area / 5445;
        if (filteredAds[i].areaType == "marla")
          filteredAds[i].area = filteredAds[i].area / 20;
        if (filteredAds[i].areaType == "sqyd")
          filteredAds[i].area = filteredAds[i].area / 605;
        filteredAds[i].areaType = "kanal";
      }
    }

    this.filterArea(filterOpt, filteredAds);
  }

  mapType() {
    if (this.type) {
      var ads = this.filteredAds.filter(ad => {
        return ad.subtype.toLowerCase() == this.type.toLowerCase();
      });
      this.filteredAds = ads;
    }
  }

  async checkAllFilters(totalAds) {
    await this.buyOrRentFilter(totalAds);
    await this.cityAndLocationFilter(this.filteredAds);
    await this.mapType();
    if (
      this.filterOpt &&
      (this.filterOpt.highPrice != null ||
        this.filterOpt.lowPrice != null ||
        this.filterOpt.highArea != null ||
        this.filterOpt.lowArea != null)
    ) {
      await this.filterPrice(this.filterOpt);
    }

    this.filteredAdsChange.next(this.filteredAds);
  }
}
