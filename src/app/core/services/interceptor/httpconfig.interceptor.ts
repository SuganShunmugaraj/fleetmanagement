import { Injectable } from '@angular/core';
import { ErrormodalService } from '../errormodal.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ValidateuserroleService } from '../validateuserrole.service'

 


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(public _errormodalService: ErrormodalService, private _validateuserroleService: ValidateuserroleService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        this._validateuserroleService._userdata$.subscribe(res => { 
            request = request.clone({ headers: request.headers.set('IV-USER', res.username) });
        });  


        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                console.log(error)
                let spliterror = error.error.error.code.split('-');
                spliterror.shift();
                let finalerrormsg = spliterror.join('-');
                let data = {
                    header: 'Application Error',
                    message: finalerrormsg
                }
                this._errormodalService._content.next(data);
                return throwError(error);
            }));
    }
}