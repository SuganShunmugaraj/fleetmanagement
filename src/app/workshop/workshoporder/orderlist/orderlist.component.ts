import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { WorkshoporderService } from '../../../core/services/';
import { PagetitleService } from '../../../core/services/pagetitle.service';
import { path } from '../../../core/constants';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'workshop-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit, AfterViewInit {
  trucklistdata: any[];
  error: any;
  truckpath: string = path.truckpath;
  sortBy: string = '';
  orderBy: string = '';
  selectedcolumn: string;
  cols: any[];
  tableid: any = 25;
  loadingpagination: any = 0;
  loaderdisplay: Boolean;
  trucklistCount: any;
  truckclientId: any;
  touchdown: boolean;
  constructor(private _workshoporderService: WorkshoporderService,
    private pagetitleService: PagetitleService,
    public translate: TranslateService) { }

  ngAfterViewInit() {

  }

  ngOnInit() {
    this._workshoporderService.getAllTruck(this.sortBy, this.orderBy, 0).subscribe(res => {
      this.trucklistdata = res['trucks'];
      this.trucklistCount = res['truckCount'];
      this.truckclientId = res['clientId'];
      console.log(this.trucklistCount, res)
      // this.trucklistdata[0].shipToPartyNo ? localStorage.setItem('shiptoParty', this.trucklistdata[0].shipToPartyNo) : null;
    }, (error) => {
      this.error = error;
    });

    this.pagetitleService.getpagetitle('WORKSHOP_TRUCKLIST_TITLE');

    this.cols = [
      { field: 'truckName', header: this.translate.instant('WORKSHOP_TRUCKLIST_TABLE_HEADER_NAME') },
      { field: 'truckType', header: this.translate.instant('WORKSHOP_TRUCKLIST_TABLE_HEADER_TYPE') },
      { field: 'serialNumber', header: this.translate.instant('WORKSHOP_TRUCKLIST_TABLE_HEADER_SERIALNO') },
      { field: 'location', header: this.translate.instant('WORKSHOP_TRUCKLIST_TABLE_HEADER_LOCATION') },
      { field: 'workStatus', header: this.translate.instant('WORKSHOP_TRUCKLIST_TABLE_HEADER_STATUS') }
    ];
    window.addEventListener('scroll', this.scroll.bind(this), true);

  }
  customsort(event) {
    if (event.target.nextSibling.nodeName === "TH") {
      if (event.target.childNodes[1]) {

        this.loaderdisplay = true;
        this.tableid = 25;
        this.loadingpagination = 0;

        let headerclass = event.target.childNodes[1].children[0].classList[3]
        let headerAttribute = event.target.childNodes[1].attributes[1].nodeValue;

        this.selectedcolumn = headerAttribute;

        if (headerclass === "pi-sort-up") {
          this.sortBy = "ASC"
          this.orderBy = headerAttribute
        }
        else if (headerclass === "pi-sort-down") {
          this.sortBy = "DESC"
          this.orderBy = headerAttribute
        }
        this._workshoporderService.getAllSortedTrucks(this.sortBy, this.orderBy).subscribe(res => {
          this.trucklistdata = res;
          var maincontent = document.getElementsByClassName('maincontent');
          maincontent[0].scrollTop = 0;
          this.loaderdisplay = false;

        }, (error) => {
          this.error = error;
          this.loaderdisplay = false;

        });

      }

    }

  }

  scroll() {
    var result = document.getElementsByClassName(this.tableid);
    if (result.length > 0) {
      var bounding = result[0].getBoundingClientRect().top;
      if (bounding < 0) {
        this.tableid = this.tableid + 50;
        this.loadingpagination = this.loadingpagination + 1;
        this._workshoporderService.getAllTruck(this.sortBy, this.orderBy, this.loadingpagination).subscribe(res => {
          this.loaderdisplay = null;
          this.trucklistdata = [...this.trucklistdata, ...res['trucks']]
          if (this.trucklistdata.length !== this.trucklistCount) {
            this.scroll();
          }
          this.loaderdisplay = false;


        }, (error) => {
          this.error = error;
          
        });
      }
    } else {
      // this.loaderdisplay = true;
    }

    var lazyloadtable = document.getElementsByClassName('lazyloadtable');
    var lazyloadtablebounding = lazyloadtable[0].getBoundingClientRect().bottom;
    console.log((lazyloadtablebounding - (window.innerHeight - 43)) );
    if ((lazyloadtablebounding === (window.innerHeight - 43) ||  ((lazyloadtablebounding - (window.innerHeight - 43)) < 1)) && this.trucklistdata.length != this.trucklistCount) {
      this.loaderdisplay = true;

    }

    // if(this.trucklistdata.length == this.trucklistCount){
    //   console.log("comming inside last row")
    //   this.loaderdisplay = false;
    // }

  }



}