import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { ad } from "shared/models/ad";
import { MapService } from "shared/services/map.service";
import { DomSanitizer } from "@angular/platform-browser";
import { PropertyModalService } from "shared/services/property-modal.service";
import { AuthenticationService } from "../../../../authentication.service";
import { ActivatedRoute } from "@angular/router";
import { PropertyService } from "shared/services/property.service";
import { Location } from "@angular/common";
import { FilterService } from "shared/services/filter.service";
import { BsModalRef } from "ngx-bootstrap";

declare var PANOLENS: any;

@Component({
  selector: "marker-modal-content",
  templateUrl: "./marker-modal-content.component.html",
  styleUrls: ["./marker-modal-content.component.css"]
})
export class MarkerModalContentComponent implements OnInit, OnDestroy {
  constructor(
    private modalService: PropertyModalService,
    private propertyService: PropertyService,
    private propertyModalService: PropertyModalService,
    private _sanitizer: DomSanitizer,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private locationUrl: Location,
    private mapService: MapService,
    private filterService: FilterService
  ) {}
  @Input() ad;
  basic: any;
  location: any;
  plot_features: any;
  other: any;
  nearby_loc: any;
  safeUrl: any;
  image3d = false;
  modalRef: BsModalRef;
  id: number;
  private sub: any;

  map: any;

  url3D;

  panorama;

  a = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen "
  ];
  b = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety"
  ];

  ngOnInit() {
    if (!this.ad) this.ad = this.propertyModalService.getAd();

    if (!this.ad) {
      this.sub = this.route.params.subscribe(params => {
        this.id = +params["id"];
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
        this.ad.locationData.city +
        "/" +
        this.ad.locationData.location +
        "/" +
        this.ad.type +
        "/" +
        this.ad._id
    );

    this.basic = this.modalService.updateBasic(this.ad, this.basic);
    this.location = this.modalService.updateLocation(
      this.ad.locationData,
      this.location
    );
    this.plot_features = this.ad.plot_features;
    this.other = this.ad.other;
    this.nearby_loc = this.ad.nearby_loc;
    if (this.map) this.mapReady(this.map);

    if (this.ad.vidUrl != "") {
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
        "//www.youtube.com/embed/" + this.getId(this.ad.vidUrl)
      );
    }
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
  closeModal(): void {
    this.modalRef.hide();
  }
  getAd(id) {
    this.propertyService.getAds().subscribe(
      ads => {
        let ad = ads.filter(function(ad) {
          return ad._id == id;
        });
        this.ad = ad[0];
        // console.log(Array.isArray(this.ad.rooms), this.ad);

        this.ngOnChanges();
      },
      err => {
        console.error(err);
      }
    );
  }
  async mapReady(map) {
    // this.loadScripts();
    this.map = map;
    let location = this.location.location;
    let locationObj;
    this.auth.getLocations().subscribe(
      locations => {
        locationObj = locations.filter(loc => {
          return loc.location == location;
        });
        locationObj = locationObj[0];

        if (locationObj.overlayData.imgLoc) {
          var bounds = {
            lat0: locationObj.overlayData.lat0,
            lng0: locationObj.overlayData.lng0,
            lat1: locationObj.overlayData.lat1,
            lng1: locationObj.overlayData.lng1
          };
          this.mapService.addOverLay(
            map,
            bounds,
            locationObj.overlayData.imgLoc,
            true
          );
        }

        if (this.ad.imagesData == undefined) return;
        if (this.ad.imagesData.image3d == undefined) return;
        this.image3d = true;
      },
      err => {
        console.error(err);
      }
    );
    // await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  }
  url3d() {
    this.image3d = true;
    this.url3D = this._sanitizer.bypassSecurityTrustResourceUrl(
      this.ad.imagesData.image3d.value
    );
  }
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

  backClicked() {
    this.locationUrl.back();
  }

  private loadScripts() {
    const dynamicScripts = [
      "assets/js/three.min.js",
      "assets/js/panolens.min.js"
    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement("script");
      node.src = dynamicScripts[i];
      node.type = "text/javascript";
      node.async = false;
      node.charset = "utf-8";
      document.getElementsByTagName("head")[0].appendChild(node);
    }
  }

  private getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  }

  private priceConverter(value) {
    return this.filterService.priceFilter(value);
  }

  public inWords(num) {
    if ((num = num.toString()).length > 9) return "overflow";
    let n: any = ("000000000" + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = "";
    str +=
      n[1] != 0
        ? (this.a[Number(n[1])] || this.b[n[1][0]] + " " + this.a[n[1][1]]) +
          "crore "
        : "";
    str +=
      n[2] != 0
        ? (this.a[Number(n[2])] || this.b[n[2][0]] + " " + this.a[n[2][1]]) +
          "lakh "
        : "";
    str +=
      n[3] != 0
        ? (this.a[Number(n[3])] || this.b[n[3][0]] + " " + this.a[n[3][1]]) +
          "thousand "
        : "";
    str +=
      n[4] != 0
        ? (this.a[Number(n[4])] || this.b[n[4][0]] + " " + this.a[n[4][1]]) +
          "hundred "
        : "";
    str +=
      n[5] != 0
        ? (str != "" ? "and " : "") +
          (this.a[Number(n[5])] || this.b[n[5][0]] + " " + this.a[n[5][1]]) +
          "only "
        : "";
    return str;
  }

  //  console.log(numDifferentiation(-50000000))
}
