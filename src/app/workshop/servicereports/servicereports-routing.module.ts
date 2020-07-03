import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportlistComponent } from './reportlists/reportlist.component';
import { ReportdetailComponent } from './reportdetails/reportdetail.component';


const routes: Routes = [
  { path: '', component: ReportlistComponent },
  { path: 'reportdetail/:serialid/:reportid', component: ReportdetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicereportsRoutingModule { }
