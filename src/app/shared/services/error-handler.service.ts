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

  handleError(error: HttpErrorResponse) {
    if (error.status === 403){
      alert('Sessão inválida!')
      this.authService.logout()
    } else {
      let errorMessage = error.error.text ?? error.error
      if (!(typeof errorMessage === 'string')) {
        errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
      }
  
      alert(errorMessage);
    }
  }
}