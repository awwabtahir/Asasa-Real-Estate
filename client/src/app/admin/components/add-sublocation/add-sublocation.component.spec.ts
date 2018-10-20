import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSublocationComponent } from './add-sublocation.component';

describe('AddSublocationComponent', () => {
  let component: AddSublocationComponent;
  let fixture: ComponentFixture<AddSublocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSublocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSublocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
