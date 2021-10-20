import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormValidationService {

  constructor() { }

  isFieldInvalid(field: string, form: FormGroup): boolean {
    return !form.get(field)?.valid && (!!form.get(field)?.touched || !!form.get(field)?.dirty)
  }
}
