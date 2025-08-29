import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentInquiry } from 'src/app/models/investment-inquiry.model';
import { AuthService } from 'src/app/services/auth.service';
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

  constructor(private investmentInquiryService: InvestmentInquiryService, private authService: AuthService, private investmentService: InvestmentService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.investmentService.getInvestmentById(params['id']).subscribe(data => {
        this.investmentName = data.name;
      })
    });
    this.newInvest = {
      user: { userId: this.authService.getAuthenticatedUserId() },
      investment: { investmentId: this.id },
      message: '',
      status: 'Pending',
      inquiryDate: new Date().toISOString(),
      responseDate: '',
      adminResponse: '',
      priority: '',
      contactDetails: ''
    };
  }

  onSubmit(): void {
    console.log(this.newInvest)
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