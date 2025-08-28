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
  investmentName: string;
  id:number=null;
  
  constructor(private investmentInquiryService: InvestmentInquiryService,private authService : AuthService, private investmentService:InvestmentService, private router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.id=params['id'];
      this.investmentService.getInvestmentById(this.id).subscribe(data=>{
        this.investmentName = data.name;
      })
    });
  }
  newInvest: InvestmentInquiry = {
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


  onSubmit(): void {
    this.investmentInquiryService.addInquiry(this.newInvest).subscribe({
      next: () => {
        this.showPopup = true;
      },
      error: (err) => {
        console.error('Error submitting inquiry:', err);
        alert('Failed to submit inquiry. Please try again.');
      }
    });
  }

  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/user-view-inquiries']);
  }
}
