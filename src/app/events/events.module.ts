import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { EventsComponent } from './events.component';
import { LoginService } from '../login/login.service';
import { EventService } from './event.service';
import { CreateEventComponent } from './create-event/create-event.component';
import { RouterModule } from '@angular/router';
import { FieldControlErrorComponent } from '../shared/components/field-control-error/field-control-error.component';
import { FormDebugComponent } from '../shared/components/form-debug/form-debug.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EventsComponent,
    CreateEventComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  providers: [
    LoginService,
    EventService
  ]
})
export class EventsModule { }
