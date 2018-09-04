import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyOtherComponent } from './add-property-other.component';

describe('AddPropertyOtherComponent', () => {
  let component: AddPropertyOtherComponent;
  let fixture: ComponentFixture<AddPropertyOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
