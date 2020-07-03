import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';
// import { JwtService } from './jwt.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    // private jwtService: JwtService
  ) {}

  private formatErrors(error: any) {
    console.log(error )
    return  throwError(error.error.error);
  }

  get(path: string, options): Observable<any> {
    console.log(environment.serverUrl , path);
    return this.http.get( `${environment.serverUrl}${path}`, options )
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}, options ): Observable<any> {
    return this.http.put(
      `${environment.serverUrl}${path}`,
      JSON.stringify(body), options 
    ).pipe(catchError(this.formatErrors));
  }
 
  post(path: string, body: Object = {}, options ): Observable<any> { 
    return this.http.post(
      `${environment.serverUrl}${path}`,
      JSON.stringify(body) , options
    ).pipe(catchError(this.formatErrors));
  }

  delete(path: string, options): Observable<any> {
    return this.http.post(
      `${environment.serverUrl}${path}` , options
    ).pipe(catchError(this.formatErrors));
  }
  

  getExternal(path: string, options): Observable<any> {
    return this.http.get( `${path}`, options )
      .pipe(catchError(this.formatErrors));
  }
  
}