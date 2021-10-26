import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorHandlerService: ErrorHandlerService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('error INTERCEPTOR')

    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) => {
          console.log('errro inside interceptor');
          console.log(error);

          this.errorHandlerService.handleError(error)
          return throwError(error)
        }
      )
    )
  }
}
