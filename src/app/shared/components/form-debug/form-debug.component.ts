import { Component, Input, OnInit } from '@angular/core';

/*
Component to help debug forms. Show some forms info at the template.
*/
@Component({
  selector: 'app-form-debug',
  templateUrl: './form-debug.component.html',
  styleUrls: ['./form-debug.component.css']
})
export class FormDebugComponent implements OnInit {

  @Input() form: any;

  constructor() { }

  ngOnInit(): void {
  }

}
