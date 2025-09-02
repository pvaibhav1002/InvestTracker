import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { ChartService } from 'src/app/services/chart.service';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrls: ['./user-portfolio.component.css']
})
export class UserPortfolioComponent implements OnInit {

  totalInvested: number = 0;
  currentValue: number = 0;
  profitOrLossAmount: number = 0;
  profitOrLossLabel: string = '';
 
  TypeLabels: string[] = [];
  TypeData: number[] = [];
  SectorLabels: string[] = [];
  SectorData: number[] = [];
  CapSizeLabels: string[] = [];
  CapSizeData: number[] = [];
 
  doughnutChartType: ChartType = 'doughnut';
 
  constructor(private chartService: ChartService) {}

  ngOnInit(): void {
    const userId = 1; // Replace with dynamic user ID
    this.chartService.getUserPortfolioData(userId).subscribe(data => {
      this.totalInvested = data.totalInvested;
      this.currentValue = data.currentValue;
      this.profitOrLossAmount = data.profitOrLossAmount;
      this.profitOrLossLabel = data.profitOrLossLabel;
 
      this.TypeLabels = Object.keys(data.distributionByType);
      this.TypeData = Object.values(data.distributionByType);
      this.SectorLabels = Object.keys(data.distributionBySector);
      this.SectorData = Object.values(data.distributionBySector);
      this.CapSizeLabels = Object.keys(data.distributionByCapSize);
      this.CapSizeData = Object.values(data.distributionByCapSize);
    });
  }

}



