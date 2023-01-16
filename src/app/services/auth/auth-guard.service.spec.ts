import { AuthGuardService } from './auth-guard.service';
import { ApiAuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { expect, stub, stubClass } from '../../../test';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let apiAuthSrv: ApiAuthService;
  let router: Router;
  let toastService: ToastService;

  beforeEach(() => {
    service = new AuthGuardService(
      apiAuthSrv = stubClass(ApiAuthService),
      router = stubClass(Router),
      toastService = stubClass(ToastService)
    );
  });

  it('should init the service', () => {
    return expect(service).to.not.be.undefined;
  });

  describe('canActivate', () => {
    it('should return false is guard detects an user no authenticated', () => {
      stub(apiAuthSrv, 'authenticated').callsFake(() => false);
      stub(router, 'navigate');

      const res = service.canActivate({} as any);

      return expect(res).to.be.false && (expect(router.navigate) as any).to.have.been.calledWith(['/login']);
    });

    it('should return true if guards detects an user authenticated', () => {
      stub(apiAuthSrv, 'authenticated').callsFake(() => true);
      stub(toastService, 'error');
      stub(router, 'navigate');

      const res = service.canActivate({} as any);

      return expect(res).to.be.true && (expect(toastService.error) as any).to.not.have.been.called &&
        (expect(router.navigate) as any).to.not.have.been.called;
    });
  });
});
