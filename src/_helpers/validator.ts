import { Validators, AbstractControl } from '@angular/forms';


/**
 * @description Validate for blank string
 * @param control 
 */
export function ValidateString(control: AbstractControl): any {
  const data = Validators.required(control);
  if (data === null) {
    let value = control.value;
    if (value) {
      value = value.trim();
      if (value.length > 0) {
        return null;
      }
    }
    return { invalidValue: 'Value Is Invalid' };
  } else {
    return data;
  }
}
