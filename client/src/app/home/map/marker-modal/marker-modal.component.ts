import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PropertyModalService } from '../../../services/property-modal.service';
import { ad } from '../../../models/ad';
import { MapService } from '../../../services/map.service';

@Component({
  selector: 'marker-modal',
  templateUrl: './marker-modal.component.html',
  styleUrls: ['./marker-modal.component.css']
})
export class MarkerModalComponent implements OnInit, OnChanges {

  @Input() ad: any;
  basic: any;
  location: any;
  plot_features: any;
  other: any;
  nearby_loc: any;

  gesture = "greedy";

  constructor(private modalService: PropertyModalService,
  private mapService: MapService) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if(!this.ad) return;
    
    this.basic = this.modalService.updateBasic(this.ad, this.basic);
    this.location = this.modalService.updateLocation(this.ad.locationData, this.location);
    this.plot_features = this.ad.plot_features;
    this.other = this.ad.other;
    this.nearby_loc = this.ad.nearby_loc;

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
