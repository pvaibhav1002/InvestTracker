import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  isUser = false;
  isAdmin = false;

  constructor(private readonly router: Router, private readonly authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.checkAuthAndRedirect();
    });

    this.checkAuthAndRedirect();
  }

  checkAuthAndRedirect(): void {
    this.isLoggedIn = this.authService.isLoggedin();
    this.isUser = this.authService.isUser();
    this.isAdmin = this.authService.isAdmin();
    const currentUrl = this.router.url;
    const publicRoutes = ['/', '/home', '/login', '/signup']

    if (!this.isLoggedIn && this.authService.isTokenExpired()) {
      localStorage.clear();
      if (!publicRoutes.includes(currentUrl)) {
        this.router.navigate(['/login']);
      }
    }
  }
}

