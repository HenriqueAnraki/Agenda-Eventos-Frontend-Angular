import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormValidationService } from '../shared/services/form-validation.service';
import { RouterModule } from '@angular/router';
import { UserService } from './user.service';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    FormValidationService,
    UserService
  ]
})
export class UsersModule { }
