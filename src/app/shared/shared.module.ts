import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TableModule } from 'primeng/table';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ToasterComponent } from '../../app/shared/components/toaster/toaster.component';
import { IntergerValidationDirective } from './directives/interger-validation.directive';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component'; 
import { CalendarModule} from 'primeng/calendar'; 
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { DatetimepickerComponent } from './components/datetimepicker/datetimepicker.component';
import { DdmmdateformatPipe } from './pipes/ddmmdateformat.pipe';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';
import { ErrorComponent } from './components/error/error.component';
import { SearchdropdownComponent } from './components/searchdropdown/searchdropdown.component';
import { ShortnamePipe } from './pipes/shortname.pipe';
import { AccordionModule} from 'primeng/accordion';
import { SortbyPipe } from './pipes/sortby.pipe';
import { AutofocusDirective } from './directives/autofocus.directive';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../../environments/environment';
import {  HttpClient } from '@angular/common/http';
import { InternalizationComponent } from './components/internalization/internalization.component';

export function HttpLoaderFactory(httpClient) { 
  return new TranslateHttpLoader(httpClient, '../../app/workshop/assets/locales/UI/', '.json');
}
 


@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ToasterComponent,
    IntergerValidationDirective,
    ConfirmationDialogComponent,
    UnauthorizedComponent,
    LoaderComponent,
     ModalComponent,
    DatetimepickerComponent,
    DdmmdateformatPipe,
    ErrorModalComponent,
    ErrorComponent,
    SearchdropdownComponent,
    ShortnamePipe,
    SortbyPipe,
    AutofocusDirective,
    InternalizationComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CalendarModule,
    FormsModule, 
    TranslateModule,  
    DlDateTimeDateModule, 
    DlDateTimePickerModule,
    TranslateModule
 
  
  ],
  exports: [
    FormsModule,
    HeaderComponent,
    SidebarComponent,
    ToasterComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ToastModule,
    CalendarModule,
    DlDateTimeDateModule, 
    DlDateTimePickerModule,
    DragDropModule,
    IntergerValidationDirective,
    UnauthorizedComponent,
    LoaderComponent,
    ModalComponent,
    DatetimepickerComponent,
    ErrorModalComponent,
    ErrorComponent,
    SearchdropdownComponent,
    ShortnamePipe,
    AccordionModule,
    SortbyPipe,
    AutofocusDirective,
    TranslateModule,
    InternalizationComponent
  ],
  providers: []
})

export class SharedModule { }
