import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyPlotFeaturesComponent } from './add-property-plot-features.component';

describe('AddPropertyPlotFeaturesComponent', () => {
  let component: AddPropertyPlotFeaturesComponent;
  let fixture: ComponentFixture<AddPropertyPlotFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyPlotFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyPlotFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
