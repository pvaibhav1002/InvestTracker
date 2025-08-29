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

  filterStatus: string = '';
  filterTolerance: string = '';
  searchText: string = '';
  originalInvests: InvestmentInquiry[] = [];


  constructor(private investInquiryService: InvestmentInquiryService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getAuthenticatedUserId();
    this.investInquiryService.getInquiriesByUserId(this.userId).subscribe((data) => {
      this.invests = data;
    });

  }

  filterText() {
    this.invests = this.invests.filter((inquiry) => {
      let a = inquiry.investment.name.toLowerCase().includes(this.searchText.toLowerCase());
      let b = inquiry.questions.toLowerCase().includes(this.searchText.toLowerCase());
      let c = inquiry.adminResponse.toLowerCase().includes(this.searchText.toLowerCase());
      return a || b || c;
    })
  }


  applyFilters(): void {
    this.invests = this.originalInvests.filter(inquiry => {
      let statusMatch = this.filterStatus === '' || inquiry.status === this.filterStatus;
      let toleranceMatch = this.filterTolerance === '' || inquiry.priority === this.filterTolerance;
      return statusMatch && toleranceMatch;
    });
  }

}