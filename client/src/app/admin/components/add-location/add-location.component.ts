import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { MapService } from 'shared/services/map.service';
import { LocationService } from 'shared/services/location.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit, OnDestroy {

  public latitude: number;
  public longitude: number;
  public mlatitude: number;
  public mlongitude: number;

  cityId: string;
  city: any;
  location = "";
  selectedLocation;

  edit = false;
  id: number;
  private sub: any;

  overlayData = {
    lat0: 0,
    lng0: 0,
    lat1: 0,
    lng1: 0,
    imgLoc: '',
  };

  gesture = "greedy";

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private locService: LocationService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id) {
        this.edit = true;
        this.setLocation(this.id);
      }
    });

    if (!this.edit) {
      //set google map
      let latlng = this.locService.getLatLng();
      this.cityId = latlng.cityId;
      this.latitude = this.mlatitude = latlng.lat;
      this.longitude = this.mlongitude = latlng.lng;

      this.getCities(this.cityId);
    }

  }

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
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
      this.city = cities.filter(function (city) {
        return city._id == cityId;
      });
      this.city = this.city[0].city;
    }, (err) => {
      console.error(err);
    });
  }

  setLocation(id) {
    this.auth.getLocations().subscribe(locations => {
      let location = locations.filter(function (loc) {
        return loc._id == id;
      });
      location = location[0];
      this.selectedLocation = location;
      this.cityId = location.cityId;
      this.getCities(this.cityId);
      this.location = location.location;
      this.latitude = this.mlatitude = location.lat;
      this.longitude = this.mlongitude = location.lng;
      this.overlayData = location.overlayData;
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
      this.router.navigateByUrl('/dashboard/editCityLoc');
    }, (err) => {
      console.error(err);
    });
  }

  editLoc(location) {
    let data = {
      _id: this.selectedLocation._id,
      cityId: this.cityId,
      location: location.value,
      lat: this.mlatitude,
      lng: this.mlongitude,
      overlayData: this.overlayData,
      subLocations: this.selectedLocation.subLocations
    }
    this.auth.updateLocation(data).subscribe(() => {
      this.router.navigateByUrl('/dashboard/editCityLoc');
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
