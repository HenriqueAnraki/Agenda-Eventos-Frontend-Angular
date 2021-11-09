import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormEventComponent } from './form-event/form-event.component';
import { EventsComponent } from './events.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { EventResolver } from './resolvers/event.resolver';
import { GuestsComponent } from './guests/guests.component';

const eventsRoutes: Routes = [
  {
    path: '', component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new', component: FormEventComponent,
    canActivate: [AuthGuard],
    resolve: {
      event: EventResolver
    }
  },
  {
    path: 'editar/:id', component: FormEventComponent,
    canActivate: [AuthGuard],
    resolve: {
      event: EventResolver
    }
  },
  {
    path: ':id/guests', component: GuestsComponent,
    canActivate: [AuthGuard],
    resolve: {
      event: EventResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
