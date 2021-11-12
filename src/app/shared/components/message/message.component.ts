import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  onModalClose!: Subject<boolean>
  
  messages: string[] = []
  confirmModal: boolean = false

  constructor(
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.onModalClose = new Subject()
  }

  // emiting evento to handle user response
  onConfirm() {
    this.onModalClose.next(true)
    this.bsModalRef.hide()
  }

  // emiting evento to handle user response
  onCancel() {
    this.onModalClose.next(false)
    this.bsModalRef.hide()
  }

  // emiting evento to handle user response
  onClose() {
    this.onModalClose.next(true)
    this.bsModalRef.hide()
  }

}
