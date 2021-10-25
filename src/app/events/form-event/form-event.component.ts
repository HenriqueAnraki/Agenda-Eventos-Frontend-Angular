import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { FormValidationService } from 'src/app/shared/services/form-validation.service';
import { EventService } from '../event.service';

@Component({
  selector: 'app-form-event',
  templateUrl: './form-event.component.html',
  styleUrls: ['./form-event.component.css']
})
export class FormEventComponent implements OnInit {
  form!: FormGroup;
  eventData: any;
  bsBeginValue: any;
  bsEndValue: any;

  constructor(
    private formValidationService: FormValidationService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private location: Location
  ) { }

  getPreDateValue(date: any) {
    console.log('AQUI')
    console.log(date)
    if (date) {
      return new Date(date.substring(0, date.length - 1))
    }
    // return null
    return new Date()
  }

  ngOnInit(): void {
    /*
    // PROBLEMA: RESETA NO F5.
    // Fazer solução 'ruim'. => pegar id e fazer http get
      // resolver -> guarda de rota
        // retorna um evento
    // Falta fazer:
        -mduar titulo d pagina
          ->variavel com {{ }} no template
        -mudar botão da pagina
          ->ter os dois botoes e dar hdden em um deles?
            ->ou da pra mudar o texto E o método click?
    */
    this.eventData = history.state.data;

    if (!this.eventData && this.router.url.includes('/editar')) {
      this.onCancel()
    }
    // console.log(this.router.url)

    console.log(this.eventData)


    // substring method is used to cut off 'Z' that represents UTC time from the dateTime string
    // This is done so JS don't forcefully apply the local TZ.
    this.form = this.formBuilder.group({
      desc: [ 
        this.eventData?.description ?? null, 
        Validators.required
      ],
      beginDate: [
        this.getPreDateValue(this.eventData?.begin),
        Validators.required
      ],
      beginTime: [
        // this.eventData?.begin.substring(0, this.eventData?.begin.length - 1) ?? new Date(),
        this.getPreDateValue(this.eventData?.begin),
        Validators.required
      ],
      endDate: [
        this.getPreDateValue(this.eventData?.end), 
        Validators.required
      ],
      endTime: [
        // this.eventData?.end.substring(0, this.eventData?.begin.length - 1) ?? new Date(), 
        this.getPreDateValue(this.eventData?.end),
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
      console.log(beginTime)
      console.log(endDate)
      console.log(endTime)

      let begin = this.mergeDateAndTime(beginDate, beginTime)
      let end = this.mergeDateAndTime(endDate, endTime)

      console.log('finals')
      console.log(begin)
      console.log(end)
      
      console.log(this.form.value)

      this.eventData = { begin, end, description: this.form.value.desc, id: this.eventData.id }

      // this.eventService.createEvent()
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
