import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import {TokenPayload} from 'shared/models/token';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    phone: '',
    name: '',
    password: '',
    access: 'agent',
    cityId: null,
    locationId: null,
    subLocations: []
  };
  cities = [];
  locations = [];
  location;

  constructor(private auth: AuthenticationService, private router: Router) {
    this.getCities();
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/dashboard/agents');
    }, (err) => {
      console.error(err);
    });
  }

  cityChange(cityObj) {
    $(':focus').blur();
    let cityId = cityObj._id;
    this.getLocations(cityId);
  }

  locChange(locObj) {
    $(':focus').blur();
    this.location = locObj;
  }

  getCities() {
    this.auth.getCities().subscribe(cities => {
      this.cities = cities;
    }, (err) => {
      console.error(err);
    });
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

}
