import { Component, OnInit , ViewChild} from '@angular/core';
import { ReportService } from '../../../core/services';
import { PagetitleService } from '../../../core/services/pagetitle.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reportlist',
  templateUrl: './reportlist.component.html',
  styleUrls: ['./reportlist.component.scss']
})
export class ReportlistComponent implements OnInit {
  reportlist: any[];
  error: any;
  toggleexpandorder: any= {}
  sortBy: string;
  orderBy: string; 
  selectedcolumn: string;
  cols: any[];
  loaderdisplay: Boolean;
  tableid: any=  25;
  loadingpagination: any = 0;
  reportlistCount: any;
  constructor(private _reportService: ReportService,
             private pagetitleService : PagetitleService,
             private translate: TranslateService,) { }

  ngOnInit() {
    this._reportService.getAllReports( ).subscribe(res => { 
      this.reportlist =  res['serviceReports']
      this.reportlistCount = res['totalCount']
    }, (error) => {
      this.error = error;
      this.reportlist =  [];
    });

    this.pagetitleService.getpagetitle('WORKSHOP_SERVICEREPORTLIST_TITLE');

    this.cols = [
      { field: 'workshopOrderNumber', header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_REPORTNUMBER') },
      { field: 'modifiedDate', header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_RELEASEDATE') },
      { field: 'truckName',  header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_TRUCKNAME') },
      { field: 'serialNumber',  header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_SERIALNO') },
      { field: 'identificationSign',  header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_KEYWORD') },
      { field: 'workshopOrderDescription',  header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_ORDERDESCRIPTION') },
      { field: 'repairDescription',  header: this.translate.instant('WORKSHOP_SERVICEREPORT_LIST_REPAIRDESCRIPTION') }
  ];

    window.addEventListener('scroll', this.scroll.bind(this), true);

  
  }
 

  customsort(event){  
    this.loaderdisplay = true;

    let headerclass = event.target.childNodes[1].children[0].classList[3]

    let headerAttribute = event.target.childNodes[1].attributes[1].nodeValue;
    this.selectedcolumn = headerAttribute;


    if(headerclass === "pi-sort-up"){
      this.sortBy = "ASC"
      this.orderBy = headerAttribute
    }
    else if(headerclass === "pi-sort-down"){
      this.sortBy = "DESC"
      this.orderBy = headerAttribute
    }
    this._reportService.getSortedReports(this.sortBy, this.orderBy, 0).subscribe(res => {  

      this.reportlist = res;
      var maincontent = document.getElementsByClassName('maincontent');
      maincontent[0].scrollTop = 0;
      this.loaderdisplay = false;
    },
    (error) => {
      this.error = error;
      this.reportlist =  [];
    });

  }


  scroll() { 
    var result = document.getElementsByClassName(this.tableid);
    if (result.length > 0) { 
      var bounding = result[0].getBoundingClientRect().top;
      if (bounding < 0) {
        this.tableid = this.tableid + 25;
        this.loadingpagination = this.loadingpagination + 1;      
        this._reportService.getSortedReports(this.sortBy, this.orderBy , this.loadingpagination).subscribe(res => { 
          this.loaderdisplay = null;
          this.reportlist = [...this.reportlist, ...res]
          if (this.reportlist.length !== this.reportlistCount) {
            this.scroll();
          }
          this.loaderdisplay = false;
        },
        (error) => {
          this.error = error;
          this.reportlist =  [];
        });

        this.scroll()
      }
    } else {
      // this.loaderdisplay = true;
    }

    var lazyloadtable = document.getElementsByClassName('lazyloadtable');
    var lazyloadtablebounding = lazyloadtable[0].getBoundingClientRect().bottom;
    console.log((lazyloadtablebounding - (window.innerHeight - 43)) );
    if ((lazyloadtablebounding === (window.innerHeight - 43) ||  ((lazyloadtablebounding - (window.innerHeight - 43)) < 1)) && this.reportlist.length !== this.reportlistCount) {
      this.loaderdisplay = true;

    }
  }

  }