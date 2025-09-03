import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { AuthService } from 'src/app/services/auth.service';
import { ChartService } from 'src/app/services/chart.service';

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
        '#007bff', // Blue
        '#28a745', // Green
        '#17a2b8', // Teal
        '#ffc107', // Yellow
        '#dc3545', // Red
        '#6f42c1'  // Purple
      ]
    }
  ];

  doughnutChartType: ChartType = 'doughnut';

  constructor(private chartService: ChartService, private authService: AuthService) {}

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

  async exportToPDF() {
    const { jsPDF } = await import('jspdf');
    await import('jspdf-autotable');

    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait'
    });

    const margin = 40;
    let y = 50;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(24);
    doc.text('User Portfolio', 200, y);

    doc.setFontSize(12);
    y += 30;
    doc.text(`Total Invested: Rs. ${this.portfolioData.totalInvested}`, margin, y);
    doc.text(`Current Value: Rs. ${this.portfolioData.currentValue}`, margin + 150, y);

    const profitOrLoss = this.portfolioData.profitOrLossAmount;
    if (profitOrLoss >= 0) {
      doc.setTextColor(40, 167, 69); // bootstrap green
    } else {
      doc.setTextColor(220, 53, 69); // bootstrap red
    }
    doc.text(`Profit/Loss: Rs. ${profitOrLoss}`, margin + 300, y);

    y += 10;
    doc.setTextColor(0, 0, 0); // reset to black
    doc.setFont('helvetica', 'normal');

    (doc as any).autoTable({
      head: [['Investment Name', 'Cap Size', 'Sector', 'Type', 'Amount Invested', 'Current Value', 'Profit/Loss']],
      body: this.portfolioData.investments.map(inv => [
        inv.name || '',
        inv.capSize || '',
        inv.sector || '',
        inv.type || '',
        ((inv.purchasePrice * inv.quantityBought) || 0).toFixed(2),
        ((inv.currentPrice * inv.quantityBought) || 0).toFixed(2),
        (((inv.currentPrice * inv.quantityBought) || 0) - ((inv.purchasePrice * inv.quantityBought) || 0)).toFixed(2),
      ]),
      startY: y,
      headStyles: { fillColor: [0, 123, 255] }
    });

    doc.save('UserPortfolio.pdf');
  }
}
