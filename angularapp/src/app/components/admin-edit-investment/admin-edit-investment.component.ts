import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Investment } from 'src/app/models/investment.model';
import { EmailService } from 'src/app/services/email.service';
import { FeedbackService } from 'src/app/services/feedback.service';

import { InvestmentService } from 'src/app/services/investment.service';
@Component({
  selector: 'app-admin-edit-investment',
  templateUrl: './admin-edit-investment.component.html',
  styleUrls: ['./admin-edit-investment.component.css']
})
export class AdminEditInvestmentComponent implements OnInit {
  investment: Investment;
  investmentId: number;
  investmentForm: FormGroup;
  updated: boolean = false;
  originalPrice: number;

  constructor(private fb: FormBuilder, private ar: ActivatedRoute, private feedbackservice:FeedbackService,private is: InvestmentService, private router: Router,private emailservice:EmailService) {
    this.investmentForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      status: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.investmentId = this.ar.snapshot.params['id'];
    this.is.getInvestmentById(this.investmentId).subscribe((data) => {
      this.investment = data;
      this.investmentForm.patchValue(data);
      this.originalPrice = data.price;
    });
  }
  updateInvestment() {
    if (this.investmentForm.valid) {
      this.is.updateInvestment(this.investmentId, this.investmentForm.value).subscribe(() => {
        console.log('Investment updated successfully!');
        this.updated = true;
      });
    }
  }

  
  closeModal() {
    this.updated = false;
    this.router.navigate(['/admin-view-investment']);
 
  }
 
  get f() {
    return this.investmentForm.controls;
  }
}