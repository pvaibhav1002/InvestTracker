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
  formSubmitted = false;
  successMessage = '';
  errorMessage = '';
  confirmPassword = '';
  expectedOtp = '';
  submittedOtp = '';
  useremail = "";
  userid: number;
  user: User = {
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    userRole: '',
    accountStatus: false
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.formSubmitted = false;
  }

  register(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = "All fields are required.";
      return;
    }

    const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(this.user.password)) {
      this.errorMessage ="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
      return;
    }
    if (this.user.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match.";
      return;
    }
    this.authService.register(this.user).subscribe({
      next: (res) => {
        this.formSubmitted = true;
        this.useremail = res.email;
        this.userid = res.userId;
        this.authService.otp(this.useremail).subscribe({
          next: (otpData: string) => {
            console.log(otpData);
            this.expectedOtp = otpData;
          },
          error: () => {
            this.errorMessage = "Failed to send OTP.";

          }
        });
      },
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });

  }
  resendOTP() {
    this.authService.otp(this.useremail).subscribe({
      next: (otpData: string) => {
        this.expectedOtp = otpData;
      },
      error: () => {
        this.errorMessage = "Failed to send OTP.";
      }
    });
  }
  verifyOtp() {
    if (String(this.submittedOtp).trim() === String(this.expectedOtp).trim()) {
      this.successMessage = "OTP verified successfully!";
      this.authService.otpVerified(this.userid).subscribe((res) => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      });
    } else {
      this.errorMessage = "Invalid OTP. Please try again.";
    }
  }
}
