import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersComponent },
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then( m => m.EventsModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
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
