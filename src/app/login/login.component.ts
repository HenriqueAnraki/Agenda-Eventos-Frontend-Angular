import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    })
  }

  onSubmit() {
    console.log(this.form)
  }


  // colocar em um serviço compartilhado
  isFieldValid(field: any): boolean {
    return !this.form.get(field)?.valid && (!!this.form.get(field)?.touched || !!this.form.get(field)?.dirty)
  }

}
