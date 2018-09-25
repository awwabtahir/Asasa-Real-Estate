import { Component, OnInit, Input } from '@angular/core';
import { ad } from '../../../../models/ad';
import { MapService } from '../../../../services/map.service';
import { DomSanitizer } from '@angular/platform-browser';
import { PropertyModalService } from '../../../../services/property-modal.service';

@Component({
  selector: 'marker-modal-content',
  templateUrl: './marker-modal-content.component.html',
  styleUrls: ['./marker-modal-content.component.css']
})
export class MarkerModalContentComponent implements OnInit {

  @Input() ad: ad;
  basic: any;
  location: any;
  plot_features: any;
  other: any;
  nearby_loc: any;
  safeUrl: any;

  constructor(
    private modalService: PropertyModalService,
    private propertyModalService: PropertyModalService,
    private _sanitizer: DomSanitizer, 
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

    if (this.ad.vidUrl != "") {
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl("//www.youtube.com/embed/" + this.getId(this.ad.vidUrl));      
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

  mapReady(map) {
    var bounds = {
      lat0: 34.03589373,
      lng0: 71.40848471,
      lat1: 34.08513423,
      lng1: 71.48481756
    };
    this.mapService.addOverLay(map, bounds, "peshawar/dha");
  }

}
