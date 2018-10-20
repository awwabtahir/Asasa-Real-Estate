import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PropertyService } from 'shared/services/property.service';

@Component({
  selector: 'add-property-plot-features',
  templateUrl: './add-property-plot-features.component.html',
  styleUrls: ['./add-property-plot-features.component.css']
})
export class AddPropertyPlotFeaturesComponent implements OnInit, OnDestroy {

  @ViewChild('form') ngForm: NgForm;
  formChangesSubscription: Subscription;

  plot_features = {
    possession: false,
    corner: false,
    park_facing: false,
    disputed: false,
    file: false,
    balloted: false,
    sewerage: false,
    electricity: false,
    water_supply: false,
    sui_gas: false,
    boundary_wall: false,
    plot_features: ""
  }

  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.formChangesSubscription = this.ngForm.form.valueChanges.subscribe(plot_features => {
      this.propertyService.addPlotFeatures(plot_features);
    });
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

}
