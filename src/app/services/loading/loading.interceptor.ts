import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { LoadingScreenService } from './loading.service';


@Injectable()
export class LoadingScreenInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  constructor(private loadingScreenService: LoadingScreenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.loadingScreenService.startLoading();
    }

    this.activeRequests++;

    return next.handle(request).pipe(
      finalize(this.finalizeInterceptedRequest.bind(this))
    );
  }

  private finalizeInterceptedRequest(): void {
    this.activeRequests--;

    if (this.activeRequests === 0) {
      this.loadingScreenService.stopLoading();
    }
  }
}
