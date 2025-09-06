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

  investment: Investment;

  investmentId: number;

  investmentForm: FormGroup;

  updated: boolean = false;
  errormessage: string = "";
  constructor(private readonly fb: FormBuilder, private readonly ar: ActivatedRoute, private readonly is: InvestmentService, private readonly router: Router) {

    this.investmentForm = this.fb.group({

      name: ['', Validators.required],

      description: ['', [Validators.required, Validators.minLength(15)]],

      type: ['', Validators.required],

      price: [0, [Validators.required, Validators.min(0)]],

      quantity: [0, [Validators.required, Validators.min(0)]],

      status: ['', Validators.required],

      capSize: ['', Validators.required],

      sector: ['', Validators.required],

      postedDate: ['']

    });

  }

  ngOnInit(): void {

    this.investmentId = this.ar.snapshot.params['id'];

    this.is.getInvestmentById(this.investmentId).subscribe((data) => {

      this.investment = data;

      this.investmentForm.patchValue(data);
    });

  }

  updateInvestment() {

    if (this.investmentForm.valid) {

      this.is.updateInvestment(this.investmentId, this.investmentForm.value).subscribe(() => {

        console.log('Investment updated successfully!');

        this.updated = true;

      });

    } else {
      this.errormessage = "All Data Required. Investment addition Failed!"
      this.investmentForm.markAllAsTouched();
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