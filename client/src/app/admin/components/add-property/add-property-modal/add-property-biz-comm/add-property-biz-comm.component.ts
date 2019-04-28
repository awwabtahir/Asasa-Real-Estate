import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { PropertyService } from "shared/services/property.service";

@Component({
  selector: "add-property-biz-comm",
  templateUrl: "./add-property-biz-comm.component.html",
  styleUrls: ["./add-property-biz-comm.component.css"]
})
export class AddPropertyBizCommComponent implements OnInit, OnDestroy {
  @ViewChild("form") ngForm: NgForm;
  @Input() type: string;
  @Input() edit: any;

  formChangesSubscription: Subscription;

  biz_comm = {
    internet: false,
    cable_tv: false,
    intercom: false,
    business_center: false,
    atm: false,
    other_biz: ""
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    if (this.edit.biz_comm) {
      for (var key in this.edit.biz_comm) {
        this.biz_comm[key] = this.edit.biz_comm[key];
      }
    }
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(
      biz_comm => {
        this.propertyService.addBizComm(biz_comm);
      }
    );
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }
}
