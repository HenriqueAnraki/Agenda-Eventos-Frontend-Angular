import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/*
Service containing functions to validate a form. 
*/
@Injectable()
export class FormValidationService {

  constructor() { }

  /*
  Touch all form's fields. Used to trigger form error messages.
  */
  verifyForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach( field => {
      const control = formGroup.get(field);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.verifyForm(control);
      }
    });
  }
}
