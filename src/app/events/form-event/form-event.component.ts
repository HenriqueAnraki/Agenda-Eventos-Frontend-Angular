import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { EventService } from '../event.service';

/*
  Component used to create and edit an event.
*/
@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.scss']
})
export class FormEventComponent implements OnInit {
  pageTitle: string = 'Novo Evento';
  
  form!: FormGroup;
  eventData: any;
  bsstartValue: any;
  bsEndValue: any;

  subscription!: Subscription

  constructor(
    private formValidationService: FormValidationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private location: Location,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) { }

  /*
    Function to process dates sent by the server.
    Receive a UTC date, remove the 'Z' at the final and generete a new date.
    This is needed because JS automatically converts the date to the local TZ, which could cause unwanted behaviors.
  */
  getDateWithouTZ(date: any) {
    console.log('AQUI')
    console.log(date)
    if (date) {
      return new Date(date.substring(0, date.length - 1))
    }
    return new Date()
  }

  /*
    Function to guarantee that the edit data is present.
    Since we are using router state to send the data, there are possibilities to lose this data
     (like manual refreshing the page).
    In case the data was lost, the user is redirected to the /events page.
  */
  handleEditPageData() {
    this.eventData = history.state.data;

    if (this.router.url.includes('/editar')) {
      // chamar request
      if (!this.eventData) {
        this.onCancel()
      }

      this.pageTitle = 'Modificiar Evento'
    }
    console.log(this.eventData)
  }

  ngOnInit(): void {
    // this.handleEditPageData()

    this.eventData = this.route.snapshot.data['event']
    console.log('evento do guard')
    console.log(this.eventData)

    /*
      Creating the form and setting the starting value if the user is in the /edit page.
    */
    this.form = this.formBuilder.group({
      desc: [ 
        // this.eventData?.description ?? null,
        this.eventData.description,
        Validators.required
      ],
      startDate: [
        // this.getDateWithouTZ(this.eventData?.startTZ),
        new Date(this.eventData.start),
        Validators.required
      ],
      startTime: [
        // this.getDateWithouTZ(this.eventData?.startTZ),
        new Date(this.eventData.start),
        Validators.required
      ],
      endDate: [
        // this.getDateWithouTZ(this.eventData?.endTZ),
        new Date(this.eventData.end),
        Validators.required
      ],
      endTime: [
        // this.getDateWithouTZ(this.eventData?.endTZ),
        new Date(this.eventData.end),
        Validators.required
      ]
    })
  }

  // Getters to access form fields at the template
  get desc() { return this.form.get('desc'); }
  get startDate() { return this.form.get('startDate'); }
  get startTime() { return this.form.get('startTime'); }
  get endDate() { return this.form.get('endDate'); }
  get endTime() { return this.form.get('endTime'); }

  /*
    Function to set a leading zero if necessary.
  */
  parseTwoDigits(num: number) {
    if (num < 10) {
      return `0${num}`
    }
    return `${num}`
  }

  /*
    Merge date and time form fields data.
  */
  mergeDateAndTime(date: Date, time: Date) {
    this.parseTwoDigits(date.getMonth())
    return new Date(
      `${date.getFullYear()}-\
        ${this.parseTwoDigits(date.getMonth()+1)}-\
        ${this.parseTwoDigits(date.getDate())} \
        ${this.parseTwoDigits(time.getHours())}:\
        ${this.parseTwoDigits(time.getMinutes())}:00`
    )
  }

  concludeSaveOperation() {
    this.messagesService.showMessage(['Evento salvo!'])
    this.location.back()
  }

  onSubmit() {
    if (this.form.valid) {
      // create event
      let startDate: Date = this.form.value['startDate']
      let startTime: Date = this.form.value['startTime']
      let endDate: Date = this.form.value['endDate']
      let endTime: Date = this.form.value['endTime']

      let start = this.mergeDateAndTime(startDate, startTime)
      let end = this.mergeDateAndTime(endDate, endTime)

      console.log(start)
      console.log(end)

      this.eventData = { start, end, description: this.form.value.desc, id: this.eventData?.id }

      // Logic to handle New and Edit in the same form
      if (this.eventData.id) {
        // Confirming if user really wants to update
        const bsModalRef: BsModalRef = this.messagesService.showMessage(['Tem certeza que deseja modificar esse evento?'], true)
        this.subscription = bsModalRef.content.onModalClose
          .pipe(take(1))
          .subscribe((confirmation: any) => {
         
            if (confirmation) {
              this.eventService.updateEvent(this.eventData)
                .subscribe( (res) => {
                  console.log(res);
                  this.concludeSaveOperation()
                })
            }
          })
      } else {
        // create
        this.eventService.createEvent(this.eventData)
          .subscribe( (res) => {
            console.log(res);
            this.concludeSaveOperation()
          })
      }
    } else {
      this.formValidationService.verifyForm(this.form)
    }
  }

  onCancel() {
    if (this.form.dirty) {
      // Confirming if user really wants to cancel
      const bsModalRef: BsModalRef = this.messagesService.showMessage(['Você perdera todas as modificações. Tem certeza que deseja cancelar?'], true)
      this.subscription = bsModalRef.content.onModalClose
        .pipe(take(1))
        .subscribe((confirmation: any) => {
        
          if (confirmation) {
            this.location.back()
          }
        })
    } else {
      this.location.back()
    }
  }
}
