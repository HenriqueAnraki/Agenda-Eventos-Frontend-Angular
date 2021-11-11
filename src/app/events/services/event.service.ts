import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserEvent } from '../userEvent';

/*
  Service to handle (user) events related requests and logic.
*/
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly endpoint = environment.apiEndpoint;

  constructor(
    private http: HttpClient
  ) { }

  getEvents(): any {
    return this.http.get<UserEvent>(`${this.endpoint}/events`).pipe(take(1));
  }

  getEventById(eventId: number): any {
    return this.http.get<UserEvent>(`${this.endpoint}/events/${eventId}`).pipe(take(1));
  }

  createEvent(eventData: any) {
    return this.http.post<UserEvent>(`${this.endpoint}/events`, eventData).pipe(take(1));
  }

  updateEvent(eventData: any) {
    return this.http.put<UserEvent>(`${this.endpoint}/events/${eventData.id}`, eventData).pipe(take(1));
  }

  // Logic to handle GET and PUT in the same form
  saveEvent(eventData: UserEvent) {
    if (eventData.id) {
      return this.updateEvent(eventData)
    }
    return this.createEvent(eventData)
  }

  deleteEvent(eventId: number) {
    return this.http.delete<UserEvent>(`${this.endpoint}/events/${eventId}`).pipe(take(1));
  }

  answerInvite(eventId: number, answer: string) {
    return this.http.post<UserEvent>(`${this.endpoint}/events/${eventId}/guests/answer`, {answer}).pipe(take(1));
  }

  addGuests(eventId: number, guestList: any[]) {
    return this.http.post<UserEvent>(`${this.endpoint}/events/${eventId}/guests`, {
      "guests": guestList
    }).pipe(take(1));
  }

  // Function to translate guest status
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
}
