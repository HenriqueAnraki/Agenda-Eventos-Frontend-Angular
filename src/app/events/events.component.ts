import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { EventService } from './event.service';
import { UserEvent } from './userEvent';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  userEvents$!: Observable<UserEvent[]>;
  error$ = new Subject<boolean>();

  constructor(
    private eventService: EventService,
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  refreshEvents() {
    this.userEvents$ = this.eventService.getEvents()
      .pipe(
        tap(res => console.log(res)),
        catchError( (error: HttpErrorResponse) => {
          console.error(error)

          this.error$.next(true);
          return EMPTY;
        })
      )
  }

  ngOnInit(): void {
    this.refreshEvents()

    console.log('userE: ')
    console.log('this.userEvents')
  }

  logout() {
    this.authService.logout()
  }

  removeEvent(eventId: number) {
    console.log('tentando remover evento id: ' + eventId)

    this.eventService.deleteEvent(eventId)
      .subscribe( (res) => {
        console.log(res);
        this.refreshEvents()
      })

  }

}
