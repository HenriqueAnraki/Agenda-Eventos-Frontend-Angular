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
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private location: Location,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.eventData = this.route.snapshot.data['event']

    /*
      Creating the form and setting the starting value if the user is in the /edit page.
    */
    this.form = this.formBuilder.group({
      desc: [
        this.eventData.description,
        Validators.required
      ],
      startDate: [
        new Date(this.eventData.start),
        Validators.required
      ],
      startTime: [
        new Date(this.eventData.start),
        Validators.required
      ],
      endDate: [
        new Date(this.eventData.end),
        Validators.required
      ],
      endTime: [
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

  concludeSaveOperation() {
    this.messagesService.showMessage(['Evento salvo!'])
    this.location.back()
  }

  formatEventData() {
    let startDate: Date = this.form.value['startDate']
    let startTime: Date = this.form.value['startTime']
    let endDate: Date = this.form.value['endDate']
    let endTime: Date = this.form.value['endTime']

    let start = this.eventService.mergeDateAndTime(startDate, startTime)
    let end = this.eventService.mergeDateAndTime(endDate, endTime)

    return { start, end, description: this.form.value.desc, id: this.eventData?.id }
  }

  onSubmit() {
    if (this.form.valid) {
      // create event
      this.eventData = this.formatEventData()

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
                  this.concludeSaveOperation()
                })
            }
          })
      } else {
        
        // create
        this.eventService.createEvent(this.eventData)
          .subscribe( (res) => {
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
