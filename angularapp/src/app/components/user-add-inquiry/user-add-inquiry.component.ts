import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentInquiry } from 'src/app/models/investment-inquiry.model';
import { InvestmentInquiryService } from 'src/app/services/investment-inquiry.service';

@Component({
  selector: 'app-user-add-inquiry',
  templateUrl: './user-add-inquiry.component.html',
  styleUrls: ['./user-add-inquiry.component.css']
})
export class UserAddInquiryComponent implements OnInit {

  inquiryForm:NgForm

  newInvest: InvestmentInquiry;
  showPopup: boolean = false;

  constructor(private investmentInquiryService: InvestmentInquiryService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.newInvest) {
      alert('Please enter a message before submitting.');
      return;
    }
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['/user-view-inquiries']);
  }



}
