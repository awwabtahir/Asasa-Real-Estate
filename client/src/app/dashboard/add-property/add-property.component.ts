import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { city } from '../../models/city';
import { MapService } from '../../services/map.service';
import { LocationService } from '../../services/location.service';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit, OnDestroy {

  ad = {
    type: "plot",
    subtype: "Residential Plot",
    propNumber: "",
    street: "",
    demand: "",
    area: "",
    areaType: "sqft",
    title: "",
    description: "",
    imgUID: "",
    imgUrl: "",
    imgCount: "0",
    vidUrl: ""
  };
  cities = [];
  locations = [];

  id: number;
  private sub: any;
  edit = false;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private locService: LocationService
  ) { }

  async ngOnInit() {    
    this.getCities();
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id && this.propertyService.getItemforUpdate()) {
        let item = this.propertyService.getItemforUpdate();
        this.setPage(item);
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

  getLocations(selectedCity) {
    this.auth.getLocations().subscribe(locations => { 

      this.locations = locations.filter(function(loc){
        return loc.cityId == selectedCity;
      });

    }, (err) => {
      console.error(err);
    });
  }

  selectedCity;
  city: any;
  cityChange() {
    let selectedCity = this.selectedCity;
    this.getLocations(selectedCity);
    this.city = this.cities.filter(function(city){
      return city._id == selectedCity;
    });    
    this.city = this.city[0];

    let latlng = {
      cityId: this.city._id,
      lat: this.city.lat,
      lng: this.city.lng
    };
    this.locService.setLatLng(latlng);
    this.selectedLoc = null;
  }

  selectedLoc;
  location: any;
  locationChange() {
    let selectedLoc = this.selectedLoc;
    this.location = this.locations.filter(function(location){
      return location._id == selectedLoc;
    });    
    this.location = this.location[0];
  }

  save() {
    this.propertyService.save(this.ad);
  }

  update() {
    this.propertyService.update(this.ad);
  }

  onImgUpload(event) {
    if (event.isStored) {
      this.ad.imgUID = event.uuid;
      this.ad.imgUrl = event.cdnUrl;
      this.ad.imgCount = event.count;
    }
  }

  private async setPage(item) {
    let city = this.cities.filter(function(city){
      return city.city == item.locationData.city;
    });
    this.selectedCity = city[0]._id;
    this.getLocations(this.selectedCity);
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    let location = this.locations.filter(function(location){
      return location.location == item.locationData.location;
    });
    this.selectedLoc = location[0]._id;
    this.locationChange();
    this.setitem(item);
    this.edit = true;
  }

  private setitem(item) {
    this.ad["_id"] = item._id;
    this.ad.type = item.type;
    this.ad.subtype = item.subtype;
    this.ad.propNumber = item.propNumber;
    this.ad.street = item.street;
    this.ad.demand = item.demand;
    this.ad.area = item.area;
    this.ad.areaType = item.areaType;
    this.ad.title = item.title;
    this.ad.description = item.description;
    this.ad.imgUID = item.imgUID;
    this.ad.imgUrl = item.imgUrl;
    this.ad.imgCount = item.imgCount;
    this.ad.vidUrl = item.vidUrl;
  }

}