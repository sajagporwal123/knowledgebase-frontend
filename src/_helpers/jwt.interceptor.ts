// Default Modules
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

// Environment
import { environment } from '../environments/environment';

// Generates Services
import { UserService } from '../_services/user.service';

import { InterceptorSkipContentTypeHeader } from '../_constant/http.constant';
@Injectable()

export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !request.headers.has('Content-Type') &&
      !request.headers.has(InterceptorSkipContentTypeHeader)
    ) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }
    // Add auth token in request header if user is logged in
    const user = this.userService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`,
        },
      });
    }
    return next.handle(request);
  }

}
