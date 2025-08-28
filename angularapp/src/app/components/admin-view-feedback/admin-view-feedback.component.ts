import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-admin-view-feedback',
  templateUrl: './admin-view-feedback.component.html',
  styleUrls: ['./admin-view-feedback.component.css']
})
export class AdminViewFeedbackComponent implements OnInit {

  feedbacks = [];
  noFeedbackFound = false;

  selectedUser: any = null;
  selectedInvestment: any = null;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    // this.getFeedbacks();
    this.loadMockFeedbacks();
    
  }

  // getFeedbacks(): void {
  //   this.feedbackService.getFeedbacks().subscribe(
  //     (data) => {
  //       this.noFeedbackFound = data.length === 0;
  //       this.feedbacks = data;
  //     },
  //     (error) => {
  //       console.error('Error fetching feedback', error);
  //     }
  //   );
  // }


  loadMockFeedbacks(): void {
    // Sample mock data
    this.feedbacks = [
      {
        id: 'FB001',
        user: {
          userId: 'U001',
          username: 'Sai Asritha',
          email: 'sai.asritha@example.com',
          userRole: 'Investor',
          name: 'Sai Asritha'
        },
        investment: {
          name: 'Tech Growth Fund',
          type: 'Mutual Fund',
          purchasePrice: 1000,
          currentPrice: 1200,
          quantity: 10,
          purchaseDate: '2023-05-10',
          status: 'Active'
        },
        category: 'Performance',
        message: 'The fund is performing well.',
        postedDate: new Date()
      },
      {
        id: 'FB002',
        user: {
          userId: 'U002',
          username: 'Ravi Kumar',
          email: 'ravi.kumar@example.com',
          userRole: 'Investor',
          name: 'Ravi Kumar'
        },
        investment: {
          name: 'Real Estate Trust',
          type: 'REIT',
          purchasePrice: 5000,
          currentPrice: 4800,
          quantity: 5,
          purchaseDate: '2022-11-20',
          status: 'Inactive'
        },
        category: 'Returns',
        message: 'Returns are lower than expected.',
        postedDate: new Date()
      }
    ];

    this.noFeedbackFound = this.feedbacks.length === 0;
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


