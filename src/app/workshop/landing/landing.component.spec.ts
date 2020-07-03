import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';

import { LandingComponent } from './landing.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService} from 'primeng/api';
import { Routes, RouterModule } from '@angular/router';
import { ToasterComponent } from '../../shared/components/toaster/toaster.component'
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingComponent,HeaderComponent, SidebarComponent, FooterComponent, ToasterComponent, ConfirmationDialogComponent],
      imports: [
        BrowserModule,
        HttpClientModule,
        DialogModule,
        ConfirmDialogModule,
        RouterModule.forRoot([])
      ],
      providers:[ConfirmationService]
    })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('200, Component Successfully Loaded', () => {
  expect(component).toBeTruthy();
  });
});
