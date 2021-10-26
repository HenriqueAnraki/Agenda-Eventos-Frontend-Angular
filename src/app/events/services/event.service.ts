import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserEvent } from '../userEvent';

@Injectable()
export class EventService {
  private readonly endpoint = environment.apiEndpoint;

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): any {
    return this.http.get<UserEvent>(`${this.endpoint}/`).pipe(take(1));
  }

  getEventById(eventId: number): any {
    // [todo] create a router for get by id
    return this.http.get<UserEvent>(`${this.endpoint}/event/${eventId}`).pipe(take(1));
  }

  private createEvent(eventData: any) {
    return this.http.post<UserEvent>(`${this.endpoint}/`, eventData)
      .pipe(
        take(1)
      )
  }

  private updateEvent(eventData: any) {
    return this.http.patch<UserEvent>(`${this.endpoint}/${eventData.id}`, eventData)
      .pipe(
        take(1)
      )
  }

  saveEvent(eventData: UserEvent) {
    if (eventData.id) {
      return this.updateEvent(eventData)
    }
    return this.createEvent(eventData)
  }

  deleteEvent(eventId: number) {
    return this.http.delete<UserEvent>(`${this.endpoint}/${eventId}`)
      .pipe(
        take(1)
      )
  }
}
