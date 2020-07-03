import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagetitleService {

  constructor() { }

  private _pagetitle = new Subject<any>();
  public pagetitle$ = this._pagetitle.asObservable();

  getpagetitle(data : any){
      this._pagetitle.next(data); 
  }

}
