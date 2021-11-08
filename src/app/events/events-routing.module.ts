import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormEventComponent } from './form-event/form-event.component';
import { EventsComponent } from './events.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { EventResolver } from './resolvers/event.resolver';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventsRoutingModule { }
