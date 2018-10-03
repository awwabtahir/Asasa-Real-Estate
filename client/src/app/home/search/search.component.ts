import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MapService } from '../../services/map.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  cities = [];
  locations = [];

  selectedCity;
  selectedLocation;

  city: string;
  location: string;
  private sub: any;

  constructor(
    private auth: AuthenticationService,
    private mapService: MapService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit() {
    this.getCities();
    this.getLocations();
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));

    this.sub = this.route.params.subscribe(params => {
      this.city = params['city'];
      this.location = params['location'];
      let locations = this.locations;

      if (this.city) {
        let city = this.city;
        let foundCity = this.cities.filter(function (c) {
          return c.city == city;
        });
        this.selectedCity = foundCity[0]._id;
        this.cityChange(foundCity[0]);
      }

      if (this.location) {
        this.locations = locations;
        let location = this.location;
        let foundLoc = locations.filter(function (l) {
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
    this.auth.getCities().subscribe(cities => {
      this.cities = cities;
    }, (err) => {
      console.error(err);
    });
  }

  cityChange(cityObj) {
    $(':focus').blur();
    let cityId = cityObj._id;
    let cityData = this.cities.filter(function (city) {
      return city._id == cityId;
    });
    this.mapService.cityChange(cityData[0]);
    this.locations = [];
    this.getLocations(cityId);
  }

  getLocations(selectedCity?) {
    this.auth.getLocations().subscribe(locations => {
      this.locations = locations;

      if (selectedCity)
        this.locations = locations.filter(function (loc) {
          return loc.cityId == selectedCity;
        });
    }, (err) => {
      console.error(err);
    });
  }

  locationChange(locObj) {
    $(':focus').blur();
    let locId = locObj._id;
    let locData = this.locations.filter(function (loc) {
      return loc._id == locId;
    });
    this.mapService.locationChange(locData[0]);
  }

}
