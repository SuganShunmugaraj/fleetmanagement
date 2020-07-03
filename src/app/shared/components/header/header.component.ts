
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';
import { PagetitleService } from '../../../core/services/pagetitle.service';
import { environmentConstant } from '../../../../environments/environmentConstant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'workshop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit  {
  title: any = "WORKSHOP_APPLICATION_TITLE";

  sub: any;
 pathname: string;
  constructor(private _location: Location,
    public translate: TranslateService, 
              private pagetitleService: PagetitleService,) {
              }

  ngOnInit() { 
    this.pagetitleService.pagetitle$.subscribe(res=> {
      this.pathname = res;
    });
  }
   

  locbackwards(){
     this._location.back();
  }

  nexxtfleetroute(){
    window.location.href = environmentConstant.nexxtfleetlauncherUrl;
  }

}
