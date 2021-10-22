import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormValidationService } from '../shared/services/form-validation.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.authService.isUserAuth()) {
      this.router.navigate(['/events'])
    }

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    console.log(this.form)

    if (this.form.valid) {
      console.log('tudo certo!')
      // fazer login
      this.loginService.login(this.form.value)
    } else {
      console.log('Form Inválido!')
      this.formValidationService.verifyForm(this.form)
    }
  }

  showFieldError(field: string): boolean {
    return this.formValidationService.isFieldInvalid(field, this.form)
  }

  applyErrorCSS(field: string){
    return this.formValidationService.errorCSS(field, this.form)
  }

}
