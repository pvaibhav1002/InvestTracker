import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
 
@Component({
  selector: 'app-adminnav',
  templateUrl: './adminnav.component.html',
  styleUrls: ['./adminnav.component.css']
})
export class AdminnavComponent implements OnInit {
 
  isLoggedin = false;
  isAdmin = false;
  isOrganizer = false;
  constructor(private router: Router, private authService: AuthService) { }
 
  ngOnInit(): void {
 
    this.isLoggedin = this.authService.isLoggedin();
    this.isAdmin = this.authService.isAdmin();
    this.isOrganizer = this.authService.isUser();
 
  }
 
  logout(): void {
    this.authService.logout();
    this.isLoggedin = this.isAdmin = this.isOrganizer = false;
    this.router.navigate(['/login']);
  }
 
}