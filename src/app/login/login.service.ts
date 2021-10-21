import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../shared/services/app-config.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class LoginService {

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient,
    private router: Router
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
        console.log(error);
        alert(error.error.text ?? error.error);
      })
  }

  private setToken(token: string) {
    localStorage.setItem('token', token);
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  isUserAuth() {
    return this.getToken() ? true : false;
  }

}
