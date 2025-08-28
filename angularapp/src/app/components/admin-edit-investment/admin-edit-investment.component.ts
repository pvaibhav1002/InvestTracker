import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Investment } from 'src/app/models/investment.model';


import { InvestmentService } from 'src/app/services/investment.service';

@Component({
  selector: 'app-admin-edit-investment',
  templateUrl: './admin-edit-investment.component.html',
  styleUrls: ['./admin-edit-investment.component.css']
})
export class AdminEditInvestmentComponent implements OnInit {
  investment:Investment;
  investmentId: number;
  investmentForm: FormGroup;

  constructor(
    private fb: FormBuilder, private ar: ActivatedRoute, private is: InvestmentService, private router: Router
  ) {}

  ngOnInit(): void {
    this.investmentId = this.ar.snapshot.params['id'];

    this.investmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      purchasePrice: [0, [Validators.required, Validators.min(0)]],
      currentPrice: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      purchaseDate: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
      status: ['', Validators.required]
    });

    this.getInvestment();
  }

  getInvestment() {
    this.is.getInvestmentById(this.investmentId).subscribe((data) => {
      this.investment=data;
      this.investmentForm.patchValue(data);
    });
  }

  updateInvestment() {
    if (this.investmentForm.valid) {
      this.is.updateInvestment(this.investmentId, this.investmentForm.value).subscribe(() => {
        alert('Investment updated successfully!');
        this.router.navigate(['/admin-view-investment']);
      });
    }
  }

  get f() {
    return this.investmentForm.controls;
  }
}
