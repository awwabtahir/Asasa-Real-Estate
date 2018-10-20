import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertyService } from 'shared/services/property.service';

@Component({
  selector: 'add-property-other',
  templateUrl: './add-property-other.component.html',
  styleUrls: ['./add-property-other.component.css']
})
export class AddPropertyOtherComponent implements OnInit, OnDestroy {

  @ViewChild('form') ngForm: NgForm;
  @Input() type: string;
  formChangesSubscription: Subscription;

  other = {
    maintainance_staff: false,
    security_staff: false,
    facilities_disable: false,
    pet_policy: "",
    other_facilities: ""
  }

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(other => {
      this.propertyService.addOther(other);
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

}
