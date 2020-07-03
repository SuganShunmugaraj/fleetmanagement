import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DamagecategoryComponent } from '../../workshop/configurations/damagecategory/damagecategory.component';

import { ConfirmationService } from 'primeng/api';
@Injectable({
    providedIn: 'root'
})
export class EditCanDeactivateGuard implements CanDeactivate<DamagecategoryComponent> {
    output: boolean;
    constructor(private confirmationService: ConfirmationService) { }

    canDeactivate(
        component: DamagecategoryComponent,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

        if (component.edittab) { 
            const confirmation = window.confirm('Do you want to leave this page without saving');
            if (!confirmation) {              
                component.focusselected = component.edittab; 
            }
            return confirmation;
        }
        return true;

    }
}