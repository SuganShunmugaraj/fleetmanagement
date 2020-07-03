
import { EditworkshoporderService, ConfirmationDialogService, WorkshoporderService, ModalService, PagetitleService, ConfigurationService } from '../../../core/services/';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, HostListener, Input } from '@angular/core';
import { DatePipe } from '@angular/common'
import { CdkDragDrop, moveItemInArray, CdkDragEnter, transferArrayItem } from '@angular/cdk/drag-drop';
import { ConfirmationService } from 'primeng/api';
import { path } from '../../../core/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent implements OnInit {
  waitingListLoader: boolean = true;
  inprogressListLoader: boolean = true;
  reasonToReject: String;
  reasonlabel: String;
  listheightstyle: string;
  assignedtec: any;
  waitingList: any[];
  autoselectedDate = new Date();
  inprogressList: any[];
  shiptoparty: number;
  clientid: number;
  existingSlots: any[] = [];
  selectedOrder: any = null;
  selectedInprogressOrder: any = null;
  inprogressSelectedOrder: any = null;
  dragData: string;
  selectedOrderData: any = {};
  inprogressOrderData: any = {};
  duplicateslot: any;

  selectedinprogressOrderData: any = {};
  reasonData: any;
  totalSlot: number;
  paramObj: any;
  modalreasonForm: any;
  inputdate: any;
  display: boolean;
  wrapperdisplay: boolean;
  technician: any = [];
  editassignedtech: any;
  listheight: number;
  selectedDate: any;
  datepickerDisplay: any;
  resetingData: any;
  slotedit: any;
  onlydata: any;
  LIST_IDS: any[] = [
    'cdk-drop-list-0', 'cdk-drop-list-0',
    'cdk-drop-list-1', 'cdk-drop-list-2',
    'cdk-drop-list-3', 'cdk-drop-list-4',
    'cdk-drop-list-5', 'cdk-drop-list-6',
    'cdk-drop-list-7', 'cdk-drop-list-8',
    'cdk-drop-list-9'];
  activeordertec: any;
  displaydropdown: any;
  techniciantodelete: any;
  ussttechnicianList: any;
  toggleexpandorder: any = {}
  truckpath: any = path.truckpath;
  constructor(
    private _editworkshoporderService: EditworkshoporderService,
    private _confirmationdialogservice: ConfirmationDialogService,
    private _confirmationService: ConfirmationService,
    private render: Renderer2,
    private eRef: ElementRef,
    private translate: TranslateService,
    private _modalService: ModalService,
    private _workshoporderService: WorkshoporderService, private elementRef: ElementRef,
    private pagetitleService: PagetitleService,
    private _configurationService: ConfigurationService,
    private _datePipe: DatePipe
  ) { }



  ngOnInit() {
    this.waitingListLoader = true;
    // this.shiptoparty = JSON.parse(localStorage.getItem('shiptoParty'));
    this.getInitialData();

    this.pagetitleService.getpagetitle('WORKSHOP_PROCESSINGORDER_TITLE');

    // this.gettingtechnicianList();


  }




  getInitialData() {
    this.existingSlots = [];
    this.gettingUssttechnicianList();
    this._editworkshoporderService.getWaitingList().subscribe(data => (this.waitingList = data, this.waitingListLoader = false));
    this._editworkshoporderService.getInprogressList().subscribe(data => (this.setttingSlot(data)));
  }


  setttingSlot(data) {
    data.forEach(function (val, i) {
      this.existingSlots.push(parseInt(val['assignedSlot']));
    }, this);

    this.inprogressList = [];
    this._configurationService.getSlot().subscribe(res => {
      this.totalSlot = res.length;
      res.forEach((val, i) => {
        let freeSlot = {
          "assignedSlot": i + 1,
          "freeSlot": true,
          "slotName": val.slotName,
          "slotId": val.slotId
        }
        this.inprogressList.push(freeSlot);
      });
      this.existingSlots.forEach(element => {
        data.forEach(dto => {
          if (element == dto.assignedSlot) {
            this.inprogressList.forEach((freeSlot, index) => {
              if (element === freeSlot.slotId) {
                this.inprogressList[index] = dto;
                this.inprogressList[index].slotName = freeSlot.slotName;
                this.inprogressList[index].slotId = freeSlot.slotId;
                console.log(this.inprogressList[index].estCompletionDate)
                this.inprogressList[index].estconversiondate = this.formatdate(this.inprogressList[index].estCompletionDate)
                this.clientid = dto.clientId;
              }

            });
          }
        });
      });
      this.inprogressListLoader = false
    });
  }

  selectorder(waitingindex, event) {
    event.stopPropagation()
    this.selectedOrder = waitingindex;
  }

  selectFilter(dateButton, viewName: string): boolean {
    var currentDate = new Date();
    var datePickerDate = new Date(dateButton.value);

    if (datePickerDate.getFullYear() > currentDate.getFullYear()) {
      return true;
    }

    if (datePickerDate.getFullYear() < currentDate.getFullYear()) {
      return false;
    }

    if (datePickerDate.getFullYear() === currentDate.getFullYear()) {
      if (datePickerDate.getMonth() >= currentDate.getMonth()) {
        if (datePickerDate.getDate() >= currentDate.getDate()) {
          return true;
        }
      }
    }

    if (datePickerDate.getFullYear() === currentDate.getFullYear()) {
      if (datePickerDate.getMonth() > currentDate.getMonth()) {
        if (datePickerDate.getDate() < currentDate.getDate()) {
          return true;
        }
      }
    }
    if (datePickerDate.getFullYear() < currentDate.getFullYear()) {
      if (datePickerDate.getMonth() <= currentDate.getMonth()) {
        return false;
      }
    }

    if (datePickerDate.getDate() > currentDate.getDate()) {
      if (datePickerDate.getMonth() >= currentDate.getMonth()) {
        return true;
      }
    }

    if (datePickerDate.getDate() > currentDate.getDate()) {
      if (datePickerDate.getFullYear() >= currentDate.getFullYear()) {
        if (datePickerDate.getMonth() >= currentDate.getMonth()) {
          return true;
        }
      }
    }

    if (datePickerDate.getDate() === currentDate.getDate()) {
      if (datePickerDate.getMonth() >= currentDate.getMonth()) {
        return true;
      }
    }
  }


  updateSlot(inprogressindex) {

    if (this.selectedOrder !== null) {
      this.waitingListLoader = true;
      this.inprogressListLoader = true;
      let selectedSlot = inprogressindex + 1;

      let body = this.waitingList[this.selectedOrder];

      body.assignedSlot = this.inprogressList[inprogressindex].slotId;
      body.workStatus = "INPROGRESS";
      body.new = false;
      this._editworkshoporderService.updateWorkstatus(body).subscribe(res => {
        let slotName = this.inprogressList[inprogressindex].slotName;
        this.inprogressList[inprogressindex] = this.waitingList[this.selectedOrder];
        this.inprogressList[inprogressindex].slotName = slotName;
        this.inprogressList[inprogressindex].estconversiondate = this.formatdate(this.inprogressList[inprogressindex].estCompletionDate)
        this.waitingList.splice(this.selectedOrder, 1);
        this.existingSlots.push(selectedSlot)
        this.selectedOrder = null;
        this.waitingListLoader = false;
        this.inprogressListLoader = false;
      })
    }

  }

  updateInprogressSlot(inprogressindex) {


    if (this.selectedInprogressOrder !== null) {
      this.inprogressListLoader = true;
      let selectedSlot = inprogressindex + 1;

      let body = this.inprogressList[this.selectedInprogressOrder];

      body.assignedSlot = selectedSlot;
      body.new = false;
      body.assignedSlot = this.inprogressList[inprogressindex].slotId;


      this._editworkshoporderService.updateWorkstatus(body).subscribe(res => {
        let destinationSlotName = this.inprogressList[inprogressindex].slotName;
        let destinationSlotId = this.inprogressList[inprogressindex].slotId;
        let sourceSlotName = this.inprogressList[this.selectedInprogressOrder].slotName;
        let sourceSlotId = this.inprogressList[this.selectedInprogressOrder].slotId;
        this.inprogressList[inprogressindex] = this.inprogressList[this.selectedInprogressOrder];
        this.inprogressList[inprogressindex].slotName = destinationSlotName;
        this.inprogressList[inprogressindex].slotId = destinationSlotId;

        // this.existingSlots.push(selectedSlot)
        this.inprogressList[this.selectedInprogressOrder] = {
          "assignedSlot": this.selectedInprogressOrder = null,
          "freeSlot": true,
          "slotName": sourceSlotName,
          "slotId": sourceSlotId
        }
        this.selectedInprogressOrder = null;
        this.inprogressListLoader = false;
      })
    }

  }

  trackByFn(index, item) {
    return item;
  }



  drop(event: CdkDragDrop<string[]>, inprogressindex) {

    if (event.previousContainer !== event.container) {
      if (this.dragData === "WaitingData")
        this.updateSlot(inprogressindex)
      if (this.dragData === "InprogressData")
        this.updateInprogressSlot(inprogressindex)
    } else {
    }
  }


  addId(i) {
    this.LIST_IDS.push('cdk-drop-list-' + i);
    return i
  }

  dragstart(waitingindex, event) {
    this.selectedOrder = waitingindex;
    this.dragData = "WaitingData"
    this.selectedOrderData = this.waitingList[this.selectedOrder];
    this.duplicateslot = this.waitingList[this.selectedOrder];


  }

  inprogressdragstart(inprogressindex, event) {
    this.dragData = "InprogressData";
    this.duplicateslot = this.inprogressList[inprogressindex];
    this.selectedOrderData = this.inprogressList[inprogressindex];
    this.selectedInprogressOrder = inprogressindex;
  }

  reset(orderdata) {
    if (orderdata.workStatus === "INPROGRESS") {
      this.inprogressSelectedOrder = orderdata;
      this._modalService.status(true);
    }
  }

  cancel() {
    this.reasonToReject = '';
    this._modalService.status(false);
  }
  update() {
    this.waitingListLoader = true;
    this.inprogressListLoader = true;

    let reasonlabel = 'Was already In Progress ';
    this.reasonToReject ? this.inprogressSelectedOrder.reasonToReject = reasonlabel + this.reasonToReject : this.inprogressSelectedOrder.reasonToReject = reasonlabel

    this.inprogressSelectedOrder.new = false;
    this.inprogressSelectedOrder.workStatus = 'WAITING';

    this._editworkshoporderService.updateWorkstatus(this.inprogressSelectedOrder).subscribe(res => {
      this.getInitialData();
      this._modalService.status(false);
      this.inprogressSelectedOrder = null;
    });

    this.reasonToReject = null;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    let selectedItem = this.eRef.nativeElement.querySelector('.active');
    let isNotFreeSlot = !event.target.classList.contains('slot--free');
    let isNotAssignSlotIcon = !event.target.classList.contains('assignslot--label');

    if (selectedItem != null && !selectedItem.contains(event.target) && isNotFreeSlot && isNotAssignSlotIcon) {
      this.selectedOrder = null;

    }
    if (!event.target.classList.contains('ics') && !event.target.classList.contains('icon-add') && !event.target.classList.contains('usericon')) {
      this.activeordertec = null
      this.selectedInprogressOrder = null;
    }
  }

  setdatetime(event, i) {
    if (event.value && event.value != null) {
      if (this.inprogressList[i].estCompletionDate != null) {
        let dotremoveddate = this.inprogressList[i].estCompletionDate.split('.')
        let Fulldate = dotremoveddate[0] + '/' + dotremoveddate[1] + '/' + dotremoveddate[2];
        this.inprogressList[i].convertedDate = Fulldate + ' ' + this.inprogressList[i].estCompletionTime
      }

      let actualdate = new Date(this.inprogressList[i].convertedDate);

      if (JSON.stringify(event.value) != JSON.stringify(actualdate)) {
        console.log("getting different date")
        let dd = event.value.getDate();
        let mm = event.value.getMonth() + 1;
        var yyyy = event.value.getFullYear();

        let finalvalue;
        let day;
        let month;

        dd < 10 ? day = '0' + dd : day = dd;
        mm < 10 ? month = '0' + mm : month = mm;

        finalvalue = month + '.' + day + '.' + yyyy;
        this.inprogressList[i].estCompletionDate = finalvalue
        this.inprogressList[i].estCompletionTime = ('0' + event.value.getHours()).slice(-2) + ':' + ('0' + event.value.getMinutes()).slice(-2)

        this.inprogressList[i].estconversiondate = this.formatdate(this.inprogressList[i].estCompletionDate)

        this._editworkshoporderService.updateWorkstatus(this.inprogressList[i]).subscribe(res => {
        });

        this.datepickerDisplay = false;
      }
      else {
        this.datepickerDisplay = true;

      }
    }
  }

  formatdate(date) {
    if (date != null) {
      let splitedDate = date.split('.');
      return date = splitedDate[1] + '.' + splitedDate[0] + '.' + splitedDate[2];
    }
  }

  setSelectedDate(event, slotName, i) {
    let dotremoveddate = this.inprogressList[i].estCompletionDate.split('.')
    let Fulldate = dotremoveddate[0] + '/' + dotremoveddate[1] + '/' + dotremoveddate[2];
    this.inprogressList[i].convertedDate = Fulldate + ' ' + this.inprogressList[i].estCompletionTime
    this.inprogressList[i].estCompletionDateTime = new Date(this.inprogressList[i].convertedDate);
    console.log(this.inprogressList[i].estCompletionDateTime);

    this.displayDatePicker(event, slotName, i)

  }

  emitdiscard() {
    this.datepickerDisplay = false;
  }


  delete(i) {
    this.datepickerDisplay = false;
    this.inprogressList[i].estCompletionDate = null;
    this.inprogressList[i].estCompletionTime = null;
    this.inprogressList[i].estCompletionDateTime = null;
    this._editworkshoporderService.updateWorkstatus(this.inprogressList[i]).subscribe(res => {
    });
  }

  // setSelectedDate(date, time) {
  //   let datetime = { date, time };
  //   date ? this.inputdate = datetime : this.inputdate = true; 
  // }

  gettingUssttechnicianList() {
    this._editworkshoporderService.getUsstTechnician().subscribe(res => {
      this.ussttechnicianList = res;
    });
  }
  consoled(d) {
    console.log(d)
  }
  gettingtechnicianList() {
    this.inprogressListLoader = true;

    this.technician = this.ussttechnicianList;
    this._editworkshoporderService.getTechnician(this.clientid).subscribe(res => {
      if (res) {
        this.technician = this.ussttechnicianList.concat(res);


        this.technician.sort(function (a, b) {
          let c = a.name.toLowerCase();
          let d = b.name.toLowerCase();
          return c < d ? -1 : c < d ? 1 : 0;
        })




      }
      this.inprogressListLoader = false;

    });
  }

  editTechnician(order, technicianindex, orderindex) {
    this.editassignedtech = { order, technicianindex, orderindex };
  }

  getassignedtechnicianList(order) {
    let assignedTechnician: any = [];
    this._editworkshoporderService.getTechnician(this.clientid).subscribe(res => {
      if (res) {
        this.technician = this.ussttechnicianList.concat(res);
        order.assignedTechnicians.forEach(techName => {
          console.log("assigned techName" + techName);
          this.technician.forEach(element => {
            console.log("element name" + element.name);
            if (techName === element.name) {
              assignedTechnician.push(element);
            }
          });
        });
        this.technician = assignedTechnician;
      }
    });
  }


  selectTechnician(event, index) {
    this.inprogressList[index].assignedTechnicians ? null : this.inprogressList[index].assignedTechnicians = [];
    let technicianavailability = this.findtechnician(this.inprogressList[index].assignedTechnicians, event.name) === -1;
    if (technicianavailability) {
      this.inprogressList[index].assignedTechnicians.push(event.name);
    }
    this._editworkshoporderService.updateWorkstatus(this.inprogressList[index]).subscribe(res => {

    });

  }

  findtechnician(order, name) {
    return order.findIndex(val => val == name);
  }

  addNewTechnician(value, i) {
    let selecttecData = {
      name: value
    }
    this.selectTechnician(selecttecData, i);
    this._editworkshoporderService.addTechnician(this.clientid, value).subscribe(res => {
      this.gettingtechnicianList();
    })
  }

  deletetechnician(technicianId) {
    // event.stopPropagation();
    this.render.addClass(document.body, 'displayoverlay');
    this._confirmationService.confirm({
      header: this.translate.instant('WORKSHOP_DELETE_TECHNICIAN_CONFIRM_HEADER'),
      acceptLabel: this.translate.instant('WORKSHOP_DELETE_TECHNICIAN_CONFIRM_DELETE_BUTTON'),
      rejectLabel: this.translate.instant('WORKSHOP_DELETE_TECHNICIAN_CONFIRM_CANCEL_BUTTON'),
      message: this.translate.instant('WORKSHOP_DELETE_TECHNICIAN_CONFIRM_MESSAGE'),
      accept: () => {

        var technicianindex = this.technician.findIndex(val => val.technicianNumber === technicianId)
        if (technicianindex > -1) {
          this.technician.splice(technicianindex, 1);
        }
        this._editworkshoporderService.deleteTechnician(technicianId).subscribe(res => {
          console.log(res)
        })
        this.render.removeClass(document.body, 'displayoverlay');
      },
      reject: () => {
        this.render.removeClass(document.body, 'displayoverlay');
      }
    });


  }




  addactivehighlight(order, index) {

    this.displaydropdown = index
    if (!order.assignedTechnicians || order.assignedTechnicians.length == 0) {
      this.activeordertec = index;
    }
  }



  closetechnician(ev) {
    this.gettingtechnicianList();
    ev ? (this.activeordertec = null) : null
  }

  getAssignedDmgCategoryName(assignedDmgCategoryIds, wsoList, index) {
    let assignedDmgCategoriesName: string[] = new Array();
    assignedDmgCategoryIds.forEach(assignedDmgCategoryid => {
      wsoList.forEach(wsoObj => {
        if (assignedDmgCategoryid === wsoObj.id) {
          assignedDmgCategoriesName.push(wsoObj.name);
        }
      });
    });
    return assignedDmgCategoriesName.join(', ');
  }

  showassignedtechnician(index, order) {
    this.wrapperdisplay = true;
    this.assignedtec = index;
  }

  unAssignTechnician(unAssignTechindex, order, slotIndex) {
    order.assignedTechnicians.splice(unAssignTechindex, 1);
    //this.inprogressList[index].assignedTechnicians.push(event.name);  
    this._editworkshoporderService.updateWorkstatus(this.inprogressList[slotIndex]).subscribe(res => {

    });
    this.duplicatewrapper();

  }

  duplicatewrapper() {
    this.assignedtec = null;

    this.wrapperdisplay = false;
    this.datepickerDisplay = false;
  }

  displayDatePicker(event, slotName, i) {
    this.slotedit = slotName;
    this.datepickerDisplay = true;
  }

}
