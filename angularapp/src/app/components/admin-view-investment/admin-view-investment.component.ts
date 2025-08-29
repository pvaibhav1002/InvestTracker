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
  successMessage:string='';
  ascName: boolean = true;
  ascType: boolean = true;
  ascStatus: boolean = true;
  ascQuantity: boolean = true;
  ascPrice: boolean = true;
  ascDate: boolean = true;

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
      let pDate=data.postedDate.toLowerCase().includes(searchString.toLowerCase())
 
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
  filterStatus(option: string) {
    if (option === "AllStatus") {
      this.investments = this.ogInvestments;
    } else {
      this.investments = this.ogInvestments.filter((data) => data.status === option);
    }
  }

  sortByName() {
    if (this.ascName)
      this.investments.sort((a, b) => a.name.localeCompare(b.name));
    else
      this.investments.sort((a, b) => b.name.localeCompare(a.name));
    this.ascName = !this.ascName;
  }
  
  sortByType() {
    if (this.ascType)
      this.investments.sort((a, b) => a.type.localeCompare(b.type));
    else
      this.investments.sort((a, b) => b.type.localeCompare(a.type));
    this.ascType = !this.ascType;
  }
  
  sortByStatus() {
    if (this.ascStatus)
      this.investments.sort((a, b) => a.status.localeCompare(b.status));
    else
      this.investments.sort((a, b) => b.status.localeCompare(a.status));
    this.ascStatus = !this.ascStatus;
  }
  
  sortByQuantity() {
    if (this.ascQuantity)
      this.investments.sort((a, b) => a.quantity - b.quantity);
    else
      this.investments.sort((a, b) => b.quantity - a.quantity);
    this.ascQuantity = !this.ascQuantity;
  }
  
  sortByPrice() {
    if (this.ascPrice)
      this.investments.sort((a, b) => a.price - b.price);
    else
      this.investments.sort((a, b) => b.price - a.price);
    this.ascPrice = !this.ascPrice;
  }
  
  sortByDate() {
    if (this.ascDate)
      this.investments.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
    else
      this.investments.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    this.ascDate = !this.ascDate;
  }
  
  
  deleteInvestment(investmentId: number){
    
    this.investmentService.deleteInvestment(investmentId).subscribe((data)=>{
      this.successMessage = 'Investment deleted successfully!';
      this.getAllInvestments()
    });
  }
 
}
 