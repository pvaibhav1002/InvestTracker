import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models/investment.model';
import { InvestmentService } from 'src/app/services/investment.service';




@Component({
  selector: 'app-user-view-investment',
  templateUrl: './user-view-investment.component.html',
  styleUrls: ['./user-view-investment.component.css']
})
export class UserViewInvestmentComponent implements OnInit {
  investments: Investment[];

  getAllInvestments(){
    this.investmentService.getAllInvestments().subscribe((data)=>{
      this.investments=data;
    })
  }

  constructor(private investmentService: InvestmentService) { }


  ngOnInit(): void {
    this.getAllInvestments();
  }

}
