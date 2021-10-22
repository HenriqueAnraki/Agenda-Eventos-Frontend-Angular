import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../shared/services/auth.service';
import { UserEvent } from './userEvent';

@Injectable()
export class EventService {
  private readonly endpoint = environment.apiEndpoint;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  getEvents(): any {
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    return this.http.get<UserEvent>(`${this.endpoint}/`, { headers });
  }

  createEvent(eventData: any) {
    console.log(eventData)
    let token = this.authService.getToken();

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`);

    return this.http.post<UserEvent>(`${this.endpoint}/`, eventData, { headers })
      .subscribe( (res) => {
        console.log(res);
        this.router.navigate(['/events']);
      },
      (error: HttpErrorResponse) => {
        console.log(error);

        let errorMessage = error.error.text ?? error.error
        if (!(typeof errorMessage === 'string')) {
          errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
        }

        alert(errorMessage);
      })
  }
}
