import { Component, OnInit } from '@angular/core';
import { Investment } from 'src/app/models/investment.model';
import { InvestmentService } from 'src/app/services/investment.service';
 
@Component({
  selector: 'app-admin-view-investment',
  templateUrl: './admin-view-investment.component.html',
  styleUrls: ['./admin-view-investment.component.css']
})
export class AdminViewInvestmentComponent implements OnInit {
 
  investments: Investment[];
  ogInvestments: Investment[];
  investment: Investment;
  constructor(private investmentService:InvestmentService) { }
 
  ngOnInit(): void {
    this.getAllInvestments();
  }
 
  getAllInvestments(){
    this.investmentService.getAllInvestments().subscribe((data)=>{
      this.investments=data;
      this.ogInvestments=data;
    })
  }
 
  filterSearch(searchString: string){
    this.investments=this.ogInvestments.filter((data)=> {
      let name=data.name.toLowerCase().includes(searchString.toLowerCase());
      let description=data.description.toLowerCase().includes(searchString.toLowerCase())
      let type=data.type.toLowerCase().includes(searchString.toLowerCase())
      let status=data.status.toLowerCase().includes(searchString.toLowerCase())
      let pDate=data.purchaseDate.toLowerCase().includes(searchString.toLowerCase())
 
      return name || description || type || status || pDate ;
    });
  }
 
 
  filterCategory(option: string){
    if(option=="AllTypes"){
      this.investments=this.ogInvestments;
    }else{
      this.investments=this.ogInvestments.filter((data)=> data.type==option);
    }
    return this.investments;
 
  }
 
  deleteInvestment(investmentId: number){
    this.investmentService.deleteInvestment(investmentId).subscribe((data)=>{
      this.getAllInvestments()
    });
  }
 
}
 