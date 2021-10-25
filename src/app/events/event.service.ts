import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, empty } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { ErrorHandlerService } from '../shared/services/error-handler.service';
import { UserEvent } from './userEvent';

@Injectable()
export class EventService {
  private readonly endpoint = environment.apiEndpoint;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) { }

  getEvents(): any {
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    return this.http.get<UserEvent>(`${this.endpoint}/`, { headers }).pipe(take(1));
  }

  getEventById(eventId: number): any {
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    // [todo] create a router for get by id
    return this.http.get<UserEvent>(`${this.endpoint}/event/${eventId}`, { headers }).pipe(take(1));
  }

  private createEvent(eventData: any) {
    console.log(eventData)
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    return this.http.post<UserEvent>(`${this.endpoint}/`, eventData, { headers })
      .pipe(
        take(1),
        catchError(
          (error: HttpErrorResponse) => {
            console.log(error);

            this.errorHandlerService.handleError(error)
            return EMPTY
          }
        )
      )
  }

  private updateEvent(eventData: any) {
    console.log(eventData)
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    return this.http.patch<UserEvent>(`${this.endpoint}/${eventData.id}`, eventData, { headers })
      .pipe(
        take(1),
        catchError(
          (error: HttpErrorResponse) => {
            console.log(error);

            this.errorHandlerService.handleError(error)
            return EMPTY
          }
        )
      )
  }

  saveEvent(eventData: UserEvent) {
    if (eventData.id) {
      return this.updateEvent(eventData)
    }
    return this.createEvent(eventData)
  }

  deleteEvent(eventId: number) {
    console.log(eventId)
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    return this.http.delete<UserEvent>(`${this.endpoint}/${eventId}`, { headers })
      .pipe(
        take(1),
        catchError(
          (error: HttpErrorResponse) => {
            console.log(error);

            this.errorHandlerService.handleError(error)
            return EMPTY
          }
        )
      )
  }
}
