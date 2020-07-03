import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicereportsRoutingModule } from './servicereports-routing.module'; 
import { SharedModule } from '../../shared/shared.module';
import { ReportlistComponent } from './reportlists/reportlist.component';
import { ReportdetailComponent } from './reportdetails/reportdetail.component';

@NgModule({
  declarations: [ ReportlistComponent, ReportdetailComponent],
  imports: [
    CommonModule,
    ServicereportsRoutingModule,
    SharedModule
  ]
})
export class ServiceReportsModule { }
