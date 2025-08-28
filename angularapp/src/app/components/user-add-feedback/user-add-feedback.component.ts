import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {
  
 feedbackForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private feedbackService: FeedbackService, private router: Router) { }

  ngOnInit(): void {
    this.feedbackForm = this.formBuilder.group({
      message: ['', Validators.required],
      category: ['', Validators.required],
      investment: ['', Validators.required],
      date: ['', [Validators.required, Validators.pattern(/^\d{2}-\d{2}-\d{4}$/)]]
    });
  }
  get f() {
    return this.feedbackForm.controls;
  }

  submitFeedback(): void {
    if (this.feedbackForm.valid) {
      this.feedbackService.sendFeedback(this.feedbackForm.value).subscribe(() => {
        alert('Feedback submitted Successfully!');
        this.router.navigate(['/user-dashboard']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/user-dashboard']);
  }
}




