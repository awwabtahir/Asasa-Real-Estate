/// <reference types="@types/googlemaps" />
declare var klokantech: any;
import { Component, OnInit, ViewChild, ElementRef, NgZone, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import * as $ from 'jquery';
import { PropertyService } from '../../../services/property.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-property-location',
  templateUrl: './add-property-location.component.html',
  styleUrls: ['./add-property-location.component.css']
})
export class AddPropertyLocationComponent implements OnInit, OnDestroy {

  @ViewChild("search")
  public searchElementRef: ElementRef;
  public searchControl: FormControl;

  public latitude: number;
  public longitude: number;
  public mlatitude: number;
  public mlongitude: number;
  public zoom: number;

  public location = "dha";
  public city = "Peshawar";

  gesture = "greedy";

  id: number;
  private sub: any;

  constructor(
    private propertyService: PropertyService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    //set google maps defaults
    this.latitude = this.mlatitude = 33.69;
    this.longitude = this.mlongitude = 73.01;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
      autocomplete.setComponentRestrictions({ 'country': ['pk'] });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) return;

          //set latitude, longitude and zoom
          this.latitude = this.mlatitude = place.geometry.location.lat();
          this.longitude = this.mlongitude = place.geometry.location.lng();
          this.getCityWithLoc(this.latitude, this.longitude);
          this.setLocationData();
        });
      });
    });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if(this.id && this.propertyService.getItemforUpdate()) {
        let item = this.propertyService.getItemforUpdate();
        this.latitude = this.mlatitude = item.locationData.lat;
        this.longitude = this.mlongitude = item.locationData.lng;
        this.location = item.locationData.location;
        this.city = item.locationData.city;
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getMarkerPosition(event) {
    this.mlatitude = event.coords.lat;
    this.mlongitude = event.coords.lng;
    this.getCityWithLoc(this.mlatitude, this.mlongitude);
    this.setLocationData();
  }

  mapReady(map) {
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('search'));
    var mapBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(34.03589373, 71.40848471),
      new google.maps.LatLng(34.08513423, 71.48481756));
    this.addOverLay(map, mapBounds, "peshawar/dha");
  }

  locationChange(event) {
    console.log(event);
    this.setLocationData();
  }

  private async setLocationData() {
    // wait 3 seconds
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
    // this.city = $('input[name=city]').val();
    this.propertyService.addLocation({
      lat: this.mlatitude,
      lng: this.mlongitude,
      location: this.location,
      city: this.city
    });
  }



  private setCurrentPosition() {
    // if ("geolocation" in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.latitude = this.mlatitude = position.coords.latitude;
    //     this.longitude = this.mlongitude = position.coords.longitude;
    //     this.getCityWithLoc(this.latitude, this.longitude);
    //     this.zoom = 15;
    //     this.setLocationData();
    //   });
    // }
    this.latitude = this.mlatitude = 34.052059005117556;
    this.longitude = this.mlongitude = 71.42871650000006;
    this.setLocationData();
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
            $('input[name=city]').val(results[i].address_components[0].long_name);
          }
        }
      } else console.log("Geocoder failed: " + status)
    });
  }

  private addOverLay(map, mapBounds, imgLoc) {
    var mapMinZoom = 12;
    var mapMaxZoom = 17;
    var overlay = new klokantech.MapTilerMapType(map, function (x, y, z) {
      return "assets/map/" + imgLoc + "/{z}/{x}/{y}.png".replace('{z}', z).replace('{x}', x).replace('{y}', y);
    },
      mapBounds, mapMinZoom, mapMaxZoom);

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    var opacitycontrol = new klokantech.OpacityControl(map, overlay);
    var geoloccontrol = new klokantech.GeolocationControl(map, mapMaxZoom);
    map.fitBounds(mapBounds);
    map.setZoom(14);
  }

}
