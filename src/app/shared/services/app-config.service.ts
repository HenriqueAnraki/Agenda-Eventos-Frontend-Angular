import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
Service to use configurable data without the need to build the entire app.
*/
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;

  constructor(private http: HttpClient) { }

  loadAppConfig() {
    return this.http.get('/assets/config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  get apiEndpoint() {

    if (!this.appConfig) {
      throw Error('Config file not loaded!');
    }

    return this.appConfig.apiEndpoint;
  }
}
