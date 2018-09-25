import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropertyModalService } from '../../../services/property-modal.service';
import { MapService } from '../../../services/map.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ad } from '../../../models/ad';

@Component({
  selector: 'marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.css']
})
export class MarkerModalComponent implements OnInit, OnChanges {

  @Input() ad: ad;
  basic: any;
  location: any;
  plot_features: any;
  other: any;
  nearby_loc: any;
  safeUrl: any;

  gesture = "greedy";

  constructor(private modalService: PropertyModalService,
    private mapService: MapService, private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    $('#markerModal').on('show.bs.modal', function (e) {
      if (window.innerWidth < 800) {
        return e.preventDefault();
      }
    });

   }

  ngOnChanges(changes: SimpleChanges) {
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

  mapReady(map) {
    var bounds = {
      lat0: 34.03589373,
      lng0: 71.40848471,
      lat1: 34.08513423,
      lng1: 71.48481756
    };
    this.mapService.addOverLay(map, bounds, "peshawar/dha");
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
