import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEventComponent } from './events/form-event/form-event.component';
import { EventsComponent } from './events/events.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { EventResolver } from './resovlers/event.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersComponent },
  {
    path: 'events', component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events/new', component: FormEventComponent,
    canActivate: [AuthGuard]// ,
    // resolve: {
    //   event: EventResolver
    // }
  },
  {
    path: 'events/editar/:id', component: FormEventComponent,
    canActivate: [AuthGuard]// ,
    // resolve: {
    //   event: EventResolver
    // }
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
