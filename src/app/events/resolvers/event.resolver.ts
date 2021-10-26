import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventService } from '../services/event.service';
import { UserEvent } from '../userEvent';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<UserEvent> {
  constructor(
    private eventService: EventService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    if (route.params && route.params.id) {
      console.log('resolver')
      return this.eventService.getEventById(route.params.id);
    }

    return of({
      id: null,
      description: null,
      begin: new Date(),
      end: new Date(),
      userId: null
    });
  }
}
