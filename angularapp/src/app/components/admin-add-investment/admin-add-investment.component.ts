import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvestmentService } from 'src/app/services/investment.service';

@Component({

  selector: 'app-admin-add-investment',
  templateUrl: './admin-add-investment.component.html',
  styleUrls: ['./admin-add-investment.component.css']

})

export class AdminAddInvestmentComponent {
  investmentForm: FormGroup;
  addedInvestment: boolean = false;
  investmentData: any;
  date: Date = new Date();

  constructor(

    private readonly investmentService: InvestmentService,
    private readonly fb: FormBuilder,
    private readonly router: Router

  ) {

    this.investmentForm = fb.group({

      name: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', [Validators.required, Validators.minLength(15)]],
      type: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      quantity: ['', [Validators.required, Validators.min(1)]],
      capSize: ['', Validators.required],
      sector: ['', Validators.required]

    });

  }

  addNewInvestment(form: FormGroup) {

    this.investmentData = {
      name: form.value.name,
      description: form.value.description,
      type: form.value.type,
      price: form.value.price,
      quantity: form.value.quantity,
      postedDate: this.date.toISOString().split('T')[0],
      capSize: form.value.capSize,
      sector: form.value.sector,
      status: 'Active'

    };

    this.investmentService.addInvestment(this.investmentData).subscribe(() => {
      this.addedInvestment = true;

    });

  }

  closeAddSuccessPage() {
    this.addedInvestment = false;
    this.router.navigate(['/admin-view-investment']);

  }
  get f() {
    return this.investmentForm.controls;

  }

}
