import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';
  isLoggedIn :boolean=false;
  isUser:boolean = false;
  isAdmin:boolean = false;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn=this.authService.isLoggedin();
    this.isUser=this.authService.isUser();
    this.isAdmin=this.authService.isAdmin();
  }
}
