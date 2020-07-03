import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() { }
 
  public _modaldisplay = new Subject<any>();
  public modaldisplay$ = this._modaldisplay.asObservable();
 
 

  status(status: boolean) {
    this._modaldisplay.next(status);
  }
  



}
