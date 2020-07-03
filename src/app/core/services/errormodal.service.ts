import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrormodalService {

  constructor() { }

  public _content = new Subject<any>();
  public content$ = this._content.asObservable(); 


 

  // status(status: boolean) {
  //   this._accept.next(status);
  //   this._content.next(null);
  // }

}
