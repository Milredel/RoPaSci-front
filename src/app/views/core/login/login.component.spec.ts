import { expect } from 'chai';
import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { ValdemortConfig } from 'ngx-valdemort';
import { ToastService } from '../../../services/toast/toast.service';
import { ApiAuthService } from '../../../services/auth/auth.service';
import { stub, stubClass } from '../../../../test';
import { UserModel } from '../../../models/user.model';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let apiAuthService: ApiAuthService;
  let fb: FormBuilder;
  let vdmCfg: ValdemortConfig;
  let toastService: ToastService;

  beforeEach(() => {
    component = new LoginComponent(
      apiAuthService = stubClass(ApiAuthService),
      fb = new FormBuilder(),
      vdmCfg = stubClass(ValdemortConfig),
      toastService = stubClass(ToastService)
    );
  });

  it('should init the component', () => {
    return expect(component).to.not.be.undefined;
  });

  describe('ngOnInit', () => {
    it('should initialize the form and set errors classes for valdemort config', () => {
      component.ngOnInit();

      component.form.get('username').setValue('julien');
      component.form.get('password').setValue('azerty');

      return expect(component.form.value).to.be.deep.eq({username: 'julien', password: 'azerty'}) &&
        expect(component['valdemortConfig'].errorsClasses).to.not.be.undefined;
    });
  });

  describe('auth', () => {
    it('should not call the service to login if form is in error', () => {
      stub(toastService, 'error');
      stub(apiAuthService, 'login');

      component.ngOnInit();

      component.form.get('username').setValue('julien');
      component.form.get('password').setValue(null); // password is mandatory for the form validity

      component.auth();

      return (expect(toastService.error) as any).to.have.been.called &&
        (expect(apiAuthService.login) as any).to.not.have.been.called;
    });

    it('should call the service to login if form is valid', async () => {
      stub(toastService, 'error');
      stub(apiAuthService, 'login');
      stub(UserModel, 'fromAuthFormValue').callsFake(() => {
        return 'usermodel.fromauthformvalue.results';
      });

      component.ngOnInit();

      component.form.get('username').setValue('julien');
      component.form.get('password').setValue('azerty');

      await component.auth();

      return (expect(toastService.error) as any).to.not.have.been.called &&
        (expect(apiAuthService.login) as any).to.have.been.calledWith('usermodel.fromauthformvalue.results', component.form);
    });
  });
});
