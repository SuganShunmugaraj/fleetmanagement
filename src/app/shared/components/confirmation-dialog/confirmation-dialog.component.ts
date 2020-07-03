import { Component,  OnInit , OnDestroy} from '@angular/core';
import { ConfirmationDialogService } from '../../../core/services/confirmation-dialog.service';

@Component({
  selector: 'workshop-confirmation',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit , OnDestroy {
  display: boolean;
  data: any; 

  constructor(private _confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
     this._confirmationDialogService.content$.subscribe(res => {
      
      this.data = res
    });
  }

  ngOnDestroy(){
    this._confirmationDialogService.status(null);
    this._confirmationDialogService._accept.next(null);

  }

  decline() {
    this._confirmationDialogService.status(false);
  }

  accept() {
    this._confirmationDialogService.status(true);
  }

  dismiss() {
    this._confirmationDialogService.status(false);
  }

}
