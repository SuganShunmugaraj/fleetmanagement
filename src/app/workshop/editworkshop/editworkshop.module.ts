import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { EditworkshopRoutingModule } from './editworkshop-routing.module';
import { EditComponent } from './edit/edit.component';
import {DatePipe} from '@angular/common';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    SharedModule,
    EditworkshopRoutingModule
  ],
  providers: [ DatePipe ]
})
export class EditworkshopModule { }
