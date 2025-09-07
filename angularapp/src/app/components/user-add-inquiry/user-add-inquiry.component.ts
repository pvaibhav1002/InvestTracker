import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentInquiry } from 'src/app/models/investment-inquiry.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmailService } from 'src/app/services/email.service';
import { InvestmentInquiryService } from 'src/app/services/investment-inquiry.service';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-user-add-inquiry',
  templateUrl: './user-add-inquiry.component.html',
  styleUrls: ['./user-add-inquiry.component.css']
})
export class UserAddInquiryComponent implements OnInit {
  showPopup: boolean = false;
  investmentName: string = "";
  id: number = null;
  newInvest: InvestmentInquiry;
  responseMessage: string = '';

  name: string = this.authService.getAuthenticatedUsername();
  email: string = this.authService.getAuthenticatedUserEmail();

  constructor(
    private readonly emailService: EmailService,
    private readonly investmentInquiryService: InvestmentInquiryService,
    private readonly authService: AuthService,
    private readonly investmentService: InvestmentService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.investmentService.getInvestmentById(this.id).subscribe(data => {
        this.investmentName = data.name;
      });
    });

    this.newInvest = {
      user: { userId: this.authService.getAuthenticatedUserId() },
      investment: { investmentId: this.id },
      questions: '',
      reasonOfInterest: '',
      inquiryDate: new Date().toISOString(),
      riskTolerance: '',
      expectedReturn: null,
      status: 'Pending',
      responseDate: '',
      adminResponse: '',
      contactDetails: '',
    };
  }

  onSubmit(): void {
    this.investmentInquiryService.addInquiry(this.newInvest).subscribe({
      next: () => {
        this.showPopup = true;
      },
      error: (err) => {
        console.error('Error submitting inquiry:', err);
      }
    });
  }


  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/user-view-inquiry']);
  }
}