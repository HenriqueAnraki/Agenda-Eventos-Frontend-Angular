import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit, OnDestroy {

  isCollapsed: boolean = true;

  userEmail!: string
  showHeader: boolean = false;

  loggedInSubscription!: Subscription

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    // controlling nav bar visibility
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

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe()
  }

  logout() {
    this.authService.logout()
  }
}
