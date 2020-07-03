import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ModalComponent } from '../../../app/shared/components/modal/modal.component';

const routes: Routes = [
  {
    path: '', component: EditComponent,
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
  
})
export class EditworkshopRoutingModule { }
