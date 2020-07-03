import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';  
import { Subject } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class ShareService { 
 public shipToPartyNo = new Subject();
  constructor(private http: HttpClient) { }

  
}
