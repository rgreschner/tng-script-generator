import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interceptor providing JWT 
 * for authentication in any HTTP request.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get JWT from local storage.
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${idToken}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
