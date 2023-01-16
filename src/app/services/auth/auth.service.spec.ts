import { ApiAuthService } from './auth.service';
import { createStub, expect, stub, stubClass } from '../../../test';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';
import { RestCallService } from '../restcall/rest-call.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ReqContentType } from '../api/api.class';

describe('AuthService', () => {
  let service: ApiAuthService;
  let http: HttpClient;
  let toastService: ToastService;
  let restCallService: RestCallService;
  let router: Router;

  beforeEach(() => {
    service = new ApiAuthService(
      http = stubClass(HttpClient),
      toastService = stubClass(ToastService),
      restCallService = stubClass(RestCallService),
      router = stubClass(Router)
    );
  });

  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });

  describe('login', () => {
    it('should call the restcall service', async () => {
      stub(http, 'post').callsFake(() => {
        return {toPromise: () => null};
      });
      stub(restCallService, 'doRestCall').callsFake(() => 'a restcall response');
      stub(service, 'getHeaders').callsFake(() => {
        return {some: 'headers'};
      });

      const res = await service.login({some: 'user data'} as any, {some: 'form'} as any);

      return (expect(http.post) as any).to.have.been.calledWith(
        `${environment.BACKEND_URL}/auth/login`, {some: 'user data'}, {
          headers: {some: 'headers'},
          responseType: ReqContentType.Json,
          observe: 'response'
        }
      ) && expect(res).to.be.deep.eq('a restcall response');
    });
  });

  describe('loginOnComplete', () => {
    it('should throw an error if no response', () => {
      const mockedForm = createStub('form', 'enable');
      const mockedResponse = null;

      try {
        service['loginOnComplete'](mockedResponse, mockedForm);
        expect.fail();
      } catch (e) {
        return expect(e.message).to.be.deep.eq(`An error has occured during authentication.`);
      }
    });

    it('should throw an error if response is not ok', () => {
      const mockedForm = createStub('form', 'enable');
      const mockedResponse = {ok: false} as any;

      try {
        service['loginOnComplete'](mockedResponse, mockedForm);
        expect.fail();
      } catch (e) {
        return expect(e.message).to.be.deep.eq(`An error has occured during authentication.`);
      }
    });

    it('should throw an error if response.error is defined', () => {
      const mockedForm = createStub('form', 'enable');
      const mockedResponse = {ok: true, error: {}, message: 'a message error'} as any;

      try {
        service['loginOnComplete'](mockedResponse, mockedForm);
        expect.fail();
      } catch (e) {
        return expect(e.message).to.be.deep.eq(`a message error`);
      }
    });

    it('should throw an error if no response.body.access_token', () => {
      const mockedForm = createStub('form', 'enable');
      const mockedResponse = {ok: true, body: {access_token: null}} as any;

      try {
        service['loginOnComplete'](mockedResponse, mockedForm);
        expect.fail();
      } catch (e) {
        return expect(e.message).to.be.deep.eq(`Impossible to log you in.`);
      }
    });

    it('should throw an error if no response.status is not 201', () => {
      const mockedForm = createStub('form', 'enable');
      const mockedResponse = {ok: true, status: 401} as any;

      try {
        service['loginOnComplete'](mockedResponse, mockedForm);
        expect.fail();
      } catch (e) {
        return expect(e.message).to.be.deep.eq(`Impossible to log you in.`);
      }
    });

    it('should allow login', () => {
      stub(service, 'setStorage');
      stub(toastService, 'success');
      stub(router, 'navigate');

      const mockedForm = createStub('form', 'enable');
      const mockedResponse = {ok: true, status: 201, body: {access_token: 'a jwt token'}} as any;

      service['loginOnComplete'](mockedResponse, mockedForm);

      return (expect(service.setStorage) as any).to.have.been.calledWith(
        'jwt', 'a jwt token'
        ) && (expect(toastService.success) as any).to.have.been.called &&
        (expect(router.navigate) as any).to.have.been.calledWith(['/main/home']);
    });
  });

  describe('errorLoginHandler', () => {
    it('should throw an error if status is 401', () => {
      stub(toastService, 'error');

      try {
        service['errorLoginHandler']({status: 401} as any);
        expect.fail();
      } catch (e) {
        return (expect(toastService.error) as any).to.have.been.called &&
          expect(e.message).to.be.deep.eq(`Username or password doesn't match.`);
      }
    });

    it('should call the main handle error function is status is not 401', () => {
      stub(service, 'handleError');

      service['errorLoginHandler']({status: 500} as any);

      return (expect(service['handleError']) as any).to.have.been.calledWith({status: 500});
    });
  });
});
