import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachgvComponent } from './danhsachgv.component';

describe('DanhsachgvComponent', () => {
  let component: DanhsachgvComponent;
  let fixture: ComponentFixture<DanhsachgvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhsachgvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhsachgvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
