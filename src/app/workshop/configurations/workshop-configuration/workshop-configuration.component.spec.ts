import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopConfigurationComponent } from './workshop-configuration.component';

describe('WorkshopConfigurationComponent', () => {
  let component: WorkshopConfigurationComponent;
  let fixture: ComponentFixture<WorkshopConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
