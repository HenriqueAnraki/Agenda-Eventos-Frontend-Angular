import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../shared/services/app-config.service';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

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
      .pipe(
        take(1),
        catchError(
          (error: HttpErrorResponse) => {
            console.log(error);

            this.errorHandlerService.handleError(error)
            return EMPTY
          }
        )
      )
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

}

