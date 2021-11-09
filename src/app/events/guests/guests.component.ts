import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { UserEvent } from '../userEvent';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.css']
})
export class GuestsComponent implements OnInit {

  form!: FormGroup

  userEventData!: UserEvent

  constructor(
    private formValidationService: FormValidationService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.userEventData = this.router.snapshot.data['event']

    this.form = this.formBuilder.group({
      userEmail: [null, Validators.required]
    })
  }

  showFieldError(field: string): boolean {
    return this.formValidationService.isFieldInvalid(field, this.form)
  }

  applyErrorCSS(field: string){
    return this.formValidationService.errorCSS(field, this.form)
  }

  onSubmit() {

  }

  onCancel() {
    this.location.back()
  }

}
