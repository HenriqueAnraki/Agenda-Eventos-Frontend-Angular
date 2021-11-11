import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { FormValidationService } from '../shared/services/form-validation.service';
import { UserFormService } from './user-form.service';



@NgModule({
  declarations: [
    UserFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    FormValidationService,
    UserFormService
  ]
})
export class UserFormModule { }
