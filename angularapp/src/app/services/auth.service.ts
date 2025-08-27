import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { JwtService } from './jwt.service';
import { APP_URL } from 'src/global';


export const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwt :JwtService) { }

  register(user: User): Observable<any> {
    return this.http.post(`${APP_URL}/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${APP_URL}/login`, login).pipe(
      map(
        data => {
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }

  isLoggedin(): boolean {
    let username = this.jwt.getAuthenticatedUsername();
    return !(username == null);
  }


  logout(): void {
    localStorage.clear();
  }


  isAdmin(): boolean {
    return this.jwt.getAuthenticatedUserRole() === 'ADMIN';
  }


  isUser(): boolean {
    return this.jwt.getAuthenticatedUserRole() === 'USER';
  }
}
