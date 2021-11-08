import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private authService: AuthService
  ) { }

  /*
    Generic handler for http error response.
  */
  handleError(error: HttpErrorResponse) {
    if (error.status === 403){
      alert('Sessão inválida!')
      this.authService.logout()
    } else {
      // let errorMessage = error.error.text ?? error.error
      let errorMessage = error.error.message ?? error.error
      if (!(typeof errorMessage === 'string')) {
        errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
      } else {
        const formErrors = error.error.options?.errors
        if (formErrors) {
          for (let i = 0; i < formErrors.length; i++) {
            errorMessage += `\n${error.error.options.errors[i].message}`
          }
        }
      }
  
      alert(errorMessage);
    }
  }
}
