import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const authToken = localStorage['token']
    const authReq = req.clone({
        headers: req.headers.set('token', authToken)
    });
    // const authReq = req.clone({ setHeaders: { Authorization: authToken } });
    return next.handle(authToken ? authReq: req);
  }
}