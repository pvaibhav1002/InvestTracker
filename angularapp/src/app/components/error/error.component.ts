import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  countdown: number = 5;
  userRole: string = '';

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('userRole') || '';

    const interval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(interval);
        this.redirectUser();
      }
    }, 1000);
  }

  redirectUser(): void {
    if (this.userRole === 'Admin') {
      this.router.navigate(['/admin-console']);
    }
    else if (this.userRole === 'User') {
      this.router.navigate(['/user-view']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}









