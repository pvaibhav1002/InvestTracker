import { Component, OnInit } from '@angular/core';

import { InvestmentInquiry } from 'src/app/models/investment-inquiry.model';

import { EmailService } from 'src/app/services/email.service';
import { InvestmentInquiryService } from 'src/app/services/investment-inquiry.service';

@Component({

  selector: 'app-admin-view-inquiry',
  templateUrl: './admin-view-inquiry.component.html',
  styleUrls: ['./admin-view-inquiry.component.css']

})

export class AdminViewInquiryComponent implements OnInit {
  inquiries: InvestmentInquiry[] = [];
  searchText: string = '';
  selectedInquiryId: number | null = null;
  selectedInquiry: InvestmentInquiry | null = null;
  responseText: string = '';
  responseSubmitted: boolean = false;
  showResForm: boolean = false;
  filterStatus: string = '';
  filterRisk: string = '';
  originalInquiries: InvestmentInquiry[] = [];

  constructor(private inquiryService: InvestmentInquiryService,private emailservice:EmailService) { }
 

  ngOnInit(): void {
    this.fetchAllInquiries();

  }

  updateStatus(inquiry: InvestmentInquiry): void {

    this.inquiryService.updateInquiry(inquiry.inquiryId, inquiry).subscribe({
      next: () => {
        console.log('Status updated successfully');

      },

      error: (err) => {
        console.error('Error updating status:', err);

      }

    });

  }

  fetchAllInquiries(): void {

    this.inquiryService.getAllInquiries().subscribe({

      next: (data) => {
        this.inquiries = data;
        this.originalInquiries = data;

      },

      error: (err) => {
        console.error('Error fetching inquiries:', err);

      }

    });

  }

  filterText() {

    this.inquiries = this.originalInquiries;
    this.inquiries = this.inquiries.filter((inquiry) => {
      let a = inquiry.investment.name.toLowerCase().includes(this.searchText.toLowerCase());
      let b = inquiry.questions.toLowerCase().includes(this.searchText.toLowerCase());
      let c = inquiry.user.username.toLowerCase().includes(this.searchText.toLowerCase());
      return a || b || c;

    })

  }

  showResponseForm(inquiry:InvestmentInquiry): void {
    this.selectedInquiry=inquiry;
  }

  submitResponse(): void {

    const inquiry = this.selectedInquiry;

    if (inquiry) {
      inquiry.adminResponse = this.responseText;
      inquiry.status = 'Resolved';
      inquiry.responseDate = new Date().toISOString();
      this.inquiryService.updateInquiry(inquiry.inquiryId, inquiry).subscribe({

        next: () => {

          // this.emailservice.sendInquiryResponse(

          //   inquiry.user.email,
          //   inquiry.user.username,
          //   this.responseText

          // ).subscribe({

          //   next: () => console.log('Email sent successfully'),
          //   error: (err) => console.error('Error sending email:', err)

          // });

          this.responseSubmitted = true;
          this.selectedInquiry=null
          this.responseText = '';
          setTimeout(() => {
            this.responseSubmitted = false;
          }, 3000);

        },
        error: (err) => {
          console.error('Error updating inquiry:', err);

        }

      });

    }

  }

  cancel() {
    this.selectedInquiry = null;

  }
  sortByDate() {
    this.inquiries = this.originalInquiries.sort((inquiry1, inquiry2) => inquiry1.inquiryDate.localeCompare(inquiry2.inquiryDate));
  }
  applyFilters(): void {
    this.inquiries = this.originalInquiries.filter(inquiry => {
      const statusMatch = this.filterStatus === '' || inquiry.status === this.filterStatus;
      const riskMatch = this.filterRisk === '' || inquiry.riskTolerance === this.filterRisk;
      return statusMatch && riskMatch;

    });
  }
  deleteInquiry(id: number): void {

    this.inquiryService.deleteInquiry(id).subscribe((data) => { });

  }

}

