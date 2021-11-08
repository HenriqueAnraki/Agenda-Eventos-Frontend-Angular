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

  userEventsTest!: UserEvent[]

  userEmail!: string;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  translateStatus(status: String) {
    switch (status) {
      case 'refused':
        return 'Recusado'
      case 'confirmed':
        return 'Confirmado'
      case 'pending':
        return 'Em espera'
      default:
        return 'Em espera'
    }
  }

  ngOnInit(): void {
    this.eventService.getEvents()
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.error(error)

          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        console.log(res)
        this.userEventsTest = res

        for (let i = 0; i < this.userEventsTest.length; i++) {
          const guests = this.userEventsTest[i].guests;
          for (let j = 0; j < guests.length; j++) {
            guests[j].status = this.translateStatus(guests[j].status);
          }
        }
      })

    console.log('AQUI - USERINFO')
    console.log(this.authService.getUserEmail())

    this.userEmail = this.authService.getUserEmail()
  }

  logout() {
    this.authService.logout()
  }

  /*
    Remove an event and refresh the event list.
    The refresh is necessary because the list isn't storeded locally, since we are using pipe async.
  */
  removeEvent(eventId: number, userEventIndex: number) {
    console.log('tentando remover evento id: ' + eventId)
    console.log('tentando remover evento de index: ' + userEventIndex)

    this.eventService.deleteEvent(eventId)
      .subscribe( (res) => {
        console.log(res);
        this.userEventsTest.splice(userEventIndex, 1)
      })
  }

}
