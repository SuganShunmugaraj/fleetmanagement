import { Component, OnInit,ViewChild, Output, EventEmitter, ElementRef, Input, HostListener, OnChanges } from '@angular/core';

@Component({
  selector: 'searchdropdown',
  templateUrl: './searchdropdown.component.html',
  styleUrls: ['./searchdropdown.component.scss']
})
export class SearchdropdownComponent implements OnInit, OnChanges {
  @Output() onRemove = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onSearch = new EventEmitter();
  @Output() onLoad = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Input() index: any;
  @Input() list: any;
  @Input() editmode: any;
  order: any;
  display: boolean;
  searchdata: any;
  searchForm: any;
  @ViewChild('inputfocus') el:ElementRef;
  constructor(private eRef: ElementRef) { }

  ngOnInit() { 
  }

  ngOnChanges(changes) {    
    if(changes.editmode && changes.editmode.currentValue){ 
      changes.editmode.currentValue.orderindex ===  this.index ? (this.display = true, this.order = changes.editmode.currentValue.order):null;
    } 
    this.eRef.nativeElement.querySelector('input') ? this.eRef.nativeElement.querySelector('input').focus() : null
  }



  @HostListener('document:click', ['$event'])
  clickout(event) {
    let button = !event.target.classList.contains('bordered');
    if (!this.eRef.nativeElement.contains(event.target) && button) {
      this.display = false;

    }
  }


  remove(technicianNumber) {
    this.onRemove.emit(technicianNumber);  
  }

  selectedtechnician(technician) { 
    this.onSelect.emit(technician);
    this.display = false;

  }
  
 
  displaylist() {
    this.display = true;
    this.onClose.emit(this.index)
  }

  onsearch(data) {
    // let newtech = { name: data.value.searchdata }
    // this.selectedtechnician(newtech)

    this.onSearch.emit(data.value.searchdata)
    data.reset();
    this.display = false;
  }
  
  duplicatewrapper(){
    this.display = false;
    this.onClose.emit(this.index) ;
  }
}
