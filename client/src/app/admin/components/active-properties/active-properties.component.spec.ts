import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePropertiesComponent } from './active-properties.component';

describe('ActivePropertiesComponent', () => {
  let component: ActivePropertiesComponent;
  let fixture: ComponentFixture<ActivePropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivePropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivePropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
