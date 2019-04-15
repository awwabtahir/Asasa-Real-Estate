import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../authentication.service";
import { MapService } from "shared/services/map.service";
import { ActivatedRoute } from "@angular/router";
import { LocationService } from "shared/services/location.service";
import { Location } from "@angular/common";
import { ViewService } from "shared/services/view.service";

@Component({
  selector: "search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit, OnDestroy {
  cities = [];
  locations = [];
  selectedCity;
  selectedLocation;
  selectedType;

  city: string;
  location: string;
  private sub: any;

  // Google Analytics
  ga;

  constructor(
    private auth: AuthenticationService,
    private mapService: MapService,
    private locationService: LocationService,
    private viewService: ViewService,
    private route: ActivatedRoute,
    private locationUrl: Location
  ) {}

  async ngOnInit() {
    console.log(
      this.locationService.locObj,
      "locations",
      this.locationService.cityObj
    );
    this.locationService.cityChange.subscribe(value => {
      this.selectedCity = value._id;
    });
    this.locationService.locationsChange.subscribe(value => {
      this.locations = value;
      console.log(this.locations, "search");
    });
    this.locationService.locChange.subscribe(value => {
      this.selectedLocation = value._id;
    });
    // this.mapService.typeEmit.subscribe(value => {
    //   $(".dropdown-toggle")[0].innerText = "Type: " + value;
    //   console.log($(".dropdown-toggle")[0].innerText);
    // });
    $(".dropdown").on("hide.bs.dropdown", function(e) {
      e.preventDefault();
    });

    this.getCities();
    this.getLocations();
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));

    this.ga = this.locationService.getGa();

    if (this.locationService.getCity())
      this.cityChange(this.locationService.getCity(), true);
    if (this.locationService.getLoc())
      this.locationChange(this.locationService.getLoc());

    this.sub = this.route.params.subscribe(params => {
      this.city = params["city"];
      this.location = params["location"];
      let locations = this.locations;

      if (this.city) {
        let city = this.city;
        let foundCity = this.cities.filter(function(c) {
          return c.city == city;
        });
        if (foundCity[0]) {
          this.selectedCity = foundCity[0]._id;
          this.cityChange(foundCity[0]);
        }
      }

      if (this.location) {
        this.locations = locations;
        let location = this.location;
        let foundLoc = locations.filter(function(l) {
          return l.location == location;
        });
        this.selectedLocation = foundLoc[0]._id;
        this.locationChange(foundLoc[0]);
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getCities() {
    this.auth.getCities().subscribe(
      cities => {
        this.cities = cities;
      },
      err => {
        console.error(err);
      }
    );
  }

  cityChange(cityObj, prevData?) {
    $(":focus").blur();
    if (!cityObj) return;
    let cityId = cityObj._id;
    this.selectedCity = cityObj._id;
    let cityData = this.cities.filter(function(city) {
      return city._id == cityId;
    });
    this.mapService.cityChange(cityData[0]);
    this.locationService.setCityObj(cityData[0]);
    if (!prevData) {
      this.locations = [];
      this.getLocations(cityId);
    }
    this.city = cityData[0].city;

    this.locationUrl.go("/" + cityData[0].city);
    this.ga("set", "page", this.locationUrl.path());
    this.ga("send", "pageview");
    console.log(this.ga);
  }

  getLocations(selectedCity?) {
    this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations;

        if (selectedCity)
          this.locations = locations.filter(function(loc) {
            return loc.cityId == selectedCity;
          });
      },
      err => {
        console.error(err);
      }
    );
  }

  locationChange(locObj) {
    $(":focus").blur();
    if (!locObj) return;
    let locId = locObj._id;
    this.selectedLocation = locObj._id;
    let locData = this.locations.filter(function(loc) {
      return loc._id == locId;
    });
    this.mapService.locationChange(locData[0]);
    this.locationService.setLocObj(locData[0]);

    if (this.city)
      this.locationUrl.go("/" + this.city + "/" + locData[0].location);
    else this.locationUrl.go("/" + locData[0].location);

    this.ga("set", "page", this.locationUrl.path());
    this.ga("send", "pageview");
  }

  typeChange(type) {
    if (type.target.innerText.length > 20) return;
    $(".dropdown-toggle")[0].innerText = "Type: " + type.target.innerText;
    this.hideDropDown();
    this.mapService.typeChange(type.target.innerText);
  }

  hideDropDown() {
    $(".dropdown-menu").toggle();
  }

  mapView = false;
  listView = true;

  listViewClicked() {
    this.mapView = true;
    this.listView = false;
    this.viewService.viewChange("listview");
  }

  mapViewClicked() {
    this.mapView = false;
    this.listView = true;
    this.viewService.viewChange("mapview");
  }
}
