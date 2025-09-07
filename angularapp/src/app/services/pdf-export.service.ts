import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  date: Date = new Date()
  constructor() { }
  async exportUserPortfolio(portfolioData: any, username: string) {
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
    doc.text(`Total Invested: Rs. ${portfolioData.totalInvested}`, margin, y);
    doc.text(`Current Value: Rs. ${portfolioData.currentValue}`, margin + 200, y);

    const profitOrLoss = portfolioData.profitOrLossAmount;
    if (profitOrLoss >= 0) {
      doc.setTextColor(40, 167, 69); // bootstrap green
    } else {
      doc.setTextColor(220, 53, 69); // bootstrap red
    }
    doc.text(`Profit/Loss: Rs. ${profitOrLoss}`, margin + 370, y);

    y += 30;
    doc.setTextColor(0, 0, 0); // reset to black
    doc.setFont('helvetica', 'normal');

    (doc as any).autoTable({
      head: [['Investment Name', 'Cap Size', 'Sector', 'Type', 'Amount Invested', 'Current Value', 'Profit/Loss']],
      body: portfolioData.investments.map(inv => [
        inv.name || '',
        inv.capSize || '',
        inv.sector || '',
        inv.type || '',
        ((inv.purchasePrice ?? 0) * (inv.quantityBought ?? 0)).toFixed(2),
        ((inv.currentPrice ?? 0) * (inv.quantityBought ?? 0)).toFixed(2),
        (
          ((inv.currentPrice ?? 0) * (inv.quantityBought ?? 0)) -
          ((inv.purchasePrice ?? 0) * (inv.quantityBought ?? 0))
        ).toFixed(2)
      ]),
      startY: y,
      headStyles: { fillColor: [0, 123, 255] }
    });

    doc.save(`${username}_Portfolio_${this.date.toDateString()}.pdf`);
  }


  async exportAdminConsole(data: any) {
    const doc = new jsPDF({
      unit: 'pt',
      format: 'a4',
      orientation: 'portrait'
    });
    const margin = 40;
    let y = 50;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text('Admin Console Report', 180, y);

    y += 40;
    doc.setFontSize(12);
    doc.text(`Total Users: ${data.totalUsers}`, margin, y);
    doc.text(`Total Investments: ${data.totalInvestments}`, margin + 100, y);
    doc.text(`Total Invested Amount: Rs. ${data.totalInvestedAmount}`, margin + 250, y);

    y += 10;
    doc.setTextColor(0, 0, 0); // reset to black
    autoTable(doc, {
      head: [['Username', 'Total Invested (INR)', 'Current Investment (INR)', 'Current Profit (INR)']],
      body: data.userSummaries.map((u: any) => [
        u.username,
        u.totalInvested.toFixed(2),
        u.currentInvestment.toFixed(2),
        u.currentProfit.toFixed(2),
      ]),
      startY: y,
      headStyles: { fillColor: [0, 188, 230] }
    });
    doc.save(`Admin_Console_${this.date.toDateString()}.pdf`);
  }
}