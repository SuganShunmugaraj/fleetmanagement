import { async, ComponentFixture, TestBed, fakeAsync, tick, } from '@angular/core/testing';
import { OrderlistComponent } from './orderlist.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { WorkshoporderService, ApiService, EditworkshoporderService } from '../../../core/services/';
import { throwError } from 'rxjs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { from as observableFrom } from 'rxjs';


describe('OrderlistComponent', () => {
  let component: OrderlistComponent;
  let Tablecomponent: TableModule;
  let fixture: ComponentFixture<OrderlistComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderlistComponent,LoaderComponent],
      imports: [TableModule, RouterModule, HttpClientModule, RouterTestingModule],
      providers: [WorkshoporderService, ApiService, EditworkshoporderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('200, Component Successfully Loaded', () => {
    const fixture = TestBed.createComponent(OrderlistComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });


});


describe('OrderlistComponent', () => {
  let _workshoporderService;
  let component: OrderlistComponent;
  let apiService: ApiService;
  let http: HttpClient;

  beforeEach(() => {
    _workshoporderService = new WorkshoporderService(apiService, http);
    component = new OrderlistComponent(_workshoporderService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    // httpTestingController.verify();
  });



  it('should set Truck data  with the items returned from the server', () => {  
    // Arrange - Setup
    const trucks = [
      {
        openWorkshopOrder: true,
        serialNumber: "511903G00145",
        shipToPartyNo: "29804",
        truckName: "FM-X 17"
      },
      {
        penWorkshopOrder: true,
        serialNumber: "F20179G00187",
        shipToPartyNo: "29804",
        truckName: "EXU-SF 20"
      }
    ];

    spyOn(_workshoporderService, 'getAllTruck').and.callFake(() => {
      return observableFrom([trucks]);
    });

    component.ngOnInit();
    expect(component.trucklistdata).toEqual(trucks);
  });


  it('should set the error property if server returns an error when getting truckdata', () => {
    const error = 'server error';
    spyOn(_workshoporderService, 'getAllTruck').and.returnValue(throwError(error));
    expect(component.error).not.toBeDefined();
    component.ngOnInit();
    expect(component.error).toBeDefined();
    expect(component.error).toEqual('server error');
  });

});
