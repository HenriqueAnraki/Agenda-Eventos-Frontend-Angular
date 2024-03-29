import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/*
  Service to handle http request and local storage logic from UserFormComponent

*/
@Injectable()
export class UserFormService {
  private readonly endpoint = environment.apiEndpoint;

  constructor(
    private http: HttpClient
  ) { }

  createAccount(credentials: any) {
    return this.http.post(`${this.endpoint}/users`, credentials)
  }

  getUserIdByEmail(email: string){
    return this.http.get(`${this.endpoint}/users/${email}`);
  }
}
