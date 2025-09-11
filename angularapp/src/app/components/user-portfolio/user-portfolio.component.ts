import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';
import { PdfExportService } from 'src/app/services/pdf-export.service';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrls: ['./user-portfolio.component.css']
})
export class UserPortfolioComponent implements OnInit {
  portfolioData: any = {
    totalInvested: 0,
    currentValue: 0,
    profitOrLossAmount: 0,
    profitOrLossLabel: '',
    TypeLabels: [] as string[],
    TypeData: [] as number[],
    SectorLabels: [] as string[],
    SectorData: [] as number[],
    CapSizeLabels: [] as string[],
    CapSizeData: [] as number[],
    investments: [] as any[]
  };

  doughnutChartColors: Array<any> = [
    {
      backgroundColor: [
        '#d500f9',
        '#7c4dff',
        '#00bce6',
        '#328e9a',
        '#304ffe',
        '#1f2ba9',
        '#001756',
        '#6200ea',
        '#8e24aa',
        '#b388ff',
        '#31009c',
        '#798dff'
      ],
      borderColor: '#0e1218',
      borderWidth: 2,
    }
  ];

  doughnutChartType: ChartType = 'doughnut';

  constructor(private readonly chartService: ChartService, private readonly authService: AuthService,private readonly pdfExport: PdfExportService) {}

  ngOnInit(): void {
    this.chartService.getUserPortfolioData(this.authService.getAuthenticatedUserId()).subscribe(data => {
      this.portfolioData.totalInvested = data.totalInvested;
      this.portfolioData.currentValue = data.currentValue;
      this.portfolioData.profitOrLossAmount = data.profitOrLossAmount;
      this.portfolioData.profitOrLossLabel = data.profitOrLossLabel;
      this.portfolioData.TypeLabels = Object.keys(data.distributionByType);
      this.portfolioData.TypeData = Object.values(data.distributionByType);
      this.portfolioData.SectorLabels = Object.keys(data.distributionBySector);
      this.portfolioData.SectorData = Object.values(data.distributionBySector);
      this.portfolioData.CapSizeLabels = Object.keys(data.distributionByCapSize);
      this.portfolioData.CapSizeData = Object.values(data.distributionByCapSize);
      this.portfolioData.investments = data.investments;
    });
  }

  downloadPDF() {
      this.pdfExport.exportUserPortfolio(this.portfolioData,this.authService.getAuthenticatedUsername());
  }
}
