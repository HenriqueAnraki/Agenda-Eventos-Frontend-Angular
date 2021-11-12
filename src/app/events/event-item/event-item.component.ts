import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { EventService } from '../event.service';
import { UserEvent } from '../userEvent';

@Component({
  selector: 'app-event-item',
  templateUrl: './event-item.component.html',
  styleUrls: ['./event-item.component.scss']
})
export class EventItemComponent implements OnInit {
  @Input() eventData!: UserEvent
  @Input() userEventIndex: number = 0
  @Input() userEmail: string = ''
  @Input() shouldCollapse: boolean = true

  @Output() removeIndex: EventEmitter<number> = new EventEmitter()
  @Output() receiveAnswer: EventEmitter<any> = new EventEmitter()

  isExtraDataCollapsed: boolean = true
  isGuestCollapsed: boolean = true

  subscription!: Subscription

  constructor(
    private eventService: EventService,
    private messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.isExtraDataCollapsed = this.shouldCollapse
    this.isGuestCollapsed = this.shouldCollapse
  }

  onEventClick() {
    if (this.shouldCollapse){
      this.isExtraDataCollapsed = !this.isExtraDataCollapsed
    }
  }

  onGuestClick() {
    if (this.shouldCollapse){
      this.isGuestCollapsed = !this.isGuestCollapsed
    }
  }

  private emitEventToRemoveThisIndex(){
    this.removeIndex.emit(this.userEventIndex)
  }

  /*
    Remove an event and emit an event to refresh the list.
  */
  removeEvent(eventId: string, userEventIndex: number) {
    // Confirming if user really wants to remove
    const bsModalRef: BsModalRef = this.messagesService.showMessage(['Tem certeza que deseja remover esse evento?'], true)
    this.subscription = bsModalRef.content.onModalClose
      .pipe(take(1))
      .subscribe((confirmation: any) => {

        if (confirmation) {
          this.eventService.deleteEvent(eventId)
            .subscribe( (res) => {
              this.emitEventToRemoveThisIndex()
            })
        }
      })

  }

  /**
   * Answer Event and emit an event to update the lis.
   */
  private answernEventInvite(eventId: string, userEventIndex: number, answer: string) {
    this.eventService.answerInvite(eventId, answer)
      .subscribe( (res) => {
        
        this.receiveAnswer.emit({
          userEventIndex: this.userEventIndex,
          answer
        })
      })
  }

  confirm(eventId: string, userEventIndex: number) {
    this.answernEventInvite(eventId, userEventIndex, 'confirmed')
    
  }

  refuse(eventId: string, userEventIndex: number) {
    this.answernEventInvite(eventId, userEventIndex, 'refused')
  }
}
