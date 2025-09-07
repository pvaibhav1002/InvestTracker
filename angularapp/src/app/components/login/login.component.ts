import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('loginForm') loginForm!: NgForm;
  loginInfo: Login = { email: '', password: '' };
  errorMessage = '';

  constructor(private readonly authService: AuthService, private readonly router: Router) { }

  login() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    this.authService.login(this.loginInfo).subscribe({
      next: (res) => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = "Invalid credentials.";
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      },

    });
  }
}
