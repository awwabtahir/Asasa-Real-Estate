import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MapService } from '../../services/map.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public mlatitude: number;
  public mlongitude: number;

  cityId: string;
  city: any;

  overlayData = {
    lat0 : 0,
    lng0 : 0,
    lat1 : 0,
    lng1 : 0,
    imgLoc: '',
  };

  gesture = "greedy";

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private locService: LocationService
  ) { }

  ngOnInit() {
    //set google map
    let latlng = this.locService.getLatLng();
    this.cityId = latlng.cityId;
    this.latitude = this.mlatitude = latlng.lat;
    this.longitude = this.mlongitude = latlng.lng;

    this.getCities(this.cityId);
  }

  getMarkerPosition(event) {
    this.mlatitude = event.coords.lat;
    this.mlongitude = event.coords.lng;    
    this.getCityWithLoc(this.mlatitude, this.mlongitude);
  }

  mapReady(map) {
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('search'));
    map.setZoom(13);
    this.getCityWithLoc(this.mlatitude, this.mlongitude);
  }

  getCities(cityId) {
    this.auth.getCities().subscribe(cities => {
      this.city = cities.filter(function(city){
        return city._id == cityId;
      });
      this.city = this.city[0].city;
      console.log(this.city);
    }, (err) => {
      console.error(err);
    });
  }

  add(location) {
    let data = {
      cityId: this.cityId,
      location: location.value,
      lat: this.mlatitude,
      lng: this.mlongitude,
      overlayData: this.overlayData
    }
    this.auth.saveLocation(data).subscribe(() => {
      this.router.navigateByUrl('/addProperty');
    }, (err) => {
      console.error(err);
    });
  }

  private getCityWithLoc(lat, lng) {
    let latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (!results[1]) { console.log("No reverse geocode results."); return; }
        for (var i = 0; i < results.length; i++) {
          if (results[i].types[0] === "locality") {
            $('input[name=location]').val(results[1].address_components[0].long_name);
          }
        }
      } else console.log("Geocoder failed: " + status)
    });
  }

}
