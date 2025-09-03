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

  constructor(private router: Router, private readonly authService: AuthService) { }

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

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500 Index" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100 Cash CFD" },
        { proName: "FX_IDC:EURUSD", title: "EUR to USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" }
      ],
      colorTheme: "dark",
      locale: "en",
      isTransparent: false,
      showSymbolLogo: true,
      displayMode: "adaptive"
    });
    document.querySelector('.tradingview-widget-container__widget')?.appendChild(script);
  }
}


