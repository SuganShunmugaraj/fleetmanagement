import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private _content = new Subject<any>();
  content$ = this._content.asObservable();

  constructor() { }

  setContent(data: any) { 
    this._content.next(data); 
  }

  getdata(){
    return this.content$
  }
}
