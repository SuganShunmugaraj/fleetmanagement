import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { api } from '../constants';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { IworkorderList } from '../models/workshop';
import { headerID } from '../enums/header';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
const headers = new HttpHeaders({
  'IV-USER': headerID.IV_USER,
  'ecid': headerID.ECID,
  'Content-Type': 'application/json',
  'Authorization': 'Basic c3J2YzMyODQ6Q2IhOTk2MjJVejZDQTVKUw==',
});
 
@Injectable({
  providedIn: 'root'
})
export class ValidateuserroleService {
  private _userdata = new BehaviorSubject<any>({
    username: "kxdel0096",
    firstName: "Test",
    lastName: "User"
  });
  _userdata$ = this._userdata.asObservable();
 
 
  constructor(private apiService: ApiService, private http: HttpClient,
    private _router: Router, ) { }
 
 
 
 
  getUserRole() {
    const options = { headers: headers };
    return this.apiService.get(api.roles, options).pipe(map(data => data));
  }
 
  userdetails() {
    const options = { headers: headers };
    return this.apiService.getExternal(api.userdetails, options).pipe(map(data => { 
      this._userdata.next(data)
    }));
   
  }
 
    getUserService() {
        const options = { headers: headers };
        return this.apiService.get(api.userservice, options).pipe(map(data => data));    
      } 
 
 
}
