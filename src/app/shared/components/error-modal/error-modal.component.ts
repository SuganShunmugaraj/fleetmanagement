import { Component, OnInit, Input} from '@angular/core';
import { ErrormodalService} from '../../../core/services/errormodal.service';

@Component({
  selector: 'error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {

  @Input() headertitle: string;
  content: boolean;
  data: any; 

  
  constructor(private _errorModalService: ErrormodalService) { }

  ngOnInit() { 
    this._errorModalService.content$.subscribe(res => this.data = res);
    
  }

  update(){
    this._errorModalService._content.next(null);
  }

  close(){
    this._errorModalService._content.next(null);
  }

}
