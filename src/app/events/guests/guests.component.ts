import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { UserFormService } from 'src/app/user-form/services/user-form.service';
import { EventService } from '../services/event.service';
import { UserEvent } from '../userEvent';

@Component({
  selector: 'app-guests',
  templateUrl: './guests.component.html',
  styleUrls: ['./guests.component.scss']
})
export class GuestsComponent implements OnInit {

  form!: FormGroup

  userEventData!: UserEvent

  guestList: any[] = []

  constructor(
    private formValidationService: FormValidationService,
    private router: ActivatedRoute,
    private formBuilder: FormBuilder,
    private location: Location,
    private userFormService: UserFormService,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.userEventData = this.router.snapshot.data['event']

    this.form = this.formBuilder.group({
      userEmail: [null, [Validators.required, Validators.email]]
    })
  }

  showFieldError(field: string): boolean {
    return this.formValidationService.isFieldInvalid(field, this.form)
  }

  applyErrorCSS(field: string){
    return this.formValidationService.errorCSS(field, this.form)
  }

  onSubmit() {
    console.log(this.guestList)
    // chamar endpoint para adicionar
    this.eventService.addGuests(this.userEventData._id, this.guestList)
      .subscribe( (res) => {
        // da msg e volta para pagina de eevntos
        console.log(res)
      })
  }

  onAdd() {
    if (this.form.valid) {
      this.userFormService.getUserIdByEmail(this.form.value['userEmail'])
        .subscribe( (res: any) => {
          console.log(res)
          if( !this.guestList.includes(res._id)) {
            this.guestList.push(res._id)
          }
        })
    } else {
      this.formValidationService.verifyForm(this.form)
    }
  }

  onCancel() {
    this.location.back()
  }

}
