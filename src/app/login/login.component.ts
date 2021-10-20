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

    if (this.form.valid) {
      console.log('tudo certo!')
      // fazer login
    } else {
      console.log('Form Inválido!')
      this.verifyForm(this.form)
    }
  }
  
  // colocar em um serviço compartilhado
  verifyForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach( field => {
      const control = formGroup.get(field);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.verifyForm(control);
      }
    });
  }

  showFieldError(field: string): boolean {
    return !this.form.get(field)?.valid && (!!this.form.get(field)?.touched || !!this.form.get(field)?.dirty)
  }

}
