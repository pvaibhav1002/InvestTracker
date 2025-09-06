import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {

  feedbacks = [];
  filterFeedbacks = [];
  selectedUser: any = null;
  selectedInvestment: any = null;


  constructor(private readonly feedbackService: FeedbackService) { }

  ngOnInit(): void {
    this.getFeedbacks();
  }

  getFeedbacks(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (data) => {
        this.feedbacks = data;
        this.filterFeedbacks = data;
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
    console.log(investment);
    this.selectedInvestment = investment;
  }

  closeModal(): void {
    this.selectedUser = null;
    this.selectedInvestment = null;
  }

  filterByCategory(option: string) {
    if (option == 'All') {
      this.filterFeedbacks = this.feedbacks;
    }
    else {
      this.filterFeedbacks = this.feedbacks;
      this.filterFeedbacks = this.filterFeedbacks.filter((feedback) => {
        return feedback.category == option;
      });
    }
  }


  ascDate: boolean = true;

  sortByDate() {
    if (this.ascDate)
      this.feedbacks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    else
      this.feedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.ascDate = !this.ascDate;
  }

  searchByText: string = '';

  searchBasedOnText() {
    this.filterFeedbacks = this.feedbacks;
    this.filterFeedbacks = this.feedbacks.filter((feed) => {
      let a = (feed.user.username?.toLowerCase().includes(this.searchByText.toLowerCase()) ?? false) ||
        (feed.investment?.name?.toLowerCase().includes(this.searchByText.toLowerCase()) ?? false) ||
        (feed.category?.toLowerCase().includes(this.searchByText.toLowerCase()) ?? false) ||
        (feed.feedbackText?.toLowerCase().includes(this.searchByText.toLowerCase()) ?? false);
      return a;
    });
  }
}

