import { Component, OnInit, ViewChild } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';
import { ImageService } from 'shared/services/image.service';

@Component({
  selector: 'upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  @ViewChild('myPond') myPond: any;

  adId;
  ad;
  pondOptions = {
    class: 'my-filepond',
    multiple: true,
    labelIdle: 'Drop images here',
    acceptedFileTypes: 'image/jpeg, image/png'
  }

  constructor(
    private propertyService: PropertyService,
    private imageService: ImageService
  ) { }

  ngOnInit() { }

  pondFiles = [];
  images;

  async pondHandleInit() {
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    this.adId = this.propertyService.getAdId();
    this.ad = this.propertyService.getAd();
    this.images = this.ad.imagesData.images;
  }

  onAddFile(event: any) {
    const reader = new FileReader();
    const file = event.file.file;
    reader.readAsDataURL(file);
    reader.onload = () => {
      let image = {
        adId: this.adId,
        filename: file.name,
        filetype: file.type,
        value: reader.result.split(',')[1]
      };
      this.imageService.addImage(image);
    };
  }

  onFileRemoved(event: any) {
    let image= {
      adId: this.adId,
      remove: true
    };
    if (event.filename !== undefined) {
      this.removeImage(event);
      image["filename"] = event.filename;
    } else {
      image["filename"] = event.file.filename;
    }
    this.imageService.removeImage(image);
  }

  private removeImage(image) {
    let index = this.images.indexOf(image);
    if (index > -1) {
      this.images.splice(index, 1);
    }
  }

}
