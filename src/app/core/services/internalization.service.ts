import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
// import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InternalizationService {

  constructor(private http: HttpClient) { }

getdefaultlang(): Observable<any> { 
    return this.http.get( '../../assets/locales/UI/workshop-UI-locale.en-GB.json' )
      .pipe(catchError(this.formatErrors));
  }

  private formatErrors(error: any) {
    console.log(error )
    return  throwError(error.error.error);
  }

   
}
