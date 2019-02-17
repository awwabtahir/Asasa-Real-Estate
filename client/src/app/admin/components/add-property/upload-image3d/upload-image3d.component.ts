import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';

@Component({
  selector: 'upload-image3d',
  templateUrl: './upload-image3d.component.html',
  styleUrls: ['./upload-image3d.component.css']
})
export class UploadImage3dComponent implements OnInit {

  @Input() url;
  @Input() item;

  imagesData = {};
  Img3dSelected = false;

  constructor(
    private propertyService: PropertyService
  ) { }

  ngOnInit() {
  }

  on3DImageSelect(event) {
    let url = event.target.value;
    let image3d = {
      value: url
    };
    this.imagesData["image3d"] = image3d;
    this.propertyService.addImagesData(this.imagesData);


    // const reader = new FileReader();
    // this.Img3dSelected = true;
    // this.url = null;
    // if (event.target.files &&
    //   event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     $('#preview3d')
    //       .attr('src', URL.createObjectURL(event.target.files[0]));
    //     let image3d = {
    //       filename: file.name,
    //       filetype: file.type,
    //       value: reader.result.split(',')[1]
    //     };
    //     this.imagesData["image3d"] = image3d;
    //     this.propertyService.addImagesData(this.imagesData);
    //   };
    // }
  }

  remove3d() {
    this.Img3dSelected = false;
    this.url = false;
    if(this.imagesData !== {}) {
      this.imagesData = {};
      this.propertyService.addImagesData(this.imagesData);
    }
    if(this.item.imagesData.image3d) {
      this.item.imagesData.image3d["remove"] = true;
      this.propertyService.addImagesData(this.item.imagesData);
    }
  }

}
