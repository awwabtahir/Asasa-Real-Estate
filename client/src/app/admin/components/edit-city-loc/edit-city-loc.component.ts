import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication.service';
import { LocationService } from 'shared/services/location.service';

@Component({
  selector: 'app-edit-city-loc',
  templateUrl: './edit-city-loc.component.html',
  styleUrls: ['./edit-city-loc.component.css']
})
export class EditCityLocComponent implements OnInit {

  cities = [];
  locations = [];
  filteredlocations = [];

  constructor(
    private auth: AuthenticationService,
    private locService: LocationService
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

    let selectedCity = this.cities.filter(function(city){
      return city._id == cityId;
    });
    selectedCity = selectedCity[0];
    let latlng = {
      cityId: selectedCity["_id"],
      lat: selectedCity["lat"],
      lng: selectedCity["lng"]
    };
    this.locService.setLatLng(latlng);
  }

}
