import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ErrorComponent } from '../shared/components/error/error.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      { path: '', loadChildren: './workshoporder/workshoporder.module#WorkshoporderModule' },
      { path: 'edit', loadChildren: './editworkshop/editworkshop.module#EditworkshopModule' },
      { path: 'reports', loadChildren: './servicereports/servicereports.module#ServiceReportsModule' },
      { path: 'configurations', loadChildren: './configurations/configurations.module#ConfigurationModule' },
      { path: '*', loadChildren: './workshoporder/workshoporder.module#WorkshoporderModule' },
      { path: 'error', component: ErrorComponent }
    ]
    
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopRoutingModule { }
