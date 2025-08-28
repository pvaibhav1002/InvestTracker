import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({
    providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

    constructor(private auth :AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        let basicAuthHeaderString = localStorage.getItem('token');
        let username = this.auth.getAuthenticatedUsername();
        if (basicAuthHeaderString && username) {
            request = request.clone({
                setHeaders: {
                    Authorization: basicAuthHeaderString
                }
            })
        }
        return next.handle(request);
    }
}