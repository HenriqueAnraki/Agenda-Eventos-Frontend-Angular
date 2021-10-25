import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserFormService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: any) {
    let endpoint = environment.apiEndpoint
    
    console.log(credentials)

    // [todo] melhorar endpoints especificos?
    // colocar como configuração também??
    return this.http.post(`${endpoint}/login`, JSON.stringify({
      emailAddress: credentials.email,
      password: credentials.password
    }))
      .pipe(
        take(1)
      )
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  createAccount(credentials: any) {
    // Como/onde criar constantes de configuração baseadas no enviroment?
    // let endpoint = this.appConfigService.apiEndpoint
    let endpoint = environment.apiEndpoint
    
    console.log(endpoint)
    
    return this.http.post(`${endpoint}/user`, JSON.stringify({
      emailAddress: credentials.email,
      password: credentials.password
    }))
    .pipe(
      take(1)
    );
  }
}