import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { EventService } from './event.service';
import { UserEvent } from './userEvent';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  // userEvents!: UserEvent[];
  userEvents$!: Observable<UserEvent[]>;
  error$ = new Subject<boolean>();

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.eventService.getEvents()
    //   .subscribe( (res: UserEvent[]) => {
    //     console.log('res')
    //     console.log(res)
    //     this.userEvents = res
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error)
    //     alert(error.error.text ?? error.error)
    //   })

    this.userEvents$ = this.eventService.getEvents()
      .pipe(
        catchError( error => {
          console.error(error)
          alert(error.error.text ?? error.error)
          this.error$.next(true);
          return empty();
        })
      )
    console.log('userE: ' + this.userEvents$)
  }

  logout() {
    this.authService.logout()
  }

  addEvent() {

  }

}
