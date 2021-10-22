import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { empty, Observable, Subject } from 'rxjs';
import { EventService } from './event.service';
import { UserEvent } from './userEvent';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

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
    private authService: AuthService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  refreshEvents() {
    this.userEvents$ = this.eventService.getEvents()
      .pipe(
        catchError( (error: HttpErrorResponse) => {
          console.error(error)
          // alert(error.error.text ?? error.error)

          this.errorHandlerService.handleError(error)
          // let errorMessage = error.error.text ?? error.error
          // if (!(typeof errorMessage === 'string')) {
          //   errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
          // }

          // alert(errorMessage);

          this.error$.next(true);
          return empty();
        })
      )
  }

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

    this.refreshEvents()

    console.log('userE: ' + this.userEvents$)
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
