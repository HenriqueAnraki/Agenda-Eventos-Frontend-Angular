import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  form!: FormGroup;
  isMeridian: boolean = false;

  constructor(
    private formValidationService: FormValidationService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      desc: [null, Validators.required],
      beginDate: [null, Validators.required],
      beginTime: [new Date(), Validators.required],
      endDate: [null, Validators.required],
      endTime: [new Date(), Validators.required]
    })
  }

  showFieldError(field: string): boolean {
    return this.formValidationService.isFieldInvalid(field, this.form)
  }

  applyErrorCSS(field: string){
    return this.formValidationService.errorCSS(field, this.form)
  }

  parseTwoDigits(num: number) {
    if (num < 10) {
      return `0${num}`
    }
    return `${num}`
  }

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

      let begin = this.mergeDateAndTime(beginDate, beginTime)
      let end = this.mergeDateAndTime(endDate, endTime)

      console.log('finals')
      console.log(begin)
      console.log(end)
      
      console.log(this.form.value)

      this.eventService.createEvent({ begin, end, description: this.form.value.desc })
    } else {
      this.formValidationService.verifyForm(this.form)
    }
  }
}
