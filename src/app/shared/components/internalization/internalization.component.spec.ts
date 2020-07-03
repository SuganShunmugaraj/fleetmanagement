import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalizationComponent } from './internalization.component';

describe('InternalizationComponent', () => {
  let component: InternalizationComponent;
  let fixture: ComponentFixture<InternalizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternalizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
