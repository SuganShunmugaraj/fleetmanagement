import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ddmmdateformat'
})
export class DdmmdateformatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let splitdate = value.split('.')
    let returndate = splitdate[1] + '.' + splitdate[0] + '.' + splitdate[2];
    return returndate;
  }

}
