import { Component, OnInit, OnDestroy } from '@angular/core';
import { PropertyService } from '../../services/property.service';
import { ActivatedRoute } from '@angular/router';

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

  id: number;
  private sub: any;
  edit = false;

  constructor(
    private propertyService: PropertyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id && this.propertyService.getItemforUpdate()) {
        let item = this.propertyService.getItemforUpdate();
        this.setitem(item);
        this.edit = true;
      }
    });

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
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