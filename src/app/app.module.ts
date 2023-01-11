import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiAuthService } from './services/auth/auth.service';
import { RestCallService } from './services/restcall/rest-call.service';
import { AppRoutingModule } from './app.routing.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/core/login/login.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { LoadingComponent } from './views/core/loading/loading.component';
import { LoadingScreenService } from './services/loading/loading.service';
import { LoadingScreenInterceptor } from './services/loading/loading.interceptor';
import { ValdemortModule } from 'ngx-valdemort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ToastService } from './services/toast/toast.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MessageService } from './services/message/message.service';
import { MessageComponent } from './views/core/message/message.component';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ValdemortModule,
    SweetAlert2Module.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    LoadingScreenService, AuthGuardService, ApiAuthService,
    RestCallService, {provide: LOCALE_ID, useValue: 'fr'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true
    },
    ToastService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
