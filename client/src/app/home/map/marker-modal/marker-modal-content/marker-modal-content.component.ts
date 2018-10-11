import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ad } from '../../../../models/ad';
import { MapService } from '../../../../services/map.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PropertyModalService } from '../../../../services/property-modal.service';
import { AuthenticationService } from '../../../../services/authentication.service';

declare var PANOLENS: any;

@Component({
  selector: 'marker-modal-content',
  templateUrl: './marker-modal-content.component.html',
  styleUrls: ['./marker-modal-content.component.css']
})
export class MarkerModalContentComponent implements OnInit {

  @Input() ad;
  basic: any;
  location: any;
  plot_features: any;
  other: any;
  nearby_loc: any;
  safeUrl: any;
  image3d = false;

  constructor(
    private modalService: PropertyModalService,
    private propertyModalService: PropertyModalService,
    private _sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private mapService: MapService) { }

  ngOnInit() {
    if (!this.ad) this.ad = this.propertyModalService.getAd();
    if (this.ad) {
      this.ngOnChanges();
    }

  }

  ngOnChanges() {
    if (!this.ad) return;

    this.basic = this.modalService.updateBasic(this.ad, this.basic);
    this.location = this.modalService.updateLocation(this.ad.locationData, this.location);
    this.plot_features = this.ad.plot_features;
    this.other = this.ad.other;
    this.nearby_loc = this.ad.nearby_loc;
    if (this.map) this.mapReady(this.map);

    if (this.ad.vidUrl != "") {
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/" + this.getId(this.ad.vidUrl));
    }

  }

  map: any;
  panorama: any;
  viewer: any;
  async mapReady(map) {
    this.map = map;
    let location = this.location.location;
    let locationObj;
    this.auth.getLocations().subscribe(locations => {

      locationObj = locations.filter(function (loc) {
        return loc.location == location;
      });

    }, (err) => {
      console.error(err);
    });
    await new Promise((resolve, reject) => setTimeout(resolve, 1500));
    locationObj = locationObj[0];

    if (locationObj.overlayData.imgLoc) {
      var bounds = {
        lat0: locationObj.overlayData.lat0,
        lng0: locationObj.overlayData.lng0,
        lat1: locationObj.overlayData.lat1,
        lng1: locationObj.overlayData.lng1
      };
      this.mapService.addOverLay(map, bounds, locationObj.overlayData.imgLoc, true);
    }

    if(this.ad.imagesData.image3d == undefined) return;

    this.image3d = true;
    let container = document.querySelector( '#target' );
    this.panorama = new PANOLENS.ImagePanorama( this.ad.imagesData.image3d.url );
    this.viewer = new PANOLENS.Viewer({
      container: container,
      output: 'console'
    });
    this.viewer.add( this.panorama );
    console.log(this.viewer);


    // this.viewer = new Kaleidoscope.Image({
    //   source: this.ad.imagesData.image3d.url,
    //   verticalPanning: false,
    //   containerId: '#target'
    // });
    // delete this.viewer.controls.onDeviceMotion;
    // this.viewer.render();
  }

  private getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return 'error';
    }
  }

}
