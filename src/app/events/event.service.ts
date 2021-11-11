import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserEvent } from './userEvent';

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
    return this.http.get<UserEvent>(`${this.endpoint}/events`);
  }

  getEventById(eventId: number): any {
    return this.http.get<UserEvent>(`${this.endpoint}/events/${eventId}`);
  }

  createEvent(eventData: any) {
    return this.http.post<UserEvent>(`${this.endpoint}/events`, eventData);
  }

  updateEvent(eventData: any) {
    return this.http.put<UserEvent>(`${this.endpoint}/events/${eventData.id}`, eventData);
  }

  // Logic to handle GET and PUT in the same form
  saveEvent(eventData: UserEvent) {
    if (eventData.id) {
      return this.updateEvent(eventData)
    }
    return this.createEvent(eventData)
  }

  deleteEvent(eventId: number) {
    return this.http.delete<UserEvent>(`${this.endpoint}/events/${eventId}`);
  }

  answerInvite(eventId: number, answer: string) {
    return this.http.post<UserEvent>(`${this.endpoint}/events/${eventId}/guests/answer`, {answer});
  }

  addGuests(eventId: number, guestList: any[]) {
    return this.http.post<UserEvent>(`${this.endpoint}/events/${eventId}/guests`, {
      "guests": guestList
    });
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
