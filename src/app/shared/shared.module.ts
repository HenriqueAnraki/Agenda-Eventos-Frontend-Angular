import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldControlErrorComponent } from './components/field-control-error/field-control-error.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';



@NgModule({
  declarations: [
    FieldControlErrorComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FieldControlErrorComponent,
    FormDebugComponent
  ]
})
export class SharedModule { }
