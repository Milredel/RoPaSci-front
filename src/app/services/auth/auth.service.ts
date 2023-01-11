import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ReqContentType } from '../api/api.class';
import { environment } from '../../../environments/environment';
import { ApiAuthClass } from '../api/api-auth.class';
import { UserModel } from '../../models/user.model';
import { RestCallService } from '../restcall/rest-call.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import jwt_decode from 'jwt-decode';
import { JwtDecoded } from 'src/app/interfaces/JwtDecoded.interface';

@Injectable()
export class ApiAuthService extends ApiAuthClass {
  constructor(
    public http: HttpClient,
    private toastService: ToastService,
    private restCallService: RestCallService,
    private router: Router
  ) {
    super(http);
  }

  login(userModel: UserModel, form: FormGroup): Promise<any> {
    this.requesting = true;

    const restCall = this.http
      .post(`${environment.BACKEND_URL}/auth/login`, userModel, {
        headers: this.getHeaders(),
        responseType: ReqContentType.Json,
        observe: 'response'
      }).toPromise();

    const onComplete = (response: any) => {
      return this.loginOnComplete(response, form);
    };

    return this.restCallService.doRestCall(restCall, form,
      {onComplete: onComplete.bind(this), onError: this.errorLoginHandler.bind(this)});
  }

  getJwtTokenDecoded(): JwtDecoded {
    return jwt_decode(this.getJwt());
  }

  private loginOnComplete(response: any, form: FormGroup): any {
    form.enable();

    this.requesting = false;
    if (!response || !response.ok) {
      throw new Error(`An error has occured during authentication.`);
    }

    if (response && response.error || !response.body || !response.body.access_token || response.status !== 201) {
      throw new Error(response.message || 'Impossible to log you in.');
    }

    this.setStorage('jwt', response.body.access_token);
    this.toastService.success(`Congratulations`, `Connection succeeded.`, {showConfirmButton: false, timer: 1500});
    this.router.navigate([`/main/home`]);

    return response;
  }

  private errorLoginHandler(error: HttpErrorResponse): void {
    this.requesting = false;

    if (error && error.status === 401) {
      this.toastService.error('Error', `Username or password doesn\'t match.`);
      throw new Error('Username or password doesn\'t match.');
    }

    this.handleError(error);
  }
}
