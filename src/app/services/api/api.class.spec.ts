import { ApiClass } from './api.class';
import { expect, stub, stubClass } from '../../../test';
import { HttpClient, HttpHeaders } from '@angular/common/http';

describe('ApiClass', () => {
  let cls: ApiClass;
  let http: HttpClient;

  beforeEach(() => {
    cls = new ApiClass(http = stubClass(HttpClient));
  });

  it('should init the class', () => {
    return expect(cls).to.not.be.undefined;
  });

  describe('getHeaders', () => {
    it('should return HttpHeaders with authorization token', () => {
      stub(cls, 'getJwt').callsFake(() => {
        return 'a jwt token';
      });

      const res = cls.getHeaders();

      return expect((res as HttpHeaders).get('Authorization')).to.be.deep.eq('Bearer a jwt token') &&
        expect((res as HttpHeaders).get('Content-Type')).to.be.deep.eq('application/json');
    });
  });

  describe('handleError', () => {
    it('should handle error from error.message error object', () => {
      stub(cls, 'handleErrorStatus');

      const mockedError = {status: 500, error: {message: 'an error message'}} as any;

      cls.handleError(mockedError);

      return (expect(cls.handleErrorStatus) as any).to.have.been.calledWith(500, 'an error message');
    });

    it('should handle multiple error', () => {
      stub(cls, 'handleErrorStatus');

      const mockedError = {status: 500, error: {errors: [{defaultMessage: 'err 1'}, {defaultMessage: 'err 2'}]}} as any;

      cls.handleError(mockedError);

      return (expect(cls.handleErrorStatus) as any).to.have.been.calledWith(500, 'err 1-err 2');
    });
  });

  describe('handleErrorStatus', () => {
    it('should throw an error is status code is part of error', () => {
      const errorStatus = [0, 400, 404, 401, 403, 500];
      const randomIdx = Math.floor(Math.random() * errorStatus.length - 1) + 1;

      try {
        cls.handleErrorStatus(errorStatus[randomIdx], 'a reason');
        expect.fail();
      } catch (e) {
        return expect(e.message).to.be.deep.eq('a reason');
      }
    });
  });

  describe('defaultOnComplete', () => {
    it('should treat the defaultOnComplete functon', () => {
      cls.requesting = true;

      const res = cls.defaultOnCompete(<any>{some: 'response'});

      return expect(res).to.be.deep.eq({some: 'response'}) &&
        expect(cls.requesting).to.be.false;
    });
  });
});
