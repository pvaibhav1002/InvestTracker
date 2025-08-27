import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
    providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {

    constructor(private jwt :JwtService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        let basicAuthHeaderString = localStorage.getItem('token');
        let username = this.jwt.getAuthenticatedUsername();
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