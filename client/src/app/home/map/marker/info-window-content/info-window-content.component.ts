import { Component, OnInit, Input, TemplateRef } from "@angular/core";
import { PropertyService } from "shared/services/property.service";
import { PropertyModalService } from "shared/services/property-modal.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap";

@Component({
  selector: "info-window-content",
  templateUrl: "./info-window-content.component.html",
  styleUrls: ["./info-window-content.component.css"]
})
export class InfoWindowContentComponent implements OnInit {

  @Input() ad;
  modalRef: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private propertyService: PropertyService,
    private propertyModalService: PropertyModalService
  ) { }

  ngOnInit() {
  }

  getDemand(demand) {
    return this.propertyService.localeString(demand);
  }

  onPropClick(template: TemplateRef<any>, ad: any) {
    this.propertyModalService.setAd(ad);
    this.modalRef = this.modalService.show(template, { class: "modal-xl" });
  }

}
