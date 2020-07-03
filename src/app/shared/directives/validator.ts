import { FormControl, Validators } from '@angular/forms';


const whitespaceRegex = /^\s+$/;

// create your class that extends the angular validator class
export class CustomValidators extends Validators {

  static nowhitespace(control: FormControl) {
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(whitespaceRegex);
      return matches && matches.length ? { invalid_characters: matches } : null;
    } else {
      return null;
    }
  }

 

  static maxValue(max: Number) { 
    return (control): { [key: string]: any } => {
      const input = control.value,
        isValid = input > max;
      if (isValid)
        return { 'maxValue': { max } }
      else
        return null;
    };
  };

  static minValue(min: Number) { 
    return (control): { [key: string]: any } => {
      const input = control.value,
        isValid = input < min;
      if (isValid)
        return { 'minValue': { min } }
      else
        return null;
    };
  };

}


// }




// export function maxValue(max: Number): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: any } => {
//     const input = control.value,
//       isValid = input > max;
//     if (isValid)
//       return { 'maxValue': { max } }
//     else
//       return null;
//   };
// }