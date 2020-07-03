import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from "@angular/router";
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ConfigurationService } from '../../../core/services/configuration.service';
import { ToasterService, ModalService, PagetitleService } from '../../../core/services/';
import { CustomValidators } from '../../../shared/directives/validator';
 
@Component({
	selector: 'damagecategory',
	templateUrl: './damagecategory.component.html',
	styleUrls: ['./damagecategory.component.scss']
})
export class DamagecategoryComponent implements OnInit {

	damageCategoryForm: any;
	showDamageCategory: boolean = false;
	showDamageCategoryDetails: boolean = false;
	iconClass: any = 'icon-disclosuredown';
	loaderdisplay: any;
	damageCategoryList: any;
	errorMessage: any;
	updatename: string;

	focusselected: any;
	damageCategoryListForm: FormGroup;
	edittab: boolean; 
	isUpdating:boolean = true;
	itemdata : any = null;
	savetype : string;
	adaptedWSONumbers : any[];
	deleteresponse : boolean;
	modalHeader : string;
	modalBody : string;
	deleteformdata : any = null;
	backupItem : any = null;
	
	constructor(private _route: ActivatedRoute,
		private _damageCategoryService: ConfigurationService,
		private formBuilder: FormBuilder,
		private router: Router,
		private _toasterService: ToasterService,
		private pagetitleService: PagetitleService,
		private _modalService : ModalService) { }

	ngOnInit() {
	
		 this.initdata(); 

		 this.pagetitleService.getpagetitle('WORKSHOP_DAMAGECATEGORIES_TITLE');

	}

	initdata(){
		this.setFormdata();
		this.getDamagecategoryList();

		this.damageCategoryListForm = this.formBuilder.group({
			categories: this.formBuilder.array([])
		});

	}



	getDamagecategoryList() {
		this.loaderdisplay = true;

		this._damageCategoryService.getDamageCategory().subscribe(res => {
			this.damageCategoryList = res;
			this.damageCategoryListForm.controls['categories'] = this.formBuilder.array([]);
			const categoriesArray = <FormArray>this.damageCategoryListForm.controls['categories'];
			for (let index = 0; index < this.damageCategoryList.length; index++) {
				const element = this.damageCategoryList[index];
				let setarray = this.formBuilder.group({
					name: new FormControl(element.name, [Validators.required, CustomValidators.nowhitespace]),
					description: new FormControl(element.description),
					id: new FormControl(element.id),
					priority: new FormControl(element.priority, [Validators.required, CustomValidators.nowhitespace]),
					shipToPartyNo: new FormControl(element.shipToPartyNo),
					clientId: new FormControl(element.clientId),

				});
				categoriesArray.push(setarray);

			}
			this.loaderdisplay = false;
		});

	}

	setFormdata() {
		this.damageCategoryForm = new FormGroup({
			name: new FormControl('', [Validators.required, CustomValidators.nowhitespace]),
			description: new FormControl(''),
			priority: new FormControl('', [Validators.required, CustomValidators.nowhitespace]),
			id: new FormControl(''),
		});
	}

	discard() {
		this.errorMessage = null;
		this.damageCategoryForm.reset();
		this.showDamageCategory = false;
	}

	submitform(type, data) {
		this.deleteresponse = false;
		this.modalHeader ='Confirmation'
	    this.modalBody ='WORKSHOP_CONFIGURATION_DAMAGECATEGORY_CONFIRMATION_SUBMITFORM'

		this.loaderdisplay = true;
		if (type === 'edit') {
			this.validateduplicateupdate(data) ? this.updateDamageCategory(data) : this.loaderdisplay = false;
		} else {
			this.validateduplicate() ? this.createDamageCategory() : this.loaderdisplay = false;
		}
	}


	deleteform(type, data){
		this.deleteresponse = true;
		this.modalHeader = 'WORKSHOP_CONFIGURATION_DAMAGECATEGORY_MODAL_HEADER_TITLE'
		this.loaderdisplay = true;
		this.deleteformdata = data;
		
		if (type === 'edit'){
			this._damageCategoryService.getadaptedWorkshopOrder(data.clientId,data.id).subscribe(res => {
				 this.adaptedWSONumbers = res.adaptedWorkshopOrderNumbers;
				this.loaderdisplay = false;
				if(this.adaptedWSONumbers.length > 0){
				this.modalBody = "WORKSHOP_CONFIGURATION_DAMAGECATEGORY_CONFIRMATION_DELETEINFO"
				  this._modalService.status(true);
				}
				else{
					this._modalService.status(true);
				  this.modalBody = "WORKSHOP_CONFIGURATION_DAMAGECATEGORY_CONFIRMATION_DELETEWARNING"
				}
		})
	}
}

deleteDamageCategory(){
	this._damageCategoryService.deleteDamageCategory(this.deleteformdata.id).subscribe(res =>{
		this._modalService.status(false);
		this.getDamagecategoryList();
		this._toasterService.setContent('WORKSHOP_CONFIGURATION_DAMAGECATEGORY_TOASTER_DELETEDSUCESS');
	})
	this.loaderdisplay = false;
	this.edittab = null;

}

   cancel(){
    this._modalService.status(false);
    }

	editform(event, item) {
		event.stopPropagation();
		this.focusselected = null;
		this.edittab = item.controls.id.value;		
		this.updatename = item.value.name;
	    this.backupItem = new FormGroup({
			name: new FormControl(item.value.name),
			description: new FormControl(item.value.description),
			priority: new FormControl(item.value.priority),
			id: new FormControl(item.value.id),
			shipToPartyNo: new FormControl(item.value.shipToPartyNo),
			clientId: new FormControl(item.value.clientId)
		});
		
	}

	reseterror(ev) {
		this.errorMessage ? this.errorMessage = null : null
	}

	createDamageCategory() {
		this.damageCategoryForm.value.name.trim();
		this._damageCategoryService.createDamageCategory(this.damageCategoryForm.value).subscribe(
			res => {
				if (res) {
					this.errorMessage = null;
					this._toasterService.setContent('WORKSHOP_CONFIGURATION_DAMAGECATEGORY_TOASTER_CREATEDSUCESS');
					this.damageCategoryForm.reset();
					this.showDamageCategory = false;
					this.getDamagecategoryList();
				};
				this.loaderdisplay = false;

			}
		);
	}

	updateDamageCategory(data) {
		data.name.trim();
		this.itemdata = data;	
		this._damageCategoryService.getadaptedWorkshopOrder(data.clientId,data.id).subscribe(res => {
			 this.adaptedWSONumbers = res.adaptedWorkshopOrderNumbers;
			this.loaderdisplay = false;
			if(this.adaptedWSONumbers.length > 0){
				
				this._modalService.status(true);
			}
			else{
				this.editDamageCategoryService(data);
			}
		})
	}

	updateform(){
		this.editDamageCategoryService(this.itemdata);
		this._modalService.status(false);
	}

	editDamageCategoryService(data){ 
		this._damageCategoryService.updateDamageCategory(data).subscribe(res => {
			this.errorMessage = null;
			this._toasterService.setContent('WORKSHOP_CONFIGURATION_DAMAGECATEGORY_TOASTER_UPDATEDSUCESS');
			this.getDamagecategoryList();
			this.loaderdisplay = false;
			this.edittab = null;
		})
		

	}

	validateduplicate() {
		let index = this.damageCategoryList.findIndex((element) => element.name.toUpperCase() === this.damageCategoryForm.value.name.toUpperCase().trim());
		 
		if (index === -1) {
			return true;
		} else {
			this.errorMessage = 'WORKSHOP_CONFIGURATION_DAMAGECATEGORY_ERRORMESSAGE_ALREADYEXISTS';
			return false;
		}

	}

	validateduplicateupdate(data) {
		let nameindex = this.damageCategoryList.findIndex((e) => e.name === this.updatename);
		if (nameindex > -1) {
			this.damageCategoryList.splice(nameindex, 1);
		}
		let index = this.damageCategoryList.findIndex((element) => element.name.toUpperCase() === data.name.toUpperCase().trim());
		if (index > -1) {
			this.errorMessage = 'WORKSHOP_CONFIGURATION_DAMAGECATEGORY_ERRORMESSAGE_ALREADYEXISTS';
			return false;
		} else {
			return true;
		}
	}

	namevalidate(event) {
	 
		event.stopPropagation();
	}



	showDamageCategoryBox() {
		this.showDamageCategory = true;
	}

	showDamageCategoryDetailsBox() {
		this.showDamageCategoryDetails = !this.showDamageCategoryDetails;
		this.iconClass = 'icon-disclosureright';
		if (!this.showDamageCategoryDetails) {
			this.iconClass = 'icon-disclosuredown';
		}
	}

	stoppropagation(event) {
		event.stopPropagation()
	}

	resetEditForm(item , index){ 	
		this.damageCategoryListForm.controls.categories['controls'][index] = new FormGroup({
			name: new FormControl(this.backupItem.value.name),
			description: new FormControl(this.backupItem.value.description),
			priority: new FormControl(this.backupItem.value.priority),
			id: new FormControl(this.backupItem.value.id),
			shipToPartyNo: new FormControl(this.backupItem.value.shipToPartyNo),
			clientId: new FormControl(this.backupItem.value.clientId)
		}); 
		this.edittab = null;	
	}
 

}
