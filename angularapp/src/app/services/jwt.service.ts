import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() {}

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
}
