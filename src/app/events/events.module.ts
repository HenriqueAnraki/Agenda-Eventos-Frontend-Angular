import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './events.component';
import { LoginService } from '../login/login.service';
import { EventService } from './event.service';



@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    LoginService,
    EventService
  ]
})
export class EventsModule { }
