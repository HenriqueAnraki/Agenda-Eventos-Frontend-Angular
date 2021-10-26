import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { EventService } from '../services/event.service';

/*
  Component used to create and edit an event.
*/
@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit {
  pageTitle: string = 'Novo Evento';
  
  form!: FormGroup;
  eventData: any;
  bsBeginValue: any;
  bsEndValue: any;

  constructor(
    private formValidationService: FormValidationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private location: Location
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
      if (!this.eventData) {
        this.onCancel()
      }

      this.pageTitle = 'Modificiar Evento'
    }
    console.log(this.eventData)
  }

  ngOnInit(): void {
    this.handleEditPageData()

    /*
      Creating the form and setting the starting value if the user is in the /edit page.
    */
    this.form = this.formBuilder.group({
      desc: [ 
        this.eventData?.description ?? null, 
        Validators.required
      ],
      beginDate: [
        this.getDateWithouTZ(this.eventData?.begin),
        Validators.required
      ],
      beginTime: [
        this.getDateWithouTZ(this.eventData?.begin),
        Validators.required
      ],
      endDate: [
        this.getDateWithouTZ(this.eventData?.end), 
        Validators.required
      ],
      endTime: [
        this.getDateWithouTZ(this.eventData?.end),
        Validators.required
      ]
    })
  }

  showFieldError(field: string): boolean {
    return this.formValidationService.isFieldInvalid(field, this.form)
  }

  applyErrorCSS(field: string){
    return this.formValidationService.errorCSS(field, this.form)
  }

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
    return `${date.getFullYear()}-\
${this.parseTwoDigits(date.getMonth()+1)}-\
${this.parseTwoDigits(date.getDate())} \
${this.parseTwoDigits(time.getHours())}:\
${this.parseTwoDigits(time.getMinutes())}:00`
  }

  onSubmit() {
    if (this.form.valid) {
      // create event
      let beginDate: Date = this.form.value['beginDate']
      let beginTime: Date = this.form.value['beginTime']
      let endDate: Date = this.form.value['endDate']
      let endTime: Date = this.form.value['endTime']

      console.log(beginDate)
      console.log(beginTime)
      console.log(endDate)
      console.log(endTime)

      let begin = this.mergeDateAndTime(beginDate, beginTime)
      let end = this.mergeDateAndTime(endDate, endTime)

      console.log('finals')
      console.log(begin)
      console.log(end)
      
      console.log(this.form.value)

      this.eventData = { begin, end, description: this.form.value.desc, id: this.eventData?.id }

      // Logic to handle New and Edit in the same form
      this.eventService.saveEvent(this.eventData)
      .subscribe( (res) => {
        console.log(res);
        alert('Evento salvo!')
        // this.router.navigate(['/events']);
        this.location.back()
      })
    } else {
      this.formValidationService.verifyForm(this.form)
    }
  }

  onCancel() {
    // this.form.reset();
    // this.router.navigate(['/events'])
    this.location.back()
  }
}
