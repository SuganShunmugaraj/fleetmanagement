import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { WorkshoporderComponent } from './workshoporder.component';
import { CreateworkshoporderComponent } from './createworkshoporder/createworkshoporder.component';
import { OrderlistComponent } from './orderlist/orderlist.component';


const routes: Routes = [
  {
    path: '', component: WorkshoporderComponent,
     children: [
      { path: '', redirectTo: '/edit', pathMatch: 'full'}, 
      { path: 'createorder/:truckname/:serialid/:partyid/:clientid/:truckimage', component: CreateworkshoporderComponent },
       { path: 'editorder/:workorderid/:markerid',   component: CreateworkshoporderComponent },
      { path: 'editorder/:workorderid',  component: CreateworkshoporderComponent },     
      { path: 'trucklist', data: {name: 'TruckList'} , component: OrderlistComponent }
    ]
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshoporderRoutingModule { }
