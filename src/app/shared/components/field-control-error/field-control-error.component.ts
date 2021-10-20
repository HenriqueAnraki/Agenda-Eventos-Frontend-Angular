import { Component, Input, OnInit } from '@angular/core';

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
