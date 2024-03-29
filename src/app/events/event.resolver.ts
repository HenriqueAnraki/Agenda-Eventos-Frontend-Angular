import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventService } from './event.service';
import { UserEvent } from './userEvent';

/*
  Resolver to fetch an Event data
*/
@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<UserEvent> {
  constructor(
    private eventService: EventService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (route.params && route.params.id) {
      return this.eventService.getEventById(route.params.id);
    }

    return of({
      id: null,
      description: null,
      start: new Date(),
      end: new Date(),
      userId: null
    });
  }
}
