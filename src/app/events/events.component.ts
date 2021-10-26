import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { EventService } from './services/event.service';
import { UserEvent } from './userEvent';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

/*
  Component to show the user list of events
*/
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
    private authService: AuthService
  ) { }

  
  /*
    Get an updated list of events and handle error.
  */
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
  }

  logout() {
    this.authService.logout()
  }

  /*
    Remove an event and refresh the event list.
    The refresh is necessary because the list isn't storeded locally, since we are using pipe async.
  */
  removeEvent(eventId: number) {
    console.log('tentando remover evento id: ' + eventId)

    this.eventService.deleteEvent(eventId)
      .subscribe( (res) => {
        console.log(res);
        this.refreshEvents()
      })

  }

}
