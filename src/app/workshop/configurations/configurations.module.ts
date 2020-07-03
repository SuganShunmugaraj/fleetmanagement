import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationRoutingModule } from './configurations-routing.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { WorkshopConfigurationComponent } from './workshop-configuration/workshop-configuration.component';
import { DamagecategoryComponent } from './damagecategory/damagecategory.component';

@NgModule({
  declarations: [ConfigurationComponent, WorkshopConfigurationComponent, DamagecategoryComponent],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,
    SharedModule,
  ]
})
export class ConfigurationModule { }
