import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ValidateuserroleService } from './validateuserrole.service';
import { map } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(private _userrole: ValidateuserroleService, private router: Router) { }

    canActivate() {
        return this._userrole.getUserRole().pipe(map(data => {
            let workshop_rolename = data.roles.find(rolesdata => rolesdata.roleName === "7-workShopApp");
            if (workshop_rolename && workshop_rolename.status) {
                return true
            } else {
                this.router.navigateByUrl('/unauthorize');
                return false
            }
        }));

    }
}
