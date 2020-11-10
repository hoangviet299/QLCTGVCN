import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GvcnComponent } from './gvcn.component';

describe('GvcnComponent', () => {
  let component: GvcnComponent;
  let fixture: ComponentFixture<GvcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GvcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GvcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
