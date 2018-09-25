import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerModalContentComponent } from './marker-modal-content.component';

describe('MarkerModalContentComponent', () => {
  let component: MarkerModalContentComponent;
  let fixture: ComponentFixture<MarkerModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerModalContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
