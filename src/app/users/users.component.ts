import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../shared/services/form-validation.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  form!: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      "email": [null, [Validators.required, Validators.email]],
      "password": [null, Validators.required]
    });
  }

  onSubmit() {
    // create user
    console.log(this.form.value)

    if (this.form.valid) {
      console.log('tudo certo!')
      // fazer login
      this.userService.login(this.form.value)

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
