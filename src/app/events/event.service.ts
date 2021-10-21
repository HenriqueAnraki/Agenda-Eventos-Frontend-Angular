import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login/login.service';
import { UserEvent } from './userEvent';

@Injectable()
export class EventService {

  constructor(
    private authService: LoginService,
    private http: HttpClient
  ) { }

  getEvents(): any {
    let endpoint = environment.apiEndpoint
    let token = this.authService.getToken()

    let headers = new HttpHeaders().append('Authorization', `Bearer ${token}`)

    return this.http.get<UserEvent>(`${endpoint}/`, { headers })
  }
}
