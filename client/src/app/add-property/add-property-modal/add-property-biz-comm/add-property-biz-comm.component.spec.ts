import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyBizCommComponent } from './add-property-biz-comm.component';

describe('AddPropertyBizCommComponent', () => {
  let component: AddPropertyBizCommComponent;
  let fixture: ComponentFixture<AddPropertyBizCommComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyBizCommComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyBizCommComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
