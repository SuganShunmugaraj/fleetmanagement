import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { AuthGuardService } from './core/services';


const routes: Routes = [
  { path: '', canActivate: [AuthGuardService], loadChildren: './workshop/workshop.module#WorkshopModule' },
  { path: 'unauthorize', component: UnauthorizedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload', enableTracing: false, useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
