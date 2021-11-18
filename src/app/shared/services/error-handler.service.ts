import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { UserFormComponent } from 'src/app/user-form/user-form.component';
import { MessageComponent } from '../components/message/message.component';
import { AuthService } from './auth.service';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private authService: AuthService,
    private messagesService: MessagesService
  ) { }


  /*
    Generic handler for http error response.
  */
  handleError(error: HttpErrorResponse) {
    if (error.status === HttpStatusCode.Unauthorized){
      this.messagesService.showMessage(['Sessão inválida!'])

      this.authService.logout()
    } else {
      let errorMessage = [error.error?.message ?? error.error ?? error.message]

      if (!(typeof errorMessage[0] === 'string')) {
        errorMessage[0] = "Um erro ocorreu! Entre em contato com nossa equipe!"
      } else {
        const formErrors = error.error?.options?.errors

        if (formErrors) {
          for (let i = 0; i < formErrors.length; i++) {
            errorMessage.push(`${error.error.options.errors[i].message}`)
          }
        }
      }
  
      this.messagesService.showMessage(errorMessage)
    }
  }
}
