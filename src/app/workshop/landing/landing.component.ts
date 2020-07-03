import { Component, OnInit } from '@angular/core';
import { ConfirmationDialogService } from '../../core/services/confirmation-dialog.service';

@Component({
  selector: 'workshop-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  confirmationdisplay: any;
  constructor(private _confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {

    this._confirmationDialogService.content$.subscribe(res => {
      
      this.confirmationdisplay = res
    });
  }

}
