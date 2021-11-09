import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

/* 
Component to add a simple header.
*/
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail!: String

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail()
  }

}
