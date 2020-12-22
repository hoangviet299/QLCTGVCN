import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DssvComponent } from './dssv.component';

describe('DssvComponent', () => {
  let component: DssvComponent;
  let fixture: ComponentFixture<DssvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DssvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DssvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
