import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../shared/services/app-config.service';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { take } from 'rxjs/operators';

@Injectable()
export class LoginService {

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
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

}

