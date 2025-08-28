import { Component, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-user-view-feedback',
  templateUrl: './user-view-feedback.component.html',
  styleUrls: ['./user-view-feedback.component.css']
})
export class UserViewFeedbackComponent implements OnInit {
  userFeedbacks: any[] = [];
  noFeedbackFound = false;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    // this.getUserFeedbacks();
    this.loadSampleFeedbacks();
  }


  loadSampleFeedbacks(): void {
    this.userFeedbacks = [
      {
        feedbackText: 'Excellent service and timely updates.',
        date: '2025-08-01',
        category: 'Service',
        investment: {
          name: 'Growth Equity Fund'
        }
      },
      {
        feedbackText: 'Returns are lower than expected.',
        date: '2025-07-15',
        category: 'Returns',
        investment: {
          name: 'Balanced Portfolio'
        }
      }
    ];

    this.noFeedbackFound = this.userFeedbacks.length === 0;
  }
}


  // getUserFeedbacks(): void {
  //   this.feedbackService.getFeedbacks().subscribe(
  //     (data) => {
  //       this.userFeedbacks = data;
  //       this.noFeedbackFound = data.length === 0;
  //     },
  //     (error) => {
  //       console.error('Error fetching user feedbacks:', error);
  //       this.noFeedbackFound = true;
  //     }
  //   );
  // }



