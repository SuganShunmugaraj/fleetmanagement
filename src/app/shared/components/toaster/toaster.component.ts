import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../../core/services';
import { ActivatedRoute } from "@angular/router"; 
import { bind } from '@angular/core/src/render3';

@Component({
  selector: 'toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {

  

  toasterData: string;

  constructor(private _toasterService: ToasterService) {}

  ngOnInit() { 
    var that = this;
    this._toasterService.content$.subscribe(res => { 
      this.toasterData = res; 
      setTimeout(function(){that.toasterData= null;}, 10000)
  });

  }
 
  dismiss(){
     this.toasterData = null;
}
  

}
