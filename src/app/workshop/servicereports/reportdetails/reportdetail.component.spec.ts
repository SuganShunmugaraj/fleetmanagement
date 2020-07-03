import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportdetailComponent } from './reportdetail.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { SharedModule } from '../../../shared/shared.module';
import { Routes, RouterModule} from '@angular/router';
import { WorkshoporderService } from '../../../core/services/workshoporder.service'
import {ApiService } from '../../../core/services/';

describe('ReportdetailComponent', () => {
  let component: ReportdetailComponent;
  let fixture: ComponentFixture<ReportdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReportdetailComponent],
      imports: [SharedModule,  RouterModule.forRoot([])],
      providers: [ReportdetailComponent, ApiService, WorkshoporderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
