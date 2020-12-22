import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DskhoaComponent } from './dskhoa.component';

describe('DskhoaComponent', () => {
  let component: DskhoaComponent;
  let fixture: ComponentFixture<DskhoaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DskhoaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DskhoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
