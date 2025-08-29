import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/services/investment.service';
import { Investment } from 'src/app/models/investment.model';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  investments: Investment[] = [];
  feedback:Feedback={investment:{},user:{}};
  constructor(private fb: FormBuilder, private fs: FeedbackService, private router: Router, private investmentService: InvestmentService,private authService:AuthService) {
    this.feedbackForm = this.fb.group({
      message: ['', Validators.required],
      category: ['', Validators.required],
      investmentId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.investmentService.getAllInvestments().subscribe(data=>{
      this.investments=data;
    })

  }

  get f() {
    return this.feedbackForm.controls;
  }
 
  submitFeedback(): void {
    let formData=this.feedbackForm.value;
    this.feedback.feedbackText=formData.message;
    this.feedback.category=formData.category;
    this.feedback.investment.investmentId=formData.investmentId;
    let date=new Date();
    this.feedback.date=date.toDateString();
    this.feedback.user.userId=this.authService.getAuthenticatedUserId();

    if (this.feedbackForm.valid) {
      this.fs.sendFeedback(this.feedback).subscribe(() => {
        console.log('Feedback submitted Successfully!');
        this.router.navigate(['/user-view-feedback']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}