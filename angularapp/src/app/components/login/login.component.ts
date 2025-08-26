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
export class LoginComponent implements OnInit {

  loginForm: NgForm;
  loginInfo: Login = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    this.authService.login(this.loginInfo).subscribe(res => {
      if (!res) {
        this.errorMessage = "Invalid credentials or role mismatch.";
        return;
      }
      // if (res.user == 'ADMIN') {
      //   this.router.navigate(['/admin']);
      // }
      // else if (res.role == 'USER')
      //   this.router.navigate(['/user']);
      // else
      //   this.router.navigate(['/']);
    });
  }

  ngOnInit(): void {
  }


}
