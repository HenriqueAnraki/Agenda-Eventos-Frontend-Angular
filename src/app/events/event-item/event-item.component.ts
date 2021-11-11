import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventService } from '../services/event.service';
import { UserEvent } from '../userEvent';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() eventData!: UserEvent
  @Input() userEventIndex!: number
  @Input() userEmail!: string

  @Output() removeIndex: EventEmitter<number> = new EventEmitter()
  @Output() receiveAnswer: EventEmitter<any> = new EventEmitter()

  isCollapsed: boolean = true
  isGuestCollapsed: boolean = true

  constructor(
    private eventService: EventService
  ) { }

  ngOnInit(): void {
  }

  onEventClick() {
    console.log('ALLO DO '+ this.eventData._id)
    this.isCollapsed = !this.isCollapsed
  }

  onGuestClick() {
    this.isGuestCollapsed = !this.isGuestCollapsed
  }

  private emitEventToRemoveThisIndex(){
    this.removeIndex.emit(this.userEventIndex)
  }

  /*
    Remove an event and emit an event to refresh the list.
  */
  removeEvent(eventId: number, userEventIndex: number) {
    // how does this work here o.o
    console.log('tentando remover evento id: ' + eventId)
    console.log('tentando remover evento de index: ' + userEventIndex)

    this.eventService.deleteEvent(eventId)
      .subscribe( (res) => {
        console.log(res);
        this.emitEventToRemoveThisIndex()
      })
  }

  private answernEventInvite(eventId: number, userEventIndex: number, answer: string) {
    this.eventService.answerInvite(eventId, answer)
      .subscribe( (res) => {
        
        this.receiveAnswer.emit({
          userEventIndex: this.userEventIndex,
          answer
        })

        // console.log(res);
        // if (answer === 'refused') {
        //   this.emitEventToRemoveThisIndex()
        // } else {
        //   const userEvent = this.userEventsTest[userEventIndex]
        //   const guests = userEvent.guests
        //   for (let i = 0; i < guests.length; i++) {
        //     if (guests[i].user.email === this.userEmail) {
        //       userEvent.myStatus = answer
        //     }
        //     guests[i].status = this.translateStatus(answer); 
        //   }
        // }
      })
  }

  confirm(eventId: number, userEventIndex: number) {
    this.answernEventInvite(eventId, userEventIndex, 'confirmed')
    
  }

  refuse(eventId: number, userEventIndex: number) {
    this.answernEventInvite(eventId, userEventIndex, 'refused')
  }
    
}
