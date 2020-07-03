import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortname'
})
export class ShortnamePipe implements PipeTransform {

  transform(value: any, args?: any): any { 
    let splitnames = value.replace(/\s+/g, ' ').split(' ')
    let firstname = splitnames[0].charAt(0).trim();
    let data;
    let lastname;
    splitnames[1] ? (lastname = splitnames[1].charAt(0).trim(), data = firstname.concat(lastname)) : data = firstname


    return data;
  }

}
