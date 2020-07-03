import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportlistComponent } from './reportlist.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { WorkshoporderService } from '../../../core/services/workshoporder.service'
import {ApiService } from '../../../core/services/';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ServicereportsComponent', () => {
  let component: ReportlistComponent;
  let fixture: ComponentFixture<ReportlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportlistComponent, LoaderComponent],
      imports: [TableModule, RouterModule,  HttpClientModule],
      providers: [ApiService, WorkshoporderService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
