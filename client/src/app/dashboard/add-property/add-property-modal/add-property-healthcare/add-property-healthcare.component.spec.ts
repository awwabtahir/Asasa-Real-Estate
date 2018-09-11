import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyHealthcareComponent } from './add-property-healthcare.component';

describe('AddPropertyHealthcareComponent', () => {
  let component: AddPropertyHealthcareComponent;
  let fixture: ComponentFixture<AddPropertyHealthcareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyHealthcareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyHealthcareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
