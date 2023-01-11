import { RestCallService } from './rest-call.service';
import { expect, stub } from '../../../test';
import { FormBuilder, FormControl } from '@angular/forms';

describe('RestCallService', () => {
  let service: RestCallService;

  beforeEach(() => {
    service = new RestCallService();
  });

  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });

  describe('doRestCall', () => {
    it('should disable/enable form and treat onComplete callback', async () => {
      const mockedOnComplete = (resp: any) => {
        return `complete_scenario with response: ${resp}`;
      };
      const form = new FormBuilder().group({fieldTest: new FormControl()});

      stub(form, 'enable');
      stub(form, 'disable');

      const mockedPromise = Promise.resolve({results: 'tada'});

      const res = await service.doRestCall(mockedPromise, form, {onComplete: mockedOnComplete, onError: null});

      return expect(res).to.be.deep.eq(`complete_scenario with response: ${{results: 'tada'}}`) &&
        (expect(form.disable) as any).to.have.been.called &&
        (expect(form.enable) as any).to.have.been.called;
    });

    it('should disable/enable form and treat onError callback', async () => {
      const mockedOnError = (resp: any) => {
        return `complete_scenario with response: ${resp}`;
      };
      const form = new FormBuilder().group({fieldTest: new FormControl()});

      stub(form, 'enable');
      stub(form, 'disable');

      const mockedPromise = Promise.reject({results: 'tada'});

      const res = await service.doRestCall(mockedPromise, form, {onComplete: null, onError: mockedOnError});

      return expect(res).to.be.deep.eq(`complete_scenario with response: ${{results: 'tada'}}`) &&
        (expect(form.disable) as any).to.have.been.called &&
        (expect(form.enable) as any).to.have.been.called;
    });
  });
});
