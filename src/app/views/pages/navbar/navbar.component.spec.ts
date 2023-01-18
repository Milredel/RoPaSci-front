import { expect } from 'chai';
import { NavbarComponent } from './navbar.component';
import { ApiAuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { stub, stubClass } from '../../../../test';
import { ToastService } from '../../../services/toast/toast.service';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let apiAuthService: ApiAuthService;
  let router: Router;
  let toastService: ToastService;

  beforeEach(() => {
    component = new NavbarComponent(
      apiAuthService = stubClass(ApiAuthService),
      router = stubClass(Router),
      toastService = stubClass(ToastService)
    );
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });

  describe('ngOnInit', () => {
    it('should initialize username from jwt token', () => {
      const func = () => {
        return {username: 'julien'} as any;
      };
      stub(apiAuthService, 'getJwtTokenDecoded').callsFake(func);

      component.ngOnInit();

      return expect(component.username).to.be.deep.eq('julien');
    });
  });

  describe('logout', () => {
    it('should called the logout from service and redirect to login page', () => {
      stub(apiAuthService, 'logout');
      stub(router, 'navigate');
      stub(toastService, 'success');

      component.logout();

      return (expect(apiAuthService.logout) as any).to.have.been.called &&
        (expect(router.navigate) as any).to.have.been.calledWith(['/login']) &&
        (expect(toastService.success) as any).to.have.been.called;
    });
  });

  describe('goToStats', () => {
    it('should call router.navigate with correct param', () => {
      stub(router, 'navigate');
      component.goToStats();
      return (expect(router.navigate) as any).to.have.been.calledWith(['/main/stats']);
    });
  });

  describe('goToGames', () => {
    it('should call router.navigate with correct param', () => {
      stub(router, 'navigate');
      component.goToGames();
      return (expect(router.navigate) as any).to.have.been.calledWith(['/main/home']);
    });
  });
});
