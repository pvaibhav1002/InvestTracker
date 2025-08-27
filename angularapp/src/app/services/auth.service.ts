import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APPURL } from 'global';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';


export const AUTHENTICATED_USER = 'authenticatedUser';
export const TOKEN = 'token';
export const PAGE_ID = 'pageId';
export const USER_ID = 'userId';
export const ROLE = 'role';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = APPURL;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, login).pipe(
      map(
        data => {
          console.log(data)
          //  localStorage.setItem(USER_ID, "" + data.userId);
          // localStorage.setItem(AUTHENTICATED_USER, username);
          localStorage.setItem(TOKEN, `Bearer ${data.token}`);
          // localStorage.setItem(ROLE, data.userRole);
          return data;
        }
      )
    );
  }

  isLoggedin(): boolean {
    let user = localStorage.getItem(AUTHENTICATED_USER);
    return !(user == null);
  }


  logout(): void {
    localStorage.clear();
  }


  isAdmin(): boolean {
    return this.getAuthenticatedRole() === 'ADMIN';
  }


  isUser(): boolean {
    return this.getAuthenticatedRole() === 'USER';
  }


  getAuthenticatedUserId(): number {
    return parseInt(localStorage.getItem(USER_ID) || "0");
  }

  getAuthenticatedRole() {
    return localStorage.getItem(ROLE);
  }


  getAuthenticatedToken() {
    return localStorage.getItem(TOKEN);
  }

}
