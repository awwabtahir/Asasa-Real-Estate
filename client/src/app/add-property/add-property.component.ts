import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public mlatitude: number;
  public mlongitude: number;
  public city: string;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 33.69;
    this.longitude = 73.01;

    this.mlatitude = 33.69;
    this.mlongitude = 73.01;
    this.city = "Islamabad";

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
      autocomplete.setComponentRestrictions(
        { 'country': ['pk'] });

      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          console.log(place);

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.mlatitude = place.geometry.location.lat();
          this.mlongitude = place.geometry.location.lng();
          this.zoom = 15;
          this.getCity(this.latitude, this.longitude);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      console.log(navigator);
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.mlatitude = position.coords.latitude;
        this.mlongitude = position.coords.longitude;
        this.zoom = 15;
        this.getCity(this.latitude, this.longitude);
      });
    }
  } 

  getMarkerPosition(event) {
    this.mlatitude = event.coords.lat;
    this.mlongitude = event.coords.lng;
    this.getCity(this.mlatitude, this.mlongitude);
  }

  getCity(lat, lng) {
    let gCity = "";
    let latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
    let request = {
      location: latlng
    };
    geocoder.geocode( request, function (results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
          for (var i = 0; i < results.length; i++) {
            if (results[i].types[0] === "locality") {
              var city = results[i].address_components[0].long_name;
              $('input[name=city]').val(city);
            }
          }
        }
        else { console.log("No reverse geocode results.") }
      }
      else { console.log("Geocoder failed: " + status) }
    });
  }

}