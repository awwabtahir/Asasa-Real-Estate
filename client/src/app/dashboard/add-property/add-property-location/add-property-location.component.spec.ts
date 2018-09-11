import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyLocationComponent } from './add-property-location.component';

describe('AddPropertyLocationComponent', () => {
  let component: AddPropertyLocationComponent;
  let fixture: ComponentFixture<AddPropertyLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
