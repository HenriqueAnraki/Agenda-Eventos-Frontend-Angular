import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../shared/services/form-validation.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
    });
  }

  onSubmit() {
    // create user
    console.log(this.form)

    if (this.form.valid) {
      console.log('tudo certo!')
      // fazer login
    } else {
      console.log('Form Inválido!')
      this.formValidationService.verifyForm(this.form)
    }
  }

  showFieldError(field: string) {
    return this.formValidationService.isFieldInvalid(field, this.form)
  }

  applyErrorCSS(field: string){
    return {
      'is-invalid': this.showFieldError(field)
    }
  }

}
