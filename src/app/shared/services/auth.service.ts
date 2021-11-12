import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt'
import { BehaviorSubject } from 'rxjs';

import { environment } from 'src/environments/environment';


/*
Functions related to Auth that need to be accessed throughout all the app.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = environment.apiEndpoint;

  private loggedIn = new BehaviorSubject<any>(this.getUserAuth());

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService,
    private http: HttpClient
  ) { }

  login(credentials: any) {
    let endpoint = environment.apiEndpoint

    return this.http.post(`${endpoint}/users/login`, credentials)
  }

  /**
   * Return user auth info.
   * Used to control navbar.
   */
  getUserAuth(){
    return {
      isLoggedIn: this.isUserAuth(),
      userEmail: this.getUserEmail()
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);

    this.loggedIn.next(this.getUserAuth());
  }

  getToken() {
    return localStorage.getItem('token');
  }

  /*
  Verify if user is Authenticated.
  */
  isUserAuth() {
    return this.getToken() ? true : false;
  }

  logout() {
    localStorage.removeItem('token')
    
    this.loggedIn.next(this.getUserAuth())
    this.router.navigate(['/'])
  }

  getTokenValue() {
    const token = this.getToken()

    return this.jwtHelperService.decodeToken(<string>token)
  }

  getUserEmail() {
    const tokenValue = this.getTokenValue()    

    return tokenValue?.email ?? ''
  }
}
