import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {

  username: string = '';
  userRole: string = '';

  constructor(private authService: AuthService, private jwtService: JwtService,private router:Router) { }

  ngOnInit(): void {

    if (this.authService.isLoggedin()) {
      this.username = this.jwtService.getAuthenticatedUsername();
      this.userRole = this.jwtService.getAuthenticatedUserRole();
    }

  }


  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}













