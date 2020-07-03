
import { Directive, ElementRef, Input, OnInit } from  '@angular/core';
@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective { 
  constructor(private elementRef: ElementRef) {
  }
 ngOnInit() { 

      this.elementRef.nativeElement.focus();
 }

}
