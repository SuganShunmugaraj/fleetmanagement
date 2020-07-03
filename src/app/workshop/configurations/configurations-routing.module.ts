import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigurationComponent } from './configuration/configuration.component';
import { WorkshopConfigurationComponent } from './workshop-configuration/workshop-configuration.component';
import { DamagecategoryComponent } from './damagecategory/damagecategory.component';
import { EditCanDeactivateGuard } from '../../core/services';

const routes: Routes = [
  {
  path: '', component: ConfigurationComponent,
  children: [
  { path: '', redirectTo: 'damagecategory' , pathMatch: 'full',  data : { name: 'damagecategory'}},
  { path: 'damagecategory', data : {name: 'damagecategory'}, canDeactivate: [EditCanDeactivateGuard], component: DamagecategoryComponent},
  { path: 'workshopconfig', data: { name :'workshopconfiguaration'}, canDeactivate: [EditCanDeactivateGuard], component: WorkshopConfigurationComponent},  

  ]

}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
