import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterComponent } from './toaster.component';
import { stringify } from '@angular/core/src/render3/util';

describe('ToasterComponent', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Toaster component loaded sucessfully', () => {
    expect(component).toBeTruthy();
  });

  it('Toaster is enabled and toaster data should be a string data, when create button is clicked from Create workshoporder page', () => {
    component.ngOnInit();
    let data: string;
   expect(component.toasterData).toBe(data);
  });

  it('Toaster Data should be null, once the dismiss button is clicked', () => {
    component.dismiss();
   expect(component.toasterData).toBeNull();
  });
});
