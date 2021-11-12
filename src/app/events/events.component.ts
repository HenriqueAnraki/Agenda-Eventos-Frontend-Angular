import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { EventService } from './event.service';
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
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  error$ = new Subject<boolean>();

  userEvents!: UserEvent[]

  userEmail!: string;

  constructor(
    private eventService: EventService,
    private authService: AuthService
  ) { }

  // Translating guests status to portuguese and setting user own status for easy access later
  translateAllGuestsStatus() {
    for (let i = 0; i < this.userEvents.length; i++) {
      const userEvent = this.userEvents[i]
      const guests = userEvent.guests;

      for (let j = 0; j < guests.length; j++) {
        if (guests[j].user.email === this.userEmail) {
          userEvent.myStatus = guests[j].status
        }

        guests[j].status = this.eventService.translateStatus(guests[j].status);
      }
    }
  }

  ngOnInit(): void {
    this.userEmail = this.authService.getUserEmail()

    this.eventService.getEvents()
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.error(error)

          // To show message on page
          this.error$.next(true);
          return EMPTY;
        })
      )
      .subscribe((res: any) => {
        this.userEvents = res

        this.translateAllGuestsStatus()
      })
  }

  logout() {
    this.authService.logout()
  }

  /*
    Rrefresh the event list after removing an event.
    Catch the event from the @Output removeIndex from app-event-item
  */
  onRemoveIndex(index: number){
    this.userEvents.splice(index, 1)
  }

  /*
    Handles invite answer.
    Catch the event from the @Output receiveAnswer from app-event-item
  */
  onReceiveAnswer(answerData: any){
    const { answer, userEventIndex } = answerData

    if (answer === 'refused') {
      this.onRemoveIndex(userEventIndex)
    } else {
      // If positive answer, update stats
      const userEvent = this.userEvents[userEventIndex]
      const guests = userEvent.guests
      for (let i = 0; i < guests.length; i++) {
        if (guests[i].user.email === this.userEmail) {
          userEvent.myStatus = answer
        }
        guests[i].status = this.eventService.translateStatus(answer); 
      }
    }
  }

}
