# cda1fbb7-b076-4bbb-87da-ad3068aa72f6-e4904b38-072e-48dd-b278-378ad843744d
https://sonar.server.examly.io/dashboard?id=iamneo-production_cda1fbb7-b076-4bbb-87da-ad3068aa72f6-e4904b38-072e-48dd-b278-378ad843744d&amp;codeScope=overall



# This is a fix in the code




 import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Investment } from 'src/app/models/investment.model';
import { InvestmentService } from 'src/app/services/investment.service';


export class AdminEditInvestmentComponent implements OnInit {
investment:Investment;
investmentId:number;
formData:any;

  constructor(private route:ActivatedRoute, private router: Router,private is:InvestmentService) { }

  ngOnInit(): void {
    this.investmentId=this.route.snapshot.params['id'];
    this.getInvestment();
  }
 getInvestment(){
  this.is.getInvestmentById(this.investmentId).subscribe((data)=>{
    this.investment=data;
  });
 }
 updateInvestment(investmentForm:NgForm){
  if(investmentForm.valid){
    this.formData=investmentForm.value;
    this.is.updateInvestment(this.investmentId,this.formData).subscribe((data)=>{
      alert('Investment updated successfully!');
      this.router.navigate(['/admin-view-investment']);

    });

  }
 }

}




 