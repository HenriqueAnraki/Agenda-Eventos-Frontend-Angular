import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../shared/services/app-config.service';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { catchError, take } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable()
export class UserService {

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

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
      take(1)// ,
      // catchError(
      //   (error: HttpErrorResponse) => {
      //     console.log(error);

      //     this.errorHandlerService.handleError(error)
      //     return EMPTY
      //   }
      // )
    );
  }
}
