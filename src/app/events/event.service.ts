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

  getEventById(eventId: string): any {
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

  deleteEvent(eventId: string) {
    return this.http.delete<UserEvent>(`${this.endpoint}/events/${eventId}`);
  }

  answerInvite(eventId: string, answer: string) {
    return this.http.post<UserEvent>(`${this.endpoint}/events/${eventId}/guests/answer`, {answer});
  }

  addGuests(eventId: string, guestList: any[]) {
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

  /*
    Function to set a leading zero if necessary.
  */
  private parseTwoDigits(num: number) {
    if (num < 10) {
      return `0${num}`
    }
    return `${num}`
  }

   /*
    Merge date and time form fields data.
  */
  mergeDateAndTime(date: Date, time: Date) {
    this.parseTwoDigits(date.getMonth())
    return new Date(
      `${date.getFullYear()}-\
        ${this.parseTwoDigits(date.getMonth()+1)}-\
        ${this.parseTwoDigits(date.getDate())} \
        ${this.parseTwoDigits(time.getHours())}:\
        ${this.parseTwoDigits(time.getMinutes())}:00`
    )
  }
}
