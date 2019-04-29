import { Component, OnInit, OnDestroy, ViewChild, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { PropertyService } from "shared/services/property.service";

@Component({
  selector: "add-property-nearby-loc",
  templateUrl: "./add-property-nearby-loc.component.html",
  styleUrls: ["./add-property-nearby-loc.component.css"]
})
export class AddPropertyNearbyLocComponent implements OnInit, OnDestroy {
  @ViewChild("form") ngForm: NgForm;
  formChangesSubscription: Subscription;
  @Input() edit: any;

  nearby_loc = {
    nearby_schools: "",
    nearby_hospitals: "",
    nearby_shoppingmalls: "",
    nearby_restaurants: "",
    airport_distance: "",
    nearby_transport: "",
    nearby_places: ""
  };

  constructor(private propertyService: PropertyService) {}

  ngOnInit() {
    if (this.edit.nearby_loc) {
      for (var key in this.edit.nearby_loc) {
        this.nearby_loc[key] = this.edit.nearby_loc[key];
      }
    }
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(
      nearby_loc => {
        this.propertyService.addNearByLoc(nearby_loc);
      }
    );
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }
}
