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
  filteredFeedbacks: any[] = [];
  searchText: string = '';

  constructor(private feedbackService: FeedbackService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserFeedbacks();
  }

  getUserFeedbacks(): void {
    this.feedbackService.getAllFeedbacksByUserId(this.authService.getAuthenticatedUserId()).subscribe(
      (data) => {
        this.userFeedbacks = data;
        this.filteredFeedbacks = data;
      },
      (error) => {
        console.error('Error fetching user feedbacks:', error);
      }
    );
  }

  applyCategoryFilter(option: string) {
    if (option == 'All') {
      this.filteredFeedbacks = this.userFeedbacks;
    }
    else {
      this.filteredFeedbacks = this.userFeedbacks.filter(
        feedback => feedback.category == option
      );

    }

  }

  searchBasedOnText() {
    this.filteredFeedbacks = this.userFeedbacks;
    this.filteredFeedbacks = this.userFeedbacks.filter((feed) => {
      let a = feed.feedbackText.toLowerCase().includes(this.searchText.toLowerCase()) || feed.category.toLowerCase().includes(this.searchText.toLowerCase()) ||
        feed.investment.name.toLowerCase().includes(this.searchText.toLowerCase());
      return a;
    });
  }

}