import { Component, OnInit, Input } from '@angular/core';
import { PropertyService } from 'shared/services/property.service';
import { PropertyModalService } from 'shared/services/property-modal.service';

@Component({
  selector: 'info-window-content',
  templateUrl: './info-window-content.component.html',
  styleUrls: ['./info-window-content.component.css']
})
export class InfoWindowContentComponent implements OnInit {

  @Input() ad;

  constructor(
    private propertyService: PropertyService,
    private propertyModalService: PropertyModalService
  ) { }

  ngOnInit() {
  }

  getDemand(demand) {
    return this.propertyService.localeString(demand);
  }

  onPropClick(ad) {
    this.propertyModalService.setAd(ad);
  }

}
