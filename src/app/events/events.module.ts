import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { EventsComponent } from './events.component';
import { EventService } from './event.service';
import { FormEventComponent } from './form-event/form-event.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  declarations: [
    EventsComponent,
    FormEventComponent
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    EventService
  ]
})
export class EventsModule { }
