import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingComponent } from './setting/setting.component';

@NgModule({
  declarations: [SettingComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModule,
  ]
})
export class SettingsModule { }
