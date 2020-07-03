import { Component, OnInit, Input, Output, EventEmitter, ElementRef, HostListener, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from '../../../shared/directives/validator';
@Component({
  selector: 'workshop-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  styleUrls: ['./datetimepicker.component.scss']
})
export class DatetimepickerComponent implements OnInit {
  timepicker: any;
  minimumDate: any = new Date();
  datetimeset: any;
  resetingData: any;

  datepickerDisplay: any;
  @Output() delete = new EventEmitter();
  @Output() create = new EventEmitter();
  @Output() discard = new EventEmitter();
  @Input() date: any;
  @Input() time: any;



  constructor(private eRef: ElementRef) {
  }


  @HostListener('document:click', ['$event'])
  clickout(event) {
    // let selectedItem = this.eRef.nativeElement.querySelector('.active');
    let rightarrow = !event.target.classList.contains('pi-chevron-right');
    let leftarrow = !event.target.classList.contains('pi-chevron-left');
    let button = !event.target.classList.contains('text-button');

    if (this.eRef.nativeElement.contains(event.target)) {

    } else if (!rightarrow || !leftarrow || !button) {

    } else {
      this.emitdiscard();
    }
  }

  ngOnInit() {
    this.setDatepicker('', '', '')
    if (this.date) {
      let changedateformat = this.date.split('.');
      let updateddate = new Date(changedateformat.join('/'));
      let times = this.time.split(':');
      this.setDatepicker(updateddate, times[0], times[1]);

      this.datetimeset = {
        date: this.date,
        time: this.time,
      } 

    }
  }

  displayDatePicker(event) {
    event.stopPropagation();
    this.datepickerDisplay = true;
  }

  setDatepicker(date, hours, minutes) {
    this.timepicker = new FormGroup({
      date: new FormControl(date, [Validators.required]),
      hours: new FormControl(hours, [Validators.required, CustomValidators.nowhitespace, CustomValidators.maxValue(23), CustomValidators.minValue(0)]),
      minutes: new FormControl(minutes, [Validators.required, CustomValidators.nowhitespace, CustomValidators.maxValue(59), CustomValidators.minValue(0)]),
    })
  }
  emitdelete() {
    this.delete.emit(true);
    this.datepickerDisplay = false;
    this.datetimeset = null;
    this.setDatepicker('', '', '');
  }

  emitcreate() {

    let today = new Date(this.timepicker.controls.date.value);
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    let finalvalue;
    let day;
    let month;

    dd < 10 ? day = '0' + dd : day = dd;
    mm < 10 ? month = '0' + mm : month = mm;

    finalvalue = month + '.' + day + '.' + yyyy;


    this.datetimeset = {
      date: finalvalue,
      time: ('0' + this.timepicker.controls.hours.value).slice(-2) + ':' + ('0' + this.timepicker.controls.minutes.value).slice(-2),
    }
    this.datepickerDisplay = false;
    this.create.emit(this.datetimeset);

  }

  emitdiscard() {
    if (this.resetingData) {
      let time = this.resetingData.time.split(':');
      let changedateformat = this.resetingData.date.split('.');
      let changedate = changedateformat.join('/');
      let updateddate = new Date(changedate);
 

      this.setDatepicker(updateddate, time[0], time[1])
    }
    this.datepickerDisplay = false;
  }

  replaceAll(str, term, replacement) {
    return str.replace(new RegExp(this.escapeRegExp(term), 'g'), replacement);
  }

  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }


  setSelectedDate(datetime) { 
    if (datetime !== null) {
      this.resetingData = datetime;
    } 
    this.datepickerDisplay = true;
  }

  dateconverter(date) {
    let returndate;

    if (date.includes('.')) {
      let splitedDate = date.split('.');
      returndate = splitedDate[1] + '.' + splitedDate[0] + '.' + splitedDate[2];
    }

    if (date.includes('/')) {
      let splitedDate = date.split('/');
      returndate = splitedDate[1] + '/' + splitedDate[0] + '/' + splitedDate[2];
    } 
    return returndate
    // 
  }

}
