import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortby'
})
export class SortbyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
 
    function sortThings(a, b) { 
      let c = a.name.toLowerCase();
      let d = b.name.toLowerCase();
      return c < d ? -1 : c < d ? 1 : 0;
    }
 
    return value.sort(sortThings);
  }

}
