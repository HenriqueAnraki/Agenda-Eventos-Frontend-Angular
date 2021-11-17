import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map, switchMap } from 'rxjs/operators';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { UserFormService } from 'src/app/user-form/user-form.service';
import { EventService } from '../event.service';
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
    private eventService: EventService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.userEventData = this.router.snapshot.data['event']
    const guests = this.userEventData.guests;

    // for (let i = 0; i < guests.length; i++) {
    //   const guest = guests[i]
    //   guest.status = this.eventService.translateStatus(guest.status);

    //   // populate the guest list with actual guests
    //   this.guestList.push(guest.user._id)
    // }

    this.form = this.formBuilder.group({
      userEmail: [null, [Validators.required, Validators.email]]
    })
  }

  // Getter to access form fields at the template
  get userEmail() { return this.form.get('userEmail'); }

  onSubmit() {
    this.eventService.addGuests(this.userEventData._id, this.guestList)
      .subscribe( (res) => {
        this.messagesService.showMessage(['Usuários foram convidados!'])
        this.location.back()
      })
  }

  onAdd() {
    if (this.form.valid) {
      this.userFormService.getUserIdByEmail(this.form.value['userEmail'])
        .subscribe( (res: any) => {
          if(this.userEventData.owner._id != res._id && !this.guestList.includes(res._id)) {
            this.guestList.push(res._id)

            // Adding into userEventData guests so the interface updates
            this.userEventData.guests.push({
              user: {
                _id: res._id,
                email: res.email
              },
              status: 'Em espera'
            })
          }

          this.form.reset()
        })

    } else {
      this.formValidationService.verifyForm(this.form)
    }
  }

  onCancel() {
    this.location.back()
  }

}
