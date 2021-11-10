import { Component, Input, OnInit } from '@angular/core';
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

  isCollapsed: boolean = true
  isGuestCollapsed: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onEventClick() {
    console.log('ALLO DO '+ this.eventData._id)
    this.isCollapsed = !this.isCollapsed
  }

  onGuestClick() {
    this.isGuestCollapsed = !this.isGuestCollapsed
  }

  /*
    Remove an event and refresh the event list.
    The refresh is necessary because the list isn't storeded locally, since we are using pipe async.
  */
  removeEvent(eventId: number, userEventIndex: number) {
    // how does this work here o.o
    console.log('tentando remover evento id: ' + eventId)
    console.log('tentando remover evento de index: ' + userEventIndex)

    // this.eventService.deleteEvent(eventId)
    //   .subscribe( (res) => {
    //     console.log(res);
    //     this.userEventsTest.splice(userEventIndex, 1)
    //   })
  }

  private answernEventInvite(eventId: number, userEventIndex: number, answer: string) {
    // this.eventService.answerInvite(eventId, answer)
    //   .subscribe( (res) => {

    //     console.log(res);
    //     if (answer === 'refused') {
    //       this.userEventsTest.splice(userEventIndex, 1)
    //     } else {
    //       const userEvent = this.userEventsTest[userEventIndex]
    //       const guests = userEvent.guests
    //       for (let i = 0; i < guests.length; i++) {
    //         if (guests[i].user.email === this.userEmail) {
    //           userEvent.myStatus = answer
    //         }
    //         guests[i].status = this.translateStatus(answer); 
    //       }
    //     }
    //   })
  }

  confirm(eventId: number, userEventIndex: number) {
    this.answernEventInvite(eventId, userEventIndex, 'confirmed')
    
  }

  refuse(eventId: number, userEventIndex: number) {
    this.answernEventInvite(eventId, userEventIndex, 'refused')
  }
    
}
