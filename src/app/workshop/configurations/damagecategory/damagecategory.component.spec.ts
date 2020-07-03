import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DamagecategoryComponent } from './damagecategory.component';

describe('DamagecategoryComponent', () => {
  let component: DamagecategoryComponent;
  let fixture: ComponentFixture<DamagecategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DamagecategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DamagecategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
