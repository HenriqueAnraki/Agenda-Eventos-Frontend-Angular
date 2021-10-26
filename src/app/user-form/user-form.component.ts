import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormValidationService } from '../shared/services/form-validation.service';
import { Location } from '@angular/common';
import { UserFormService } from './services/user-form.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


  isLogin: boolean = true;
  pageTitle: string = 'Login';
  submitButtonText: string = 'Login';
  secondaryButtonText: string = 'Criar Conta';

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private formValidationService: FormValidationService,
    private userFormService: UserFormService,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    if (this.router.url.includes('/user') ) {
      this.isLogin = false;
      this.pageTitle = 'Criar Conta';
      this.submitButtonText = 'Criar'
      this.secondaryButtonText = 'Cancelar'
    }

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
      if (this.isLogin) {
        // fazer login
        this.login()
      } else {
        // Criar conta
        this.createUser()
      }
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

  onClick() {
    if (this.isLogin) {
      this.router.navigate(['/user'])
    } else {
      this.location.back()
    }
  }

  login() {
    this.userFormService.login(this.form.value)
      .subscribe( (response: any) => {
        console.log('response')
        console.log(response)
        // verify if response has 'troken
        if (response.token) {
          // setar token em algum lugar do browser
          this.userFormService.setToken(response.token)
          // redirecionar para a pagina de eventos
          this.router.navigate(['/events'])
        } else {
          alert('Email ou senha errado!')
        }
      })
  }

  createUser() {
    this.userFormService.createAccount(this.form.value)
      .subscribe( (res: any) => {
        console.log('resposta do post: ')
        console.log(res)
        alert("Conta criada! Já pode usar a sua agenda!")

        // [todo] o redirect faço aqui, ou no componente?
        this.router.navigate(['/login'])
      })
  }

}
