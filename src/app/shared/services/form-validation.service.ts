import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/*
Service containing functions to validate a form. 
*/
@Injectable()
export class FormValidationService {

  constructor() { }

  /*
  Validate a field.
  */
  isFieldInvalid(field: string, form: FormGroup): boolean {
    return !form.get(field)?.valid && (!!form.get(field)?.touched || !!form.get(field)?.dirty)
  }

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

  /*
  Return CSS for a invalid field.
  */
  errorCSS(field: string, form: FormGroup) {
    return {
      'is-invalid': this.isFieldInvalid(field, form)
    }
  }
}
