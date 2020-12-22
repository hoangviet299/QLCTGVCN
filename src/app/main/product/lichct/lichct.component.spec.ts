import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LichctComponent } from './lichct.component';

describe('LichctComponent', () => {
  let component: LichctComponent;
  let fixture: ComponentFixture<LichctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LichctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LichctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
