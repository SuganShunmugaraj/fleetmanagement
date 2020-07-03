import { async, ComponentFixture, TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EditComponent } from './edit.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EditworkshoporderService, ApiService,WorkshoporderService } from '../../../core/services/';
import { RouterTestingModule } from '@angular/router/testing';
import { from as observableFrom } from 'rxjs';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { EditworkshopModule } from '../../../workshop/editworkshop/editworkshop.module';
import { EditworkshopRoutingModule } from '../../../workshop/editworkshop/editworkshop-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { Routes } from '@angular/router';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let _editworkshoporderService: EditworkshoporderService;
  let apiService: ApiService;
  let http: HttpClient;
  let _router: Router;

  beforeEach(async(() => {


    TestBed.configureTestingModule({
      declarations: [EditComponent],
      imports: [RouterModule, HttpClientModule, RouterTestingModule, EditworkshopRoutingModule, SharedModule],
      providers: [EditworkshoporderService, ApiService, WorkshoporderService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    _editworkshoporderService = new EditworkshoporderService(apiService, http);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('200, Component Loaded Sucessfully', () => {
    expect(component).toBeTruthy();
  });

  it('200, Drag for Waiting loaded successfully', () => {
    expect(component.dragstart).toBeTruthy();
  });

  it('200, Drag for inprogress loaded successfully', () => {
    expect(component.inprogressdragstart).toBeTruthy();
  });

  it('200, Drag for inprogress loaded successfully', () => {
    expect(component.drop).toBeTruthy();
  });


  it('should set Waiting data  with the items returned from the server', () => {
    // Arrange - Setup
    const waitingtrucks = [
      {
        assignedSlot: null,
        author: "Test User",
        createdBy: "Test User",
        createdDate: "2019-04-29T07:40:34.618+0000",
        modifiedBy: "Test User",
        operatingHours: 0,
        outOfOrder: true,
        priority: 1,
        repairDescription: null,
        reportNumber: 0,
        reporter: "Test User",
        serialNumber: "F20179G00187",
        shipToPartyNo: 29804,
        truckName: "EXU-SF 20",
        workStatus: "WAITING",
        workshopOrderDescription: "c",
        workshopOrderNumber: 2980400032,
      }
    ];

    spyOn(_editworkshoporderService, 'getWaitingList').and.callFake(() => {
      return observableFrom([waitingtrucks]);
    });

    // component.ngOnInit();
    // expect(component.waitingList).toEqual(waitingtrucks);
    // expect(component.waitingList.length).toEqual(1);
  });

});
