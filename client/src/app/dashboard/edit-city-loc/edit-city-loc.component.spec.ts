import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCityLocComponent } from './edit-city-loc.component';

describe('EditCityLocComponent', () => {
  let component: EditCityLocComponent;
  let fixture: ComponentFixture<EditCityLocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCityLocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCityLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
