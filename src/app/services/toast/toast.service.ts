import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable()
export class ToastService {
  private toastr;

  constructor() {
    this.initToastr();
  }

  private initToastr(): void {
    this.toastr = Swal;
  }

  private log(icon: string, title: string, text: string, opts?: SweetAlertOptions): void {
    this.toastr.fire({icon, title, text, ...opts} as SweetAlertOptions);
  }

  error(title: string, text: string, opts?: SweetAlertOptions): void {
    this.log('error', title, text, opts);
  }

  success(title: string, text: string, opts?: SweetAlertOptions): void {
    this.log('success', title, text, opts);
  }

  warning(title: string, text: string, opts?: SweetAlertOptions): void {
    this.log('warning', title, text, opts);
  }

  info(title: string, text: string, opts?: SweetAlertOptions): void {
    this.log('info', title, text, opts);
  }

  confirm(icon: string, title: string, text: string, opts?: SweetAlertOptions): Promise<boolean> {
    return this.toastr.fire({
      icon,
      title,
      text,
      ...opts
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
