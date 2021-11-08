import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/*
  Service to handle http request and local storage logic from UserFormComponent

*/
@Injectable()
export class UserFormService {

  constructor(
    private http: HttpClient
  ) { }

  login(credentials: any) {
    let endpoint = environment.apiEndpoint
    
    console.log(credentials)

    return this.http.post(`${endpoint}/users/login`, credentials)
      .pipe(
        take(1)
      )
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  createAccount(credentials: any) {
    let endpoint = environment.apiEndpoint
    
    console.log(endpoint)
    
    return this.http.post(`${endpoint}/users`, credentials)
    .pipe(
      take(1)
    );
  }
}
