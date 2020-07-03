import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { WorkshoporderService } from '../../../core/services/';
import { formatDate } from '@angular/common'
import { Iworkorder } from '../../../core/models/workshop'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/directives/validator';
import { Location } from '@angular/common';
import { ToasterService  , ValidateuserroleService} from '../../../core/services/';
import { ConfirmationDialogService } from '../../../core/services/confirmation-dialog.service';
import { ConfirmationService } from 'primeng/api';
import { PagetitleService } from '../../../core/services/pagetitle.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-createworkshoporder',
  templateUrl: './createworkshoporder.component.html',
  styleUrls: ['./createworkshoporder.component.scss']
})
export class CreateworkshoporderComponent implements OnInit {
  workshoporderForm: any;
  paramObj: any;
  editOrderView: Boolean = false;
  truckName: String;
  orderNumber: any;
  confirmationresponse: String;
  confirmationDialogMessage: any;
  serialNumber: string;
  damageCategory: any = [];
  selectedDamageCategories: any = [];
  staticDamageCategories: any = [];
  damageCategories: any[];
  loaderdisplay: boolean;
  truckimage: string;
  markerNew: boolean;
  userdata: any;

  constructor(
    private _route: ActivatedRoute,
    private _workshoporderService: WorkshoporderService,
    private _renderer: Renderer2,
    private _location: Location,
    private _confirmationdialogservice: ConfirmationDialogService,
    private _toasterService: ToasterService,
    private _confirmationService: ConfirmationService,
    private render: Renderer2,
    private pagetitleService: PagetitleService,
    private _validateuserroleService: ValidateuserroleService,
    private translate: TranslateService,
    private router: Router) {
  }

  ngOnInit() {
    this._validateuserroleService._userdata$.subscribe(res => { 
       this.userdata = res;
    });


    this._route.paramMap.subscribe(params => {

      this.paramObj = { serialNumber: params.get("serialid"), markerId: params.get("markerid"), shipToPartyNo: +params.get("partyid"), clientId: +params.get("clientid"), workshopOrderNumber: +params.get("workorderid") };
      params.get("truckname") ? (this.truckName = params.get("truckname")) : null;
      params.get("truckimage") ? this.truckimage = params.get("truckimage") : null;
    });


    this.paramObj.serialNumber ? this.serialNumber = this.paramObj.serialNumber : null
    
    this._route.url.subscribe(url => {
      url[0].path === "editorder" ? this.updateworkshoporderForm() : this.setFormdata();
      url[0].path === "editorder" ? this.pagetitleService.getpagetitle('WORKSHOP_EDITORDER_TITLE') : this.pagetitleService.getpagetitle('WORKSHOP_CREATEORDER_TITLE');
    }
    );
    this._renderer.addClass(document.body, 'hidesidebar');

   


  }

  activedamagecategory(category) {
    let checkexisting = this.selectedDamageCategories.findIndex(damageid => damageid === category.id);
    let classname;
    checkexisting == -1 ? classname = 'inactive' : classname = 'active';
    return classname
  }



  getDamageCategory(data, flag) {    
    let checkexisting = this.selectedDamageCategories.findIndex(damageid => damageid === data.id);    
    if (flag && (this.staticDamageCategories.findIndex(staticId => staticId === data.id) != -1)) {                    
      return;
    } 
    checkexisting == -1 ? this.selectedDamageCategories.push(data.id) : this.selectedDamageCategories.splice(checkexisting, 1);         
  }

  updateworkshoporderForm() {

    this.paramObj.markerId === 'true' ? this.markerNew = false : this.markerNew = true;

    this.editOrderView = true;
    this._workshoporderService.getworkshoporderdetails(this.paramObj.workshopOrderNumber, this.markerNew).subscribe(formdata => {
      
      this.truckName = formdata.truckName;
      this.workshoporderForm = new FormGroup({
        truckName: new FormControl(this.truckName),
        author: new FormControl(formdata.author, [Validators.required]),
        reporter: new FormControl(formdata.reporter, [Validators.required, CustomValidators.nowhitespace]),
        creationDate: new FormControl(formatDate(new Date(formdata.createdDate), 'dd.MM.yyyy', 'en')),
        workshopOrderNumber: new FormControl(formdata.workshopOrderNumber),
        workshopOrderDescription: new FormControl(formdata.workshopOrderDescription),
        workStatus: new FormControl(formdata.workStatus),
        outOfOrder: new FormControl(formdata.outOfOrder),
        priority: new FormControl(formdata.priority),
        serialNumber: new FormControl(formdata.serialNumber),
        shipToPartyNo: new FormControl(formdata.shipToPartyNo),
        clientId: new FormControl(formdata.clientId),
        operatingHours: new FormControl(formdata.operatingHours, [Validators.required, CustomValidators.nowhitespace, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
        identificationSign: new FormControl(formdata.identificationSign),
        repairDescription: new FormControl(formdata.repairDescription, [Validators.required, CustomValidators.nowhitespace]),
        reasonToReject: new FormControl(formdata.reasonToReject),
        assignedSlot: new FormControl(formdata.assignedSlot),
        createdBy: new FormControl(formdata.createdBy),
        createdDate: new FormControl(formdata.createdDate),
        estCompletionDate: new FormControl(formdata.estCompletionDate),
        estCompletionTime: new FormControl(formdata.estCompletionTime),
        modifiedBy: new FormControl(formdata.modifiedBy),
        assignedTechnicians: new FormControl(formdata.assignedTechnicians),
        assignedDamageCategories: new FormControl(formdata.assignedDamageCategories),
        wsoDamageCategories: new FormControl(formdata.wsoDamageCategories),
        truckImg: new FormControl(formdata.truckImg),
        new: new FormControl(this.markerNew),

      });
      this.serialNumber = formdata.serialNumber;
      formdata.operatingHours == 0 ? this.workshoporderForm.patchValue({ operatingHours: null }) : null;


      this.selectedDamageCategories = formdata.assignedDamageCategories;
      this.selectedDamageCategories.forEach(element => {
        this.staticDamageCategories.push(element);
      });       
      this.damageCategory = formdata.wsoDamageCategories;
      this.truckimage = formdata.truckImg


    })


  }


  setFormdata() {
   
    this.workshoporderForm = new FormGroup({
      truckName: new FormControl(this.truckName),
      author: new FormControl(this.userdata.firstName + ' '+ this.userdata.lastName  , [Validators.required]),
      reporter: new FormControl(this.userdata.firstName + ' '+ this.userdata.lastName , [Validators.required, CustomValidators.nowhitespace]),
      creationDate: new FormControl(formatDate(new Date(), 'dd.MM.yyyy', 'en')),
      workshopOrderDescription: new FormControl(''),
      workStatus: new FormControl('WAITING'),
      outOfOrder: new FormControl(false),
      serialNumber: new FormControl(this.paramObj.serialNumber),
      shipToPartyNo: new FormControl(this.paramObj.shipToPartyNo),
      clientId: new FormControl(this.paramObj.clientId),
      assignedDamageCategories: new FormControl(this.selectedDamageCategories),
      truckImg: new FormControl(this.truckimage),
      new: new FormControl('true'),
    });

    this.loaderdisplay = true;
    this._workshoporderService.getDamageCategories().subscribe(res => {
      this.damageCategory = res;
      this.loaderdisplay = false;

    })
  }


  submitform(editOrder) {
    // this.paramObj.markerId === 'true' ?   this.workshoporderForm.patchValue({ new: true }) :null;
 
    this.paramObj.markerId === 'true' ? this.workshoporderForm.patchValue({ new: false }) : null;

    this._workshoporderService.createorder(this.workshoporderForm.value, this.paramObj, editOrder).subscribe(workOrderNumber => {
      this.workshoporderForm.patchValue({ workshopOrderNumber: workOrderNumber }, { damageCategories: this.selectedDamageCategories })
      if (!editOrder) {
        this._toasterService.setContent( this.translate.instant('WORKSHOP_CREATEORDER_TOASTER_CREATEDSUCESS', {value: workOrderNumber['workOrderNumber']}));
      }
      this._location.back();
    });
  }



  finalize() {
    this.render.addClass(document.body, 'displayoverlay');
    this._confirmationService.confirm({
      header:  this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_HEADER_FINALIZE') ,
      acceptLabel: this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_LABEL_ACCEPT'),
      rejectLabel: this.translate.instant( 'WORKSHOP_CREATEORDER_CONFIRMATION_LABEL_CANCEL'),
      message: this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_MESSAGE_FINALIZE'),
      accept: () => {
        this.workshoporderForm.patchValue({ workStatus: 'DONE' });
        this.submitform(true);
      },
      reject: () => {
        this.render.removeClass(document.body, 'displayoverlay');
      }
    });
  }



  deleteform() {
    this.render.addClass(document.body, 'displayoverlay');
    this._confirmationService.confirm({
      header: this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_HEADER_REJECT'),
      acceptLabel: this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_LABEL_REJECT'),
      rejectLabel: this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_LABEL_CANCEL'),
      message: this.translate.instant('WORKSHOP_CREATEORDER_CONFIRMATION_MESSAGE_REJECT'),
      accept: () => {
        this._workshoporderService.deleteorder(this.workshoporderForm.value.workshopOrderNumber).subscribe(res => {
          this._location.back();
        }
        )
      },
      reject: () => {
        this.render.removeClass(document.body, 'displayoverlay');
      }
    });
  }

  addSignature() {    
    let signature = this.workshoporderForm.controls.workshopOrderDescription.value 
                  + "\n_________________________________\n"
                  + this.userdata.firstName + ' ' + this.userdata.lastName
                  + '; ' + formatDate(new Date(), 'dd.MM.yyyy', 'en')
                  + "\n\n";     
    this.workshoporderForm.patchValue({ workshopOrderDescription: signature });    
  }

  discard() {
    this._location.back();
  }

  ngOnDestroy() {
    this._renderer.removeClass(document.body, 'hidesidebar');
  }



}  
