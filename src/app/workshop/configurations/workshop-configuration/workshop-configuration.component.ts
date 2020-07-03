import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ConfigurationService } from '../../../core/services/configuration.service';
import { ToasterService, ModalService, PagetitleService } from '../../../core/services/';
import { CustomValidators } from '../../../shared/directives/validator';
import { ConfirmationService } from 'primeng/api';
import { ErrormodalService } from '../../../core/services/errormodal.service';

@Component({
  selector: 'workshop-configuration',
  templateUrl: './workshop-configuration.component.html',
  styleUrls: ['./workshop-configuration.component.scss']
})
export class WorkshopConfigurationComponent implements OnInit {
  slotlist: any;
  editviewslot: boolean;
  listedit: boolean = false;
  createSlotForm: any;
  editSlotForm: any;
  loaderdisplay: boolean;
  edittab: boolean;

  constructor(private _route: ActivatedRoute,
    private _configurationService: ConfigurationService,
    private _confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _toasterService: ToasterService,
    private pagetitleService: PagetitleService,
    private _modalService: ModalService,
    private _errormodalService: ErrormodalService) { }

  ngOnInit() {
    this.pagetitleService.getpagetitle('WORKSHOP_CONFIGURATION_TITLE');
    this.getslots();
     
    this.createSlotForm = new FormGroup({
      slotName: new FormControl('', [Validators.required, CustomValidators.nowhitespace])
    });
  }

  getslots() {
    this.loaderdisplay = true;

    this._configurationService.getSlot().subscribe(res => {
      this.slotlist = res;
      this.loaderdisplay = false;
    });
  }

  savenewslot() {
    this.loaderdisplay = true;
    this._configurationService.createSlot(this.createSlotForm.value).subscribe(res => {
      this.getslots();
      this._toasterService.setContent('WORKSHOP_CONFIGURATION_WORKSHOP_TOASTER_MESSAGE_CREATESUCCESS');

    });
    this.editviewslot = null;
    this.createSlotForm.reset();
  }

  editlist(index) {
  
    this.listedit = index;

    this.editSlotForm = new FormGroup({
      slotName: new FormControl(this.slotlist[index].slotName, [Validators.required, CustomValidators.nowhitespace]),
      slotId: new FormControl(this.slotlist[index].slotId, []),
      shipToPartyNo: new FormControl(this.slotlist[index].shipToPartyNo, []),
      clientId: new FormControl(this.slotlist[index].clientId, [])

    });
  }
  updateslot(data) {
    this.listedit = null;
    this.loaderdisplay = true;
    this.edittab = false;
    this._configurationService.updateSlot(data.value).subscribe(res => {
      
      this._toasterService.setContent('WORKSHOP_CONFIGURATION_WORKSHOP_TOASTER_MESSAGE_UPDATESUCCESS');

      this.getslots();

    })
  }
  reseteditslot() {
    this.editSlotForm.reset();
    this.listedit = null;
    this.edittab = false;

  }
  deleteslot(index, list) {

    let data = {
      header: 'Warning!',
      message: 'WORKSHOP_CONFIGURATION_WORKSHOP_TOASTER_MESSAGE_ALEADYASSIGNED'
    }

    if(!list.assigned && this.slotlist.length != 1) {
      this._configurationService.deleteSlot(list.slotId, list.clientId).subscribe(res => {
        // this.slotlist.splice(1, index);
        this.getslots();
        if (res)
          this._toasterService.setContent('WORKSHOP_CONFIGURATION_WORKSHOP_TOASTER_MESSAGE_DELETESUCCESS');
        else
          this._errormodalService._content.next(data);
      });

      this.edittab = false
    }


  }

  getToolTip(assigned, slotLength) {
    if (slotLength == 1) {
      return 'The last Workshop Slot cannot be deleted'
    }
    return assigned ? 'There is a Workshop Order assigned to this slot' : 'Remove';
  }

} 
