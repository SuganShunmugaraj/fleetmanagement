import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {

  public _content = new Subject<any>();
  public content$ = this._content.asObservable();
  public _accept = new Subject<any>();
  public accept$ = this._accept.asObservable();

  constructor() { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'Save',
    btnCancelText: string = 'Cancel',
    dialogSize: 'sm' | 'lg' = 'sm') {
    this._content.next({ title, message, btnOkText, btnCancelText, dialogSize});
    return this.accept$;
  }

  status(status: boolean) {
    this._accept.next(status);
    this._content.next(null);
  }

}
