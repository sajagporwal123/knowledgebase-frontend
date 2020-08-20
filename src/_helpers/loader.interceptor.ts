// Default Modules
import { Injectable } from '@angular/core';
import {
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Generated Services
import { LoaderService } from '../_services/loader.service';
@Injectable({
  providedIn: 'root',
})

export class LoaderInterceptor implements HttpInterceptor {
  public requests: HttpRequest<any>[] = [];

  constructor(
    private loaderService: LoaderService,
  ) { }

  /**
   * @description Remove request from queue to disable loader 
   * @param req 
   */
  removeRequest(req: HttpRequest<any>): any {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /**
     * Add request to show loader
     */
    this.requests.push(req);
    this.loaderService.isLoading.next(true);
    return Observable.create((observer: any) => {
      const subscription = next.handle(req).subscribe(
        (event) => {
          if (event instanceof HttpResponse) {
            this.removeRequest(req);
            observer.next(event);
          }
        },
        (err) => {
          this.removeRequest(req);
          observer.error(err);
        },
        () => {
          this.removeRequest(req);
          observer.complete();
        }
      );
      // remove request from queue when cancelled
      return () => {
        this.removeRequest(req);
        subscription.unsubscribe();
      };
    });
  }
}
