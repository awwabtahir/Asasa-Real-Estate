import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavHeartComponent } from './fav-heart.component';

describe('FavHeartComponent', () => {
  let component: FavHeartComponent;
  let fixture: ComponentFixture<FavHeartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavHeartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
