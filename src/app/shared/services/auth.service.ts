import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/*
Functions related to Auth that need to be accessed throughout all the app.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
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
}
