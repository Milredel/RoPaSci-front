import { expect } from 'chai';
import { LoadingComponent } from './loading.component';
import { LoadingScreenService } from '../../../services/loading/loading.service';
import { stub, stubClass } from '../../../../test';
import { Subject } from 'rxjs';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let loadingScreenService: LoadingScreenService;

  beforeEach(() => {
    loadingScreenService = stubClass(LoadingScreenService);

    component = new LoadingComponent(loadingScreenService);
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });

  describe('ngOnInit', () => {
    it('should assign the loading value from service loadingStatus function', (done) => {
      const subject: Subject<boolean> = new Subject();

      loadingScreenService.loadingStatus = subject;

      component.ngOnInit();

      component['loadingStatus$'].subscribe(() => {
        return expect(component.loading).to.be.true && done();
      });

      subject.next(true);
    });
  });
});
