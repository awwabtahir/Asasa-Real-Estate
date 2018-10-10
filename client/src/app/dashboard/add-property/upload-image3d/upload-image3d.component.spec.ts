import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImage3dComponent } from './upload-image3d.component';

describe('UploadImage3dComponent', () => {
  let component: UploadImage3dComponent;
  let fixture: ComponentFixture<UploadImage3dComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImage3dComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImage3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
