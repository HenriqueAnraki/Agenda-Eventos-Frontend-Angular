import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

/* 
Component to add a simple header.
*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed: boolean = true;

  userEmail!: string
  showHeader: boolean = false;
  // isLoggedIn$!: Observable<string>
  loggedInSubscription!: Subscription

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.userEmail = this.authService.getUserEmail()
    this.loggedInSubscription = this.authService.isLoggedIn
      .subscribe( (userData) => {
        if (userData.isLoggedIn) {
          this.showHeader = true;
          this.userEmail = userData.userEmail
        } else {
          this.showHeader = false;
          this.userEmail = ''
        }

      })
  }

  logout() {
    this.authService.logout()
  }

}


  //   this.isLoggedInSubscription = this.authService.isLoggedIn
  //     .subscribe( (mode) => {
  //       this.showHeader = mode
  //     } )
  // }

 
  // ngOnDestroy() {
  //   this.isLoggedInSubscription.unsubscribe()
  // }

