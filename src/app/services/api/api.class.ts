import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

export enum ReqContentType {
  Text = 'text',
  Json = 'json',
  ArrayBuffer = 'arraybuffer',
  Blob = 'blob'
}

export class ApiClass {
  public requesting = false;

  constructor(public http: HttpClient) {
  }

  getJwt(): string {
    return localStorage.getItem('jwt');
  }

  getHeaders(): HttpHeaders {
    const headersParams = {
      'Content-Type': 'application/json'
    };
    const token = this.getJwt();

    if (token) {
      Object.assign(headersParams, {Authorization: `Bearer ${token}`});
    }

    return new HttpHeaders(headersParams);
  }

  handleError(httpError: HttpErrorResponse): void {
    let errReason = (httpError.error && httpError.error.message ? httpError.error.message : '');

    if (httpError.error && httpError.error.hasOwnProperty('errors') && Array.isArray(httpError.error.errors)) {
      errReason = (httpError.error.errors || []).map(err => err.defaultMessage).join('-');
    } else if (!errReason) {
      errReason = 'Votre requête n\'a pas pu aboutir.';
    }

    this.handleErrorStatus(httpError.status, errReason);
  }

  handleErrorStatus(status: number, reason: string): void {
    const errorStatus = [0, 400, 404, 401, 403, 500];

    if (errorStatus.includes(status)) {
      throw new Error(reason);
    }
  }

  defaultOnCompete(response: any): any {
    this.requesting = false;

    return response;
  }
}
