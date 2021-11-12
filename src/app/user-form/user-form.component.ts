import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { FormValidationService } from '../shared/services/form-validation.service';
import { Location } from '@angular/common';
import { UserFormService } from './user-form.service';
import { MessagesService } from '../shared/services/messages.service';

/*
  This component is used to:
    -Login
    -Create a new user
*/
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
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
    private location: Location,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    
    // Initializing values based on the page (login or user)
    if (this.router.url.includes('/user') ) {
      this.isLogin = false;
      this.pageTitle = 'Criar Conta';
      this.submitButtonText = 'Criar'
      this.secondaryButtonText = 'Cancelar'
    }

    // Authentication
    if (this.authService.isUserAuth()) {
      this.router.navigate(['/events'])
    }

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  // Getters to access form fields at the template
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  onSubmit() {

    if (this.form.valid) {
      if (this.isLogin) {
        this.login()
      } else {
        this.createUser()
      }
    } else {
      this.formValidationService.verifyForm(this.form)
    }
  }

  /*
    Secondary button click handler
  */
  onClick() {
    if (this.isLogin) {
      this.router.navigate(['/user'])
    } else {
      this.location.back()
    }
  }

  /*
    Send the user credentials to the server.
    Set token and redirect the user to the next page if they are correct.
  */
  login() {
    this.authService.login(this.form.value)
      .subscribe( (response: any) => {
        // verify if response has token
        if (response.token) {
          this.authService.setToken(response.token)
          this.router.navigate(['/events'])
        }
      })
  }

  /*
    Send a request to server and redirect the user to the login page if the account was created.
  */
  createUser() {
    this.userFormService.createAccount(this.form.value)
      .subscribe( (res: any) => {
        this.messagesService.showMessage(['Conta criada! Já pode usar a sua agenda!'])

        this.router.navigate(['/login'])
      })
  }

}
