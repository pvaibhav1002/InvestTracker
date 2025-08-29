import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';
 
@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {
 
  feedbacks = [];
  selectedUser: any = null;
  selectedInvestment: any = null;
 
  constructor(private feedbackService: FeedbackService) {}
 
  ngOnInit(): void {
    this.getFeedbacks();
   
  }
 
  getFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
      },
      (error) => {
        console.error('Error fetching feedback', error);
      }
    );
  }
 
  showUserDetails(user: any): void {
    this.selectedUser = user;
  }
 
  showInvestmentDetails(investment: any): void {
    this.selectedInvestment = investment;
  }
 
  closeModal(): void {
    this.selectedUser = null;
    this.selectedInvestment = null;
  }
}
 
 