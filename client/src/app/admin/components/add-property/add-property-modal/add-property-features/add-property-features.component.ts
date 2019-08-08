import { Component, OnInit, Input, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { PropertyService } from "shared/services/property.service";

@Component({
  selector: "add-property-features",
  templateUrl: "./add-property-features.component.html",
  styleUrls: ["./add-property-features.component.css"]
})
export class AddPropertyFeaturesComponent implements OnInit, OnDestroy {
  @ViewChild("form") ngForm: NgForm;
  @Input() type: string;
  @Input() edit: any;

  formChangesSubscription: Subscription;

  features = {
    builtyear: "",
    view: "",
    parking_space: "",
    window: false,
    cac: false,
    ch: false,
    waste_disposal: false,
    flooring: "",
    electric_backup: "",
    floors: "",
    other_features: "",
    furnished: false,
    lobby: false,
    building_floor: "",
    elevators: "",
    service_elevators: false
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    if (this.edit.features) {
      for (var key in this.edit.features) {
        this.features[key] = this.edit.features[key];
      }
    }
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(
      features => {
        console.log(features);
        this.propertyService.addFeatures(features);
      }
    );
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }
}
