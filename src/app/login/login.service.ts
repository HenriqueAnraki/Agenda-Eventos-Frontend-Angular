import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../shared/services/app-config.service';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Injectable()
export class LoginService {

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  login(credentials: any) {
    // let endpoint = this.appConfigService.apiEndpoint
    let endpoint = environment.apiEndpoint
    
    console.log(credentials)

    // [todo] melhorar endpoints especificos?
    // colocar como configuração também??
    return this.http.post(`${endpoint}/login`, JSON.stringify({
      emailAddress: credentials.email,
      password: credentials.password
    }))
      .subscribe( (response: any) => {
        console.log('response')
        console.log(response)
        // verify if response has 'troken
        if (response.token) {
          // setar token em algum lugar do browser
          this.setToken(response.token)
          // redirecionar para a pagina de eventos
          this.router.navigate(['/events'])
        } else {
          alert('Email ou senha errado!')
        }
      },
      (error: HttpErrorResponse) => {
        console.log('error');
        console.log(error);

        this.errorHandlerService.handleError(error)
        // let errorMessage = error.error.text ?? error.error
        // if (!(typeof errorMessage === 'string')) {
        //   errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
        // }

        // alert(errorMessage);
      })
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

}

