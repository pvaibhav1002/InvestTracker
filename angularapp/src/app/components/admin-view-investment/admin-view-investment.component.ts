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

  getAllInvestments(){
    this.is.getAllInvestments().subscribe((data)=>{
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
    }

    else if(option=="Stock1"){
      this.investments=this.ogInvestments.filter((data)=> data.type=="Stock1");
    }

    else if(option=="Stock2"){
      this.investments=this.ogInvestments.filter((data)=> data.type=="Stock2");
    }

    else if(option=="Stock3"){
      this.investments=this.ogInvestments.filter((data)=> data.type=="Stock3");
    }

    else if(option=="Stock4"){
      this.investments=this.ogInvestments.filter((data)=> data.type=="Stock4");
    }

    else if(option=="Stock5"){
      this.investments=this.ogInvestments.filter((data)=> data.type=="Stock5");
    }

    return this.investments;

  }



  constructor(private is:InvestmentService) { }

  ngOnInit(): void {
    this.getAllInvestments();
  }

}
