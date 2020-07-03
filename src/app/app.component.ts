import { Component, OnInit } from '@angular/core';
import { ValidateuserroleService } from './core/services/';

import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Workshop';

  constructor(translate: TranslateService, private _validateuserroleService: ValidateuserroleService) {
 

    translate.setDefaultLang('workshop-UI-locale.de-DE');

    this._validateuserroleService.getUserService().subscribe(res => {
      let language = res['language'];
      if (language === 'en') {
        language = 'en-GB';
      } else if (language === 'da') {
        language = 'da-DK';
      } else if (language === 'cs') {
        language = 'cs-CZ';
      } else {
        language = language +'-'+ language.uppercase();
      }
      translate.setDefaultLang('workshop-UI-locale.' + language);
    });

    const browserLang = translate.getBrowserLang();
  }

  ngOnInit() {
    this._validateuserroleService.userdetails().subscribe(res => {

    })
  }

}



