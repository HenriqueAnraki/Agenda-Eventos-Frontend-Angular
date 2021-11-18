import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppConfigService } from './shared/services/app-config.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ResponseErrorInterceptor } from './shared/interceptors/response-error.interceptor';
import { UserFormModule } from './user-form/user-form.module';

import { JwtModule } from '@auth0/angular-jwt'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { ModalModule } from 'ngx-bootstrap/modal';
import { GraphQLModule } from './graphql.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserFormModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token')
      }
    }),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    GraphQLModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseErrorInterceptor, multi: true
    }// , // Tentativa de utilizar variáveis de ambiente
    // {
    //   provide: APP_INITIALIZER,
    //   multi: true,
    //   deps: [AppConfigService],
    //   useFactory: (appConfigService: AppConfigService) => {
    //     return () => {
    //       //Make sure to return a promise!
    //       return appConfigService.loadAppConfig();
    //     };
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
