import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPropertyRoomsComponent } from './add-property-rooms.component';

describe('AddPropertyRoomsComponent', () => {
  let component: AddPropertyRoomsComponent;
  let fixture: ComponentFixture<AddPropertyRoomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPropertyRoomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
