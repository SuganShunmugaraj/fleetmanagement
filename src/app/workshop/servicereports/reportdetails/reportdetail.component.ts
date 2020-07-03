import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ReportService } from '../../../core/services/'; 
import { ToasterService } from '../../../core/services';
import { ConfirmationDialogService } from '../../../core/services/confirmation-dialog.service';
import { PagetitleService } from '../../../core/services/pagetitle.service';
@Component({
  selector: 'app-reportdetail',
  templateUrl: './reportdetail.component.html',
  styleUrls: ['./reportdetail.component.scss']
})
export class ReportdetailComponent implements OnInit {
  reportDetail: any;
  paramObj: any;


  constructor(
    private _route: ActivatedRoute,
    private _reportService: ReportService,
    private _renderer: Renderer2,
    private pagetitleService : PagetitleService) { }

  ngOnInit() {
    this._route.paramMap.subscribe(params => {
      this.paramObj = { serialNumber: params.get("serialid"), reportNumber: params.get("reportid") };

      this._reportService.getReportDetails(this.paramObj.serialNumber, this.paramObj.reportNumber).subscribe(res => {
     
        this.reportDetail = res;
      }) 
    });


    this._renderer.addClass(document.body, 'hidesidebar');

    this.pagetitleService.getpagetitle('WORKSHOP_SERVICEREPORTDETAIL_TITLE');

  }




  setData() {
    this.reportDetail = {
      author: 'author',
      reporter: 'Reporter',
      creationDate: '12.4.2019',
      workshopOrderNumber: '2323',
      operatingHours: '4',
      priority: '3',
      workshopOrderDescription: '',
      repairDescription: '',
    }


  }

  getAssignedDmgCategoryName(assignedDmgCategoryIds, wsoList) {    
    let assignedDmgCategoriesName : string[] = new Array();
    assignedDmgCategoryIds.forEach(assignedDmgCategoryid => {      
      wsoList.forEach(wsoObj => {
        if(assignedDmgCategoryid === wsoObj.id){
          
           assignedDmgCategoriesName.push(wsoObj.name);
        }
      });
    });
    return assignedDmgCategoriesName;
  }

  ngOnDestroy() {
    this._renderer.removeClass(document.body, 'hidesidebar');
  }

}  
