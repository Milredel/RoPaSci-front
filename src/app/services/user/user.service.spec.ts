import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { RestCallService } from '../restcall/rest-call.service';
import { expect, stubClass } from '../../../test';

describe('UserService', () => {
  let service: UserService;
  let http: HttpClient;
  let restCallService: RestCallService;

  beforeEach(() => {
    service = new UserService(
      http = stubClass(HttpClient),
      restCallService = stubClass(RestCallService)
    );
  });


  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });
});
