import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';
import { APP_URL } from 'src/global';
 
 
export const TOKEN = 'token';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http: HttpClient) { }
 
  register(user: User): Observable<User> {
    return this.http.post<User>(`${APP_URL}/register`, user);
  }
 
  login(login: Login): Observable<any> {
    return this.http.post<any>(`${APP_URL}/login`, login).pipe(
      map(
        data => {
          // console.log(data);
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          return data;
        }
      )
    );
  }
 
  otp(to:string):Observable<string>{
    return this.http.post<string>(`${APP_URL}/email/otp`,to);
  }
 
  otpVerified(id:number):Observable<any>{
    return this.http.put<any>(`${APP_URL}/email/verified/${id}`,{});;
  }
 
  getAuthenticatedToken(): string | null {
    const tokenWithBearer = localStorage.getItem(TOKEN);
    return tokenWithBearer ? tokenWithBearer.replace('Bearer ', '') : null;
  }
 
  getDecodedToken(): any | null {
    const token = this.getAuthenticatedToken();
    if (!token) return null;
 
    const payload = token.split('.')[1];
    if (!payload) return null;
 
    try {
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
 
  getAuthenticatedUserId(): number | null {
    return this.getDecodedToken()?.userId || null;
  }
 
  getAuthenticatedUsername(): string | null {
    return this.getDecodedToken()?.username || null;
  }
 
  getAuthenticatedUserRole(): string | null {
    return this.getDecodedToken()?.role || null;
  }
 
  isTokenExpired(): boolean {
    const exp = this.getDecodedToken()?.exp;
    if (!exp) return true;
    return Date.now() >= exp * 1000;
  }
 
  isLoggedin(): boolean {
    let username = this.getAuthenticatedUsername();
    return !(username == null);
  }
 
 
  logout(): void {
    localStorage.clear();
  }
 
 
  isAdmin(): boolean {
    return this.getAuthenticatedUserRole() === 'Admin';
  }
 
 
  isUser(): boolean {
    return this.getAuthenticatedUserRole() === 'User';
  }
}