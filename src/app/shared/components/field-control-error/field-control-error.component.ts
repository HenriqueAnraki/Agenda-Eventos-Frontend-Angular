import { Component, Input, OnInit } from '@angular/core';

/*
Component with form error message using boothstrap.

'd-block' is necessary because the component encapsulate the html code in another tag,
 which contradict with the normal bootstrap behabior.
*/
@Component({
  selector: 'app-field-control-error',
  templateUrl: './field-control-error.component.html',
  styleUrls: ['./field-control-error.component.css']
})
export class FieldControlErrorComponent implements OnInit {

  @Input() showError: boolean = false;
  @Input() errorMsg: string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
