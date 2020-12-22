import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NguoidungComponent } from './nguoidung.component';

describe('NguoidungComponent', () => {
  let component: NguoidungComponent;
  let fixture: ComponentFixture<NguoidungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NguoidungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NguoidungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
