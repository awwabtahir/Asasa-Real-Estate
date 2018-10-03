import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {

  cities = [];
  locations = [];
  filteredlocations = [];

  constructor(
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.getCities();
    this.getLocations();
  }

  getCities() {
    this.auth.getCities().subscribe(cities => {
      this.cities = cities;
    }, (err) => {
      console.error(err);
    });
  }

  getLocations() {
    this.auth.getLocations().subscribe(locations => { 
      this.locations = locations;
    }, (err) => {
      console.error(err);
    });
  }

  city;
  cityChanged(cityId, city) {
    this.filteredlocations = this.locations.filter(function(loc){
      return loc.cityId == cityId;
    });
    this.city = city;
  }

}
