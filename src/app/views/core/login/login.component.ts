import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValdemortConfig } from 'ngx-valdemort';
import { FormUtils } from '../../../utils/form.utils';
import { ApiAuthService } from '../../../services/auth/auth.service';
import { UserModel } from '../../../models/user.model';
import { ToastService } from '../../../services/toast/toast.service';
import { version } from '../../../../../package.json';
import { AlertMessageType } from '../../../services/message/message.service.contracts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  frontendVersion = version;

  constructor(
    public apiAuthSrv: ApiAuthService,
    private fb: FormBuilder,
    private valdemortConfig: ValdemortConfig,
    private toastService: ToastService
  ) {
  }

  ngOnInit(): void {
    this.valdemortConfig.errorsClasses = 'invalid-feedback';

    this.form = this.fb.group({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  async auth(): Promise<void> {
    FormUtils.markFormGroupTouched(this.form);

    if (this.form.invalid) {
      this.toastService.error('Erreur', `Le formulaire de connexion est invalide, veuillez corriger les erreurs svp.`);
      return;
    }

    const user: UserModel = UserModel.fromAuthFormValue(this.form.value);
    await this.apiAuthSrv.login(user, this.form);
  }
}
