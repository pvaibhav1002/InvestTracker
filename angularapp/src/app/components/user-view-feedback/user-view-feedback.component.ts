import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})
export class UserViewFeedbackComponent implements OnInit {
  userFeedbacks: any[] = [];

  constructor(private feedbackService: FeedbackService, private authService:AuthService) { }

  ngOnInit(): void {
    this.getUserFeedbacks();
  }


  getUserFeedbacks(): void {
    this.feedbackService.getAllFeedbacksByUserId(this.authService.getAuthenticatedUserId()).subscribe(
      (data) => {
        this.userFeedbacks = data;
      },
      (error) => {
        console.error('Error fetching user feedbacks:', error);
      }
    );
  }


}




