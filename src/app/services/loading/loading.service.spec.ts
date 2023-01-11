import { LoadingScreenService } from './loading.service';
import { expect } from '../../../test';

describe('LoadingScreenService', () => {
  let service: LoadingScreenService;

  beforeEach(() => {
    service = new LoadingScreenService();
  });

  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });

  it('should start loading', (done) => {
    service.loadingStatus.subscribe(() => {
      return expect(service.loading).to.be.true && done();
    });

    service.startLoading();
  });

  it('should stop loading', (done) => {
    service.loadingStatus.subscribe(() => {
      return expect(service.loading).to.be.false && done();
    });

    service.stopLoading();
  });
});
