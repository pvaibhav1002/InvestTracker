import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentInquiry } from 'src/app/models/investment-inquiry.model';
import { AuthService } from 'src/app/services/auth.service';

import { InvestmentInquiryService } from 'src/app/services/investment-inquiry.service';

@Component({
  selector: 'app-user-view-inquiry',
  templateUrl: './user-view-inquiry.component.html',
  styleUrls: ['./user-view-inquiry.component.css']
})
export class UserViewInquiryComponent implements OnInit {

  invests: InvestmentInquiry[] = [];
  userId: number;

  constructor(private investInquiryService: InvestmentInquiryService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getAuthenticatedUserId();
    this.investInquiryService.getInquiriesByUserId(this.userId).subscribe((data) => {
      this.invests = data;
    });

  }

}