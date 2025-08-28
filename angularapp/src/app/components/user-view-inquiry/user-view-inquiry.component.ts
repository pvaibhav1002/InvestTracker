import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvestmentInquiry } from 'src/app/models/investment-inquiry.model';

import { InvestmentInquiryService } from 'src/app/services/investment-inquiry.service';

@Component({
  selector: 'app-user-view-inquiry',
  templateUrl: './user-view-inquiry.component.html',
  styleUrls: ['./user-view-inquiry.component.css']
})
export class UserViewInquiryComponent implements OnInit {

  invests: InvestmentInquiry[] = [
    {
      inquiryId: 1,
      user: {
        userId: 1,
        email: 'john.doe@example.com',
        password: 'password123',
        username: 'john_doe',
        mobileNumber: '9876543210',
        userRole: 'User'
      },
      investment: {
        investmentId: 101,
        name: 'Quant Mutual Funds',
        description: 'High-growth mutual fund focused on technology sector.',
        type: 'Mutual Fund',
        purchasePrice: 150.00,
        currentPrice: 175.50,
        quantity: 10,
        purchaseDate: '2023-06-15',
        status: 'Active'
      },
      message: 'Hey can I get more info on this??',
      priority: 'High',
      status: 'Resolved',
      adminResponse: "",
      contactDetails: 'john.doe@example.com'
    }
  ];


  // investId: number;




  constructor(private investInquiryService: InvestmentInquiryService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    


    //  this.investId=this.route.snapshot.params['id'];

    //  this.investInquiryService.getInquiriesByUserId(this.investId).subscribe((data)=>{
    //   this.invests=data;

    //  });


  }

}



