import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private readonly authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getAuthenticatedToken();
    let username = this.authService.getAuthenticatedUsername();
    if (token && username) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token.trim()}`
        }
      })
    }
    return next.handle(request);
  }
}