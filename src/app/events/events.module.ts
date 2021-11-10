import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { EventsComponent } from './events.component';
import { EventService } from './services/event.service';
import { FormEventComponent } from './form-event/form-event.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';
import { GuestsComponent } from './guests/guests.component';
import { EventItemComponent } from './event-item/event-item.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  declarations: [
    EventsComponent,
    FormEventComponent,
    GuestsComponent,
    EventItemComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    // ngx-bootstrap dependencies
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    EventService
  ]
})
export class EventsModule { }
