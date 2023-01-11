import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface RestCallOptions {
  onComplete: (response: any) => any;
  onError: (error: HttpErrorResponse) => any;
}

@Injectable()
export class RestCallService {
  constructor() {
  }

  async doRestCall(restCall: Promise<any>, form: FormGroup, options: RestCallOptions): Promise<any> {
    if (form) {
      form.disable();
    }

    return restCall
      .then((response: HttpResponse<any>) => {
        if (form) {
          form.enable();
        }

        return options.onComplete(response);
      })
      .catch((error: HttpErrorResponse) => {
        if (form) {
          form.enable();
        }

        return options.onError(error);
      });
  }
}
