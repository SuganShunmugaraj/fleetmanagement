import { Component, OnInit, Input} from '@angular/core';
import { ModalService} from '../../../core/services/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'workshop-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
 
  @Input() headertitle: string;
  modalDisplay: boolean;

  
  constructor(private _modalService: ModalService) { }

  ngOnInit() {
    this._modalService.modaldisplay$.subscribe(res => this.modalDisplay = res);
    
  }

  close(){
    this._modalService.status(false);
  }

}
