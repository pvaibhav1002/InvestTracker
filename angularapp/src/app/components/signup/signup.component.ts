import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registrtion: NgForm;

  successMessage = '';
  errorMessage = '';
  confirmPassword = '';

  user: User = { username: '', email: '', password: '', mobileNumber: '', userRole: '' };

  constructor(private authService: AuthService, private router: Router) { }

  register(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = "All fields are required."
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(this.user.password)) {
      this.errorMessage = "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }
    console.log(this.user);
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.successMessage = 'Registration successful!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }

  ngOnInit(): void {
  }

}
