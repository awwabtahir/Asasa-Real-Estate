/// <reference types="@types/googlemaps" />
declare var klokantech: any;
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
  OnDestroy,
  Input,
  OnChanges
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import * as $ from "jquery";
import { PropertyService } from "shared/services/property.service";
import { ActivatedRoute } from "@angular/router";
import { MapService } from "shared/services/map.service";
import { city } from "shared/models/city";
import { location } from "shared/models/location";
import { AuthenticationService } from "../../../../authentication.service";

@Component({
  selector: "add-property-location",
  templateUrl: "./add-property-location.component.html",
  styleUrls: ["./add-property-location.component.css"]
})
export class AddPropertyLocationComponent
  implements OnInit, OnDestroy, OnChanges {
  // @ViewChild("search")
  // public searchElementRef: ElementRef;
  // public searchControl: FormControl;

  @Input() cityData: city;
  @Input() locationData;
  @Input() edit;

  public latitude: number;
  public longitude: number;
  public mlatitude: number;
  public mlongitude: number;
  public zoom: number;

  public sector = "";
  public location: string;
  public city: string;

  user;
  agent = false;

  gesture = "greedy";

  id: number;
  private sub: any;

  constructor(
    private propertyService: PropertyService,
    private mapService: MapService,
    // private mapsAPILoader: MapsAPILoader,
    // private ngZone: NgZone,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    if (this.user.access == "agent") this.agent = true;

    if (this.agent == true) {
      this.city = this.cityData.city;

      let subLocations = [];
      for (var i = 0; i < this.user.subLocations.length; i++) {
        let subLocation = this.user.subLocations[i];
        let foundSubLocation = this.locationData.subLocations.filter(function(
          loc
        ) {
          return loc.subLocation == subLocation;
        });
        subLocations.push(foundSubLocation[0]);
      }
      if (this.user.subLocations.length !== 0)
        this.locationData.subLocations = subLocations;
    }
    //set google map
    if (!this.locationData || this.edit) {
      this.latitude = this.mlatitude = this.locationData.lat;
      this.longitude = this.mlongitude = this.locationData.lng;
      this.location = this.locationData.location;
      this.city = this.cityData.city;
    }
    this.sub = this.route.params.subscribe(params => {
      this.id = +params["id"];
      if (this.id && this.propertyService.getItemforUpdate()) {
        let item = this.propertyService.getItemforUpdate();

        this.latitude = this.mlatitude = item.locationData.lat;
        this.longitude = this.mlongitude = item.locationData.lng;
        this.sector = item.locationData.sector;
        this.location = item.locationData.location;
        this.city = item.locationData.city;

        this.setLocationData(false);
      }
    });
  }

  ngOnChanges() {
    if (this.locationData) {
      this.location = this.locationData.location;
      this.setLocationData();
    }

    if (this.edit) {
      if (this.map) this.mapReady(this.map);
      return;
    }
    this.latitude = this.mlatitude = this.locationData.lat;
    this.longitude = this.mlongitude = this.locationData.lng;
    this.city = this.cityData.city;
    if (this.map) this.mapReady(this.map);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  locations = [];
  getLocations(selectedCity) {
    this.auth.getLocations().subscribe(
      locations => {
        this.locations = locations.filter(function(loc) {
          return loc.cityId == selectedCity;
        });
      },
      err => {
        console.error(err);
      }
    );
  }

  getMarkerPosition(event) {
    this.mlatitude = event.coords.lat;
    this.mlongitude = event.coords.lng;
    this.getCityWithLoc(this.mlatitude, this.mlongitude);
    this.setLocationData(false);
  }

  map: any;
  mapReady(map) {
    this.map = map;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      document.getElementById("search")
    );
    map.setZoom(13);
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    if (this.locationData.overlayData.imgLoc) {
      var bounds = {
        lat0: this.locationData.overlayData.lat0,
        lng0: this.locationData.overlayData.lng0,
        lat1: this.locationData.overlayData.lat1,
        lng1: this.locationData.overlayData.lng1
      };
      this.mapService.addOverLay(
        map,
        bounds,
        this.locationData.overlayData.imgLoc
      );
    }
  }

  sectorChange(event) {
    this.setLocationData(false);
  }

  private async setLocationData(wait = true) {
    // wait 3 seconds

    if (wait) {
      this.propertyService.addLocation({
        lat: this.locationData.lat,
        lng: this.locationData.lng,
        sector: this.sector,
        location: this.locationData.location,
        city: this.cityData.city
      });
    } else {
      this.propertyService.addLocation({
        lat: this.mlatitude,
        lng: this.mlongitude,
        sector: this.sector,
        location: this.location,
        city: this.city
      });
    }
  }

  private getCityWithLoc(lat, lng) {
    let latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latlng }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (!results[1]) {
          console.log("No reverse geocode results.");
          return;
        }
        for (var i = 0; i < results.length; i++) {
          if (results[i].types[0] === "locality") {
            $("input[name=location]").val(
              results[1].address_components[0].long_name
            );
            $("input[name=city]").val(
              results[i].address_components[0].long_name
            );
          }
        }
      } else console.log("Geocoder failed: " + status);
    });
  }
}
