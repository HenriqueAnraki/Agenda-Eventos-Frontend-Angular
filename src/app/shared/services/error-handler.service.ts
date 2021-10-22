import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  handleError(error: HttpErrorResponse) {
    // não está funcionando... pq?
    let errorMessage = error.error.text ?? error.error
    if (!(typeof errorMessage === 'string')) {
      errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
    }

    alert(errorMessage);
  }
}
