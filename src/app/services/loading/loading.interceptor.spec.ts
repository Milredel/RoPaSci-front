import { LoadingScreenService } from './loading.service';
import { expect, stub, stubClass } from '../../../test';
import { LoadingScreenInterceptor } from './loading.interceptor';
import { of } from 'rxjs';

describe('LoadingScreenInterceptor', () => {
  let service: LoadingScreenInterceptor;
  let loadingScreenService: LoadingScreenService;

  beforeEach(() => {
    service = new LoadingScreenInterceptor(
      loadingScreenService = stubClass(LoadingScreenService)
    );
  });

  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });

  describe('intercept', () => {
    it('should start and stop loading', () => {
      stub(loadingScreenService, 'startLoading');

      const mockedHttpHandler = {handle: () => of(true)} as any;

      stub(mockedHttpHandler, 'handle').callsFake(() => of(true));

      service.intercept({some: 'request'} as any, mockedHttpHandler);

      return (expect(mockedHttpHandler.handle) as any).to.have.been.called &&
        expect(service['activeRequests']).to.be.deep.eq(1) &&
        (expect(loadingScreenService.startLoading) as any).to.have.been.called;
    });
  });

  describe('finalizeInterceptedRequest', () => {
    it('should treat the interceptor observable finalization pipe', () => {
      stub(loadingScreenService, 'stopLoading');
      service['activeRequests'] = 1;

      service['finalizeInterceptedRequest']();

      return expect(service['activeRequests']).to.be.deep.eq(0) &&
        (expect(loadingScreenService.stopLoading) as any).to.have.been.called;
    });
  });
});
