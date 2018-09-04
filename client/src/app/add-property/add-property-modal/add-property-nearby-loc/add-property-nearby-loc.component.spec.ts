import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyNearbyLocComponent } from './add-property-nearby-loc.component';

describe('AddPropertyNearbyLocComponent', () => {
  let component: AddPropertyNearbyLocComponent;
  let fixture: ComponentFixture<AddPropertyNearbyLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyNearbyLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyNearbyLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
