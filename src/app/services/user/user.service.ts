import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClass, ReqContentType } from '../api/api.class';
import { environment } from '../../../environments/environment';
import { RestCallService } from '../restcall/rest-call.service';
import { UserModel } from '../../models/user.model';

@Injectable()
export class UserService extends ApiClass {

  constructor(public http: HttpClient,
              private restCallService: RestCallService) {
    super(http);
  }

}
