import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { PropertyService } from 'shared/services/property.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private auth: AuthenticationService,
    private propertyService: PropertyService
  ) { }

  addImage(image) {
    this.auth.updateImage(image).subscribe((ad) => {
      this.propertyService.addImagesData(ad.imagesData);
      console.log("Successfully Uploaded");
    }, (err) => {
      console.error(err);
    });
  }

  removeImage(image) {
    this.auth.updateImage(image).subscribe((ad) => {
      this.propertyService.addImagesData(ad.imagesData);
      console.log("Successfully Deleted");
    }, (err) => {
      console.error(err);
    });
  }

}
