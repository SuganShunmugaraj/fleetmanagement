import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchivesRoutingModule } from './archives-routing.module';
import { ArchiveComponent } from './archive/archive.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [ArchiveComponent],
  imports: [
    CommonModule,
    ArchivesRoutingModule,
    SharedModule
  ]
})
export class ArchivesModule { }
