import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ad } from 'shared/models/ad';
import { MapService } from 'shared/services/map.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PropertyModalService } from 'shared/services/property-modal.service';
import { AuthenticationService } from '../../../../authentication.service';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from 'shared/services/property.service';
import { Location } from '@angular/common';

declare var PANOLENS: any;

@Component({
  selector: 'marker-modal-content',
  templateUrl: './marker-modal-content.component.html',
  styleUrls: ['./marker-modal-content.component.css']
})
export class MarkerModalContentComponent implements OnInit, OnDestroy {

  @Input() ad;
  basic: any;
  location: any;
  plot_features: any;
  other: any;
  nearby_loc: any;
  safeUrl: any;
  image3d = false;

  id: number;
  private sub: any;

  constructor(
    private modalService: PropertyModalService,
    private propertyService: PropertyService,
    private propertyModalService: PropertyModalService,
    private _sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private locationUrl: Location,
    private mapService: MapService) { }

  ngOnInit() {
    if (!this.ad) this.ad = this.propertyModalService.getAd();

    if (!this.ad) {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id'];
        this.getAd(this.id);
      });
    }

    if (this.ad) {
      this.ngOnChanges();
    }

  }

  ngOnChanges() {
    if (!this.ad) return;

    this.locationUrl.replaceState(
      "/" + 
      this.ad.locationData.city + "/" + 
      this.ad.locationData.location + "/" +
      this.ad.type + "/" +
      this.ad._id);

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

  ngOnDestroy() {
    if (this.sub)
      this.sub.unsubscribe();
  }

  getAd(id) {
    this.propertyService.getAds().subscribe(ads => {
      let ad = ads.filter(function (ad) {
        return ad._id == id;
      });
      this.ad = ad[0];
      this.ngOnChanges();
    }, (err) => {
      console.error(err);
    });
  }

  map: any;
  async mapReady(map) {    
    this.loadScripts();
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
    await new Promise((resolve, reject) => setTimeout(resolve, 3000));
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

    if (this.ad.imagesData == undefined) return;
    if (this.ad.imagesData.image3d == undefined) return;
    this.image3d = true;
  }

  url3d() {
    return this._sanitizer.bypassSecurityTrustResourceUrl(this.ad.imagesData.image3d.value);
  }

  panorama;
  reload3D() {
    // if(this.panorama) return;
    // let container = document.querySelector('#target');
    // this.panorama = new PANOLENS.ImagePanorama(this.ad.imagesData.image3d.url);
    // let panorama = this.panorama;
    // setTimeout(function () {
    //   let viewer = new PANOLENS.Viewer({
    //     container: container,
    //     output: 'console'
    //   });
    //   viewer.add(panorama);
    // }, 500);
  }

  private loadScripts() {
    const dynamicScripts = [
     'assets/js/three.min.js',
     'assets/js/panolens.min.js'
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
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
