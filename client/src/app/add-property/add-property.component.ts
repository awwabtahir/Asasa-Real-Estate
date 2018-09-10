import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../property.service';

@Component({
  selector: 'add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {

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

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
  }

  save() { 
    this.propertyService.save(this.ad);
  }

  onImgUpload(event) {
    if(event.isStored) {
      this.ad.imgUID = event.uuid;
      this.ad.imgUrl = event.cdnUrl;
      this.ad.imgCount = event.count;
    }
  }

}