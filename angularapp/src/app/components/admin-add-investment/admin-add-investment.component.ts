import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-admin-add-investment', 
  templateUrl: './admin-add-investment.component.html',
  styleUrls: ['./admin-add-investment.component.css']
})
export class AdminAddInvestmentComponent implements OnInit {

  investmentForm: FormGroup;
  addedInvestment: boolean=false;

  constructor(private investmentService: InvestmentService, private fb: FormBuilder, private router: Router) {
    this.investmentForm = fb.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      type: ['',Validators.required],
      purchasePrice: ['',[Validators.required,Validators.min(0)]],
      currentPrice: ['',[Validators.required,Validators.min(0)]],
      quantity: ['',[Validators.required,Validators.min(0)]],
      purchaseDate: ['',Validators.required],
      status: ['',Validators.required],
    })
  }


  addNewInvestment(investmentForm){
    this.investmentService.addInvestment(investmentForm.value).subscribe((data)=>{
      this.addedInvestment=true;
    })
  }

  closeAddSuccessPage(){
    this.addedInvestment=false;
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

  get f(){
    return this.investmentForm.controls;
  }

}
