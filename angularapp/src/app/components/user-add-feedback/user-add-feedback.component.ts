import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from 'src/app/services/feedback.service';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/services/investment.service';
import { Investment } from 'src/app/models/investment.model';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-user-add-feedback',
  templateUrl: './user-add-feedback.component.html',
  styleUrls: ['./user-add-feedback.component.css']
})
export class UserAddFeedbackComponent implements OnInit {

  feedbackForm: FormGroup;
  investments: Investment[] = [];
  feedback: Feedback = { investment: {}, user: {} };
  name: string = '';
  email: string = '';
  responseMessage: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly fs: FeedbackService,
    private readonly router: Router,
    private readonly investmentService: InvestmentService,
    private readonly authService: AuthService,
    private readonly emailService: EmailService
  ) {
    this.feedbackForm = this.fb.group({
      name: [authService.getAuthenticatedUsername(), Validators.required],
      email: [authService.getAuthenticatedUserEmail(), [Validators.required, Validators.email]],
      message: ['', Validators.required],
      category: ['', Validators.required],
      investmentId: [""]
    });
  }

  ngOnInit(): void {
    this.investmentService.getAllInvestments().subscribe(data => {
      this.investments = data;
    });

    this.feedbackForm.get('category')?.valueChanges.subscribe(category => {
      const investmentControl = this.feedbackForm.get('investmentId');
      if (category === 'Assets') {
        investmentControl?.setValidators([Validators.required]);
      } else {
        investmentControl?.clearValidators();
        investmentControl?.setValue(null);
      }
      investmentControl?.updateValueAndValidity();
    });
  }

  get f() {
    return this.feedbackForm.controls;
  }

  submitFeedback(): void {
    const formData = this.feedbackForm.value;
    this.feedback.feedbackText = formData.message;
    this.feedback.category = formData.category;
    this.feedback.investment.investmentId = formData.investmentId;
    this.feedback.date = new Date().toDateString();
    this.feedback.user.userId = this.authService.getAuthenticatedUserId();

    this.name = formData.name;
    this.email = formData.email;

    if (this.feedbackForm.valid) {
      this.fs.sendFeedback(this.feedback).subscribe(() => {
        this.sendFeedbackConfirmation(); // Send confirmation email
        this.router.navigate(['/user-view-feedback']);
      });
    }
  }

  sendFeedbackConfirmation(): void {
    const emailRequest = {
      to: this.email,
      subject: 'Feedback Submitted Successfully',
      text: `Dear ${this.name},\n\nThank you for your feedback. We appreciate your input and will review it shortly.\n\nBest regards,\nInvestTrack Team`
    };

    this.emailService.sendEmail(emailRequest).subscribe({
      next: (res) => this.responseMessage = res,
      error: () => this.responseMessage = 'Failed to send confirmation email'
    });
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}