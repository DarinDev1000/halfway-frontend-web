import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapRouteComponent } from './map-route.component';

describe('MapRouteComponent', () => {
  let component: MapRouteComponent;
  let fixture: ComponentFixture<MapRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
