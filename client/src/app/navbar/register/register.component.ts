import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import {TokenPayload} from './../../models/token';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    access: 'agent',
    cityId: null,
    locationId: null,
    subLocations: {}
  };
  subLocations = [];
  cities = [];
  locations = [];

  constructor(private auth: AuthenticationService, private router: Router) {
    this.getCities();
  }

  register() {
    Object.assign(this.credentials.subLocations, this.subLocations);
    console.log(this.credentials);
    // this.auth.register(this.credentials).subscribe(() => {
    //   this.router.navigateByUrl('/profile');
    // }, (err) => {
    //   console.error(err);
    // });
  }

  cityChange(cityObj) {
    $(':focus').blur();
    let cityId = cityObj._id;
    this.getLocations(cityId);
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
