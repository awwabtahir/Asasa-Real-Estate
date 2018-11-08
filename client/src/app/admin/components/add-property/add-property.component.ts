import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication.service';
import { LocationService } from 'shared/services/location.service';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit, OnDestroy {

  ad = {
    userId: "",
    invId: "",
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
  item;

  id: number;
  private sub: any;
  edit = false;

  user;
  agent = false;

  constructor(
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService
  ) { }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.user.access == "agent") this.agent = true;

    this.getCities();
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));

    if(this.agent == true) {
      this.ad.userId = this.user.userId;
      this.selectedCity = this.user.cityId;
      this.cityChange();
      await new Promise((resolve, reject) => setTimeout(resolve, 1500));
      this.selectedLoc = this.user.locationId;
      this.locationChange();
    }

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id && this.propertyService.getItemforUpdate()) {
        this.item = this.propertyService.getItemforUpdate();
        this.setPage(this.item);
        if (this.item.imagesData !== undefined) 
          this.propertyService.addImagesData(this.item.imagesData);
      }
    });

  }

  ngOnDestroy() {
    if (this.sub)
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

      this.locations = locations.filter(function (loc) {
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
    this.city = this.cities.filter(function (city) {
      return city._id == selectedCity;
    });
    this.city = this.city[0];
    this.selectedLoc = null;
  }

  selectedLoc;
  location: any;
  locationChange() {
    let selectedLoc = this.selectedLoc;
    this.location = this.locations.filter(function (location) {
      return location._id == selectedLoc;
    });
    this.location = this.location[0];
  }

  save(uploadMedia) {
    this.propertyService.save(this.ad);
    this.uploadMedia = uploadMedia;
    if(!uploadMedia) this.router.navigateByUrl('/dashboard/activeProperties');
  }

  image3dUrl;
  async update(uploadMedia) {
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    this.propertyService.update(this.ad);
    this.uploadMedia = uploadMedia;
    if (this.item.imagesData !== undefined) {
      if (this.item.imagesData.image3d !== undefined) {
        this.image3dUrl = this.item.imagesData.image3d.url;
      }
    }
    if(!uploadMedia) this.router.navigateByUrl('/dashboard/activeProperties');
  }

  uploadMedia = false;
  uploadMediaClicked = true;
  updateMedia() {
    this.uploadMediaClicked = false;
    this.propertyService.updateMedia(this.ad);
  }

  onImgUpload(event) {
    if (event.isStored) {
    }
  }

  private async setPage(item) {
    let city = this.cities.filter(function (city) {
      return city.city == item.locationData.city;
    });
    this.selectedCity = city[0]._id;
    this.getLocations(this.selectedCity);
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    let location = this.locations.filter(function (location) {
      return location.location == item.locationData.location;
    });
    this.selectedLoc = location[0]._id;
    this.locationChange();
    this.setitem(item);
    this.edit = true;
  }

  private setitem(item) {
    this.ad["_id"] = item._id;
    this.ad.invId = item.invId;
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