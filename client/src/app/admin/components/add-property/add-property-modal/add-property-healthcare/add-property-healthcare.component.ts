import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { PropertyService } from "shared/services/property.service";

@Component({
  selector: "add-property-healthcare",
  templateUrl: "./add-property-healthcare.component.html",
  styleUrls: ["./add-property-healthcare.component.css"]
})
export class AddPropertyHealthcareComponent implements OnInit {
  @ViewChild("form") ngForm: NgForm;
  @Input() type: string;
  @Input() edit: any;

  formChangesSubscription: Subscription;

  healthcare = {
    lawn: false,
    pool: false,
    sauna: false,
    jacuzzi: false,
    other_healthcare: ""
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    if (this.edit.healthcare) {
      for (var key in this.edit.healthcare) {
        this.healthcare[key] = this.edit.healthcare[key];
      }
    }
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(
      healthcare => {
        this.propertyService.addHealthCare(healthcare);
      }
    );
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }
}
