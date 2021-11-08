import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt'


/*
Functions related to Auth that need to be accessed throughout all the app.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private jwtHelperService: JwtHelperService
  ) { }

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
    this.router.navigate(['/'])
  }

  getTokenValue() {
    const token = this.getToken()

    return this.jwtHelperService.decodeToken(<string>token)
  }

  getUserEmail() {
    const tokenValue = this.getTokenValue()    

    return tokenValue.email
  }
}
