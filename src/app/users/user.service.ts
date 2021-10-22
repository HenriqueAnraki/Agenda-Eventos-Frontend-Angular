import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AppConfigService } from '../shared/services/app-config.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  constructor(
    private appConfigService: AppConfigService,
    private http: HttpClient,
    private router: Router
  ) { }

  login(credentials: any) {
    // Como/onde criar constantes de configuração baseadas no enviroment?
    // let endpoint = this.appConfigService.apiEndpoint
    let endpoint = environment.apiEndpoint
    
    console.log(endpoint)
    
    return this.http.post(`${endpoint}/user`, JSON.stringify({
      emailAddress: credentials.email,
      password: credentials.password
    }))
      .subscribe( res => {
        console.log('resposta do post: ')
        console.log(res)
        alert("Conta criada! Já pode usar a sua agenda!")

        // [todo] o redirect faço aqui, ou no componente?
        this.router.navigate(['/login'])
      },
      (error: HttpErrorResponse) => {
        // tratar melhor os erros
        console.log(error)

        let errorMessage = error.error.text ?? error.error
        if (!(typeof errorMessage === 'string')) {
          errorMessage = "Um erro ocorreu! Entre em contato com nossa equipe!"
        }

        alert(errorMessage);
      });
  }
}
