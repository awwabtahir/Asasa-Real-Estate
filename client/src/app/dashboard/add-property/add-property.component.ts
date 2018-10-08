import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
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

  @ViewChild('myPond') myPond: any;

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
    vidUrl: ""
  };
  cities = [];
  locations = [];

  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop images here',
    acceptedFileTypes: 'image/jpeg, image/png'
  }

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
    if(this.sub)
      this.sub.unsubscribe();
  }

  pondFiles = []
 
  pondHandleInit() {
    console.log('FilePond has initialised', this.myPond);
  }
 
  pondHandleAddFile(event: any) {
    console.log('A file was added', event);
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
    }
  }

  image;
  Img3dSelected = false;
  on3DImageSelect(event) {
    const reader = new FileReader();
    this.Img3dSelected = true;
    if(event.target.files &&
      event.target.files.length > 0) {
        const file = event.target.files[0];
        console.log(file);
      }
  }

  on3dUploadClicked() {
    console.log(this.image);
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
    this.ad.vidUrl = item.vidUrl;
  }

}