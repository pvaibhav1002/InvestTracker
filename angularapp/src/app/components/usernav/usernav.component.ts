import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  username: string = '';
  userRole: string = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedin()) {
      this.username = this.authService.getAuthenticatedUsername();
      this.userRole = this.authService.getAuthenticatedUserRole();
    }

  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}