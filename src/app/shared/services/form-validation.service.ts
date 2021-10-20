import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormValidationService {

  constructor() { }

  isFieldInvalid(field: string, form: FormGroup): boolean {
    return !form.get(field)?.valid && (!!form.get(field)?.touched || !!form.get(field)?.dirty)
  }

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
