import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { MessageComponent } from '../components/message/message.component';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  bsModalRef?: BsModalRef

  constructor(
    private modalService: BsModalService
  ) { }

  showMessage(messages: string[], isConfirmModal: boolean = false) {
    const initialState: ModalOptions = {
      initialState: {
        messages,
        confirmModal: isConfirmModal
      }
    }

    this.bsModalRef = this.modalService.show(MessageComponent, initialState)

    return this.bsModalRef
  }
}
