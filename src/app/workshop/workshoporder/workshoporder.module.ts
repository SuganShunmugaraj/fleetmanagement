import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { WorkshoporderComponent } from './workshoporder.component';
import { CreateworkshoporderComponent } from './createworkshoporder/createworkshoporder.component';
import { SharedModule } from '../../shared/shared.module';
import { WorkshoporderRoutingModule } from './workshoporder-routing.module';
import {SelectButtonModule} from 'primeng/selectbutton';


@NgModule({
  declarations: [
    OrderlistComponent,
    CreateworkshoporderComponent,
    WorkshoporderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    WorkshoporderRoutingModule,
    SelectButtonModule,
  ]
})
export class WorkshoporderModule { }
