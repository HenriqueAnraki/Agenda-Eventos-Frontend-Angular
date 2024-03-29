import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldControlErrorComponent } from './components/field-control-error/field-control-error.component';
import { FormDebugComponent } from './components/form-debug/form-debug.component';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { MessageComponent } from './components/message/message.component';

/*
General Module exporting all the general components.
*/
@NgModule({
  declarations: [
    FieldControlErrorComponent,
    FormDebugComponent,
    PageTitleComponent,
    MessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FieldControlErrorComponent,
    FormDebugComponent,
    PageTitleComponent
  ]
})
export class SharedModule { }
