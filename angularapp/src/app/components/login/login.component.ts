import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: NgForm;
  loginInfo: Login = { email: '', password: '' };
  errorMessage = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  login() {
    this.authService.login(this.loginInfo).subscribe(res => {
      if (!res) {
        this.errorMessage = "Invalid credentials or role mismatch.";
        return;
      }
      this.router.navigate(['/']);
    });
  }
}
